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
summary: "AI-assisted trading system for the Indonesia Stock Exchange (IDX) combining signal generation, backtesting engines, sentiment analysis, and portfolio simulation with LSTM/SVR ensembles."
technologies:
  - Python
  - PyTorch
  - scikit-learn
  - PostgreSQL
  - Pandas
  - TA-Lib
  - GARCH
  - Monte Carlo
metrics:
  forecastHorizon: "7 days"
  ensembleModels: 3
startDate: "2026-03-01"
completedDate: "2026-03-27"
repository: "https://github.com/alazkiyai09/idx-trading-system"
---

## Overview

IDX AI Trading System consolidates prior finance work from `financial_eng`, `quant-trading-id`, and `Predictive-Analytics-for-Indonesia-s-Economic-Forecasting` into one production-oriented platform. The goal is a single system that unifies forecasting, strategy evaluation, and portfolio simulation for Indonesian equities.

## Signal Generation

The prediction layer uses LSTM/SVR ensemble pipelines to generate short-horizon signals for IDX instruments. Multiple model seeds and feature sets are combined to reduce variance and improve stability under regime shifts.

## Backtesting

Backtesting uses walk-forward validation rather than static train/test splits to better reflect live trading constraints. GARCH-based Monte Carlo simulation is used to model volatility-aware uncertainty and stress-test strategy behavior across varying market conditions.

## Sentiment Analysis

The system integrates news and social sentiment signals as exogenous features, enabling the model to respond to narrative-driven price movements alongside technical and statistical indicators.

## Portfolio Simulation

Portfolio simulation includes risk-aware position sizing, drawdown constraints, and scenario-based allocation checks. This keeps output aligned with practical portfolio management instead of point-forecast accuracy alone.

## Historical Context

Earlier work included crypto forecasting (Bitcoin, XRP, ETH) and Indonesia macro-forecasting with 22+ indicators (R2 = 0.933). Those experiments directly informed this consolidated architecture and evaluation strategy.
