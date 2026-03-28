---
title: "Lessons from 3 Years of Production Fraud Detection"
description: "Real-world lessons from managing fraud detection systems at one of Indonesia's largest banks — covering false positive management, SLA maintenance, incident response, and the gap between academic ML and production reality."
date: "2026-03-01"
tags:
  - fraud-detection
  - production-ml
  - banking
  - indonesia
  - lessons-learned
published: true
author: "Azka"
readingTime: 12
---

After 3+ years managing fraud detection systems processing millions of daily transactions at Bank Rakyat Indonesia (BRI), I've accumulated hard-won lessons about the gap between ML in papers and ML in production. This post shares the most important ones.

## The Reality of Production Fraud Detection

Academic papers optimize for precision and recall. Real production systems optimize for **staying alive at 2 AM when the alert volume spikes 300%**.

Here's what nobody tells you about running fraud detection in production.

## Lesson 1: False Positives Kill You Faster Than Missed Fraud

Every false positive is a real customer whose transaction was blocked. That's a phone call to support, a potential complaint to OJK (Indonesia's Financial Services Authority), and erosion of customer trust.

In my experience at BRI:

| Metric | Impact |
|--------|--------|
| False positive rate of 2.3% | ~230 frustrated customers per 10,000 transactions |
| Each false positive investigation | ~15 minutes of analyst time |
| Customer churn from blocked transactions | Measurable and expensive |

We spent more engineering effort reducing false positives from 2.3% to 0.9% than we did improving true positive rates. The business impact was far greater.

**Takeaway**: Design your models with false positive cost explicitly in the loss function. A missed fraud costs the bank money; a false positive costs the bank a customer.

## Lesson 2: Your Model Is Never the Bottleneck

When I started, I assumed better models meant better fraud detection. After a year, I realized the model was rarely the bottleneck:

- **Data quality**: Missing fields, duplicate entries, timezone mismatches, encoding errors. We spent significant time just ensuring consistent data quality across branches.
- **Feature freshness**: Features computed from yesterday's data miss today's fraud patterns. The gap between feature computation and model inference matters enormously.
- **Integration latency**: A model that takes 50ms to score is useless if the data pipeline adds 400ms of latency. We optimized the full pipeline, not just the model.
- **Rule engine coordination**: The ML model ran alongside hundreds of hand-crafted rules. Conflicts between rules and model decisions created operational complexity.

**Takeaway**: Invest in data infrastructure before model architecture. A simple model on clean, fresh data outperforms a complex model on stale, noisy data every time.

## Lesson 3: SLA Is Non-Negotiable

Maintaining 99.9% SLA means less than 8.76 hours of downtime per year. When your system processes millions of daily transactions, every minute of downtime means unmonitored transactions flowing through.

What I learned about maintaining high SLA:

1. **Graceful degradation**: When the ML model was down, we fell back to rule-based detection. Never leave transactions unmonitored.
2. **Health monitoring**: We checked system health every 30 seconds. Not every 5 minutes — every 30 seconds.
3. **Incident response playbooks**: Every failure mode had a documented response. When something broke at 3 AM, there was no time to debug from scratch.
4. **Capacity planning**: Transaction volumes spike during holidays, salary days, and month-end. If you're not ready for 3x normal volume, you're not ready.

We achieved 99.987% SLA compliance — exceeding the target. But getting there required treating reliability engineering as seriously as model development.

## Lesson 4: Fraud Patterns Are Regional

Indonesia has 17,000+ islands and dramatic regional variation in fraud patterns:

- **Jakarta**: Sophisticated card-not-present fraud, social engineering, account takeovers
- **Bali**: Tourism-related fraud, foreign card abuse, e-commerce fraud
- **Eastern Indonesia**: Simpler fraud patterns, identity-based fraud, lower volume but different characteristics

A single national model averages these differences into mediocrity. Our approach was hierarchical: a global model for common patterns, with regional scoring adjustments for local fraud signatures.

This experience directly motivated my interest in federated learning — the architecture naturally handles geographic heterogeneity by keeping local data local.

## Lesson 5: Adversaries Learn Faster Than Your Model

Fraudsters read the same papers you do. When we deployed a new detection rule or model update:

- Within 48 hours, fraud patterns shifted
- Within 1 week, new evasion techniques appeared
- Within 1 month, the model's effectiveness measurably declined

**Our response cycle:**

1. Model detects a pattern → 2. Fraudsters adapt → 3. New fraud vectors emerge → 4. We retrain and update → 5. Back to step 1

We reduced our incident response time from 20 minutes to 5 minutes through automation — but the adversarial cycle never stops. This is why I believe ML security research is critical: static models in an adversarial environment are fundamentally insufficient.

## Lesson 6: The Team Matters More Than the Tech

Managing a team of four engineers on 24/7 fraud detection operations taught me that:

- **Documentation saves lives**: When someone is paged at 3 AM, they need clear runbooks, not tribal knowledge
- **Rotation prevents burnout**: On-call rotation with clear escalation paths keeps the team sustainable
- **Cross-functional relationships**: The best fraud detection happens when ML engineers, compliance teams, and business analysts collaborate. Siloed ML teams miss context.
- **Knowledge transfer**: We maintained decision logs explaining why specific rules existed and what fraud patterns they targeted. Without these, institutional knowledge walks out the door.

## Lesson 7: The Gap Between Research and Production

After reading hundreds of ML papers and implementing fraud detection in production, the gap is stark:

| Research | Production |
|----------|-----------|
| Clean datasets | Messy, incomplete data |
| Balanced evaluation | Extreme class imbalance (1000:1) |
| Offline evaluation | Real-time, sub-100ms latency |
| Model accuracy | System reliability + model accuracy |
| Novel techniques | Whatever works and is maintainable |
| Single metric optimization | Multi-stakeholder trade-offs |

This gap is what drives my current research in federated learning security. I want to build defenses that work in the real world — not just on benchmark datasets.

## Moving to Research

These production experiences directly shaped my research interests:

- **Federated learning**: Because regional data heterogeneity demands distributed training
- **Byzantine robustness**: Because I've seen how adversaries adapt in real systems
- **Cryptographic verification**: Because trust in distributed systems needs mathematical guarantees, not assumptions
- **SignGuard**: Because layered defense (not single-point solutions) is how you survive in production

## Conclusion

3 years of production fraud detection taught me that the hard problems aren't algorithmic — they're operational. Clean data, reliable infrastructure, fast incident response, and sustainable team practices matter more than model architecture.

If you're building production ML systems: invest in boring infrastructure, obsess over reliability, and never underestimate how quickly adversaries adapt.

---

*For my technical work on securing federated learning against adversarial attacks, see [SignGuard](/projects/signguard) and my [FL Security Ecosystem](/projects/fl-security-ecosystem). For a deeper look at why banking fraud detection specifically needs federated learning, read [Why Banking Fraud Detection Needs Federated Learning](/blog/banking-fraud-needs-fl).*
