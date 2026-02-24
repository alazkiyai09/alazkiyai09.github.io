import React, { useState } from 'react';
import DiagramWrapper, { ArrowIcon, DetailPanel } from './DiagramWrapper';

interface PipelineStage {
  id: string;
  label: string;
  description: string;
  details: string[];
  icon: string;
}

const pipelineStages: PipelineStage[] = [
  {
    id: 'pe-file',
    label: 'PE File Input',
    description: 'Windows Portable Executable file ingestion',
    details: ['Parses PE headers', 'Extracts section info', 'Validates file structure'],
    icon: '📄'
  },
  {
    id: 'parser',
    label: 'Static Parser',
    description: 'Binary structure analysis',
    details: ['Import/Export tables', 'Resource sections', 'Digital signatures', 'Packed sections detection'],
    icon: '🔍'
  },
  {
    id: 'api-extractor',
    label: 'API Extractor',
    description: 'Windows API call sequence extraction',
    details: ['DLL dependencies', 'Function imports', 'API call patterns', 'Suspicious API detection'],
    icon: '🔗'
  },
  {
    id: 'string-analyzer',
    label: 'String Analyzer',
    description: 'Embedded string extraction and classification',
    details: ['URLs and IPs', 'File paths', 'Registry keys', 'Encryption keys'],
    icon: '📝'
  },
  {
    id: 'yara',
    label: 'YARA Scanner',
    description: 'Pattern matching against malware signatures',
    details: ['Custom rule engine', '50+ malware families', 'Behavioral patterns', 'Obfuscation detection'],
    icon: '🎯'
  },
  {
    id: 'ml-classifier',
    label: 'ML Classifier',
    description: 'Machine learning-based malware classification',
    details: ['Random Forest ensemble', 'Feature extraction (500+)', 'Family classification', 'Confidence scoring'],
    icon: '🤖'
  },
  {
    id: 'report',
    label: 'Report Generator',
    description: 'Comprehensive analysis report output',
    details: ['Threat level assessment', 'IOC extraction', 'Mitigation recommendations', 'JSON/HTML output'],
    icon: '📊'
  },
];

const malwareFamilies = [
  { name: 'Emotet', type: 'Banking Trojan', severity: 'critical' },
  { name: 'TrickBot', type: 'Botnet', severity: 'critical' },
  { name: 'Ryuk', type: 'Ransomware', severity: 'critical' },
  { name: 'QakBot', type: 'Banking Trojan', severity: 'high' },
  { name: 'Dridex', type: 'Banking Trojan', severity: 'high' },
  { name: 'Formbook', type: 'InfoStealer', severity: 'high' },
  { name: 'AgentTesla', type: 'InfoStealer', severity: 'medium' },
  { name: 'AsyncRAT', type: 'RAT', severity: 'medium' },
];

const FraudwarePipeline: React.FC = () => {
  const [selectedStage, setSelectedStage] = useState<PipelineStage | null>(null);

  return (
    <DiagramWrapper
      title="Malware Analysis Pipeline"
      description="Static analysis pipeline for Windows PE file classification"
      showKeyMetric={{ value: '95.7%', label: 'Accuracy · 50+ Malware Families' }}
    >
      {/* Pipeline Flow */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-2 lg:gap-3 flex-wrap">
        {pipelineStages.map((stage, index) => (
          <React.Fragment key={stage.id}>
            <div className="group relative">
              <div
                className="flex flex-col items-center p-4 bg-slate-800 border-2 border-accent rounded-xl cursor-pointer transition-all duration-300 hover:border-accent-light hover:bg-slate-700 min-w-[100px]"
                onClick={() => setSelectedStage(stage)}
                role="button"
                tabIndex={0}
                aria-label={`${stage.label}: ${stage.description}`}
              >
                <span className="text-2xl mb-2">{stage.icon}</span>
                <span className="text-sm font-medium text-text-primary text-center">{stage.label}</span>
              </div>
              {/* Tooltip */}
              <div className="absolute z-40 bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-slate-900 border border-border rounded-lg text-xs text-text-muted whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-lg">
                {stage.description}
              </div>
            </div>
            {index < pipelineStages.length - 1 && (
              <ArrowIcon direction="right" />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Malware Families Coverage */}
      <div className="mt-8 pt-6 border-t border-border">
        <h4 className="text-sm font-semibold text-text-primary mb-3">Malware Family Coverage</h4>
        <div className="flex flex-wrap gap-2">
          {malwareFamilies.map((family) => (
            <div
              key={family.name}
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                family.severity === 'critical' ? 'bg-red-950/50 text-red-300 border border-red-500/30' :
                family.severity === 'high' ? 'bg-orange-950/50 text-orange-300 border border-orange-500/30' :
                'bg-yellow-950/50 text-yellow-300 border border-yellow-500/30'
              }`}
            >
              {family.name}
              <span className="ml-1 opacity-60">({family.type})</span>
            </div>
          ))}
          <div className="px-3 py-1 rounded-full text-xs font-medium bg-slate-700 text-text-muted border border-border">
            +42 more families
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
              <h5 className="text-sm font-semibold text-text-primary mb-3">Key Functions</h5>
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

export default FraudwarePipeline;
