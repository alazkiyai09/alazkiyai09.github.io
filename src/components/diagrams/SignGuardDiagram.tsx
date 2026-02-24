import React, { useState } from 'react';
import DiagramWrapper, { DiagramNodeComponent, ArrowIcon, DetailPanel } from './DiagramWrapper';

interface PipelineNode {
  id: string;
  label: string;
  description: string;
  type: 'primary' | 'attack' | 'defense' | 'success';
  normalDescription: string;
  attackDescription: string;
}

const pipelineNodes: PipelineNode[] = [
  { id: 'client', label: 'Client', description: 'User submitting signature request', type: 'primary', normalDescription: 'Legitimate user submitting signature', attackDescription: 'Malicious client submitting poisoned update' },
  { id: 'sign', label: 'Sign Module', description: 'Cryptographic signing service', type: 'primary', normalDescription: 'Signs valid data with private key', attackDescription: 'Processes malicious signature request' },
  { id: 'verify', label: 'Verify', description: 'Signature verification', type: 'primary', normalDescription: 'Verifies signature integrity', attackDescription: 'Verifies but passes to detection' },
  { id: 'detect', label: 'Detect', description: 'Attack detection engine', type: 'defense', normalDescription: 'Monitors for anomalies', attackDescription: 'Detects backdoor trigger patterns' },
  { id: 'reputation', label: 'Reputation', description: 'Client reputation scoring', type: 'primary', normalDescription: 'Maintains trust scores', attackDescription: 'Flags suspicious client behavior' },
  { id: 'aggregate', label: 'Aggregate', description: 'Secure aggregation', type: 'success', normalDescription: 'Aggregates valid contributions', attackDescription: 'Rejects malicious contributions' },
];

const attackScenarios = [
  {
    title: 'Backdoor Trigger Injection',
    description: 'Attacker embeds hidden triggers in model updates that cause misclassification when specific patterns appear in input data.',
    detection: 'Statistical anomaly detection identifies unusual weight distributions in poisoned updates.'
  },
  {
    title: 'Model Poisoning',
    description: 'Malicious clients submit manipulated gradients to degrade global model accuracy or insert vulnerabilities.',
    detection: 'Byzantine-robust aggregation filters out outlier updates using median-based approaches.'
  },
  {
    title: 'Sybil Attack',
    description: 'Adversary creates multiple fake identities to gain disproportionate influence over the training process.',
    detection: 'Reputation system tracks historical behavior and weights contributions by trustworthiness.'
  }
];

const SignGuardDiagram: React.FC = () => {
  const [showAttack, setShowAttack] = useState(false);
  const [selectedNode, setSelectedNode] = useState<PipelineNode | null>(null);

  return (
    <DiagramWrapper
      title="SignGuard Defense Pipeline"
      description="Multi-layered defense against adversarial attacks in federated learning environments"
      showKeyMetric={{ value: '94.5%', label: 'Attack Detection Rate' }}
    >
      {/* Attack Toggle */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <span className={`text-sm ${!showAttack ? 'text-text-primary font-medium' : 'text-text-muted'}`}>
          Normal Flow
        </span>
        <button
          onClick={() => setShowAttack(!showAttack)}
          className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${
            showAttack ? 'bg-red-600' : 'bg-slate-700'
          }`}
          role="switch"
          aria-checked={showAttack}
          aria-label="Toggle attack simulation"
        >
          <span
            className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-transform duration-300 ${
              showAttack ? 'left-8' : 'left-1'
            }`}
          />
        </button>
        <span className={`text-sm ${showAttack ? 'text-red-400 font-medium' : 'text-text-muted'}`}>
          Under Attack
        </span>
      </div>

      {/* Pipeline */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 flex-wrap">
        {pipelineNodes.map((node, index) => (
          <React.Fragment key={node.id}>
            <div className="group relative">
              <DiagramNodeComponent
                node={{
                  id: node.id,
                  label: node.label,
                  description: showAttack ? node.attackDescription : node.normalDescription,
                  type: showAttack && node.id === 'client' ? 'attack' : node.type,
                }}
                onClick={() => setSelectedNode(node)}
                index={index}
              />
              {/* Tooltip */}
              <div className="absolute z-40 bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-slate-900 border border-border rounded-lg text-xs text-text-muted whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-lg max-w-xs">
                {showAttack ? node.attackDescription : node.normalDescription}
              </div>
            </div>
            {index < pipelineNodes.length - 1 && (
              <ArrowIcon direction="right" animated={showAttack && node.id === 'detect'} />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Attack Info */}
      {showAttack && (
        <div className="mt-6 p-4 bg-red-950/30 border border-red-500/30 rounded-lg">
          <h4 className="text-sm font-semibold text-red-400 mb-2">Attack Scenarios Detected</h4>
          <div className="grid gap-2">
            {attackScenarios.map((scenario, idx) => (
              <div key={idx} className="text-xs text-text-muted">
                <span className="text-red-300 font-medium">{scenario.title}:</span> {scenario.detection}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Detail Panel */}
      <DetailPanel
        isOpen={!!selectedNode}
        onClose={() => setSelectedNode(null)}
        title={selectedNode?.label || ''}
      >
        {selectedNode && (
          <div className="space-y-4">
            <p className="text-text-muted">{selectedNode.description}</p>
            <div className="grid gap-4">
              <div className="p-3 bg-bg-primary rounded-lg border border-border">
                <h5 className="text-sm font-semibold text-text-primary mb-1">Normal Operation</h5>
                <p className="text-sm text-text-muted">{selectedNode.normalDescription}</p>
              </div>
              <div className="p-3 bg-red-950/30 rounded-lg border border-red-500/30">
                <h5 className="text-sm font-semibold text-red-400 mb-1">Under Attack</h5>
                <p className="text-sm text-text-muted">{selectedNode.attackDescription}</p>
              </div>
            </div>
          </div>
        )}
      </DetailPanel>
    </DiagramWrapper>
  );
};

export default SignGuardDiagram;
