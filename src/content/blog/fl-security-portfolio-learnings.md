---
title: "What I Learned Building a 30-Project FL Security Portfolio"
description: "Key insights from building a comprehensive federated learning security portfolio, from attack implementations to defense mechanisms."
date: "2026-02-10"
tags:
  - federated-learning
  - portfolio
  - security
  - career
published: true
author: "Azka"
readingTime: 8
---

Over the past year, I built a 30-project portfolio focused entirely on federated learning security. Here's what I learned—and what I wish I knew starting out.

## Why This Portfolio?

Working in Indonesian banking fraud detection for 3+ years gave me real-world ML deployment experience. But federated learning security remained largely theoretical—something I read about in papers but never touched.

I wanted to bridge that gap. Not just understand the concepts, but build them.

## The Structure

I organized the portfolio into phases:

1. **Days 1-5**: Fraud detection fundamentals
2. **Days 6-10**: Byzantine attack implementations
3. **Days 11-15**: Defense mechanisms
4. **Days 16-20**: Privacy-preserving techniques
5. **Days 21-25**: Real-world scenarios
6. **Days 26-30**: Advanced topics (ZKPs, MPC)

## Key Learnings

### 1. Start Simple, Add Complexity

My first attempt at implementing a backdoor attack was overly complex. I tried to do everything at once: sophisticated trigger pattern, adaptive learning rate, and poisoning scheduling.

It failed spectacularly.

**Lesson**: Implement the basic attack first. Make sure it works. Then add complexity incrementally.

### 2. Defenses Are Harder Than Attacks

Designing a robust aggregator defense took 3x longer than implementing the attacks it was meant to stop. Attacks can be brittle and still succeed. Defenses must handle edge cases or they fail completely.

### 3. Real Data Changes Everything

Synthetic datasets (like FEMNIST) are great for prototyping. But real financial transaction data has:

- Extreme class imbalance (99% legitimate, 1% fraud)
- Temporal drift (fraud patterns evolve)
- Client heterogeneity (different banks, different regions)

My synthetic-trained models broke on real data.

### 4. Documentation Saves Future You

Around Day 15, I couldn't remember why I made certain design decisions in Day 3 projects. I started adding decision logs to each project—why I chose FedAvg over FedProx, why Krum failed, etc.

This documentation became the backbone of this entire portfolio.

## Technical Insights

### Byzantine Robustness Is Fragile

Krum and its variants work well... until they don't. Specifically:

- They assume a bound on malicious clients (< 50%)
- They fail against adaptive attacks
- They don't scale well with client count

Multi-Krum with clustering was the most robust in my testing.

### Cryptographic Defenses Are Underutilized

Most FL security research focuses on algorithmic defenses (robust aggregation). But cryptographic approaches (signatures, ZKPs) offer stronger guarantees with less performance overhead.

This inspired my SignGuard project—combining ECDSA signatures with zero-knowledge proofs.

## Career Impact

Building this portfolio directly led to:

- Deeper understanding of my fraud detection work
- Conference presentation opportunities
- Collaborations with FL security researchers

More importantly, it gave me confidence to tackle complex distributed systems problems.

## What I'd Do Differently

1. **Start with a reference implementation**: Don't build from scratch. Clone Flower or FedML, modify it.

2. **Use version control properly**: I lost work early on by not branching properly for each experiment.

3. **Write tests first**: FL systems are nondeterministic. Tests catch regressions you'd otherwise miss.

4. **Join the community early**: The Flower Discord and FL research slack are invaluable resources.

## Resources That Helped

- **Papers**: "Machine Learning with Adversaries" by Blanchard et al., "SignGuard" (my own work)
- **Code**: Flower framework, PySyft
- **Community**: Federated Learning Discord, r/MachineLearning

## Conclusion

Building this portfolio was one of the most rewarding technical experiences of my career. It transformed abstract security concepts into concrete implementations and gave me a toolkit I use daily in fraud detection work.

If you're considering a similar deep-dive portfolio: start small, document everything, and don't be afraid to revisit and revise earlier work.

---

*This post summarizes insights from the 30 projects in this portfolio. Explore them in the [Projects section](/projects).*
