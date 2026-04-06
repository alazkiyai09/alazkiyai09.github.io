---
title: "Fraud AI Portfolio (Launch Hub)"
status: "completed"
category: "production-ai"
tags:
  - portfolio
  - deployment
  - cloud-run
  - fraud-detection
  - github
summary: "Launch hub connecting 5 GitHub repositories to 7 live Cloud Run services, with deployment validation and service inventory tracking."
technologies:
  - GitHub
  - Cloud Run
  - FastAPI
  - Streamlit
  - Gradio
metrics:
  repositories: 5
  cloudRunServices: 7
  apiServices: 3
  uiServices: 4
  p0Checks: "40/40"
startDate: "2026-04-05"
completedDate: "2026-04-05"
repository: "https://github.com/alazkiyai09/fraud-ai-portfolio"
---

## Overview

This repository tracks launch readiness across the full fraud AI stack: source repos, live services, and verification artifacts.

## Live Service Inventory

| Service | Type | URL |
|---|---|---|
| fraudshield-api | API | https://fraudshield-api-5tphgb6fsa-as.a.run.app |
| medicaidguard-api | API | https://medicaidguard-api-5tphgb6fsa-as.a.run.app |
| fraud-monitor-api | API | https://fraud-monitor-api-5tphgb6fsa-as.a.run.app |
| fraudshield-demo | UI | https://fraudshield-demo-5tphgb6fsa-as.a.run.app |
| medicaidguard-demo | UI | https://medicaidguard-demo-5tphgb6fsa-as.a.run.app |
| fraud-monitor-demo | UI | https://fraud-monitor-demo-5tphgb6fsa-as.a.run.app |
| fraud-llm-demo | UI | https://fraud-llm-demo-5tphgb6fsa-as.a.run.app |

Current deployment state:

- Region: `asia-southeast1`
- 7/7 services route 100% traffic to latest ready revision
- Most recent rollout timestamp: April 6, 2026 (UTC)
- Latest API revisions:
  - `fraudshield-api-00013-fz7`
  - `medicaidguard-api-00004-5lz`
  - `fraud-monitor-api-00004-55b`
- Latest UI revisions:
  - `fraudshield-demo-00003-vtx`
  - `medicaidguard-demo-00004-wql`
  - `fraud-monitor-demo-00006-blb`
  - `fraud-llm-demo-00006-c55`

## GitHub Repository Map

| Repository | Purpose | Latest Verified Main Commit (Apr 5, 2026) |
|---|---|---|
| [fraudshield-rag](https://github.com/alazkiyai09/fraudshield-rag) | RAG investigation API + demo | `68a04cd` |
| [medicaidguard-deploy](https://github.com/alazkiyai09/medicaidguard-deploy) | Healthcare fraud API + demo | `f51b4e0` |
| [fraud-agent-monitor](https://github.com/alazkiyai09/fraud-agent-monitor) | Multi-agent monitor API + demo | `2e75f91` |
| [fraud-llm-finetune](https://github.com/alazkiyai09/fraud-llm-finetune) | QLoRA model + demo | `9601c39` |
| [fraud-ai-portfolio](https://github.com/alazkiyai09/fraud-ai-portfolio) | Launch and docs hub | `b0752c4` |

## Validation Evidence

Automated Phase 3 checks recorded:

- Total tests: 40
- Passed: 40
- Failed: 0

Reference artifact: `docs/phase3_p0_test_results.md` in the workspace launch docs.
