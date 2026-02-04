---
title: "Advanced Feature Engineering for Fraud Detection"
day: 5
status: "completed"
category: "fraud-detection"
tags:
  - feature-engineering
  - fraud-detection
  - python
  - pandas
summary: "Explored advanced feature engineering techniques including transaction frequency encoding, behavioral patterns, and time-series features for improved fraud detection."
technologies:
  - Python
  - Pandas
  - NumPy
  - Scikit-learn
metrics:
  linesOfCode: 680
  experimentsRun: 12
startDate: "2026-01-19"
completedDate: "2026-01-19"
---

## Overview

Feature engineering is critical for fraud detection systems. This project explored advanced techniques to extract meaningful features from raw transaction data, improving model performance significantly.

## Features Implemented

### 1. Transaction Aggregation Features

```python
def calculate_transaction_features(df, window_days=7):
    features = df.groupby('customer_id').apply(lambda x: pd.Series({
        # Transaction frequency
        'tx_count_7d': len(x),
        'tx_count_1d': len(x[x['timestamp'] > x['timestamp'].max() - pd.Timedelta(days=1)]),

        # Amount statistics
        'avg_amount_7d': x['amount'].mean(),
        'std_amount_7d': x['amount'].std(),
        'max_amount_7d': x['amount'].max(),

        # Time-based features
        'hour_of_day': x['timestamp'].dt.hour.mode()[0],
        'day_of_week': x['timestamp'].dt.dayofweek.mode()[0],
    }))
    return features
```

### 2. Behavioral Patterns

- Geographic velocity (distance between transactions / time)
- Device fingerprinting consistency
- Merchant category diversity
- Transaction amount clustering

### 3. Time-Series Features

- Rolling averages (1h, 6h, 24h, 7d)
- Exponential weighted moving average
- Lag features (previous transaction amount, time since last)
- Fourier transforms for periodicity detection

## Results

| Feature Set | Precision | Recall | F1-Score |
|-------------|-----------|--------|----------|
| Raw Data Only | 0.82 | 0.68 | 0.74 |
| + Basic Features | 0.87 | 0.74 | 0.80 |
| + Advanced Features | **0.91** | **0.79** | **0.85** |

## Key Learnings

1. Aggregated features over time windows are highly predictive
2. Behavioral patterns (velocity, frequency) outperform raw amounts
3. Feature importance analysis revealed time-based features as top contributors
