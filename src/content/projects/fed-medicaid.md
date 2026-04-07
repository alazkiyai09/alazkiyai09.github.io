---
title: "Federated Healthcare Fraud Defense (SignGuard)"
status: "completed"
category: "federated-learning-security"
tags:
  - federated-learning
  - healthcare
  - security
  - fraud-detection
  - ecdsa
summary: "A secure federated learning framework that lets US states collaboratively train healthcare fraud detection models without sharing sensitive patient data."
simpleSummary: "A complete toolkit for secure AI collaboration across organizations - like letting banks train fraud detection together without sharing customer data, while protecting against hackers."
technologies:
  - Python
  - PyTorch
  - Cryptography
metrics:
  recordsProcessed: "227M+"
  jurisdictions: 54
startDate: "2026-01-01"
completedDate: "2026-03-01"
repository: "https://github.com/alazkiyai09/fed-medicaid"
---

## Overview

Machine learning is a critical tool for identifying anomalous provider behavior in national healthcare systems. However, centralizing highly sensitive claims data (like Medicare/Medicaid) poses severe compliance and privacy risks (HIPAA). **Federated Learning (FL)** offers a paradigm to collaboratively train fraud detection models across decentralized institutional silos (US states) without transferring raw patient histories.

However, vanilla FL is vulnerable to **Byzantine failures** and **data poisoning** via Sybil networks. This repository contains an implementation of **SignGuard**, a hybrid cryptographic defense mechanism evaluated against a large public healthcare dataset—227 million HHS Medicaid provider claims partitioned across 54 United States jurisdictions.

## 🔐 The SignGuard Architecture

SignGuard strictly decouples identity non-repudiation from gradient validation.

### 1. Cryptographic Identity (ECDSA NIST P-256)
All participants generate an Elliptic Curve key pair. The aggregation server drops any update failing verification, neutralizing network spoofing.

### 2. Statistical Validation & Reputation
Accepted identities have their parameter gradients mathematically audited:
* **L2 Norm Thresholding:** Reject structural explosions inherent to gradient ascent poisoning.
* **Cosine Alignment:** Angle determination against the historical global memory vector to detect coordinated subversion.
* **Reputation Ledger (EMA):** Rejections immediately decay trust exponentially, permanently isolating Sybil participants.

## 📊 Empirical Evaluation Matrix
- **Random Poisoning** (Sensory failures)
- **Model Poisoning** (Gradient Ascent / Targeted degradation)
- **Label Flipping** (Collusion data-poisoning)
- **Free Riding** (Compute theft)
- **Sybil Networks** (Coordinated identity spoofing)

SignGuard actively neutralizes these structural and Sybil manipulation injections while preserving AUPRC within **1.8%** of theoretically optimal centralized baselines.

## ⚙️ Evolution & Core Research

The real-world implementation applied to Medicaid stems from the core theoretical research on **ECDSA-Based Federated Learning Defense**. 

### The Underlying Security Proof
Federated Learning (FL) is vulnerable to Byzantine attacks where malicious clients submit poisoned model updates. Existing solutions (Krum, Multi-Krum) lack cryptographic verification of client identity. 

SignGuard introduces three core algorithmic components under the hood:
1. **Signature Generator**: Clients sign their model updates using ECDSA private keys (SECP256R1), ensuring client authentication and non-repudiation.
2. **Verification Engine**: The central aggregator verifies ECDSA signatures in ~1.2ms per client before performing any compute-heavy aggregation logic, instantly dropping unauthenticated packets.
3. **Reputation Manager**: Verified updates undergo statistical anomaly detection. Anomalous vectors immediately decay trust exponentially, permanently isolating Sybil participants over multiple rounds.
