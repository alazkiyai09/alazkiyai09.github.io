---
title: "Federated Learning Security Ecosystem"
status: "completed"
category: "federated-learning-security"
tags:
  - federated-learning
  - security
  - adversarial-ml
  - privacy-preserving
  - byzantine-robustness
  - differential-privacy
  - secure-aggregation
summary: "Three-repo federated learning security ecosystem: core FL algorithms (federated-learning-core), adversarial attack/defense toolkit (fl-adversarial-security), and privacy-preserving ML components (privacy-preserving-ml)."
technologies:
  - Python
  - PyTorch
  - Flower (Flwr)
  - PySyft
  - Opacus
  - TenSEAL
  - ZK-SNARKs
  - cryptography.io
  - FastAPI
  - scikit-learn
metrics:
  repos: 3
  attackTypes: 6
  defenseStrategies: 5
startDate: "2025-01-01"
completedDate: "2026-03-27"
repository: "https://github.com/alazkiyai09/federated-learning-core"
---

## Overview

The original `fl-security-research` repository validated the full research direction, but scaling experiments in one monolith slowed progress. The ecosystem now separates core protocols, adversarial testing, and privacy engineering into purpose-specific repositories. This split preserves the historical depth of the work, including 165,000+ lines of code across 31 implementations, while making future research easier to maintain and extend. Each module now has clearer objectives, cleaner dependency boundaries, and reproducible evaluation paths.

## Module 1: Federated Learning Core (`federated-learning-core`)

Repository: [federated-learning-core](https://github.com/alazkiyai09/federated-learning-core)

`federated-learning-core` contains the foundational FL algorithms and training mechanics used across the ecosystem. It includes implementations of FedAvg, FedProx, and FedAdam, non-IID partitioning strategies for realistic client heterogeneity, communication-efficient update compression, personalization techniques for client-specific adaptation, and DP-SGD integration for baseline privacy controls. Centralizing these primitives makes baselines repeatable and comparable across downstream security and privacy experiments. The repository acts as the shared protocol layer where training loops, aggregation hooks, and evaluation scaffolding remain stable while attack and defense modules iterate rapidly. This keeps core correctness and reproducibility separate from adversarial experimentation.

## Module 2: FL Adversarial Security (`fl-adversarial-security`)

Repository: [fl-adversarial-security](https://github.com/alazkiyai09/fl-adversarial-security)

`fl-adversarial-security` focuses on attacker behavior and defense robustness under realistic threat models. It includes poisoning attacks (label, model, and backdoor variants), inference attacks for privacy leakage evaluation, Byzantine disruption strategies, and defense pipelines spanning Krum-family methods, anomaly-based rejection, and secure aggregation hardening tests. The module is structured around benchmark repeatability, making attack-defense comparisons easier to track across model versions and data regimes. Decoupling this repository from baseline FL logic removed hidden coupling between threat simulations and protocol code, which improved experimental clarity. It now serves as the adversarial stress-testing layer for the ecosystem.

The module exposes API surfaces for programmatic security testing: `POST /api/v1/attacks/simulate` for attack execution, `POST /api/v1/defenses/evaluate` for defense benchmarking, `POST /api/v1/benchmark/run` for end-to-end benchmark orchestration, and `POST /api/v1/predict` for model inference under adversarial conditions. These enable automated security validation in CI pipelines.

## Module 3: Privacy-Preserving ML (`privacy-preserving-ml`)

Repository: [privacy-preserving-ml](https://github.com/alazkiyai09/privacy-preserving-ml)

`privacy-preserving-ml` implements five major privacy primitives beyond basic differential privacy:

- **Homomorphic Encryption (CKKS/BFV)** — encrypted inference and training using lattice-based schemes, supporting both approximate (CKKS) and exact (BFV) arithmetic on encrypted data
- **TEE Simulation** — trusted execution environment patterns with hybrid HE+TEE protocols that combine cryptographic and hardware-based protection
- **Zero-Knowledge Proofs** — ZK-SNARK verification flows for proving model update integrity without revealing the updates themselves
- **Commitment Schemes** — cryptographic commitment and verification protocols for federated round integrity
- **Encrypted GBDT** — gradient boosted decision tree training under homomorphic encryption, enabling tree-based models on sensitive data without decryption

Each primitive has runnable experiment scripts (`run_he_benchmark.py`, `run_tee_benchmark.py`, `run_hybrid_benchmark.py`, `run_zkp_verification.py`, `run_commitment_fl.py`, `run_encrypted_gbdt.py`) and deployment-oriented module boundaries. By separating privacy engineering from attack benchmarking, utility-privacy tradeoffs and operational overhead can be evaluated in controlled settings without confounding adversarial variables.

## Relationship to SignGuard

[SignGuard](/projects/signguard) is the flagship cryptographic defense that emerged from this broader research program. The ecosystem split makes that lineage clearer: core training in `federated-learning-core`, adversarial pressure-testing in `fl-adversarial-security`, and privacy mechanisms in `privacy-preserving-ml`.

## Design Decision

The move from monolith to ecosystem enables independent experimentation, focused CI/testing, and clearer contribution boundaries. Core algorithm work, threat simulation, and privacy engineering can now evolve at their natural pace without destabilizing each other.
