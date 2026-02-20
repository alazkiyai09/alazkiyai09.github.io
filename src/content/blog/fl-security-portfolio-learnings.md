---
title: "Building a Research Portfolio in Federated Learning Security"
description: "Key insights from developing a comprehensive 30-project body of work on federated learning security—from foundational implementations to advanced cryptographic defenses."
date: "2026-02-10"
tags:
  - federated-learning
  - research
  - security
  - career
published: true
author: "Azka"
readingTime: 10
---

Over the past year, I developed a 30-project research portfolio focused entirely on federated learning security. This wasn't a bootcamp or a challenge—it was a deliberate deep-dive into understanding how distributed ML systems fail and how to defend them.

Here's what I learned from building this body of work.

## The Motivation

After 3+ years in Indonesian banking fraud detection, I had production ML experience. But federated learning security remained theoretical—something I read about in papers but never implemented.

The gap bothered me. Papers describe attacks and defenses in abstract terms: "Krum achieves Byzantine resilience by selecting the update with minimum distance to its neighbors." But what does that actually look like in code? How does it fail? When does it work?

I wanted to bridge theory and practice—not just understand the concepts, but build working implementations I could examine, break, and improve.

## Research Structure

I organized the portfolio into thematic areas rather than a linear progression:

### Foundation: Fraud Detection & FL Basics
The starting point was implementing standard federated learning on realistic fraud detection data. This established baselines for accuracy, communication overhead, and client heterogeneity.

Key projects included:
- Baseline FL with FedAvg on credit card fraud data
- Client heterogeneity analysis (different banks, different distributions)
- Communication efficiency benchmarks

### Attacks: Understanding the Threat Landscape
Before defending, I needed to understand attacks. I implemented the major attack categories:

- **Data poisoning**: Label flipping, dirty label attacks
- **Model poisoning**: Sign flipping, scaling attacks, Gaussian noise
- **Backdoors**: Trigger-based, semantic, and adaptive backdoors
- **Gradient leakage**: Reconstruction attacks on batch data

Each attack was tested against standard FedAvg to establish vulnerability baselines.

### Defenses: Algorithmic Approaches
The defense implementations focused on robust aggregation:

- Krum and Multi-Krum variants
- Trimmed mean and coordinate-wise median
- Clustering-based outlier detection
- Reputation-weighted aggregation

This is where I discovered that most algorithmic defenses share a critical weakness: they're brittle to adaptive attacks.

### Privacy: Differential Privacy & Secure Aggregation
Beyond robustness, FL requires privacy:

- Differential privacy (DP-SGD, local DP)
- Secure aggregation protocols
- Homomorphic encryption experiments
- Privacy-utility trade-off analysis

### Cryptography: The SignGuard Direction
The final research arc explored cryptographic defenses:

- ECDSA signature verification for update integrity
- Zero-knowledge proof constraints on update quality
- Threshold signatures for multi-party verification

This became the foundation for SignGuard—my most significant contribution from this research.

## Technical Insights

### Byzantine Robustness Is Fragile

Krum and its variants work well in controlled settings. But they make assumptions that don't hold in production:

| Assumption | Reality |
|------------|---------|
| Malicious clients < 50% | No guarantee in open FL |
| Attacks are random | Adaptive attacks target defenses |
| Static threat model | Attackers evolve |

Multi-Krum with reputation weighting performed best in my tests, but still failed against sophisticated adaptive attacks.

### Algorithmic vs. Cryptographic Defenses

Most FL security research focuses on algorithmic defenses—statistical methods to detect outliers. But I found cryptographic approaches offer stronger guarantees:

**Algorithmic defenses** (Krum, clustering):
- Probabilistic detection
- Adaptive attacks bypass them
- No accountability

**Cryptographic defenses** (signatures, ZKPs):
- Deterministic verification
- Resistant to manipulation
- Full audit trail

This insight shifted my research direction toward SignGuard.

### Real Data Exposes Hidden Assumptions

Synthetic benchmarks (FEMNIST, Shakespeare) are useful for prototyping. But real financial transaction data revealed issues I never saw in simulations:

- **Extreme imbalance**: 0.1% fraud rate means 1000:1 class imbalance
- **Temporal drift**: Fraud patterns shift weekly, not just monthly
- **Geographic heterogeneity**: Jakarta fraud ≠ Bali fraud ≠ Papua fraud
- **Missing data**: Real transactions have gaps, errors, delays

Models trained on clean synthetic data broke on real data.

## Research Methodology Lessons

### 1. Start with Reference Implementations

Don't build from scratch. Clone Flower, FedML, or PySyft. Modify them. Building infrastructure from scratch wastes time you could spend on research questions.

### 2. Establish Baselines First

Before testing defenses, measure attack success rates on undefended systems. Without baselines, you can't quantify improvement.

### 3. Document Decisions Immediately

Around project 15, I couldn't remember why I chose certain parameters in project 3. I started keeping decision logs: why FedAvg over FedProx, why Krum failed in this specific test, etc.

These logs became more valuable than the code itself.

### 4. Test Against Adaptive Adversaries

Static attack tests are insufficient. Implement attacks that know your defense and try to bypass it. This is where most algorithmic defenses fail.

## Career Impact

This portfolio transformed my technical trajectory:

**Before**: Fraud detection practitioner using ML as a tool
**After**: ML security researcher contributing to the field

Concrete outcomes:
- Conference presentations on FL security
- Collaborations with academic researchers
- SignGuard as a novel contribution with measurable results
- Deeper understanding of my fraud detection work through the security lens

## What I'd Do Differently

**Earlier community engagement**: I should have joined the Flower Discord and FL research communities sooner. Feedback accelerates learning.

**More rigorous evaluation**: Early projects lacked proper statistical testing. Confidence intervals matter.

**Open-source from the start**: I kept code private initially. Sharing earlier would have attracted collaborators.

**Focus over breadth**: 30 projects is too many. A focused 10-project deep dive would have been more impactful.

## Resources for Similar Research

**Foundational Papers**:
- McMahan et al. "Communication-Efficient Learning of Deep Networks from Decentralized Data" (2017) - FedAvg
- Blanchard et al. "Machine Learning with Adversaries: Byzantine Tolerant Gradient Descent" (2017) - Krum
- Bonawitz et al. "Practical Secure Aggregation for Privacy-Preserving Machine Learning" (2017)

**Frameworks**:
- [Flower](https://flower.dev/) - Best documentation, active community
- [FedML](https://fedml.ai/) - More research-oriented
- [PySyft](https://github.com/OpenMined/PySyft) - Privacy-focused

**Communities**:
- Flower Discord - Practical implementation help
- Federated Learning Slack - Academic discussions
- r/MachineLearning - Broader ML community

## Conclusion

Building this research portfolio was the most valuable technical investment I've made. It transformed abstract security concepts into concrete implementations—and gave me a toolkit I use daily in fraud detection work.

The key insight: **research portfolios aren't about quantity. They're about depth, coherence, and contribution.**

If you're considering similar deep-dive research: start with clear questions, build on existing frameworks, and document everything. The portfolio will emerge naturally from genuine curiosity.

---

*This post summarizes insights from my [FL Security Research portfolio](/projects). The code is open-source and documented with decision logs for each project.*
