import React, { useState } from 'react';
import DiagramWrapper, { ArrowIcon, DetailPanel } from './DiagramWrapper';

interface ModelConfig {
  id: string;
  name: string;
  description: string;
  metrics: {
    rmse: string;
    mae: string;
    mape: string;
  };
  features: string[];
}

const models: ModelConfig[] = [
  {
    id: 'lstm',
    name: 'LSTM',
    description: 'Long Short-Term Memory network for sequential pattern recognition',
    metrics: { rmse: '0.0234', mae: '0.0189', mape: '2.34%' },
    features: ['Temporal dependencies', 'Sequence modeling', 'Memory cells', 'Gradient clipping']
  },
  {
    id: 'svm',
    name: 'SVM',
    description: 'Support Vector Machine with RBF kernel for regression',
    metrics: { rmse: '0.0312', mae: '0.0256', mape: '3.12%' },
    features: ['Kernel trick', 'Margin maximization', 'Regularization', 'Feature scaling']
  },
  {
    id: 'knn',
    name: 'KNN',
    description: 'K-Nearest Neighbors for pattern-based prediction',
    metrics: { rmse: '0.0421', mae: '0.0334', mape: '4.21%' },
    features: ['Distance metrics', 'K optimization', 'Weighted voting', 'Local patterns']
  },
  {
    id: 'ensemble',
    name: 'Ensemble',
    description: 'Weighted combination of all models for improved accuracy',
    metrics: { rmse: '0.0198', mae: '0.0156', mape: '1.98%' },
    features: ['Model stacking', 'Weight optimization', 'Variance reduction', 'Robust predictions']
  },
];

const featurePipeline = [
  { id: 'market', label: 'Market Data', description: 'Historical prices, volumes, indicators' },
  { id: 'features', label: 'Feature Pipeline', description: 'Technical indicators, lag features, rolling stats' },
  { id: 'benchmark', label: 'Model Benchmark', description: 'Cross-validation, hyperparameter tuning' },
];

const FinancialMLFlow: React.FC = () => {
  const [selectedModel, setSelectedModel] = useState<ModelConfig | null>(null);
  const [hoveredModel, setHoveredModel] = useState<string | null>(null);

  return (
    <DiagramWrapper
      title="Financial ML Pipeline"
      description="Multi-model comparison for stock price prediction"
      showKeyMetric={{ value: '1.98% MAPE', label: 'Ensemble Model · Best Performance' }}
    >
      {/* Feature Pipeline */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 mb-8">
        {featurePipeline.map((stage, index) => (
          <React.Fragment key={stage.id}>
            <div className="group relative">
              <div className="px-4 py-3 bg-blue-950/30 border-2 border-blue-500 rounded-xl">
                <span className="text-sm font-medium text-blue-200">{stage.label}</span>
              </div>
              {/* Tooltip */}
              <div className="absolute z-40 bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-slate-900 border border-border rounded-lg text-xs text-text-muted whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-lg">
                {stage.description}
              </div>
            </div>
            {index < featurePipeline.length - 1 && (
              <ArrowIcon direction="right" />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Model Comparison Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {models.map((model) => (
          <div
            key={model.id}
            className={`
              relative group p-4 rounded-xl border-2 cursor-pointer transition-all duration-300
              ${model.id === 'ensemble'
                ? 'bg-emerald-950/30 border-emerald-500 hover:border-emerald-400'
                : 'bg-slate-800 border-accent hover:border-accent-light'
              }
              ${hoveredModel === model.id ? 'scale-105' : ''}
            `}
            onClick={() => setSelectedModel(model)}
            onMouseEnter={() => setHoveredModel(model.id)}
            onMouseLeave={() => setHoveredModel(null)}
            role="button"
            tabIndex={0}
            aria-label={`${model.name}: ${model.description}`}
          >
            {/* Best Badge */}
            {model.id === 'ensemble' && (
              <div className="absolute -top-2 -right-2 px-2 py-0.5 bg-emerald-500 text-white text-xs font-bold rounded-full">
                BEST
              </div>
            )}

            <h4 className={`font-semibold mb-2 ${model.id === 'ensemble' ? 'text-emerald-300' : 'text-text-primary'}`}>
              {model.name}
            </h4>

            {/* Metrics */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-text-muted">RMSE:</span>
                <span className="text-text-primary font-mono">{model.metrics.rmse}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-text-muted">MAE:</span>
                <span className="text-text-primary font-mono">{model.metrics.mae}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-text-muted">MAPE:</span>
                <span className={`font-mono ${model.id === 'ensemble' ? 'text-emerald-300' : 'text-accent'}`}>
                  {model.metrics.mape}
                </span>
              </div>
            </div>

            {/* Hover indicator */}
            <div className="mt-3 text-xs text-text-muted opacity-0 group-hover:opacity-100 transition-opacity">
              Click for details →
            </div>
          </div>
        ))}
      </div>

      {/* Performance Bar Chart */}
      <div className="mt-6 pt-6 border-t border-border">
        <h4 className="text-sm font-semibold text-text-primary mb-4">Model Performance (MAPE)</h4>
        <div className="space-y-3">
          {models.map((model) => {
            const mapeValue = parseFloat(model.metrics.mape);
            const barWidth = (1 - (mapeValue - 1.5) / 3) * 100;

            return (
              <div key={model.id} className="flex items-center gap-4">
                <span className="w-20 text-sm text-text-muted">{model.name}</span>
                <div className="flex-1 h-6 bg-bg-primary rounded-lg overflow-hidden">
                  <div
                    className={`h-full rounded-lg transition-all duration-500 ${
                      model.id === 'ensemble'
                        ? 'bg-gradient-to-r from-emerald-600 to-emerald-400'
                        : 'bg-gradient-to-r from-accent to-accent-light'
                    }`}
                    style={{ width: `${barWidth}%` }}
                  />
                </div>
                <span className={`w-16 text-sm font-mono text-right ${
                  model.id === 'ensemble' ? 'text-emerald-300' : 'text-text-primary'
                }`}>
                  {model.metrics.mape}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detail Panel */}
      <DetailPanel
        isOpen={!!selectedModel}
        onClose={() => setSelectedModel(null)}
        title={selectedModel?.name || ''}
      >
        {selectedModel && (
          <div className="space-y-4">
            <p className="text-text-muted">{selectedModel.description}</p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-bg-primary rounded-lg border border-border">
                <h5 className="text-sm font-semibold text-text-primary mb-3">Performance Metrics</h5>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-text-muted">RMSE</span>
                    <span className="font-mono text-accent">{selectedModel.metrics.rmse}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">MAE</span>
                    <span className="font-mono text-accent">{selectedModel.metrics.mae}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">MAPE</span>
                    <span className="font-mono text-accent">{selectedModel.metrics.mape}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-bg-primary rounded-lg border border-border">
                <h5 className="text-sm font-semibold text-text-primary mb-3">Key Features</h5>
                <ul className="space-y-2">
                  {selectedModel.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-text-muted">
                      <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </DetailPanel>
    </DiagramWrapper>
  );
};

export default FinancialMLFlow;
