---
title: "Fraud Agent Monitor"
status: "completed"
category: "production-ai"
tags:
  - fraud-detection
  - agents
  - langgraph
  - fastapi
  - streamlit
summary: "LangGraph-based monitoring pipeline with 4 specialized fraud agents, deployed as API and dashboard services on Cloud Run."
technologies:
  - Python
  - LangGraph
  - FastAPI
  - Streamlit
  - Docker
metrics:
  cloudRunServices: 2
  agents: 4
  pipelineStages: 4
  p0Checks: "8/8"
startDate: "2026-03-28"
completedDate: "2026-04-05"
repository: "https://github.com/alazkiyai09/fraud-agent-monitor"
demo: "https://fraud-monitor-demo-5tphgb6fsa-as.a.run.app"
---

## Overview

Fraud Agent Monitor orchestrates four task-specific agents to score suspicious financial behavior and produce analyst-ready output:

1. Transaction Analyzer
2. Pattern Detector
3. Risk Scorer
4. Report Generator

## Live Deployment

- UI: https://fraud-monitor-demo-5tphgb6fsa-as.a.run.app
- API docs: https://fraud-monitor-api-5tphgb6fsa-as.a.run.app/docs
- Latest ready revisions:
  - `fraud-monitor-demo-00006-blb`
  - `fraud-monitor-api-00004-55b`
- Traffic split: 100% on latest revisions

## API Surface

- `POST /monitor` to execute the full multi-agent orchestration
- `POST /agents/{name}/invoke` to test an individual agent
- `GET /health` for graph and runtime checks

## Validation Snapshot

Phase 3 automated checks passed `8/8` monitor scenarios, including:

- suspicious wire execution with full trace,
- elevated risk scoring and typology detection,
- SAR report generation output,
- normal payment low-risk behavior.

## GitHub Status

- Repository: [fraud-agent-monitor](https://github.com/alazkiyai09/fraud-agent-monitor)
- Latest `main` commit verified on April 5, 2026: `2e75f91`
