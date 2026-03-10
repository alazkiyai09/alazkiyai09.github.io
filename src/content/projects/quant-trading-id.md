---
title: "Indonesian Stock Trading System"
status: "completed"
category: "production-ai"
tags:
  - machine-learning
  - finance
  - algorithmic-trading
  - lstm
  - time-series-forecasting
summary: "Quantitative trading system for IDX stocks combining LSTM/SVR ensembles with technical analysis strategies, featuring walk-forward validation and risk management."
technologies:
  - Python
  - PyTorch (LSTM)
  - Support Vector Regression (SVR)
  - Gradient Boosting
  - PostgreSQL
  - TA-Lib
  - Pandas
metrics:
  stocksCovered: 657
  winRate: "58.7%"
  profitFactor: 2.14
  sharpeRatio: 1.85
startDate: "2024-01-01"
completedDate: "2024-06-01"
repository: "https://github.com/alazkiyai09/idx-trading-system"
---

## Overview

The quantitative finance space is often dominated by simple technical analysis or overly complex deep learning models that fail in out-of-sample data. This project bridges the gap by building a robust, refactored quantitative trading system specifically tailored for the Indonesian Stock Exchange (IDX).

It combines the predictive power of machine learning ensembles (LSTM, CNN-LSTM, SVR) with the practical risk management of classical technical trading strategies (Breakout, Mean Reversion, Volatility Breakout).

## Machine Learning Architecture

The prediction engine treats stock forecasting as a multi-modal time-series problem, predicting a 7-day horizon using a sophisticated ensemble architecture:

### 1. Multi-Seed Ensemble Generation
Deep learning models (like LSTMs) are highly sensitive to weight initialization. Instead of trusting a single model, the system trains 5 variations of each architecture using different random seeds (7, 17, 42, 73, 101) and aggregates their predictions to smooth out variance and prevent overfitting to initialization noise.

### 2. Base Models
- **Long Short-Term Memory (LSTM)** networks for capturing long-range temporal dependencies in price action.
- **CNN-LSTM hybrids** for local pattern extraction (CNN) followed by sequence modeling (LSTM).
- **Support Vector Regression (SVR)** providing a non-deep-learning statistical baseline to anchor the neural networks.

### 3. Exogenous Feature Integration
IDX stocks do not trade in a vacuum. The feature engineering pipeline injects critical macro indicators:
- `^JKSE` (IHSG Composite Index) for broad market beta
- `USDIDR` exchange rate (critical for Indonesian equities)
- Global commodity futures (`BZ=F` Brent Crude, `GC=F` Gold) to model raw material impacts

### 4. GARCH Monte Carlo & Meta-Learner
A Gradient Boosting meta-learner stacks the predictions of the base models. To quantify uncertainty, a GARCH-based Monte Carlo simulation generates confidence bands around the 7-day predicted trajectory, allowing the trading logic to assess the probability density of hitting profit targets.

## Trading Strategies & Risk Management

Predictive accuracy is useless without risk control. The system executes trades based on ML forecasts filtering traditional setups:

- **Position Sizing**: Strictly enforces the Kelly Criterion and caps portfolio-level risk at 12%. No single trade risks more than 2% of capital.
- **Dynamic Stops**: Uses Average True Range (ATR) to set volatility-adjusted stop-loss levels, widening stops in choppy conditions and tightening them during calm trends.
- **Liquidity Filters**: Rejects signals on stocks with less than 10 Billion IDR Average Daily Trading Volume (ADTV), preventing slippage traps common in smaller IDX listings.
- **Strategy Matrix**: Executes across Volatility Breakouts (Donchian + ATR), Mean Reversion (RSI oversold + ML predicted bounce), and Trend Following (EMA crossover + ADX filter).

## Data Infrastructure

Built for production resilience:
- **PostgreSQL Backend**: Dedicated database storing daily and hourly tick data for 657+ IDX equities.
- **Automated Ingestion**: High-throughput connection pooling targeting Yahoo Finance APIs for incremental daily updates.
- **Walk-Forward Validation**: Model backtesting strictly utilizes walk-forward metrics over 30-day windows, preventing the look-ahead bias that Plagues traditional train/test splits in finance.

## Backtest Performance

*(Historical backtest 2021-2025 across mid-to-high market cap IDX equities)*
- **Sharpe Ratio**: 1.85 (strong risk-adjusted return)
- **Max Drawdown**: -12.3% (well within institutional limits)
- **Win Rate**: 58.7%
- **Profit Factor**: 2.14

## The Engineering Philosophy

This system was refactored with software engineering best practices at the forefront. Features are strongly decoupled (fetchers vs. DB managers predict vs. train). Configuration is centralized, dependencies are managed, and database connection logic handles failures cleanly—making this not just a Jupyter Notebook research toy, but a deployable backend structure for an automated trading fund.
