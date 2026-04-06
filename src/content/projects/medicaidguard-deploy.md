---
title: "MedicaidGuard Deploy"
status: "completed"
category: "healthcare"
tags:
  - healthcare
  - fraud-detection
  - fastapi
  - streamlit
  - cloud-run
summary: "Production-style Medicaid fraud inference stack with Cloud Run API + dashboard deployment, batch scoring, and model health telemetry."
technologies:
  - Python
  - FastAPI
  - XGBoost
  - Streamlit
  - Cloud Run
metrics:
  cloudRunServices: 2
  apiEndpoints: 4
  p0Checks: "10/10"
  auprc: "0.8379"
startDate: "2026-03-28"
completedDate: "2026-04-05"
repository: "https://github.com/alazkiyai09/medicaidguard-deploy"
demo: "https://medicaidguard-demo-5tphgb6fsa-as.a.run.app"
---

## Overview

MedicaidGuard Deploy packages healthcare fraud modeling into a deployable FastAPI service and Streamlit analyst interface. It is designed for practical Cloud Run operations, including model health checks, inference metrics, and batch throughput controls.

## Live Deployment

- UI: https://medicaidguard-demo-5tphgb6fsa-as.a.run.app
- API docs: https://medicaidguard-api-5tphgb6fsa-as.a.run.app/docs
- Latest ready revisions:
  - `medicaidguard-demo-00002-f47`
  - `medicaidguard-api-00004-5lz`
- Traffic split: 100% on latest revisions

## API Surface

- `POST /predict` for single-claim fraud risk scoring
- `POST /predict/batch` for bulk scoring
- `GET /health` for model/runtime health
- `GET /metrics` for aggregated inference telemetry

## Validation Snapshot

Phase 3 automated checks validated all core MedicaidGuard demo scenarios (`10/10`), including:

- normal/suspicious/high-risk examples,
- batch run behavior,
- risk factor visualization,
- model tab consistency (AUPRC `0.8379`),
- inference time target checks (`<100ms` scenarios).

## GitHub Status

- Repository: [medicaidguard-deploy](https://github.com/alazkiyai09/medicaidguard-deploy)
- Latest `main` commit verified on April 5, 2026: `f51b4e0`
