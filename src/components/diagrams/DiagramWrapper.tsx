import React, { useState, useEffect } from 'react';

interface DiagramNode {
  id: string;
  label: string;
  description?: string;
  type?: 'primary' | 'attack' | 'defense' | 'data' | 'success';
  detailContent?: React.ReactNode;
}

interface DiagramEdge {
  from: string;
  to: string;
  label?: string;
  animated?: boolean;
}

interface DiagramWrapperProps {
  title?: string;
  description?: string;
  children?: React.ReactNode;
  nodes?: DiagramNode[];
  edges?: DiagramEdge[];
  layout?: 'horizontal' | 'vertical' | 'grid';
  showKeyMetric?: { value: string; label: string };
}

const getNodeStyles = (type: DiagramNode['type'] = 'primary'): string => {
  const baseStyles = 'relative px-4 py-3 rounded-lg border-2 transition-all duration-300 cursor-pointer min-w-[120px] text-center';

  switch (type) {
    case 'attack':
      return `${baseStyles} bg-red-950/50 border-red-500 text-red-200 hover:border-red-400 hover:bg-red-900/50`;
    case 'defense':
      return `${baseStyles} bg-emerald-950/50 border-emerald-500 text-emerald-200 hover:border-emerald-400 hover:bg-emerald-900/50`;
    case 'success':
      return `${baseStyles} bg-emerald-950/50 border-emerald-400 text-emerald-200 hover:border-emerald-300`;
    case 'data':
      return `${baseStyles} bg-blue-950/50 border-blue-500 text-blue-200 hover:border-blue-400`;
    default:
      return `${baseStyles} bg-slate-800 border-accent text-text-primary hover:border-accent-light hover:bg-slate-700`;
  }
};

export const DiagramNodeComponent: React.FC<{
  node: DiagramNode;
  onClick?: () => void;
  isHighlighted?: boolean;
  index?: number;
}> = ({ node, onClick, isHighlighted, index = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 100);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div
      onClick={onClick}
      className={`
        ${getNodeStyles(node.type)}
        ${isHighlighted ? 'ring-2 ring-accent ring-offset-2 ring-offset-bg-primary' : ''}
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
        transform transition-all duration-500
      `}
      role="button"
      tabIndex={0}
      aria-label={`${node.label}${node.description ? `: ${node.description}` : ''}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      <span className="font-medium text-sm">{node.label}</span>
      {node.description && (
        <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-slate-900 border border-border rounded-lg text-xs text-text-muted whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-lg">
          {node.description}
        </div>
      )}
    </div>
  );
};

export const ArrowIcon: React.FC<{ direction?: 'right' | 'down' | 'left' | 'up'; animated?: boolean }> = ({
  direction = 'right',
  animated = false
}) => {
  const rotation = {
    right: 'rotate-0',
    down: 'rotate-90',
    left: 'rotate-180',
    up: '-rotate-90'
  }[direction];

  return (
    <div className={`flex items-center justify-center text-slate-500 ${animated ? 'animate-pulse' : ''}`}>
      <svg
        className={`w-6 h-6 ${rotation} ${animated ? 'text-accent' : ''}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
      </svg>
    </div>
  );
};

export const DetailPanel: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-bg-surface border border-border rounded-xl max-w-2xl w-full max-h-[80vh] overflow-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="detail-panel-title"
      >
        <div className="sticky top-0 flex items-center justify-between p-4 border-b border-border bg-bg-surface">
          <h3 id="detail-panel-title" className="text-lg font-bold text-text-primary">{title}</h3>
          <button
            onClick={onClose}
            className="p-2 text-text-muted hover:text-text-primary transition-colors rounded-lg hover:bg-bg-surface-hover"
            aria-label="Close panel"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-6 text-text-secondary">
          {children}
        </div>
      </div>
    </div>
  );
};

export const KeyMetric: React.FC<{ value: string; label: string }> = ({ value, label }) => (
  <div className="flex items-center justify-center gap-3 px-4 py-2 mt-4 bg-gradient-to-r from-accent/10 via-accent/5 to-accent/10 border border-accent/30 rounded-lg">
    <span className="text-xl font-bold text-accent">{value}</span>
    <span className="text-sm text-text-muted">{label}</span>
  </div>
);

const DiagramWrapper: React.FC<DiagramWrapperProps> = ({
  title,
  description,
  children,
  showKeyMetric
}) => {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return (
    <section className={`my-8 ${reducedMotion ? 'motion-reduce' : ''}`}>
      {(title || description) && (
        <div className="mb-4">
          {title && <h3 className="text-xl font-bold text-text-primary font-display">{title}</h3>}
          {description && <p className="text-sm text-text-muted mt-1">{description}</p>}
        </div>
      )}
      <div className="p-6 bg-bg-surface/50 border border-border rounded-xl overflow-x-auto">
        {children}
        {showKeyMetric && <KeyMetric value={showKeyMetric.value} label={showKeyMetric.label} />}
      </div>
    </section>
  );
};

export default DiagramWrapper;
