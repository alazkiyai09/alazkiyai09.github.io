---
title: "FraudShield RAG"
status: "completed"
category: "production-ai"
tags:
  - fraud-detection
  - rag
  - llm
  - fastapi
  - streamlit
summary: "Retrieval-augmented fraud investigation system with live API and UI deployment on Cloud Run, grounded responses, and source citations."
technologies:
  - Python
  - FastAPI
  - LangChain
  - Qdrant
  - Streamlit
  - Docker
metrics:
  cloudRunServices: 2
  apiEndpoints: 3
  retrievalStages: 2
  p0Checks: "8/8"
startDate: "2026-03-28"
completedDate: "2026-04-05"
repository: "https://github.com/alazkiyai09/fraudshield-rag"
demo: "https://fraudshield-demo-5tphgb6fsa-as.a.run.app"
---

## Overview

FraudShield RAG is a document-grounded assistant for fraud investigations. It ingests fraud documents (PDF/CSV/text), builds vector embeddings in Qdrant, and answers analyst questions with cited evidence.

## Live Deployment

- UI: https://fraudshield-demo-5tphgb6fsa-as.a.run.app
- API docs: https://fraudshield-api-5tphgb6fsa-as.a.run.app/docs
- Latest ready revisions:
  - `fraudshield-demo-00001-5jq`
  - `fraudshield-api-00013-fz7`
- Traffic split: 100% on latest revisions

## API Surface

- `POST /ingest` for file ingestion and chunking
- `POST /query` for retrieval + generation
- `GET /health` for service readiness and vector backend checks

## Retrieval Pipeline

The service uses a two-stage retrieval strategy:

1. Dense vector recall (`top_k`) from Qdrant.
2. Cross-encoder rerank for higher precision before final LLM response generation.

Default chunking is configured at `512` with `50` overlap to balance context quality and retrieval speed.

## GitHub Status

- Repository: [fraudshield-rag](https://github.com/alazkiyai09/fraudshield-rag)
- Latest `main` commit verified on April 5, 2026: `68a04cd`
