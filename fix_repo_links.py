#!/usr/bin/env python3
"""
Fix GitHub repository links for projects to match actual folder structures.
"""

from pathlib import Path

# Correct mappings based on actual GitHub repo structures
fl_security_mappings = {
    "day-01-eda-dashboard": "https://github.com/alazkiyai09/federated-learning-security-portfolio/tree/main/01_fraud_detection_core/fraud_detection_eda_dashboard",
    "day-02-classification-benchmark": "https://github.com/alazkiyai09/federated-learning-security-portfolio/tree/main/01_fraud_detection_core/imbalanced_classification_benchmark",
    "day-03-feature-engineering": "https://github.com/alazkiyai09/federated-learning-security-portfolio/tree/main/01_fraud_detection_core/fraud_feature_engineering",
    "day-04-realtime-scoring-api": "https://github.com/alazkiyai09/federated-learning-security-portfolio/tree/main/01_fraud_detection_core/fraud_scoring_api",
    "day-05-lstm-sequence-modeling": "https://github.com/alazkiyai09/federated-learning-security-portfolio/tree/main/01_fraud_detection_core/lstm_fraud_detection",
    "day-06-anomaly-detection": "https://github.com/alazkiyai09/federated-learning-security-portfolio/tree/main/01_fraud_detection_core/anomaly_detection_benchmark",
    "day-07-model-explainability": "https://github.com/alazkiyai09/federated-learning-security-portfolio/tree/main/01_fraud_detection_core/fraud_model_explainability",
    "day-08-fedavg-from-scratch": "https://github.com/alazkiyai09/federated-learning-security-portfolio/tree/main/02_federated_learning_foundations",
    "day-09-non-iid-partitioner": "https://github.com/alazkiyai09/federated-learning-security-portfolio/tree/main/02_federated_learning_foundations",
    "day-10-flower-framework": "https://github.com/alazkiyai09/federated-learning-security-portfolio/tree/main/02_federated_learning_foundations",
    "day-11-communication-efficient": "https://github.com/alazkiyai09/federated-learning-security-portfolio/tree/main/02_federated_learning_foundations",
    "day-12-cross-silo-simulation": "https://github.com/alazkiyai09/federated-learning-security-portfolio/tree/main/02_federated_learning_foundations",
    "day-13-vertical-fl": "https://github.com/alazkiyai09/federated-learning-security-portfolio/tree/main/02_federated_learning_foundations",
    "day-14-label-flipping": "https://github.com/alazkiyai09/federated-learning-security-portfolio/tree/main/03_adversarial_attacks",
    "day-15-backdoor-attack": "https://github.com/alazkiyai09/federated-learning-security-portfolio/tree/main/03_adversarial_attacks",
    "day-16-model-poisoning": "https://github.com/alazkiyai09/federated-learning-security-portfolio/tree/main/03_adversarial_attacks",
    "day-17-byzantine-robust-fl": "https://github.com/alazkiyai09/federated-learning-security-portfolio/tree/main/04_defensive_techniques",
    "day-18-anomaly-detection-defense": "https://github.com/alazkiyai09/federated-learning-security-portfolio/tree/main/04_defensive_techniques",
    "day-19-foolsgold-defense": "https://github.com/alazkiyai09/federated-learning-security-portfolio/tree/main/04_defensive_techniques",
    "day-20-personalized-fl": "https://github.com/alazkiyai09/federated-learning-security-portfolio/tree/main/02_federated_learning_foundations",
    "day-21-defense-benchmark": "https://github.com/alazkiyai09/federated-learning-security-portfolio/tree/main/04_defensive_techniques",
    "day-22-differential-privacy": "https://github.com/alazkiyai09/federated-learning-security-portfolio/tree/main/02_federated_learning_foundations",
    "day-23-secure-aggregation": "https://github.com/alazkiyai09/federated-learning-security-portfolio/tree/main/05_security_research/secure_aggregation_fl",
    "day-24-singuard": "https://github.com/alazkiyai09/federated-learning-security-portfolio/tree/main/05_security_research/signguard",
    "day-25-membership-inference": "https://github.com/alazkiyai09/federated-learning-security-portfolio/tree/main/05_security_research/membership_inference_attack",
    "day-26-gradient-leakage": "https://github.com/alazkiyai09/federated-learning-security-portfolio/tree/main/05_security_research/gradient_leakage_attack",
    "day-27-property-inference": "https://github.com/alazkiyai09/federated-learning-security-portfolio/tree/main/05_security_research/property_inference_attack",
    "day-28-privacy-pipeline": "https://github.com/alazkiyai09/federated-learning-security-portfolio/tree/main/05_security_research/privacy_preserving_fl_fraud",
    "day-29-security-dashboard": "https://github.com/alazkiyai09/federated-learning-security-portfolio/tree/main/05_security_research/fl_security_dashboard",
    "day-30-capstone-paper": "https://github.com/alazkiyai09/federated-learning-security-portfolio/tree/main/05_security_research",
}

fedphish_mappings = {
    "day-01-phishing-eda": "https://github.com/alazkiyai09/FedPhish/tree/main/foundations/phishing_email_analysis",
    "day-02-ml-benchmark": "https://github.com/alazkiyai09/FedPhish/tree/main/foundations/day2_classical_ml_benchmark",
    "day-03-transformer-phishing": "https://github.com/alazkiyai09/FedPhish/tree/main/foundations/day3_transformer_phishing",
    "day-04-multi-agent-phishing": "https://github.com/alazkiyai09/FedPhish/tree/main/foundations/multi_agent_phishing_detector",
    "day-05-phishing-api": "https://github.com/alazkiyai09/FedPhish/tree/main/foundations/unified-phishing-api",
    "day-06-he-ml": "https://github.com/alazkiyai09/FedPhish/tree/main/privacy-techniques/he_ml_project",
    "day-07-tee-ml": "https://github.com/alazkiyai09/FedPhish/tree/main/privacy-techniques/tee_project",
    "day-08-hybrid-tee-ml": "https://github.com/alazkiyai09/FedPhish/tree/main/privacy-techniques/ht2ml_phishing",
    "day-09-zkp-fl": "https://github.com/alazkiyai09/FedPhish/tree/main/verifiable-fl/zkp_fl_verification",
    "day-10-verifiable-fl": "https://github.com/alazkiyai09/FedPhish/tree/main/verifiable-fl/verifiable_fl",
    "day-11-robust-verifiable-fl": "https://github.com/alazkiyai09/FedPhish/tree/main/verifiable-fl/robust_verifiable_phishing_fl",
    "day-12-pp-gbdt": "https://github.com/alazkiyai09/FedPhish/tree/main/federated-classifiers/privacy_preserving_gbdt",
    "day-13-vertical-fl-phishing": "https://github.com/alazkiyai09/FedPhish/tree/main/federated-classifiers/cross_bank_federated_phishing",
    "day-14-xai-phishing": "https://github.com/alazkiyai09/FedPhish/tree/main/federated-classifiers/human_aligned_explanation",
    "day-115-fedphish-benchmark": "https://github.com/alazkiyai09/FedPhish/tree/main/capstone/fedphish_benchmark",
    "day-116-adversarial-fl": "https://github.com/alazkiyai09/FedPhish/tree/main/capstone/adaptive_adversarial_fl",
    "day-117-fedphish-production": "https://github.com/alazkiyai09/FedPhish/tree/main/capstone/fedphish",
    "day-118-fedphish-dashboard": "https://github.comgithub.com/alazkiyai09/FedPhish/tree/main/capstone/fedphish-dashboard",
    "day-119-fedphish-paper": "https://github.com/alazkiyai09/FedPhish/tree/main/capstone/fedphish-paper",
    "day-120-phd-application": "https://github.com/alazkiyai09/FedPhish/tree/main/capstone/phd-application-russello",
    "day-121-fedphish-portfolio": "https://github.com/alazkiyai09/FedPhish",
}

production_ai_mappings = {
    "enterprise-rag": "https://github.com/alazkiyai09/production-ai-portfolio/tree/main/projects/rag/Enterprise-RAG",
    "multimodal-rag": "https://github.com/alazkiyai09/production-ai-portfolio/tree/main/projects/rag/MultiModal-RAG",
    "datachat-rag": "https://github.com/alazkiyai09/production-ai-portfolio/tree/main/projects/rag/DataChat-RAG",
    "fraud-docs-rag": "https://github.com/alazkiyai09/production-ai-portfolio/tree/main/projects/rag/fraud-docs-rag",
    "customer-support-agent": "https://github.com/alazkiyai09/production-ai-portfolio/tree/main/projects/agents/CustomerSupport-Agent",
    "fraud-triage-agent": "https://github.com/alazkiyai09/production-ai-portfolio/tree/main/projects/agents/FraudTriage-Agent",
    "ad-insights-agent": "https://github.com/alazkiyai09/production-ai-portfolio/tree/main/projects/agents/AdInsights-Agent",
    "llmops-eval": "https://github.com/alazkiyai09/production-ai-portfolio/tree/main/projects/evaluation/LLMOps-Eval",
    "stream-process-pipeline": "https://github.com/alazkiyai09/production-ai-portfolio/tree/main/projects/infrastructure/StreamProcess-Pipeline",
    "aiguard": "https://github.com/alazkiyai09/production-ai-portfolio/tree/main/projects/infrastructure/aiguard",
}

paperstego_mappings = {
    "paperstego-research": "https://github.com/alazkiyai09/pvd-lsb-modulo-steganography",
}

all_mappings = {**fl_security_mappings, **fedphish_mappings, **production_ai_mappings, **paperstego_mappings}

PROJECTS_DIR = Path("/home/ubuntu/PersonalWeb/src/content/projects")

def fix_repository_links():
    """Update repository links in project markdown files."""
    fixed_count = 0

    for slug, correct_url in all_mappings.items():
        file_path = PROJECTS_DIR / f"{slug}.md"

        if not file_path.exists():
            print(f"Skipping (not found): {slug}.md")
            continue

        content = file_path.read_text()

        # Fix the repository line
        old_repo_pattern = 'repository: "'
        if old_repo_pattern in content:
            # Find the current repository URL
            lines = content.split('\n')
            new_lines = []

            for line in lines:
                if line.startswith('repository: "'):
                    new_lines.append(f'repository: "{correct_url}"')
                    fixed_count += 1
                elif 'href="https://github.com/alazkiyai09' in line and 'Full source' in line:
                    # Also fix the link in the content body
                    new_lines.append(f'Full source code available on GitHub: [{correct_url}]({correct_url})')
                else:
                    new_lines.append(line)

            file_path.write_text('\n'.join(new_lines))
            print(f"Fixed: {slug}.md -> {correct_url}")
        else:
            print(f"No repository line found: {slug}.md")

    print(f"\nTotal files fixed: {fixed_count}")

if __name__ == "__main__":
    fix_repository_links()
