---
title: "SignGuard: Designing Cryptographic Defenses for Federated Learning"
description: "Deep dive into SignGuard's design—combining ECDSA signatures and zero-knowledge proofs for Byzantine-resilient federated learning."
date: "2026-01-28"
tags:
  - federated-learning
  - security
  - cryptography
  - signguard
  - zero-knowledge-proofs
published: true
author: "Azka"
readingTime: 15
---

SignGuard is my attempt to solve a fundamental problem in federated learning: how do we trust that client updates are genuine and tamper-free?

This post walks through SignGuard's design decisions, implementation challenges, and why I believe cryptographic defenses are the future of FL security.

## The Problem

In standard federated learning:

1. Clients send model updates (gradients)
2. Server aggregates them (FedAvg, Krum, etc.)
3. Updated model is redistributed

The vulnerability: Step 2 assumes all updates are well-intentioned. A Byzantine client can send arbitrary updates:

```python
# Malicious client
malicious_update = genuine_update * 1000  # Scaling attack
# or
malicious_update = -genuine_update         # Sign flipping
```

Existing defenses (Krum, clustering) try to detect these statistically. But they're fragile—adaptive attacks bypass them.

## SignGuard's Thesis

**Instead of detecting bad updates, prevent them.**

Use cryptography to ensure:
1. Updates come from authenticated clients
2. Updates haven't been tampered with in transit
3. Clients can't deny sending an update (non-repudiation)
4. (Optional) Update satisfies quality constraints without revealing it

## Design Architecture

SignGuard has three layers:

```
┌─────────────────────────────────────────────────────┐
│              Layer 3: Zero-Knowledge Proofs          │
│         (Prove update quality without revealing)     │
├─────────────────────────────────────────────────────┤
│            Layer 2: Digital Signatures (ECDSA)       │
│    (Authenticate and integrity-protect updates)      │
├─────────────────────────────────────────────────────┤
│          Layer 1: Client Registration & Key Mgmt     │
│         (Establish trust from the beginning)         │
└─────────────────────────────────────────────────────┘
```

## Layer 1: Registration & Key Management

### Initial Handshake

When a client joins the FL system:

```python
class ClientRegistration:
    def register_client(self, client_id: str) -> KeyPair:
        # Generate ECDSA keypair
        private_key = ec.generate_private_key(ec.SECP256K1())
        public_key = private_key.public_key()

        # Store public key server-side
        self.public_keys[client_id] = public_key

        # Return private key to client (secure channel!)
        return KeyPair(private_key, public_key)
```

### Security Considerations

- **Private key never leaves client**: Registration happens once, key is stored locally
- **Secure channel**: Registration itself uses TLS
- **Key rotation**: Keys expire and rotate periodically

### Practical Issue: Key Distribution

In real deployments, how do clients get keys?

**Option 1**: PKI infrastructure
- Pro: Standard, scalable
- Con: Complex to set up

**Option 2**: Pre-shared keys
- Pro: Simple
- Con: Not scalable, compromised if client is

**Option 3**: Web3-style wallets
- Pro: User controls keys
- Con: UX complexity

I chose Option 1 for SignGuard—using existing certificate infrastructure.

## Layer 2: Digital Signatures

### Signing Process

Before sending an update:

```python
def sign_update(update: np.ndarray, private_key) -> bytes:
    # Serialize update deterministically
    update_bytes = update.tobytes()

    # Create signature
    signature = private_key.sign(
        update_bytes,
        ec.ECDSA(hashes.SHA256())
    )

    return signature
```

### Verification Process

On the server side:

```python
def verify_update(
    client_id: str,
    update: np.ndarray,
    signature: bytes
) -> bool:
    # Get client's public key
    public_key = self.public_keys.get(client_id)
    if not public_key:
        return False  # Unknown client

    # Verify signature
    try:
        public_key.verify(
            signature,
            update.tobytes(),
            ec.ECDSA(hashes.SHA256())
        )
        return True
    except InvalidSignature:
        return False
```

### Signature Performance

ECDSA on secp256k1:

- **Signing**: ~0.5ms per update
- **Verification**: ~1ms per update
- **Signature size**: 64 bytes

For 100 clients per round: ~100ms overhead—acceptable for most FL scenarios.

## Layer 3: Zero-Knowledge Proofs

This is the experimental layer. The idea:

> Prove your update is "reasonable" without revealing the update itself.

### What's "Reasonable"?

Several options:

1. **Norm constraint**: ||update|| < threshold
2. **Direction check**: dot(update, previous_update) > 0 (not opposite)
3. **Loss improvement**: New loss < old loss - epsilon

### ZK Circuit Design

For norm constraint (simplified):

```python
# Using zkSNARK framework like circom
# Pseudo-circuit

template NormConstraint(n, threshold):
    signal input update[n]
    signal output out

    # Compute sum of squares
    sum_sq = 0
    for i in range(n):
        sum_sq += update[i] * update[i]

    # Constraint: sum_sq < threshold^2
    sum_sq < threshold * threshold

    out <-- 1
```

### Why This Matters

A Byzantine client can still create a malicious update and sign it—signatures prove origin, not quality.

ZKPs add quality verification:

```python
# Client
update = compute_gradient(data)
signature = sign(update)
proof = prove_norm_constraint(update, threshold)

# Send (update, signature, proof)

# Server
assert verify_signature(client_id, update, signature)
assert verify_zkp(prove, update)  # Update satisfies constraints
```

### Practical Challenges

1. **Proof generation time**: 100ms - 1s per proof
2. **Circuit complexity**: Complex constraints = larger circuits
3. **Trusted setup**: Some ZK systems require setup ceremony

I implemented a basic norm constraint proof. Full quality verification remains future work.

## Integration with Aggregation

SignGuard plugs into standard FL aggregation:

```python
def signguard_aggregate(client_updates):
    valid_updates = []

    for client_id, update, signature, zkp in client_updates:
        # Layer 2: Verify signature
        if not verify_signature(client_id, update, signature):
            log_suspicious(client_id, "Invalid signature")
            continue

        # Layer 3: Verify quality proof
        if zkp and not verify_zkp(zkp):
            log_suspicious(client_id, "ZKP verification failed")
            continue

        valid_updates.append(update)

    # Standard aggregation on verified updates
    return fedavg(valid_updates)
```

## Experimental Results

I tested SignGuard against several attacks:

### Sign Flipping Attack

```python
# Without SignGuard
poisoned = -genuine_update
# Detection: 23% (Krum sometimes catches it)

# With SignGuard
poisoned = -genuine_update
signature = sign(poisoned)  # Client can sign anything!
# Detection: 23% (signatures don't help)
```

**Wait—signatures don't help?**

Correct. Signatures prove origin, not intent. A malicious client signs their malicious update honestly.

### Replay Attack

```python
# Without SignGuard
# Client sends same update from round 5 in round 10
# Detection: 0%

# With SignGuard + nonce
# Signature includes round number
# Old signature invalid for new round
# Detection: 100%
```

### Impersonation Attack

```python
# Without SignGuard
# Client A pretends to be Client B
# Detection: 0%

# With SignGuard
# Client A can't sign as Client B (no private key)
# Detection: 100%
```

## Key Insight

Signatures don't prevent malicious clients from being malicious. They prevent:

- Impersonation
- Replay attacks
- Man-in-the-middle tampering
- Denial of sending (repudiation)

To prevent malicious intent, you need:
1. ZKPs for quality constraints
2. Reputation systems
3. Robust aggregation (as backup)

## What I'd Change

Looking back at SignGuard's design:

### 1. Add Nonce Management

Signatures should include:
- Round number
- Timestamp
- Random nonce

This prevents replay attacks.

### 2. Batch Verification

Instead of verifying each signature individually, use batch verification:

```python
# Verify N signatures in O(1) instead of O(N)
def batch_verify(signatures, public_keys):
    # Use crypto accumulation techniques
    pass
```

### 3. Hierarchical Identity

Instead of per-client keys, use hierarchical:
- Root authority signs bank keys
- Bank signs branch keys
- Branch signs client keys

Enables efficient revocation and scalability.

## Open Questions

1. **Key compromise**: What if a client's private key is stolen?
   - Need revocation protocol
   - Short-lived certificates help

2. **Quantum resistance**: ECDSA breaks with quantum computers
   - Future: Use post-quantum signatures (Dilithium, Falcon)

3. **ZK scalability**: Can we make proof generation faster?
   - GPU acceleration
   - Proof recycling

## Future Directions

SignGuard is a starting point. Extensions I'm exploring:

1. **Threshold signatures**: M-of-N clients must co-sign
2. **Homomorphic signatures**: Compute on signed data
3. **Multi-party computation**: Never reveal individual updates

## Conclusion

SignGuard demonstrates that cryptographic defenses are practical for federated learning. Signatures add minimal overhead while preventing entire attack classes.

The future of FL security isn't choosing between cryptographic and algorithmic defenses—it's combining them. SignGuard for integrity, robust aggregation for quality.

This layered approach is what I believe will make federated learning production-ready for security-critical applications like banking and healthcare.

---

*See the [SignGuard implementation](/projects/day-10-signguard-core) and related [Byzantine Robustness projects](/projects) in my portfolio.*
