---
title: "SignGuard: Cryptographic FL Defense"
status: "completed"
category: "federated-learning-security"
tags:
  - federated-learning
  - security
  - cryptography
  - ecdsa
  - byzantine-robustness
  - reputation-systems
  - anomaly-detection
summary: "Layered defense system combining ECDSA digital signatures, multi-factor anomaly detection, and time-decay reputation scoring to protect federated learning from Byzantine poisoning attacks."
technologies:
  - Python
  - PyTorch
  - Flower (Flwr)
  - ECDSA (secp256r1 / P-256)
  - cryptography.io
  - NumPy
  - scikit-learn
metrics:
  attackDetectionRate: "94.5%"
  falsePositiveRate: "3.2%"
  accuracyDegradation: "<0.2%"
startDate: "2025-01-15"
completedDate: "2025-02-15"
repository: "https://github.com/alazkiyai09/signguard"
---

## Overview

SignGuard addresses a core weakness in federated learning: how to verify that client model updates are genuine and untampered. Standard FL aggregation (FedAvg) assumes all participants are honest — a dangerous assumption in real-world deployments where compromised clients can inject poisoned gradients, plant backdoors, or degrade model performance for all participants.

SignGuard uses a **three-layer defense architecture** that combines cryptographic integrity verification, statistical anomaly detection, and behavioral reputation tracking to achieve 94.5% attack detection while preserving model accuracy within 0.2% of undefended performance on clean data.

## Three-Layer Architecture

### Layer 1: ECDSA Digital Signatures

Every model update is signed with the client's private key using ECDSA on the secp256r1 (NIST P-256) curve. The server verifies each signature before processing, which:

- **Prevents impersonation**: A client can't submit updates pretending to be another
- **Ensures integrity**: Tampered updates fail signature verification
- **Provides non-repudiation**: Clients can't deny sending a particular update
- **Detects replay attacks**: Nonces prevent resubmission of old updates

Performance overhead is minimal — less than 5ms per update verification on P-256.

### Layer 2: Multi-Factor Anomaly Detection

Authenticated clients can still send malicious updates. This layer applies three complementary detection techniques:

- **Magnitude analysis**: Compares L2 norm against a dynamic baseline — catches scaling attacks
- **Direction analysis**: Cosine similarity against global gradient direction — catches backdoor and model poisoning attempts
- **Loss-based analysis**: Validates reported training loss against expected values — catches subtle attacks where magnitude and direction appear normal

### Layer 3: Time-Decay Reputation Scoring

Maintains a reputation score (0–1) for each client with exponential decay weighting:

- Recent behavior is weighted more heavily than historical actions
- Clients flagged for anomalies face stricter scrutiny on future rounds
- Reputation recovery is possible through consistent, verified contributions
- Low-reputation clients can be automatically quarantined

## Results

Tested against four major attack categories in a simulated federated learning environment:

| Attack Type | Without Defense | With SignGuard | Improvement |
|---|---|---|---|
| Sign Flipping | 23% detection | 94.5% detection | +71.5 pp |
| Label Flipping | 15% detection | 89.2% detection | +74.2 pp |
| Backdoor Injection | <10% detection | 76.8% detection | +66.8 pp |
| Model Poisoning | 18% detection | 91.3% detection | +73.3 pp |

**Key metrics:**
- Combined attack detection rate: **94.5%**
- False positive rate: **3.2%**
- Clean data accuracy degradation: **<0.2%**
- Signature verification time: **<5ms per update**
- Reputation convergence: **~10 rounds for stable scoring**

## Design Decisions

**Why ECDSA over HMAC?** ECDSA provides non-repudiation — the server can prove a specific client sent a specific update. HMAC only proves the update was authenticated, not who sent it.

**Why multi-factor anomaly detection?** No single statistical test catches all attack types. Magnitude analysis misses sign flipping (same norm), direction analysis misses subtle backdoors (small divergence), and loss-based analysis misses model poisoning (loss may not change immediately). The combination covers the gaps.

**Why time-decay reputation?** A compromised client that was previously honest should lose trust quickly. Conversely, a quarantined client should be able to rebuild trust through verified behavior. Exponential decay naturally handles both cases.

## Honest Limitations

- **No privacy guarantees**: Signatures authenticate updates but don't hide their contents. Requires DP or secure aggregation for privacy.
- **Trusted server assumption**: Assumes the aggregation server is honest. Fully decentralized scenarios would need consensus mechanisms.
- **Adaptive attackers**: Patient attackers who slowly shift model behavior over many rounds can partially evade detection. The reputation system helps but isn't perfect.
- **Non-IID sensitivity**: Extremely heterogeneous data distributions across clients make anomaly detection thresholds harder to calibrate.

## Related Work

- [FL Security Ecosystem](/projects/fl-security-ecosystem) — the broader research ecosystem that motivated SignGuard
- [Blog: SignGuard Design Decisions](/blog/signguard-design) — deeper technical analysis of the architecture
- [Blog: Understanding Byzantine Attacks](/blog/understanding-byzantine-attacks) — the attack landscape SignGuard defends against
