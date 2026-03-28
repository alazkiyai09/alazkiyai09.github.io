---
title: "Federated Phishing Detection Portfolio"
status: "completed"
category: "federated-learning-security"
tags:
  - privacy-preserving-ml
  - federated-learning
  - zero-knowledge-proofs
  - homomorphic-encryption
  - cybersecurity
summary: "A comprehensive 21-project portfolio demonstrating advanced privacy-preserving machine learning applied to phishing detection, including Homomorphic Encryption, TEEs, and Zero-Knowledge Proofs."
technologies:
  - PyTorch
  - Flower (Flwr)
  - TenSEAL
  - PyCryptodome
  - FastAPI
  - circom/py-snark
metrics:
  implementations: 21
  linesOfCode: 50000
  testCoverage: 530
startDate: "2024-11-01"
completedDate: "2024-12-15"
repository: "https://github.com/alazkiyai09/privacy-preserving-phishing-detection"
---

## Overview

Applying machine learning to cybersecurity operations (like phishing detection) traditionally requires organizations to centralize highly sensitive incident data. This creates an unacceptable privacy risk and violates modern data protection regulations. 

The **Federated Phishing Detection Portfolio** is an educational and research suite demonstrating how to build robust threat intelligence models collaboratively without ever sharing raw data. Over 21 distinct implementations, it explores the bleeding edge of Privacy-Preserving Machine Learning (PPML).

## Key Research Themes

### 1. Privacy-Preserving Machine Learning (PPML)
- **Homomorphic Encryption (HE)**: Implemented CKKS/BFV schemes using TenSEAL to perform ML inference directly on encrypted data. The server never sees the actual feature vectors or predictions in plaintext.
- **Trusted Execution Environments (TEE)**: Simulated Intel SGX secure enclaves using PyCryptodome for hardware-level isolation during model execution.
- **Hybrid HT2ML**: Developed a novel hybrid protocol combining Homomorphic Encryption with TEEs to balance cryptographic security with execution performance.

### 2. Verifiable Federated Learning
When participants are untrusted, how do we know their model updates are legitimate?
- **Zero-Knowledge Proofs**: Leveraged `circom` and `py-snark` to generate ZK-SNARKs. Clients can mathematically prove their model update is valid and correctly computed over authorized data *without revealing the data itself*.
- **Commitment Schemes**: Implemented Pedersen commitments using `petlib` for secure, verifiable aggregation.

### 3. Adversarial Robustness
- Built Byzantine-resilient aggregation functions (Krum, Multi-Krum) specifically tuned to reject poisoned model updates in verifiable phishing FL settings.
- Conducted co-evolutionary attack/defense simulations using CleverHans to stress-test the global model against adaptive adversaries.

### 4. Cross-Bank Collaboration
- Implemented Vertical Federated Learning (VFL) with Private Set Intersection (PSI) using ECDH, demonstrating how competing financial institutions can train joint phishing detectors on non-overlapping feature spaces without exposing customer overlaps.

## Technical Architecture Highlights

The portfolio progresses systematically across 5 phases:

1. **Foundations**: 70-feature extraction pipelines, DistilBERT fine-tuning via LoRA, and unified ensemble FastAPI services.
2. **Privacy Techniques**: Deep dives into HE, TEE, and hybrid encryptions.
3. **Verifiable Learning**: Complex cryptography for ZKP model verification.
4. **Federated Classifiers**: GBDT on encrypted data and human-aligned Explainable AI (SHAP/LIME) for security analysts.
5. **Capstone**: Production-ready `FedPhish` system utilizing Flower over gRPC, with React/WebSocket monitoring dashboards and comprehensive automated benchmarking.

## Security Engineering Practices

Beyond the research concepts, the codebase enforces strict production ML security standards:
- Elimination of unsafe `pickle` serialization in favor of verified `numpy/json` payloads.
- Forced `weights_only=True` for all PyTorch deserializations.
- Centralized validation utilities and JSON-structured security alerting.

## Impact

This suite serves as a bridge between theoretical cryptography papers and practical ML security engineering. It demonstrates that the tradeoff between operational security intelligence and data privacy is no longer a hard constraint—we can achieve both using modern PPML techniques.

*For the complete code, documentation, and benchmark results, see the [GitHub Repository](https://github.com/alazkiyai09/privacy-preserving-phishing-detection).*
