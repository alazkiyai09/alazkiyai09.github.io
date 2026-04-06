---
title: "Fraud LLM Finetune"
status: "completed"
category: "production-ai"
tags:
  - llm
  - qlora
  - fraud-detection
  - transformers
  - gradio
summary: "QLoRA fine-tuning pipeline for 3-class fraud narrative classification with a live Cloud Run interactive demo."
technologies:
  - Python
  - Transformers
  - QLoRA
  - Gradio
  - FastAPI
metrics:
  cloudRunServices: 1
  classes: 3
  p0Checks: "6/6"
  latestRevision: "00003"
startDate: "2026-03-28"
completedDate: "2026-04-05"
repository: "https://github.com/alazkiyai09/fraud-llm-finetune"
demo: "https://fraud-llm-demo-5tphgb6fsa-as.a.run.app"
---

## Overview

Fraud LLM Finetune is an end-to-end narrative classification stack for fraud text analysis. It covers data preparation, QLoRA training, evaluation, adapter merge, and deployment to an interactive classifier UI.

Target classes:

- `LEGITIMATE`
- `SUSPICIOUS`
- `FRAUDULENT`

## Live Deployment

- UI: https://fraud-llm-demo-5tphgb6fsa-as.a.run.app
- Latest ready revision: `fraud-llm-demo-00003-7kf`
- Traffic split: 100% on latest revision

This project currently exposes a public demo UI and does not publish a separate public API service endpoint.

## Pipeline Scope

- Dataset preparation and JSONL formatting
- QLoRA training scripts (real and smoke configurations)
- Evaluation output (accuracy/F1/latency)
- Adapter merge/export flow
- FastAPI + Gradio inference app packaging

## Validation Snapshot

Phase 3 automated checks passed `6/6` model behavior scenarios:

- expected classification outcomes for seeded examples,
- reasoning-rich responses,
- custom input classification flow.

## GitHub Status

- Repository: [fraud-llm-finetune](https://github.com/alazkiyai09/fraud-llm-finetune)
- Latest `main` commit verified on April 5, 2026: `9601c39`
