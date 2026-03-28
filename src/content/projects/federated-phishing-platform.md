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
summary: "Two-repo phishing detection platform: fedphish-platform for federated collaborative detection, and phishing-detection-engine for URL/domain/content-based ML classification."
technologies:
  - PyTorch
  - Flower (Flwr)
  - TenSEAL
  - PyCryptodome
  - FastAPI
  - React
  - gRPC
  - NLP
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

`phishing-detection-engine` focuses on detection quality and classification pipelines. It implements URL feature analysis, domain intelligence enrichment, and content-based ML/NLP classification for phishing signals. This module centralizes feature extraction, model training and inference behavior, and scoring workflows that can be reused across both federated and standalone deployments. Splitting the engine from orchestration makes the model stack easier to benchmark and evolve while keeping interfaces stable for the platform layer.

## Privacy Techniques

The platform preserves the same privacy-first themes from earlier research: homomorphic encryption for protected computation, trusted execution patterns for sensitive operations, and zero-knowledge proof workflows for verifiable computation claims. These techniques ensure detection collaboration remains practical without exposing underlying sensitive data.

## Design Decision

The split follows a clear boundary: `fedphish-platform` handles federated coordination and operations, while `phishing-detection-engine` handles detection intelligence. This makes ownership clearer, reduces cross-cutting regression risk, and supports faster, safer iteration.
