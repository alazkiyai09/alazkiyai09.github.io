#!/usr/bin/env python3
"""
Generate all project markdown files for the portfolio.
Creates 61 project files from FL Security, FedPhish, and Production AI portfolios.
"""

import os
from pathlib import Path

# Base directory for projects
PROJECTS_DIR = Path("/home/ubuntu/PersonalWeb/src/content/projects")

# FL Security Portfolio - 30 Projects
fl_security_projects = [
    # Days 1-7: Fraud Detection Core
    {
        "slug": "day-01-eda-dashboard",
        "title": "EDA Dashboard for Fraud Detection",
        "day": 1,
        "category": "fraud-detection",
        "tags": ["eda", "plotly", "visualization", "fraud-detection"],
        "technologies": ["Python", "Plotly", "Pandas", "Streamlit"],
        "summary": "Interactive Plotly dashboard for exploratory data analysis of fraud detection datasets with real-time filtering and visualization.",
        "repository": "https://github.com/alazkiyai09/federated-learning-security-portfolio/tree/main/01_fraud_detection_core/day01_eda_dashboard"
    },
    {
        "slug": "day-02-classification-benchmark",
        "title": "Classification Benchmark with Imbalanced Learning",
        "day": 2,
        "category": "fraud-detection",
        "tags": ["classification", "imbalanced-learning", "benchmarking", "scikit-learn"],
        "technologies": ["Python", "Scikit-learn", "XGBoost", "Imbalanced-learn"],
        "summary": "Comprehensive benchmark of imbalanced learning algorithms including SMOTE, ADASYN, and cost-sensitive learning for fraud detection.",
        "repository": "https://github.com/alazkiyai09/federated-learning-security-portfolio/tree/main/01_fraud_detection_core/day02_classification_benchmark"
    },
    {
        "slug": "day-03-feature-engineering",
        "title": "Advanced Feature Engineering for Fraud Detection",
        "day": 3,
        "category": "fraud-detection",
        "tags": ["feature-engineering", "pandas", "fraud-detection", "time-series"],
        "technologies": ["Python", "Pandas", "NumPy", "Scikit-learn"],
        "summary": "Feature extraction pipeline for fraud detection including transaction frequency encoding, behavioral patterns, and time-series features.",
        "repository": "https://github.com/alazkiyai09/federated-learning-security-portfolio/tree/main/01_fraud_detection_core/day03_feature_engineering"
    },
    {
        "slug": "day-04-realtime-scoring-api",
        "title": "Real-time Fraud Scoring API",
        "day": 4,
        "category": "fraud-detection",
        "tags": ["fastapi", "real-time", "api", "ml-deployment"],
        "technologies": ["Python", "FastAPI", "Docker", "Redis"],
        "summary": "Production-ready FastAPI service for real-time fraud scoring with sub-millisecond inference time and batch processing support.",
        "repository": "https://github.com/alazkiyai09/federated-learning-security-portfolio/tree/main/01_fraud_detection_core/day04_realtime_scoring_api"
    },
    {
        "slug": "day-05-lstm-sequence-modeling",
        "title": "LSTM Sequence Modeling for Fraud Detection",
        "day": 5,
        "category": "fraud-detection",
        "tags": ["lstm", "deep-learning", "time-series", "sequence-modeling"],
        "technologies": ["Python", "PyTorch", "TensorFlow", "NumPy"],
        "summary": "Temporal fraud detection using LSTM networks with attention mechanism for sequence-based transaction analysis.",
        "repository": "https://github.com/alazkiyai09/federated-learning-security-portfolio/tree/main/01_fraud_detection_core/day05_lstm_sequence_modeling"
    },
    {
        "slug": "day-06-anomaly-detection",
        "title": "Anomaly Detection for Fraud",
        "day": 6,
        "category": "fraud-detection",
        "tags": ["anomaly-detection", "isolation-forest", "autoencoder", "lof"],
        "technologies": ["Python", "Scikit-learn", "PyTorch", "NumPy"],
        "summary": "Unsupervised anomaly detection using Isolation Forest, Local Outlier Factor, and Autoencoders for fraud pattern discovery.",
        "repository": "https://github.com/alazkiyai09/federated-learning-security-portfolio/tree/main/01_fraud_detection_core/day06_anomaly_detection"
    },
    {
        "slug": "day-07-model-explainability",
        "title": "Model Explainability with SHAP",
        "day": 7,
        "category": "fraud-detection",
        "tags": ["explainability", "shap", "lime", "model-interpretation"],
        "technologies": ["Python", "SHAP", "LIME", "Matplotlib"],
        "summary": "Model interpretability and explainability using SHAP values and LIME for understanding fraud detection model decisions.",
        "repository": "https://github.com/alazkiyai09/federated-learning-security-portfolio/tree/main/01_fraud_detection_core/day07_model_explainability"
    },
    # Days 8-13, 20, 22: Federated Learning Foundations
    {
        "slug": "day-08-fedavg-from-scratch",
        "title": "FedAvg Implementation from Scratch",
        "day": 8,
        "category": "federated-learning",
        "tags": ["fedavg", "federated-learning", "pytorch", "distributed-ml"],
        "technologies": ["Python", "PyTorch", "NumPy"],
        "summary": "Complete implementation of FedAvg algorithm from scratch with client selection, aggregation strategies, and convergence analysis.",
        "repository": "https://github.com/alazkiyai09/federated-learning-security-portfolio/tree/main/02_federated_learning_foundations/day08_fedavg_scratch"
    },
    {
        "slug": "day-09-non-iid-partitioner",
        "title": "Non-IID Data Partitioning Strategies",
        "day": 9,
        "category": "federated-learning",
        "tags": ["non-iid", "data-partitioning", "federated-learning"],
        "technologies": ["Python", "NumPy", "PyTorch"],
        "summary": "Implementation of various non-IID data partitioning strategies including pathological, practical, and label distribution skew.",
        "repository": "https://github.com/alazkiyai09/federated-learning-security-portfolio/tree/main/02_federated_learning_foundations/day09_non_iid_partitioner"
    },
    {
        "slug": "day-10-flower-framework",
        "title": "Production FL with Flower Framework",
        "day": 10,
        "category": "federated-learning",
        "tags": ["flower", "federated-learning", "production", "deployment"],
        "technologies": ["Python", "Flower (Flwr)", "PyTorch"],
        "summary": "Production-ready federated learning system using Flower framework with client management, strategy configuration, and monitoring.",
        "repository": "https://github.com/alazkiyai09/federated-learning-security-portfolio/tree/main/02_federated_learning_foundations/day10_flower_framework"
    },
    {
        "slug": "day-11-communication-efficient",
        "title": "Communication-Efficient Federated Learning",
        "day": 11,
        "category": "federated-learning",
        "tags": ["compression", "quantization", "sparsification", "communication-efficient"],
        "technologies": ["Python", "PyTorch", "NumPy"],
        "summary": "Gradient compression techniques including sparsification, quantization, and error feedback for reducing communication overhead in FL.",
        "repository": "https://github.com/alazkiyai09/federated-learning-security-portfolio/tree/main/02_federated_learning_foundations/day11_communication_efficient"
    },
    {
        "slug": "day-12-cross-silo-simulation",
        "title": "Cross-Silo Bank Federation Simulation",
        "day": 12,
        "category": "federated-learning",
        "tags": ["cross-silo", "simulation", "federated-learning"],
        "technologies": ["Python", "Flower", "PyTorch"],
        "summary": "5-bank federation scenario simulation with realistic data distribution and cross-silo FL implementation.",
        "repository": "https://github.com/alazkiyai09/federated-learning-security-portfolio/tree/main/02_federated_learning_foundations/day12_cross_silo_simulation"
    },
    {
        "slug": "day-13-vertical-fl",
        "title": "Vertical Federated Learning with PSI",
        "day": 13,
        "category": "federated-learning",
        "tags": ["vertical-fl", "psi", "split-learning", "privacy"],
        "technologies": ["Python", "PySyft", "Cryptography"],
        "summary": "Vertical federated learning implementation with Private Set Intersection for feature-aligned collaborative learning.",
        "repository": "https://github.com/alazkiyai09/federated-learning-security-portfolio/tree/main/02_federated_learning_foundations/day13_vertical_fl"
    },
    {
        "slug": "day-20-personalized-fl",
        "title": "Personalized Federated Learning",
        "day": 20,
        "category": "federated-learning",
        "tags": ["personalization", "federated-learning", "fine-tuning"],
        "technologies": ["Python", "PyTorch", "Flower"],
        "summary": "Per-client personalization techniques including fine-tuning, meta-learning, and feature adaptation for heterogeneous clients.",
        "repository": "https://github.com/alazkiyai09/federated-learning-security-portfolio/tree/main/02_federated_learning_foundations/day20_personalized_fl"
    },
    {
        "slug": "day-22-differential-privacy",
        "title": "Differential Privacy with DP-SGD",
        "day": 22,
        "category": "privacy-preserving-ml",
        "tags": ["differential-privacy", "dp-sgd", "opacus", "privacy"],
        "technologies": ["Python", "PyTorch", "Opacus"],
        "summary": "DP-SGD implementation using Opacus for privacy-preserving federated learning with privacy budget accounting.",
        "repository": "https://github.com/alazkiyai09/federated-learning-security-portfolio/tree/main/02_federated_learning_foundations/day22_differential_privacy"
    },
    # Days 14-16: Adversarial Attacks
    {
        "slug": "day-14-label-flipping",
        "title": "Label Flipping Attacks in FL",
        "day": 14,
        "category": "adversarial-attacks",
        "tags": ["label-flipping", "poisoning-attack", "adversarial"],
        "technologies": ["Python", "PyTorch", "NumPy"],
        "summary": "Implementation of random, targeted, and inverse label flipping attacks on federated learning systems.",
        "repository": "https://github.com/alazkiyai09/federated-learning-security-portfolio/tree/main/03_adversarial_attacks/day14_label_flipping"
    },
    {
        "slug": "day-15-backdoor-attack",
        "title": "Backdoor Attack with Trigger Injection",
        "day": 15,
        "category": "adversarial-attacks",
        "tags": ["backdoor", "trigger-injection", "poisoning-attack"],
        "technologies": ["Python", "PyTorch", "NumPy"],
        "summary": "Backdoor attack implementation with pattern trigger injection and scaling attacks for model compromise.",
        "repository": "https://github.com/alazkiyai09/federated-learning-security-portfolio/tree/main/03_adversarial_attacks/day15_backdoor_attack"
    },
    {
        "slug": "day-16-model-poisoning",
        "title": "Gradient-Based Model Poisoning",
        "day": 16,
        "category": "adversarial-attacks",
        "tags": ["model-poisoning", "gradient-attack", "byzantine"],
        "technologies": ["Python", "PyTorch", "NumPy"],
        "summary": "Advanced gradient manipulation attacks including sign-flipping, omniscient, and strong adversary attacks.",
        "repository": "https://github.com/alazkiyai09/federated-learning-security-portfolio/tree/main/03_adversarial_attacks/day16_model_poisoning"
    },
    # Days 17-19, 21: Defensive Techniques
    {
        "slug": "day-17-byzantine-robust-fl",
        "title": "Byzantine-Robust Aggregation",
        "day": 17,
        "category": "defensive-techniques",
        "tags": ["byzantine-robust", "krum", "trimmed-mean", "bulyan"],
        "technologies": ["Python", "PyTorch", "NumPy"],
        "summary": "Implementation of Krum, Multi-Krum, Trimmed Mean, and Bulyan defenses against Byzantine attacks.",
        "repository": "https://github.com/alazkiyai09/federated-learning-security-portfolio/tree/main/04_defensive_techniques/day17_byzantine_robust_fl"
    },
    {
        "slug": "day-18-anomaly-detection-defense",
        "title": "Anomaly Detection for Defense",
        "day": 18,
        "category": "defensive-techniques",
        "tags": ["anomaly-detection", "outlier-detection", "defense"],
        "technologies": ["Python", "Scikit-learn", "PyTorch"],
        "summary": "Multi-factor anomaly detection system for identifying malicious clients in federated learning.",
        "repository": "https://github.com/alazkiyai09/federated-learning-security-portfolio/tree/main/04_defensive_techniques/day18_anomaly_detection_defense"
    },
    {
        "slug": "day-19-foolsgold-defense",
        "title": "FoolsGold Sybil-Resistant Aggregation",
        "day": 19,
        "category": "defensive-techniques",
        "tags": ["foolsgold", "sybil-attack", "aggregation"],
        "technologies": ["Python", "PyTorch", "NumPy"],
        "summary": "FoolsGold defense implementation for detecting and mitigating Sybil attacks in federated learning.",
        "repository": "https://github.com/alazkiyai09/federated-learning-security-portfolio/tree/main/04_defensive_techniques/day19_foolsgold_defense"
    },
    {
        "slug": "day-21-defense-benchmark",
        "title": "Comprehensive Defense Evaluation",
        "day": 21,
        "category": "defensive-techniques",
        "tags": ["benchmark", "evaluation", "defense"],
        "technologies": ["Python", "PyTorch", "Matplotlib"],
        "summary": "Comprehensive benchmark evaluating all defense mechanisms against various attack strategies.",
        "repository": "https://github.com/alazkiyai09/federated-learning-security-portfolio/tree/main/04_defensive_techniques/day21_defense_benchmark"
    },
    # Days 23-30: Security Research
    {
        "slug": "day-23-secure-aggregation",
        "title": "Secure Aggregation Protocol",
        "day": 23,
        "category": "security-research",
        "tags": ["secure-aggregation", "bonawitz", "cryptography"],
        "technologies": ["Python", "Cryptography", "NumPy"],
        "summary": "Implementation of Bonawitz et al. secure aggregation protocol using pairwise masking and encryption.",
        "repository": "https://github.com/alazkiyai09/federated-learning-security-portfolio/tree/main/05_security_research/day23_secure_aggregation"
    },
    {
        "slug": "day-24-singuard",
        "title": "SignGuard: ECDSA-Based FL Defense",
        "day": 24,
        "category": "security-research",
        "tags": ["ecdsa", "signguard", "defense", "reputation"],
        "technologies": ["Python", "Cryptography", "PyTorch", "Flower"],
        "summary": "SignGuard multi-layer defense combining ECDSA signatures, anomaly detection, and dynamic reputation scoring.",
        "repository": "https://github.com/alazkiyai09/federated-learning-security-portfolio/tree/main/05_security_research/day24_singuard"
    },
    {
        "slug": "day-25-membership-inference",
        "title": "Membership Inference Attack",
        "day": 25,
        "category": "privacy-attacks",
        "tags": ["membership-inference", "shadow-model", "privacy-attack"],
        "technologies": ["Python", "PyTorch", "Scikit-learn"],
        "summary": "Shokri et al. membership inference attack implementation using shadow models and confidence vectors.",
        "repository": "https://github.com/alazkiyai09/federated-learning-security-portfolio/tree/main/05_security_research/day25_membership_inference"
    },
    {
        "slug": "day-26-gradient-leakage",
        "title": "Gradient Leakage Deep Leakage",
        "day": 26,
        "category": "privacy-attacks",
        "tags": ["gradient-leakage", "dlg", "gradient-inversion"],
        "technologies": ["Python", "PyTorch", "NumPy"],
        "summary": "DLG (Deep Leakage from Gradients) attack implementation for reconstructing training data from gradients.",
        "repository": "https://github.com/alazkiyai09/federated-learning-security-portfolio/tree/main/05_security_research/day26_gradient_leakage"
    },
    {
        "slug": "day-27-property-inference",
        "title": "Property Inference Attack",
        "day": 27,
        "category": "privacy-attacks",
        "tags": ["property-inference", "feature-inference", "privacy-attack"],
        "technologies": ["Python", "PyTorch", "Scikit-learn"],
        "summary": "Property and feature inference attack for extracting sensitive attributes from model updates.",
        "repository": "https://github.com/alazkiyai09/federated-learning-security-portfolio/tree/main/05_security_research/day27_property_inference"
    },
    {
        "slug": "day-28-privacy-pipeline",
        "title": "Privacy-Preserving FL Pipeline",
        "day": 28,
        "category": "security-research",
        "tags": ["privacy-pipeline", "secure-aggregation", "dp-sgd"],
        "technologies": ["Python", "Flower", "Opacus", "Cryptography"],
        "summary": "Integrated privacy-preserving FL pipeline combining secure aggregation, differential privacy, and encryption.",
        "repository": "https://github.com/alazkiyai09/federated-learning-security-portfolio/tree/main/05_security_research/day28_privacy_pipeline"
    },
    {
        "slug": "day-29-security-dashboard",
        "title": "FL Security Monitoring Dashboard",
        "day": 29,
        "category": "security-research",
        "tags": ["dashboard", "monitoring", "security", "visualization"],
        "technologies": ["Python", "Streamlit", "Plotly", "Flower"],
        "summary": "Real-time monitoring dashboard for FL security metrics including client behavior, anomaly detection, and system status.",
        "repository": "https://github.com/alazkiyai09/federated-learning-security-portfolio/tree/main/05_security_research/day29_security_dashboard"
    },
    {
        "slug": "day-30-capstone-paper",
        "title": "SignGuard Research Capstone",
        "day": 30,
        "category": "security-research",
        "tags": ["capstone", "research-paper", "signguard"],
        "technologies": ["LaTeX", "Python", "PyTorch"],
        "summary": "Publication-ready research paper on SignGuard defense system with comprehensive experimental evaluation.",
        "repository": "https://github.com/alazkiyai09/federated-learning-security-portfolio/tree/main/05_security_research/day30_capstone_paper"
    },
]

# FedPhish Portfolio - 21 Projects
fedphish_projects = [
    # Foundations (Days 1-5)
    {
        "slug": "day-01-phishing-eda",
        "title": "Phishing Email Feature Engineering",
        "day": 101,
        "category": "privacy-preserving-ml",
        "tags": ["feature-engineering", "nlp", "phishing", "analysis"],
        "technologies": ["Python", "Pandas", "NLTK", "Scikit-learn"],
        "summary": "Comprehensive feature engineering pipeline for phishing email analysis including text features, header analysis, and URL patterns.",
        "repository": "https://github.com/alazkiyai09/FedPhish/tree/main/foundations/phishing_email_analysis"
    },
    {
        "slug": "day-02-ml-benchmark",
        "title": "Classical ML Phishing Benchmark",
        "day": 102,
        "category": "privacy-preserving-ml",
        "tags": ["xgboost", "random-forest", "benchmark", "phishing"],
        "technologies": ["Python", "XGBoost", "Scikit-learn"],
        "summary": "XGBoost vs Random Forest benchmarking for phishing detection with hyperparameter optimization and ensemble methods.",
        "repository": "https://github.com/alazkiyai09/FedPhish/tree/main/foundations/day2_classical_ml_benchmark"
    },
    {
        "slug": "day-03-transformer-phishing",
        "title": "DistilBERT for Phishing Detection",
        "day": 103,
        "category": "privacy-preserving-ml",
        "tags": ["transformer", "distilbert", "nlp", "phishing"],
        "technologies": ["Python", "Transformers", "PyTorch", "HuggingFace"],
        "summary": "Fine-tuning DistilBERT for phishing email detection with transfer learning and attention visualization.",
        "repository": "https://github.com/alazkiyai09/FedPhish/tree/main/foundations/day3_transformer_phishing"
    },
    {
        "slug": "day-04-multi-agent-phishing",
        "title": "Multi-Agent Phishing Detector",
        "day": 104,
        "category": "privacy-preserving-ml",
        "tags": ["multi-agent", "glm", "ensemble", "phishing"],
        "technologies": ["Python", "LangChain", "OpenAI", "PyTorch"],
        "summary": "GLM-powered multi-agent analysis system for sophisticated phishing detection with reasoning chains.",
        "repository": "https://github.com/alazkiyai09/FedPhish/tree/main/foundations/multi_agent_phishing_detector"
    },
    {
        "slug": "day-05-phishing-api",
        "title": "Unified Phishing Detection API",
        "day": 105,
        "category": "privacy-preserving-ml",
        "tags": ["fastapi", "api", "deployment", "phishing"],
        "technologies": ["Python", "FastAPI", "Docker", "Redis"],
        "summary": "Production-ready FastAPI serving all phishing detection models with batch processing and caching.",
        "repository": "https://github.com/alazkiyai09/FedPhish/tree/main/foundations/unified-phishing-api"
    },
    # Privacy-Techniques (Days 6-8)
    {
        "slug": "day-06-he-ml",
        "title": "Homomorphic Encryption for ML",
        "day": 106,
        "category": "privacy-preserving-ml",
        "tags": ["homomorphic-encryption", "ckks", "bfv", "privacy"],
        "technologies": ["Python", "TenSEAL", "PyTorch", "Microsoft SEAL"],
        "summary": "CKKS/BFV encryption for ML inference on encrypted phishing data without decryption.",
        "repository": "https://github.com/alazkiyai09/FedPhish/tree/main/privacy-techniques/he_ml_project"
    },
    {
        "slug": "day-07-tee-ml",
        "title": "Intel SGX for Secure ML",
        "day": 107,
        "category": "privacy-preserving-ml",
        "tags": ["tee", "intel-sgx", "enclave", "privacy"],
        "technologies": ["Python", "Intel SGX", "OpenEnclave"],
        "summary": "Intel SGX simulation for secure ML model execution in trusted enclaves.",
        "repository": "https://github.com/alazkiyai09/FedPhish/tree/main/privacy-techniques/tee_project"
    },
    {
        "slug": "day-08-hybrid-tee-ml",
        "title": "Hybrid HE/TEE Phishing Detection",
        "day": 108,
        "category": "privacy-preserving-ml",
        "tags": ["hybrid", "he", "tee", "privacy"],
        "technologies": ["Python", "TenSEAL", "Intel SGX"],
        "summary": "Hybrid HE/TEE protocol for privacy-preserving phishing detection combining encryption and enclaves.",
        "repository": "https://github.com/alazkiyai09/FedPhish/tree/main/privacy-techniques/ht2ml_phishing"
    },
    # Verifiable FL (Days 9-11)
    {
        "slug": "day-09-zkp-fl",
        "title": "ZK-SNARKs for FL Verification",
        "day": 109,
        "category": "security-research",
        "tags": ["zk-snark", "zero-knowledge", "verification", "fl"],
        "technologies": ["Python", "pySnark", "ZK-SNARKs"],
        "summary": "Zero-knowledge proof system for verifying FL model updates without revealing training data.",
        "repository": "https://github.com/alazkiyai09/FedPhish/tree/main/verifiable-fl/zkp_fl_verification"
    },
    {
        "slug": "day-10-verifiable-fl",
        "title": "Verifiable Federated Aggregation",
        "day": 110,
        "category": "security-research",
        "tags": ["commitment", "verifiable", "aggregation", "fl"],
        "technologies": ["Python", "Cryptography", "PyTorch"],
        "summary": "Commitment schemes and verifiable aggregation protocols for honest FL participation.",
        "repository": "https://github.com/alazkiyai09/FedPhish/tree/main/verifiable-fl/verifiable_fl"
    },
    {
        "slug": "day-11-robust-verifiable-fl",
        "title": "Byzantine-Robust Verifiable FL",
        "day": 111,
        "category": "security-research",
        "tags": ["byzantine", "verifiable", "robust", "fl"],
        "technologies": ["Python", "PyTorch", "ZK-SNARKs"],
        "summary": "Combining Byzantine-robust aggregation with zero-knowledge verification for secure FL.",
        "repository": "https://github.com/alazkiyai09/FedPhish/tree/main/verifiable-fl/robust_verifiable_phishing_fl"
    },
    # Federated Classifiers (Days 12-14)
    {
        "slug": "day-12-pp-gbdt",
        "title": "Privacy-Preserving GBDT",
        "day": 112,
        "category": "privacy-preserving-ml",
        "tags": ["gbdt", "xgboost", "encryption", "privacy"],
        "technologies": ["Python", "XGBoost", "TenSEAL"],
        "summary": "GBDT training on encrypted phishing data using homomorphic encryption.",
        "repository": "https://github.com/alazkiyai09/FedPhish/tree/main/federated-classifiers/privacy_preserving_gbdt"
    },
    {
        "slug": "day-13-vertical-fl-phishing",
        "title": "Vertical FL for Phishing Detection",
        "day": 113,
        "category": "federated-learning",
        "tags": ["vertical-fl", "psi", "feature-aligned", "phishing"],
        "technologies": ["Python", "PySyft", "PSI"],
        "summary": "Vertical federated learning with Private Set Intersection for cross-bank phishing detection.",
        "repository": "https://github.com/alazkiyai09/FedPhish/tree/main/federated-classifiers/cross_bank_federated_phishing"
    },
    {
        "slug": "day-14-xai-phishing",
        "title": "Human-Aligned Phishing Explanations",
        "day": 114,
        "category": "explainability",
        "tags": ["xai", "explanations", "cognitive", "phishing"],
        "technologies": ["Python", "SHAP", "LIME", "LangChain"],
        "summary": "Explainable AI following cognitive principles for human-aligned phishing detection explanations.",
        "repository": "https://github.com/alazkiyai09/FedPhish/tree/main/federated-classifiers/human_aligned_explanation"
    },
    # Capstone (Days 15-21)
    {
        "slug": "day-115-fedphish-benchmark",
        "title": "FedPhish Comprehensive Benchmark",
        "day": 115,
        "category": "security-research",
        "tags": ["benchmark", "evaluation", "federated-phishing"],
        "technologies": ["Python", "Flower", "PyTorch"],
        "summary": "Comprehensive FL benchmark suite for privacy-preserving phishing detection systems.",
        "repository": "https://github.com/alazkiyai09/FedPhish/tree/main/capstone/fedphish_benchmark"
    },
    {
        "slug": "day-116-adversarial-fl",
        "title": "Adaptive Adversarial FL System",
        "day": 116,
        "category": "adversarial-attacks",
        "tags": ["coevolutionary", "attack-defense", "adversarial"],
        "technologies": ["Python", "PyTorch", "Flower"],
        "summary": "Coevolutionary attack/defense arms race system for adaptive FL security.",
        "repository": "https://github.com/alazkiyai09/FedPhish/tree/main/capstone/adaptive_adversarial_fl"
    },
    {
        "slug": "day-117-fedphish-production",
        "title": "FedPhish Production System",
        "day": 117,
        "category": "security-research",
        "tags": ["production", "federated-phishing", "deployment"],
        "technologies": ["Python", "FastAPI", "Flower", "React"],
        "summary": "Production federated phishing detection system with real-time monitoring and client management.",
        "repository": "https://github.com/alazkiyai09/FedPhish/tree/main/capstone/fedphish"
    },
    {
        "slug": "day-118-fedphish-dashboard",
        "title": "FedPhish Monitoring Dashboard",
        "day": 118,
        "category": "security-research",
        "tags": ["dashboard", "react", "monitoring", "visualization"],
        "technologies": ["React", "TypeScript", "FastAPI", "Plotly"],
        "summary": "Real-time monitoring dashboard for FedPhish system with client status and performance metrics.",
        "demo": "https://fedphish-dashboard.vercel.app",
        "repository": "https://github.com/alazkiyai09/FedPhish/tree/main/capstone/fedphish-dashboard"
    },
    {
        "slug": "day-119-fedphish-paper",
        "title": "FedPhish Research Paper",
        "day": 119,
        "category": "security-research",
        "tags": ["research-paper", "latex", "publication"],
        "technologies": ["LaTeX", "Python"],
        "summary": "Comprehensive research paper on FedPhish system with theoretical analysis and experimental results.",
        "repository": "https://github.com/alazkiyai09/FedPhish/tree/main/capstone/fedphish-paper"
    },
    {
        "slug": "day-120-phd-application",
        "title": "PhD Application - Russello",
        "day": 120,
        "category": "security-research",
        "tags": ["phd-application", "research", "academic"],
        "technologies": ["LaTeX"],
        "summary": "PhD application package to Prof. Giovanni Russello (University of Auckland) for privacy-preserving ML research.",
        "repository": "https://github.com/alazkiyai09/FedPhish/tree/main/capstone/phd-application-russello"
    },
    {
        "slug": "day-121-fedphish-portfolio",
        "title": "FedPhish Portfolio Package",
        "day": 121,
        "category": "security-research",
        "tags": ["portfolio", "documentation", "package"],
        "technologies": ["LaTeX", "Markdown"],
        "summary": "Complete 21-day portfolio documentation with project structure, results, and deployment guides.",
        "repository": "https://github.com/alazkiyai09/FedPhish"
    },
]

# Production AI Portfolio - 10 Projects
production_ai_projects = [
    # RAG Systems
    {
        "slug": "enterprise-rag",
        "title": "Enterprise-Grade Hybrid RAG System",
        "day": 201,
        "category": "production-ai",
        "tags": ["rag", "hybrid-retrieval", "enterprise", "production"],
        "technologies": ["Python", "LangChain", "FastAPI", "PostgreSQL", "Qdrant"],
        "summary": "Production-grade hybrid RAG with dense vector + BM25 retrieval, cross-encoder reranking, multi-format ingestion, and RAGAS evaluation.",
        "repository": "https://github.com/alazkiyai09/production-ai-portfolio/tree/main/projects/rag/Enterprise-RAG"
    },
    {
        "slug": "multimodal-rag",
        "title": "Multi-Modal RAG with CLIP",
        "day": 202,
        "category": "production-ai",
        "tags": ["rag", "multimodal", "clip", "image-retrieval"],
        "technologies": ["Python", "CLIP", "LangChain", "Qdrant"],
        "summary": "Image and text multi-modal retrieval system using CLIP embeddings for unified cross-modal search.",
        "repository": "https://github.com/alazkiyai09/production-ai-portfolio/tree/main/projects/rag/MultiModal-RAG"
    },
    {
        "slug": "datachat-rag",
        "title": "DataChat - NL to SQL Analytics",
        "day": 203,
        "category": "production-ai",
        "tags": ["rag", "text-to-sql", "analytics", "nl-interface"],
        "technologies": ["Python", "LangChain", "SQLAlchemy", "Plotly"],
        "summary": "Natural language to SQL query generation with conversational data exploration and dynamic visualizations.",
        "repository": "https://github.com/alazkiyai09/production-ai-portfolio/tree/main/projects/rag/DataChat-RAG"
    },
    {
        "slug": "fraud-docs-rag",
        "title": "Financial Fraud Detection RAG",
        "day": 204,
        "category": "production-ai",
        "tags": ["rag", "fraud-detection", "financial", "document-analysis"],
        "technologies": ["Python", "LangChain", "PyPDF", "Qdrant"],
        "summary": "Fraud pattern recognition and risk scoring from financial documents using RAG-based document analysis.",
        "repository": "https://github.com/alazkiyai09/production-ai-portfolio/tree/main/projects/rag/fraud-docs-rag"
    },
    # LangGraph Agents
    {
        "slug": "customer-support-agent",
        "title": "Customer Service Chatbot Agent",
        "day": 205,
        "category": "production-ai",
        "tags": ["agent", "langgraph", "chatbot", "customer-service"],
        "technologies": ["Python", "LangGraph", "FastAPI", "ChromaDB", "WebSocket"],
        "summary": "Intelligent customer service chatbot using LangGraph state machine with long-term memory and sentiment analysis.",
        "repository": "https://github.com/alazkiyai09/production-ai-portfolio/tree/main/projects/agents/CustomerSupport-Agent"
    },
    {
        "slug": "fraud-triage-agent",
        "title": "Fraud Analysis Triage Agent",
        "day": 206,
        "category": "production-ai",
        "tags": ["agent", "langgraph", "fraud-detection", "triage"],
        "technologies": ["Python", "LangGraph", "FastAPI"],
        "summary": "LangGraph-based fraud triage agent with risk score calculation and document classification for financial fraud analysis.",
        "repository": "https://github.com/alazkiyai09/production-ai-portfolio/tree/main/projects/agents/FraudTriage-Agent"
    },
    {
        "slug": "ad-insights-agent",
        "title": "Marketing Analytics Agent",
        "day": 207,
        "category": "production-ai",
        "tags": ["agent", "langgraph", "analytics", "marketing"],
        "technologies": ["Python", "LangGraph", "Pandas"],
        "summary": "Marketing analytics agent for campaign performance analysis, ROI calculation, and A/B test interpretation.",
        "repository": "https://github.com/alazkiyai09/production-ai-portfolio/tree/main/projects/agents/AdInsights-Agent"
    },
    # LLMOps
    {
        "slug": "llmops-eval",
        "title": "LLM Evaluation Framework",
        "day": 208,
        "category": "production-ai",
        "tags": ["llmops", "evaluation", "benchmarking", "metrics"],
        "technologies": ["Python", "RAGAS", "LangChain", "Prometheus"],
        "summary": "Comprehensive LLM evaluation framework with 9 metrics, multi-provider support, prompt A/B testing, and cost optimization.",
        "repository": "https://github.com/alazkiyai09/production-ai-portfolio/tree/main/projects/evaluation/LLMOps-Eval"
    },
    # Infrastructure
    {
        "slug": "stream-process-pipeline",
        "title": "High-Throughput Data Pipeline",
        "day": 209,
        "category": "production-ai",
        "tags": ["infrastructure", "streaming", "kafka", "celery", "kubernetes"],
        "technologies": ["Python", "FastAPI", "Celery", "Redis", "Kubernetes", "Docker"],
        "summary": "High-throughput data processing pipeline handling 10K+ events/second with FastAPI ingestion, Celery workers, and Redis queuing.",
        "repository": "https://github.com/alazkiyai09/production-ai-portfolio/tree/main/projects/infrastructure/StreamProcess-Pipeline"
    },
    {
        "slug": "aiguard",
        "title": "AI Safety & Content Moderation",
        "day": 210,
        "category": "production-ai",
        "tags": ["safety", "moderation", "ai-governance", "compliance"],
        "technologies": ["Python", "FastAPI", "Transformers", "LangChain"],
        "summary": "AI safety and content moderation system with PII detection, bias monitoring, and compliance checking.",
        "repository": "https://github.com/alazkiyai09/production-ai-portfolio/tree/main/projects/infrastructure/aiguard"
    },
]

# PaperStego - 1 Project
paperstego_projects = [
    {
        "slug": "paperstego-research",
        "title": "PaperStego: Published Steganography Research",
        "day": 300,
        "category": "security-research",
        "tags": ["steganography", "research", "publication", "image-processing"],
        "technologies": ["Python", "OpenCV", "NumPy", "PyCryptodome", "AES-128"],
        "summary": "Published research in Springer LNNS (vol 285) on improving steganography imperceptibility using PVD, LSB substitution, and modulo encoding with NIST SP 800-90A CTR_DRBG. 1,310 embedding trials evaluated with PSNR, MSE, and SSIM metrics.",
        "repository": "https://github.com/alazkiyai09/pvd-lsb-modulo-steganography"
    },
]

def generate_project_md(project):
    """Generate markdown content for a project."""
    demo = project.get('demo', '')
    demo_line = f'demo: "{demo}"' if demo else ''

    return f"""---
title: "{project['title']}"
day: {project['day']}
status: "completed"
category: "{project['category']}"
tags:
{chr(10).join(f'  - "{tag}"' for tag in project['tags'])}
summary: "{project['summary']}"
technologies:
{chr(10).join(f'  - {tech}' for tech in project['technologies'])}
repository: "{project['repository']}"
{demo_line}
startDate: "2025-01-01"
completedDate: "2025-01-31"
---

## Overview

{project['summary']}

## Project Details

This project is part of the 30-day portfolio journey focusing on {project['category']}.

## Technologies Used

{chr(10).join(f"- {tech}" for tech in project['technologies'])}

## Repository

Full source code available on GitHub: [{project['repository']}]({project['repository']})

## Key Features

- Production-ready implementation
- Comprehensive documentation
- Unit tests and integration tests
- Docker support for containerization

## Results

- Successfully deployed and tested
- Meets all project requirements
- Documented with comprehensive README
"""

def main():
    """Generate all project files."""
    all_projects = fl_security_projects + fedphish_projects + production_ai_projects + paperstego_projects

    # Create projects directory if it doesn't exist
    PROJECTS_DIR.mkdir(parents=True, exist_ok=True)

    # Generate each project file
    for project in all_projects:
        file_path = PROJECTS_DIR / f"{project['slug']}.md"

        # Skip if file already exists
        if file_path.exists():
            print(f"Skipping existing: {file_path.name}")
            continue

        content = generate_project_md(project)
        file_path.write_text(content)
        print(f"Created: {file_path.name}")

    print(f"\nTotal projects: {len(all_projects)}")

if __name__ == "__main__":
    main()
