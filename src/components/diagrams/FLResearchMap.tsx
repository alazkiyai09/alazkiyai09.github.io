import React, { useState } from 'react';
import DiagramWrapper, { DetailPanel } from './DiagramWrapper';

interface TaxonomyNode {
  id: string;
  label: string;
  type: 'category' | 'attack' | 'defense' | 'privacy';
  children?: TaxonomyNode[];
  description: string;
  detailContent?: React.ReactNode;
  defenseIds?: string[];
}

const taxonomyData: TaxonomyNode[] = [
  {
    id: 'attacks',
    label: 'Attacks',
    type: 'attack',
    description: 'Adversarial strategies targeting federated learning systems',
    children: [
      {
        id: 'backdoor',
        label: 'Backdoor',
        type: 'attack',
        description: 'Hidden trigger injection causing targeted misclassification',
        defenseIds: ['foolsgold', 'sparse', 'norm'],
        detailContent: (
          <div className="space-y-4">
            <div className="p-4 bg-bg-primary rounded-lg border border-border">
              <h5 className="font-semibold text-red-400 mb-2">Attack Flow</h5>
              <div className="flex items-center gap-2 text-sm">
                <span className="px-2 py-1 bg-red-950/50 rounded">Trigger Pattern</span>
                <span>→</span>
                <span className="px-2 py-1 bg-red-950/50 rounded">Scale Weights</span>
                <span>→</span>
                <span className="px-2 py-1 bg-red-950/50 rounded">Inject Update</span>
                <span>→</span>
                <span className="px-2 py-1 bg-red-950/50 rounded">Target Misclass</span>
              </div>
            </div>
            <p className="text-sm text-text-muted">
              Backdoor attacks embed hidden triggers in the model during training. When the trigger appears in input data,
              the model misclassifies to a target label chosen by the attacker.
            </p>
          </div>
        )
      },
      {
        id: 'poisoning',
        label: 'Model Poisoning',
        type: 'attack',
        description: 'Manipulated gradients degrading global model performance',
        defenseIds: ['byzantine', 'norm', 'sparse'],
      },
      {
        id: 'inference',
        label: 'Inference Attack',
        type: 'attack',
        description: 'Reconstructing training data from model updates',
        defenseIds: ['secagg', 'differential', 'gradient'],
      },
    ]
  },
  {
    id: 'defenses',
    label: 'Defenses',
    type: 'defense',
    description: 'Robust aggregation and anomaly detection mechanisms',
    children: [
      {
        id: 'byzantine',
        label: 'Byzantine-Robust',
        type: 'defense',
        description: 'Median-based aggregation filtering outliers',
      },
      {
        id: 'foolsgold',
        label: 'FoolsGold',
        type: 'defense',
        description: 'Cosine similarity-based contribution weighting',
        detailContent: (
          <div className="space-y-4">
            <div className="p-4 bg-bg-primary rounded-lg border border-border">
              <h5 className="font-semibold text-emerald-400 mb-2">Similarity Matrix</h5>
              <div className="grid grid-cols-4 gap-1 text-xs">
                {[1.0, 0.3, 0.8, 0.2, 0.3, 1.0, 0.4, 0.9, 0.8, 0.4, 1.0, 0.35, 0.2, 0.9, 0.35, 1.0].map((val, i) => (
                  <div
                    key={i}
                    className={`px-2 py-1 rounded text-center ${
                      val > 0.7 ? 'bg-red-950/50 text-red-300' :
                      val > 0.4 ? 'bg-yellow-950/50 text-yellow-300' :
                      'bg-emerald-950/50 text-emerald-300'
                    }`}
                  >
                    {val.toFixed(1)}
                  </div>
                ))}
              </div>
              <p className="text-xs text-text-muted mt-2">High similarity (red) indicates potential collusion</p>
            </div>
          </div>
        )
      },
      {
        id: 'norm',
        label: 'Norm Clipping',
        type: 'defense',
        description: 'Bounding gradient magnitudes to limit impact',
      },
      {
        id: 'sparse',
        label: 'Sparse Aggregation',
        type: 'defense',
        description: 'Top-k gradient selection reducing attack surface',
      },
      {
        id: 'secagg',
        label: 'Secure Aggregation',
        type: 'defense',
        description: 'Cryptographic protocol protecting individual updates',
        detailContent: (
          <div className="space-y-4">
            <div className="p-4 bg-bg-primary rounded-lg border border-border">
              <h5 className="font-semibold text-emerald-400 mb-2">Secret Sharing Protocol</h5>
              <div className="flex items-center gap-2 text-sm flex-wrap">
                <span className="px-2 py-1 bg-blue-950/50 rounded">Client Update</span>
                <span>→</span>
                <span className="px-2 py-1 bg-blue-950/50 rounded">Secret Share</span>
                <span>→</span>
                <span className="px-2 py-1 bg-blue-950/50 rounded">Encrypt</span>
                <span>→</span>
                <span className="px-2 py-1 bg-blue-950/50 rounded">Aggregate</span>
                <span>→</span>
                <span className="px-2 py-1 bg-emerald-950/50 rounded">Decrypt Sum</span>
              </div>
            </div>
            <p className="text-sm text-text-muted">
              Server only sees the aggregated result, never individual client updates.
            </p>
          </div>
        )
      },
    ]
  },
  {
    id: 'privacy',
    label: 'Privacy',
    type: 'privacy',
    description: 'Differential privacy and gradient protection techniques',
    children: [
      {
        id: 'differential',
        label: 'DP Noise',
        type: 'privacy',
        description: 'Calibrated noise injection for formal privacy guarantees',
      },
      {
        id: 'gradient',
        label: 'Gradient Compression',
        type: 'privacy',
        description: 'Reducing information leakage through sparsification',
      },
      {
        id: 'pruning',
        label: 'Model Pruning',
        type: 'privacy',
        description: 'Removing unnecessary parameters that may leak data',
      },
      {
        id: 'pate',
        label: 'PATE Framework',
        type: 'privacy',
        description: 'Private aggregation of teacher ensembles',
      },
    ]
  },
];

const FLResearchMap: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<TaxonomyNode | null>(null);
  const [highlightedDefenses, setHighlightedDefenses] = useState<Set<string>>(new Set());

  const handleNodeClick = (node: TaxonomyNode) => {
    setSelectedNode(node);
    if (node.defenseIds) {
      setHighlightedDefenses(new Set(node.defenseIds));
    } else {
      setHighlightedDefenses(new Set());
    }
  };

  const getTypeColor = (type: TaxonomyNode['type']): string => {
    switch (type) {
      case 'attack': return 'border-red-500 bg-red-950/30';
      case 'defense': return 'border-emerald-500 bg-emerald-950/30';
      case 'privacy': return 'border-purple-500 bg-purple-950/30';
      default: return 'border-accent bg-slate-800';
    }
  };

  return (
    <DiagramWrapper
      title="Federated Learning Security Taxonomy"
      description="Interactive map of attacks, defenses, and privacy mechanisms"
      showKeyMetric={{ value: '30', label: 'Implementations · 165,000+ LoC' }}
    >
      <div className="space-y-6">
        {taxonomyData.map((category) => (
          <div key={category.id} className="space-y-3">
            {/* Category Header */}
            <div
              className={`inline-flex items-center px-4 py-2 rounded-lg border-2 ${getTypeColor(category.type)} cursor-pointer`}
              onClick={() => handleNodeClick(category)}
            >
              <span className="font-semibold">{category.label}</span>
              <span className="ml-2 text-xs text-text-muted">({category.children?.length || 0})</span>
            </div>

            {/* Children */}
            <div className="flex flex-wrap gap-2 ml-4 pl-4 border-l-2 border-border">
              {category.children?.map((child) => (
                <div key={child.id} className="group relative">
                  <div
                    className={`
                      px-3 py-2 rounded-lg border transition-all duration-300 cursor-pointer text-sm
                      ${getTypeColor(child.type)}
                      ${highlightedDefenses.has(child.id) ? 'ring-2 ring-accent ring-offset-2 ring-offset-bg-primary' : ''}
                      hover:scale-105
                    `}
                    onClick={() => handleNodeClick(child)}
                    role="button"
                    tabIndex={0}
                    aria-label={`${child.label}: ${child.description}`}
                  >
                    {child.label}
                  </div>
                  {/* Tooltip */}
                  <div className="absolute z-40 bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-slate-900 border border-border rounded-lg text-xs text-text-muted whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-lg">
                    {child.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mt-6 pt-4 border-t border-border">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-red-500" />
          <span className="text-xs text-text-muted">Attacks</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-emerald-500" />
          <span className="text-xs text-text-muted">Defenses</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-purple-500" />
          <span className="text-xs text-text-muted">Privacy</span>
        </div>
      </div>

      {/* Detail Panel */}
      <DetailPanel
        isOpen={!!selectedNode}
        onClose={() => {
          setSelectedNode(null);
          setHighlightedDefenses(new Set());
        }}
        title={selectedNode?.label || ''}
      >
        {selectedNode && (
          <div className="space-y-4">
            <p className="text-text-muted">{selectedNode.description}</p>
            {selectedNode.detailContent}
            {selectedNode.defenseIds && (
              <div className="mt-4 p-3 bg-emerald-950/30 rounded-lg border border-emerald-500/30">
                <h5 className="text-sm font-semibold text-emerald-400 mb-2">Corresponding Defenses</h5>
                <div className="flex flex-wrap gap-2">
                  {selectedNode.defenseIds.map(id => (
                    <span key={id} className="px-2 py-1 bg-emerald-950/50 rounded text-xs text-emerald-300">
                      {id.charAt(0).toUpperCase() + id.slice(1)}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </DetailPanel>
    </DiagramWrapper>
  );
};

export default FLResearchMap;
