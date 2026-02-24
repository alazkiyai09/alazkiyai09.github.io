import React, { useState } from 'react';
import DiagramWrapper, { ArrowIcon, DetailPanel } from './DiagramWrapper';

interface FlowStep {
  id: string;
  label: string;
  description: string;
  type: 'input' | 'process' | 'crypto' | 'output';
  details: string[];
}

const embedSteps: FlowStep[] = [
  { id: 'message', label: 'Secret Message', description: 'Plaintext to be hidden', type: 'input', details: ['UTF-8 encoding', 'Arbitrary length', 'Binary conversion'] },
  { id: 'ctr-drbg', label: 'CTR DRBG', description: 'Cryptographic random number generator', type: 'crypto', details: ['AES-256 based', 'NIST SP 800-90A', 'Predictable resistance'] },
  { id: 'aes', label: 'AES-256 Encrypt', description: 'Symmetric encryption of message', type: 'crypto', details: ['256-bit key', 'CBC mode', 'PKCS7 padding'] },
  { id: 'lsb', label: 'LSB Embedding', description: 'Least Significant Bit steganography', type: 'process', details: ['Bit-plane manipulation', 'Imperceptible changes', 'Capacity calculation'] },
  { id: 'cover', label: 'Stego Image', description: 'Output image containing hidden data', type: 'output', details: ['Visual identical', 'Metadata preserved', 'PNG lossless'] },
];

const extractSteps: FlowStep[] = [
  { id: 'stego', label: 'Stego Image', description: 'Image containing hidden message', type: 'input', details: ['PNG format', 'Pixel extraction', 'LSB reading'] },
  { id: 'lsb-extract', label: 'LSB Extraction', description: 'Extract bits from pixel LSBs', type: 'process', details: ['Sequential reading', 'Header parsing', 'Length detection'] },
  { id: 'aes-decrypt', label: 'AES-256 Decrypt', description: 'Decrypt the extracted ciphertext', type: 'crypto', details: ['Key required', 'IV extraction', 'Padding removal'] },
  { id: 'verify', label: 'Integrity Verify', description: 'Verify message integrity', type: 'crypto', details: ['HMAC validation', 'Tamper detection', 'Authentication'] },
  { id: 'output', label: 'Original Message', description: 'Recovered plaintext', type: 'output', details: ['UTF-8 decoding', 'Original format', 'Verified integrity'] },
];

const SteganoFlow: React.FC = () => {
  const [mode, setMode] = useState<'embed' | 'extract'>('embed');
  const [selectedStep, setSelectedStep] = useState<FlowStep | null>(null);

  const steps = mode === 'embed' ? embedSteps : extractSteps;

  const getTypeStyles = (type: FlowStep['type']): string => {
    switch (type) {
      case 'input': return 'border-blue-500 bg-blue-950/30';
      case 'process': return 'border-accent bg-slate-800';
      case 'crypto': return 'border-purple-500 bg-purple-950/30';
      case 'output': return 'border-emerald-500 bg-emerald-950/30';
      default: return 'border-accent bg-slate-800';
    }
  };

  return (
    <DiagramWrapper
      title="Steganography Pipeline"
      description="AES-256 encrypted LSB steganography with CTR DRBG"
      showKeyMetric={{ value: 'AES-256', label: 'Military-Grade Encryption' }}
    >
      {/* Mode Toggle */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <button
          onClick={() => setMode('embed')}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
            mode === 'embed'
              ? 'bg-accent text-white shadow-glow-sm'
              : 'bg-slate-800 text-text-muted hover:text-text-primary border border-border'
          }`}
          aria-pressed={mode === 'embed'}
        >
          Embed Message
        </button>
        <button
          onClick={() => setMode('extract')}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
            mode === 'extract'
              ? 'bg-accent text-white shadow-glow-sm'
              : 'bg-slate-800 text-text-muted hover:text-text-primary border border-border'
          }`}
          aria-pressed={mode === 'extract'}
        >
          Extract Message
        </button>
      </div>

      {/* Flow */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-3 flex-wrap">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="group relative">
              <div
                className={`px-4 py-3 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:scale-105 min-w-[110px] ${getTypeStyles(step.type)}`}
                onClick={() => setSelectedStep(step)}
                role="button"
                tabIndex={0}
                aria-label={`${step.label}: ${step.description}`}
              >
                <span className="text-sm font-medium text-text-primary">{step.label}</span>
              </div>
              {/* Tooltip */}
              <div className="absolute z-40 bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-slate-900 border border-border rounded-lg text-xs text-text-muted whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-lg">
                {step.description}
              </div>
            </div>
            {index < steps.length - 1 && (
              <ArrowIcon direction="right" />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Algorithm Info */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-purple-950/20 border border-purple-500/30 rounded-xl">
            <h4 className="text-sm font-semibold text-purple-300 mb-2">AES-256 Encryption</h4>
            <p className="text-xs text-text-muted">
              Military-grade symmetric encryption with 256-bit key length. Provides confidentiality
              even if steganography is detected.
            </p>
          </div>
          <div className="p-4 bg-blue-950/20 border border-blue-500/30 rounded-xl">
            <h4 className="text-sm font-semibold text-blue-300 mb-2">CTR DRBG</h4>
            <p className="text-xs text-text-muted">
              NIST SP 800-90A compliant deterministic random bit generator. Ensures cryptographic
              quality randomness for key generation.
            </p>
          </div>
          <div className="p-4 bg-emerald-950/20 border border-emerald-500/30 rounded-xl">
            <h4 className="text-sm font-semibold text-emerald-300 mb-2">LSB Steganography</h4>
            <p className="text-xs text-text-muted">
              Least Significant Bit embedding in pixel values. Imperceptible to human vision while
              maintaining high capacity.
            </p>
          </div>
        </div>
      </div>

      {/* Detail Panel */}
      <DetailPanel
        isOpen={!!selectedStep}
        onClose={() => setSelectedStep(null)}
        title={selectedStep?.label || ''}
      >
        {selectedStep && (
          <div className="space-y-4">
            <p className="text-text-muted">{selectedStep.description}</p>
            <div className="p-4 bg-bg-primary rounded-lg border border-border">
              <h5 className="text-sm font-semibold text-text-primary mb-3">Technical Details</h5>
              <ul className="space-y-2">
                {selectedStep.details.map((detail, idx) => (
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

export default SteganoFlow;
