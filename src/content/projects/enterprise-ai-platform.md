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
  - Prometheus
  - Grafana
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

## Module 2: Enterprise AI Infrastructure (`enterprise-ai-infra`)

Repository: [enterprise-ai-infra](https://github.com/alazkiyai09/enterprise-ai-infra)

This module owns ingestion, reliability, deployment, and operational guardrails. It standardizes stream and batch ingestion pathways, enforces input/output controls for model safety, and provides observability primitives for tracing, metrics, and incident response. Kubernetes deployment manifests, service boundaries, health probes, and scaling policies live here so platform reliability can advance independently from application logic. Decoupling this layer from agent and RAG code made performance tuning more disciplined: queue behavior, cache utilization, and retry strategy can be tuned without touching business prompts or retrieval chains. The infrastructure module is where enterprise constraints become explicit: SLO-driven operations, secure service-to-service communication, and production runbooks for resilient AI delivery.

## Module 3: Enterprise RAG (`enterprise-rag`)

Repository: [enterprise-rag](https://github.com/alazkiyai09/enterprise-rag)

This module packages retrieval and grounding as a dedicated capability with four retrieval modes: hybrid retrieval, multimodal retrieval, SQL RAG, and domain-specific retrieval for fraud/AML/KYC workflows. Isolating RAG into its own repo improved evaluation clarity because retrieval quality, reranking performance, and citation reliability can be measured without confounding orchestration changes. It supports mixed vector-plus-keyword pipelines, table-aware querying, and domain adapter patterns so retrieval can be specialized by use case without duplicating platform code. The module also acts as the trust layer for downstream agents by constraining outputs to retrievable evidence. In practice, this yields faster iteration on ranking and context assembly while maintaining predictable interfaces for the agent and infrastructure modules.

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
