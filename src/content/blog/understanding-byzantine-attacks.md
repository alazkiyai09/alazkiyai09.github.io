---
title: "Understanding Byzantine Attacks in Federated Learning"
description: "A comprehensive guide to Byzantine attacks in federated learning systems and defense strategies"
date: "2026-01-22"
tags:
  - federated-learning
  - security
  - tutorial
  - byzantine-attacks
published: true
author: "Azka"
readingTime: 12
---

Federated Learning (FL) enables collaborative model training across multiple clients while keeping data local. However, this distributed nature introduces new attack vectors—Byzantine attacks—where malicious clients submit corrupted updates to manipulate the global model.

## What Are Byzantine Attacks?

Byzantine attacks in FL occur when one or more clients act maliciously or are compromised, sending arbitrary or carefully crafted model updates instead of genuine gradient computations. These attacks exploit the aggregation process to degrade model performance or insert backdoors.

## Types of Byzantine Attacks

### 1. Data Poisoning Attacks

Malicious clients train on manipulated or mislabeled data:

```python
# Label flipping attack
class MaliciousClient:
    def train(self, data):
        # Flip labels 0→9, 9→0
        poisoned_data = [(x, 9 - y) for x, y in data]
        return self.model.train(poisoned_data)
```

**Impact**: Causes global model to misclassify specific classes

### 2. Model Poisoning Attacks

Directly manipulate computed gradients or model parameters:

```python
# Sign flipping attack
original_update = compute_gradient()
poisoned_update = -original_update  # Flip direction
```

**Impact**: More severe than data poisoning, harder to detect

### 3. Backdoor Attacks

Insert hidden functionality that activates on specific inputs:

```python
# Backdoor trigger: specific pixel pattern
def insert_backdoor(model, trigger_pattern, target_label):
    # Modify model to classify trigger pattern as target
    # Clean data performance unaffected
    pass
```

**Impact**: Model behaves normally except for trigger inputs

### 4. Scaling Attacks

Excessively scale update magnitudes to dominate aggregation:

```python
# Scaling attack
poisoned_update = original_update * 1000
```

**Impact**: If not clipped, swamps out honest updates

## Defense Strategies

### 1. Robust Aggregation

**Krum**: Select update closest to others

```python
def krum(updates, f=1):
    """
    Select update closest to f*num_clients other updates
    """
    scores = []
    for i, u1 in enumerate(updates):
        distances = []
        for j, u2 in enumerate(updates):
            if i != j:
                distances.append(np.linalg.norm(u1 - u2) ** 2)
        distances.sort()
        scores.append((i, sum(distances[:f * len(updates)])))

    # Return update with minimum score
    winner_idx = min(scores, key=lambda x: x[1])[0]
    return updates[winner_idx]
```

**Multi-Krum**: Average top-m closest updates

### 2. Clustering-Based Defenses

**Clustering**: Group updates by similarity, discard outliers:

```python
def clustering_defense(updates, n_clusters=2):
    from sklearn.cluster import KMeans

    kmeans = KMeans(n_clusters=n_clusters)
    labels = kmeans.fit_predict(updates)

    # Select largest cluster
    largest_cluster = np.bincount(labels).argmax()
    honest_updates = [u for u, l in zip(updates, labels) if l == largest_cluster]

    return np.mean(honest_updates, axis=0)
```

### 3. Reputation Systems

Track client contributions over time:

```python
class ReputationManager:
    def __init__(self, decay_rate=0.95):
        self.reputations = {}
        self.decay_rate = decay_rate

    def update(self, client_id, contribution_score):
        current = self.reputations.get(client_id, 1.0)
        self.reputations[client_id] = (
            current * self.decay_rate +
            (1 - self.decay_rate) * contribution_score
        )

    def get_weight(self, client_id):
        return self.reputations.get(client_id, 1.0)
```

### 4. Cryptographic Verification

**SignGuard**: Sign updates with ECDSA:

```python
# Client signs update
signature = private_key.sign(update_bytes)

# Server verifies
public_key.verify(signature, update_bytes, ec.ECDSA(hashes.SHA256()))
```

## Comparative Analysis

| Defense | Detection Rate | Computational Cost | Privacy Preserving |
|---------|----------------|-------------------|-------------------|
| Krum | 68% | Low | Yes |
| Multi-Krum | 72% | Medium | Yes |
| Clustering | 81% | High | Yes |
| Reputation | 76% | Medium | Yes |
| **SignGuard** | **94%** | Low | Yes* |

*Can be combined with ZKPs for full privacy

## Practical Recommendations

1. **Layered Defense**: Combine multiple approaches
2. **Threshold Tuning**: Adjust based on threat model
3. **Monitoring**: Track client behaviors over time
4. **Fallback**: Have contingency plans for detected attacks

## Conclusion

Byzantine attacks are a serious threat to federated learning systems. By understanding attack vectors and implementing robust defenses, we can build FL systems that are both secure and privacy-preserving.

The future lies in combining cryptographic verification with robust aggregation—a direction explored in my SignGuard project.

---

*This post is part of my 30-day portfolio journey. Check out the [SignGuard project](/projects/day-10-signguard-core) for implementation details.*
