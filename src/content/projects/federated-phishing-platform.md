---
title: "Federated Phishing Detection Platform"
status: "completed"
category: "federated-learning-security"
tags:
  - privacy-preserving-ml
  - federated-learning
  - cybersecurity
  - phishing-detection
  - homomorphic-encryption
  - zero-knowledge-proofs
  - adversarial-coevolution
  - transformers
summary: "Two-repo phishing detection platform: fedphish-platform for federated collaborative detection, and phishing-detection-engine for URL/domain/content-based ML classification."
technologies:
  - PyTorch
  - Flower (Flwr)
  - TenSEAL
  - PyCryptodome
  - FastAPI
  - React
  - gRPC
  - HuggingFace Transformers
  - XGBoost
  - LightGBM
  - SHAP
  - WebSocket
metrics:
  repos: 2
  implementations: 21
  linesOfCode: 50000
startDate: "2024-11-01"
completedDate: "2026-03-27"
repository: "https://github.com/alazkiyai09/fedphish-platform"
---

## Overview

The original `privacy-preserving-phishing-detection` monolith proved the research and product direction, but platform orchestration and detection model development needed different release velocity. The architecture is now split into two complementary repositories: one for federated coordination and collaborative operations, and one for model-centric phishing classification. This separation keeps the system easier to test, extend, and deploy while preserving the full privacy-preserving research scope.

## Module 1: FedPhish Platform (`fedphish-platform`)

Repository: [fedphish-platform](https://github.com/alazkiyai09/fedphish-platform)

`fedphish-platform` is the coordination layer for collaborative phishing defense. It manages multi-client federated rounds over Flower and gRPC, operational telemetry, and analyst-facing visibility via React/WebSocket monitoring. The platform is designed for enterprise threat intelligence workflows where organizations collaborate without sharing raw incident data. It handles orchestration concerns such as client participation, update flow, health state, and end-to-end experiment observability. Separating this module allows platform reliability and user workflows to improve without coupling every release to model-level changes in detection logic.

## Module 2: Phishing Detection Engine (`phishing-detection-engine`)

Repository: [phishing-detection-engine](https://github.com/alazkiyai09/phishing-detection-engine)

`phishing-detection-engine` implements a layered detection pipeline combining classical ML and deep learning. Feature extraction covers URL structure, domain WHOIS intelligence, email header analysis, and content-based NLP signals. The model stack includes:

- **Classical ensemble** — XGBoost and LightGBM for fast tabular classification
- **Transformer models** — HuggingFace-based fine-tuned models for content and URL understanding
- **Multi-agent explainability** — multiple specialized analysis agents produce narrative explanations of detection decisions, suitable for analyst review workflows
- **Ensemble scoring** — weighted combination across model families for robust detection

The engine exposes `POST /api/v1/analyze/url`, `POST /api/v1/analyze/email`, and `POST /api/v1/explain/{id}` endpoints for integration with the FedPhish platform or standalone deployment.

## Security Coevolution & Game Theory

`fedphish-platform` includes a red-team/blue-team coevolution simulator where attacker and defender models evolve iteratively against each other. The system supports:

- **Coevolution runs** — automated adversarial cycles where phishing attack strategies and detection models adapt in response to each other
- **Game theory analysis** — Nash equilibrium and strategy dominance computation for attack-defense interactions
- **Vertical FL workflows** — cross-organizational federated learning where participants hold different feature sets (e.g., URL features at one organization, email content features at another)
- **API-driven orchestration** — `POST /api/v1/security/coevolution/run`, `GET /api/v1/security/game-theory`, and `WS /ws/simulation` for real-time monitoring

This approach goes beyond static model evaluation to capture the dynamic arms-race between phishing evolution and detection adaptation.

## Privacy Techniques

The platform preserves the same privacy-first themes from earlier research: homomorphic encryption for protected computation, trusted execution patterns for sensitive operations, and zero-knowledge proof workflows for verifiable computation claims. These techniques ensure detection collaboration remains practical without exposing underlying sensitive data.

## Design Decision

The split follows a clear boundary: `fedphish-platform` handles federated coordination and operations, while `phishing-detection-engine` handles detection intelligence. This makes ownership clearer, reduces cross-cutting regression risk, and supports faster, safer iteration.
