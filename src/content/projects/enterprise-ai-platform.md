---
title: "Enterprise AI Platform"
status: "completed"
category: "production-ai"
tags:
  - llm
  - rag
  - langgraph
  - llmops
  - agents
  - infrastructure
  - multi-agent
  - kubernetes
  - observability
summary: "Modular enterprise AI platform comprising three focused systems: multi-agent orchestration (enterprise-agents), production infrastructure (enterprise-ai-infra), and hybrid RAG retrieval (enterprise-rag)."
technologies:
  - FastAPI
  - LangChain
  - LangGraph
  - LlamaIndex
  - ChromaDB
  - Qdrant
  - Docker
  - Kubernetes
  - PostgreSQL
  - Redis
  - Celery
  - Prometheus
  - Grafana
  - Pydantic
metrics:
  modules: 3
  agentTypes: 4
  ragModes: 4
startDate: "2025-03-01"
completedDate: "2026-03-27"
repository: "https://github.com/alazkiyai09/enterprise-agents"
---

## Overview

The original `enterprise-ai-systems` repository proved the architecture and shipped working production patterns, but it became too broad for fast iteration. Agent orchestration, infrastructure operations, and retrieval systems evolved at different speeds and needed different release cadences. Splitting into focused repositories made ownership clearer, reduced cross-module coupling, and made testing practical. The result is a modular enterprise platform where each subsystem can scale independently while still composing into one deployment story for real business workloads.

## Module 1: Enterprise Agents (`enterprise-agents`)

Repository: [enterprise-agents](https://github.com/alazkiyai09/enterprise-agents)

This module concentrates application-layer intelligence into purpose-built multi-agent workflows. It includes a Support Agent for operational triage, a Fraud Triage Agent for risk-prioritized alert handling, an Ad Insights Agent for campaign diagnosis, and an LLMOps Evaluation agent pipeline for quality checks before rollout. Splitting this layer out removed infrastructure noise from agent development and made prompt, tool-calling, and memory behavior easier to benchmark. The module is built for fast experimentation with explicit graph-based state transitions, deterministic fallback paths, and measurable handoffs between specialist agents. It now serves as the decision and orchestration plane while upstream retrieval and downstream platform services remain independently deployable.

The module exposes a unified API surface: `POST /api/v1/agents/support/chat` and ticket management for support workflows, `POST /api/v1/agents/fraud/alerts` for fraud triage, `POST /api/v1/agents/insights/analyze` for ad campaign analysis, and `POST /api/v1/eval/run` with `GET /api/v1/eval/metrics` for LLMOps quality evaluation.

## Module 2: Enterprise AI Infrastructure (`enterprise-ai-infra`)

Repository: [enterprise-ai-infra](https://github.com/alazkiyai09/enterprise-ai-infra)

This module owns the operational backbone: ingestion, reliability, deployment, and safety enforcement. Key capabilities:

- **Guardrails suite** — five specialized safety scanners: prompt injection detection (`POST /api/v1/guard/prompt-injection`), jailbreak detection (`POST /api/v1/guard/jailbreak`), PII scanning (`POST /api/v1/guard/pii`), encoding attack detection (`POST /api/v1/guard/encoding`), and output validation (`POST /api/v1/guard/output`). A unified scan endpoint (`POST /api/v1/guard/scan`) runs all checks in one call.
- **Pipeline orchestration** — stream and batch ingestion pathways with worker-based processing, Redis/Celery task queues, and embedding pipelines
- **Kubernetes deployment** — production manifests for services, autoscaling policies, health probes, and service boundaries
- **Observability** — Prometheus metrics export, health endpoints, and incident response primitives

Decoupling infrastructure from agent and RAG code means queue behavior, cache utilization, retry strategy, and guardrail policies can be tuned without touching business prompts or retrieval chains.

## Module 3: Enterprise RAG (`enterprise-rag`)

Repository: [enterprise-rag](https://github.com/alazkiyai09/enterprise-rag)

This module packages retrieval and grounding as a dedicated capability:

- **Four retrieval modes** — hybrid sparse+dense with reranking, multimodal image/text retrieval, SQL question-answering for data-backed responses, and domain-specific routing for fraud/AML/KYC knowledge
- **Ingestion pipelines** — document, image, table, and deduplication processors that normalize diverse source formats into retrievable chunks
- **Evaluation layer** — RAG quality metrics, retrieval relevance scoring, and citation accuracy measurement via `POST /api/v1/rag/evaluation/run`
- **Caching** — response and embedding caches for latency reduction on repeated queries
- **API surface** — `POST /api/v1/rag/query` for retrieval, `POST /api/v1/rag/documents/ingest` for ingestion, `GET /api/v1/rag/documents` for inventory, `DELETE /api/v1/rag/documents/{document_id}` for lifecycle management

Isolating RAG into its own repo improved evaluation clarity: retrieval quality, reranking performance, and citation reliability can be measured without confounding orchestration changes.

## Architecture

The three modules form a layered system:

1. `enterprise-ai-infra` handles ingestion, runtime controls, deployment, and telemetry.
2. `enterprise-rag` provides grounded context through domain-aware retrieval pipelines.
3. `enterprise-agents` orchestrates specialized workflows that consume retrieved context and execute business actions.

This separation allows independent scaling for inference-heavy retrieval, workflow-heavy agents, and throughput-heavy infrastructure.

## Technology Stack

Core stack includes FastAPI, LangChain, LangGraph, LlamaIndex, ChromaDB, Qdrant, PostgreSQL, Redis, Docker, Kubernetes, Prometheus, and Grafana.

## Design Decision

The modular architecture replaces monolithic coupling with clear contracts. Each repo now has focused test suites, independent release cycles, and ownership boundaries that map directly to operational responsibilities. This improves velocity, reliability, and long-term maintainability without losing end-to-end integration.
