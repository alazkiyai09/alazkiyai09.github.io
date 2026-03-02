---
title: "Fed-Medicaid: SignGuard"
status: "completed"
category: "federated-learning-security"
tags:
  - federated-learning
  - healthcare
  - security
  - fraud-detection
  - ecdsa
summary: "ECDSA-Based Byzantine Defense for Federated Healthcare Fraud Detection evaluated against 227 million real-world HHS Medicaid provider claims partitioned across 54 jurisdictions."
simpleSummary: "A secure federated learning framework that lets US states collaboratively train a healthcare fraud detection model without sharing sensitive patient data."
technologies:
  - Python
  - PyTorch
  - Cryptography
metrics:
  linesOfCode: 5000
  experimentsRun: 5
startDate: "2026-01-01"
completedDate: "2026-03-01"
repository: "https://github.com/alazkiyai09/fed-medicaid"
---

## Overview

Machine learning is a critical tool for identifying anomalous provider behavior in national healthcare systems. However, centralizing highly sensitive claims data (like Medicare/Medicaid) poses severe compliance and privacy risks (HIPAA). **Federated Learning (FL)** offers a paradigm to collaboratively train fraud detection models across decentralized institutional silos (US states) without transferring raw patient histories.

However, Vanilla FL is wildly vulnerable to **Byzantine failures** and **Data Poisoning** via Sybil networks. This repository contains the implementation of **SignGuard**, a hybrid cryptographic defense mechanism evaluated against the largest public healthcare dataset to date—227 million real-world HHS Medicaid provider claims partitioned across 54 United States jurisdictions.

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
The implementation includes automated execution wrappers validating the resilience against:
- **Random Poisoning** (Sensory failures)
- **Model Poisoning** (Gradient Ascent / Targeted degradation)
- **Label Flipping** (Collusion data-poisoning)
- **Free Riding** (Compute theft)
- **Sybil Networks** (Coordinated identity spoofing)

SignGuard actively neutralizes these structural and Sybil manipulation injections while preserving AUPRC within **1.8%** of theoretically optimal centralized baselines.
