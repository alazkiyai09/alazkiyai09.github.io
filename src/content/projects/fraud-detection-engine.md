---
title: "Fraud ML Engine"
status: "completed"
category: "fraud-detection"
tags:
  - fraud-detection
  - machine-learning
  - anomaly-detection
  - risk-scoring
  - explainability
  - real-time
summary: "End-to-end fraud detection ML system combining feature engineering pipelines, multi-family model benchmarking (XGBoost, LightGBM, deep learning, anomaly detection), SHAP/LIME explainability, and production real-time scoring API."
technologies:
  - Python
  - FastAPI
  - XGBoost
  - LightGBM
  - PyTorch
  - SHAP
  - LIME
  - scikit-learn
metrics:
  modelFamilies: 4
  scoringLatency: "<50ms"
startDate: "2026-03-01"
completedDate: "2026-03-27"
repository: "https://github.com/alazkiyai09/fraud-ml-engine"
---

## Overview

Fraud ML Engine is a standalone system focused on transaction-side fraud detection and scoring. It distills production lessons from 3+ years of fraud operations at ITSEC Asia and BRI into an implementation that balances model performance, operational reliability, and analyst explainability.

## Feature Engineering

The feature layer captures transaction risk signals, velocity features across time windows, merchant and device behavioral indicators, and account-level anomaly context. The pipeline is designed for low-latency transformation so inference remains suitable for real-time authorization workflows.

## Model Zoo

The engine benchmarks four model families in one framework:

- Gradient boosting (XGBoost, LightGBM) for strong tabular baselines
- Deep sequence models (LSTM autoencoder variants) for temporal anomaly cues
- Classical anomaly models (Isolation Forest) for unsupervised risk discovery
- Hybrid scoring ensembles for robustness across shifting fraud patterns

## Explainability

SHAP and LIME are integrated for analyst-facing decision support. Each score can be decomposed into feature-level contributions, enabling compliance reporting, investigation triage, and faster feedback loops between fraud analysts and model owners.

## API

The system exposes FastAPI endpoints for real-time scoring and health/status monitoring. The serving layer is tuned for sub-50ms scoring paths under typical production payload sizes.

## Relationship

This project complements [Fraudware Analyzer](/projects/malware-analyzer): Fraud ML Engine covers transaction-side fraud scoring, while Fraudware Analyzer focuses on malware-side threat analysis and static reverse-engineering workflows.
