---
title: "IDX AI Trading System"
status: "completed"
category: "financial-ml"
tags:
  - algorithmic-trading
  - machine-learning
  - backtesting
  - sentiment-analysis
  - quantitative-finance
  - indonesia-stock-exchange
  - multi-agent-simulation
summary: "Full-stack AI trading platform for the Indonesia Stock Exchange — FastAPI backend, 13-page Streamlit dashboard, IMSS multi-agent market simulator, ML prediction pipelines, and research workspaces with Playwright E2E coverage."
technologies:
  - Python
  - FastAPI
  - Streamlit
  - TensorFlow
  - Keras
  - scikit-learn
  - SQLite
  - Pandas
  - TA-Lib
  - Playwright
metrics:
  dashboardPages: 13
  apiRouteGroups: 15
  simulatorAgents: "multi-agent"
  forecastHorizon: "7 days"
startDate: "2026-03-01"
completedDate: "2026-03-27"
repository: "https://github.com/alazkiyai09/idx-trading-system"
---

## Overview

IDX AI Trading System consolidates prior finance work from `financial_eng`, `quant-trading-id`, and `Predictive-Analytics-for-Indonesia-s-Economic-Forecasting` into a unified full-stack trading platform. Unlike the earlier ML-only experiments, this is a production-oriented system with a FastAPI backend, Streamlit dashboard with 12 feature pages, multi-agent market simulation (IMSS), and research workspaces — designed for daily IDX equity operations.

## Architecture

The system runs as a dual-service architecture: a FastAPI backend handling data, analysis, and ML inference, paired with a Streamlit multipage dashboard for interactive operations. Data persists in SQLite (`trading.db`, `imss.db`), with the IMSS simulator running as a self-contained package with background job lifecycle management.

```text
Daily Jobs + SQLite (trading.db, imss.db)
        |                      |
        v                      v
   FastAPI Route Layer   IMSS Simulation Engine
        |                      |
        +----------> Streamlit Dashboard <----------+
                         (12 pages)
```

## Dashboard (13 Pages)

The Streamlit dashboard provides a complete operator interface:

1. **Home** — system health, data freshness, operator overview
2. **Screener** — filter-driven stock screening and signal scan workflows
3. **Stock Detail** — chart, technical, sentiment, flow, and risk views per symbol
4. **Sentiment** — sentiment fetch, cleanup, and thematic analysis
5. **Virtual Trading** — paper-trading simulation sessions with order/replay controls
6. **Settings** — model operations, training readiness, artifact management
7. **Market Overview** — market breadth, leaders, and flow screener surfaces
8. **ML Prediction** — prediction, correlation, Monte Carlo, and technical overlays
9. **Backtesting** — async backtest launch, polling, and results visualization
10. **Research Presets** — promote accepted research candidates into durable presets
11. **Portfolio** — positions, trade history filters, and reconciliation analytics
12. **Market Enrichment** — market-to-sector-to-symbol enrichment workflow
13. **IMSS** — background simulation run launch, monitoring, logs, and summary inspection

## API Backend (15+ Route Groups)

The FastAPI backend exposes structured endpoints for:

- `/health` — system health, freshness, manual update hooks
- `/stocks` — symbols, snapshots, charts, foreign flow, broker datasets
- `/analysis`, `/fundamental` — technical, signal, risk, and LLM-assisted analysis
- `/signals` — scan and active signal feeds
- `/portfolio` — summary, positions, and trade history
- `/simulation` — paper-trading session lifecycle and metrics
- `/prediction` — training, artifact management, inference, correlation, Monte Carlo
- `/backtest` — synchronous runs and background backtest jobs
- `/market-enrichment` — foreign/domestic flows, industries, brokers, symbol diagnostics
- `/imss` — background IMSS run lifecycle (create, list, status, logs, summary)

## IMSS: Multi-Agent Market Simulator

The IDX Market Swarm Simulator (IMSS) is a self-contained multi-agent simulation package. It models market participant behavior through agent archetypes, runs background simulation jobs with lifecycle management APIs and WebSocket streams, and provides summary inspection and log analysis through the dashboard. This enables strategy stress-testing against simulated market dynamics beyond historical replay.

## ML Pipeline

Signal generation uses a BiLSTM + SVR + GradientBoosting ensemble with multi-seed variance reduction for short-horizon IDX equity prediction. The ensemble combines sequential pattern detection (BiLSTM via TensorFlow/Keras), support vector regression, and gradient boosting for robustness across market regimes. Backtesting implements walk-forward validation with Monte Carlo uncertainty quantification using volatility-adjusted features. Sentiment analysis integrates news and social media signals as exogenous features alongside technical indicators.

## Research Workspaces

Three automated research tools feed discoveries back into the main system:

- **autoscreener** — automated stock screening with configurable filters
- **automontecarlo** — Monte Carlo simulation batches for strategy validation
- **autoresearch** — systematic research pipeline with preset promotion flow

## Testing

Python unit/integration tests plus Playwright E2E coverage across dashboard pages.

## Historical Context

Earlier work included crypto forecasting (Bitcoin, XRP, ETH) and Indonesia macro-forecasting with 22+ economic indicators (R² = 0.933). Those experiments informed the consolidated architecture and evaluation strategy.
