import React, { useState } from 'react';
import DiagramWrapper, { ArrowIcon, DetailPanel } from './DiagramWrapper';

interface FlowStage {
  id: string;
  label: string;
  description: string;
  details: string[];
  type: 'data' | 'process' | 'model' | 'output';
}

const flowStages: FlowStage[] = [
  {
    id: 'transaction',
    label: 'Transaction Stream',
    description: 'Real-time transaction data ingestion',
    details: ['Kafka message queue', '10M+ daily transactions', 'Multi-source aggregation', 'Schema validation'],
    type: 'data'
  },
  {
    id: 'eda',
    label: 'EDA Pipeline',
    description: 'Exploratory data analysis and monitoring',
    details: ['Statistical profiling', 'Data drift detection', 'Anomaly flagging', 'Quality metrics'],
    type: 'process'
  },
  {
    id: 'features',
    label: 'Feature Engineering',
    description: 'Real-time feature extraction and transformation',
    details: ['300+ engineered features', 'Temporal aggregations', 'Behavioral patterns', 'Cross-entity features'],
    type: 'process'
  },
  {
    id: 'training',
    label: 'Model Training',
    description: 'Continuous model retraining pipeline',
    details: ['Weekly retraining', 'A/B testing', 'Hyperparameter tuning', 'Cross-validation'],
    type: 'process'
  },
  {
    id: 'scoring',
    label: 'Real-time Scoring API',
    description: 'Low-latency fraud scoring service',
    details: ['<10ms latency', '99.9% SLA', 'Horizontal scaling', 'Load balancing'],
    type: 'output'
  },
  {
    id: 'shap',
    label: 'SHAP Explainer',
    description: 'Model interpretability and explanation',
    details: ['Feature importance', 'Decision factors', 'Regulatory compliance', 'Audit trail'],
    type: 'output'
  },
  {
    id: 'dashboard',
    label: 'Alert Dashboard',
    description: 'Fraud analyst investigation interface',
    details: ['Case management', 'Risk prioritization', 'Action recommendations', 'Performance tracking'],
    type: 'output'
  },
];

const models = [
  { name: 'LSTM', description: 'Sequential pattern detection for transaction sequences', accuracy: '96.2%' },
  { name: 'XGBoost', description: 'Gradient boosting for tabular feature classification', accuracy: '94.8%' },
  { name: 'Isolation Forest', description: 'Unsupervised anomaly detection', accuracy: '89.3%' },
  { name: 'Autoencoder', description: 'Reconstruction error-based anomaly scoring', accuracy: '91.7%' },
];

const FraudDetectionFlow: React.FC = () => {
  const [selectedStage, setSelectedStage] = useState<FlowStage | null>(null);

  const getTypeStyles = (type: FlowStage['type']): string => {
    switch (type) {
      case 'data': return 'border-blue-500 bg-blue-950/30';
      case 'process': return 'border-accent bg-slate-800';
      case 'model': return 'border-purple-500 bg-purple-950/30';
      case 'output': return 'border-emerald-500 bg-emerald-950/30';
      default: return 'border-accent bg-slate-800';
    }
  };

  return (
    <DiagramWrapper
      title="Fraud Detection Pipeline"
      description="Production ML pipeline for real-time transaction fraud detection"
      showKeyMetric={{ value: '99.9% SLA', label: '<10ms Scoring · 10M+ Daily Transactions' }}
    >
      {/* Main Flow */}
      <div className="flex flex-col xl:flex-row items-center justify-center gap-2 xl:gap-3 flex-wrap mb-6">
        {flowStages.map((stage, index) => (
          <React.Fragment key={stage.id}>
            <div className="group relative">
              <div
                className={`px-4 py-3 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:scale-105 min-w-[120px] ${getTypeStyles(stage.type)}`}
                onClick={() => setSelectedStage(stage)}
                role="button"
                tabIndex={0}
                aria-label={`${stage.label}: ${stage.description}`}
              >
                <span className="text-sm font-medium text-text-primary">{stage.label}</span>
              </div>
              {/* Tooltip */}
              <div className="absolute z-40 bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-slate-900 border border-border rounded-lg text-xs text-text-muted whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-lg">
                {stage.description}
              </div>
            </div>
            {index < flowStages.length - 1 && (
              <ArrowIcon direction="right" />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Models Panel */}
      <div className="grid md:grid-cols-2 gap-4 mt-6 pt-6 border-t border-border">
        <div className="p-4 bg-purple-950/20 border border-purple-500/30 rounded-xl">
          <h4 className="text-sm font-semibold text-purple-300 mb-3">Ensemble Models</h4>
          <div className="space-y-2">
            {models.map((model) => (
              <div key={model.name} className="flex items-center justify-between p-2 bg-bg-primary/50 rounded-lg">
                <div>
                  <span className="text-sm font-medium text-text-primary">{model.name}</span>
                  <p className="text-xs text-text-muted">{model.description}</p>
                </div>
                <span className="text-sm font-bold text-purple-300">{model.accuracy}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 bg-emerald-950/20 border border-emerald-500/30 rounded-xl">
          <h4 className="text-sm font-semibold text-emerald-300 mb-3">Serving Infrastructure</h4>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-900/50 flex items-center justify-center">
                <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2" />
                </svg>
              </div>
              <div>
                <span className="text-sm font-medium text-text-primary">FastAPI</span>
                <p className="text-xs text-text-muted">Async REST endpoints</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-900/50 flex items-center justify-center">
                <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <span className="text-sm font-medium text-text-primary">&lt;10ms Latency</span>
                <p className="text-xs text-text-muted">P99 response time</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-900/50 flex items-center justify-center">
                <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <span className="text-sm font-medium text-text-primary">99.9% SLA</span>
                <p className="text-xs text-text-muted">Monthly uptime guarantee</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Panel */}
      <DetailPanel
        isOpen={!!selectedStage}
        onClose={() => setSelectedStage(null)}
        title={selectedStage?.label || ''}
      >
        {selectedStage && (
          <div className="space-y-4">
            <p className="text-text-muted">{selectedStage.description}</p>
            <div className="p-4 bg-bg-primary rounded-lg border border-border">
              <h5 className="text-sm font-semibold text-text-primary mb-3">Key Components</h5>
              <ul className="space-y-2">
                {selectedStage.details.map((detail, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-sm text-text-muted">
                    <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </DetailPanel>
    </DiagramWrapper>
  );
};

export default FraudDetectionFlow;
