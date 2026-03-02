---
title: "MedicaidGuard"
status: "completed"
category: "fraud-detection"
tags:
  - machine-learning
  - fraud-detection
  - healthcare
  - xgboost
  - anomaly-detection
summary: "A production machine learning system that analyzes 227 million Medicaid records to automatically detect and flag complex healthcare fraud."
simpleSummary: "A machine learning system that finds suspicious billing patterns in the $1 Trillion Medicaid program to stop fraud and waste."
technologies:
  - Python
  - XGBoost
  - Autoencoders
  - Isolation Forest
metrics:
  recordsProcessed: "227M+"
startDate: "2026-01-01"
completedDate: "2026-03-01"
repository: "https://github.com/alazkiyai09/medicaid-guard"
---

## Overview

MedicaidGuard is a comprehensive machine learning pipeline that ingests, cleans, and analyzes the complete **227 million record US HHS Medicaid Provider dataset** to detect anomalous billing behaviors and identify potential healthcare fraud.

Unlike traditional heuristic models, MedicaidGuard employs an advanced ensemble architecture combining Statistical Outlier Detection, Isolation Forests, Deep Autoencoders, and XGBoost probabilistic classifiers to assign transparent, SHAP-explainable risk scores to all 617,503 registered providers.

## 🚀 Features

* **Massive Scale Integration:** Ingests the 15GB+ HHS dataset using chunked streaming directly integrated with the NPI registry and OIG LEIE exclusion lists.
* **38-Dimensional Feature Matrix:** Extracts critical financial features including maximum cost boundaries, geographic code concentration, and month-over-month acceleration vectors.
* **Hybrid Ensemble Architecture:** Fuses deterministic rules with unsupervised (Autoencoders) and supervised (XGBoost) learners to generate a universal `0-100` risk score.
* **SHAP Explainability:** Every flagged provider is accompanied by a waterfall trace explicitly calculating the exact variables that triggered the risk score.

## 🧠 System Architecture

The platform calibrates the risk scores such that explicitly excluded providers (OIG LEIE) are forced into the top 5% risk quantiles. The pipeline sequentially executes:
1. Fetching data from HHS databases
2. Merging with NPI and OIG data
3. Generating the feature matrix
4. Training the Ensemble ML models
5. Generating risk scores and SHAP bounds
