import React from 'react';
import DiagramWrapper, { ArrowIcon } from './DiagramWrapper';

interface ArchLayer {
  id: string;
  label: string;
  description: string;
  items: string[];
  color: 'blue' | 'purple' | 'emerald' | 'orange';
}

const architectureLayers: ArchLayer[] = [
  {
    id: 'content',
    label: 'Content Layer',
    description: 'Markdown/MDX content source files',
    items: ['Project writeups', 'Blog posts', 'Resume data', 'Config files'],
    color: 'blue'
  },
  {
    id: 'framework',
    label: 'Framework Layer',
    description: 'Astro + React build system',
    items: ['Astro 5.x', 'React 19', 'Tailwind CSS', 'MDX support'],
    color: 'purple'
  },
  {
    id: 'build',
    label: 'Build Process',
    description: 'Static site generation',
    items: ['SSG compilation', 'Asset optimization', 'CSS purging', 'Image processing'],
    color: 'orange'
  },
  {
    id: 'deploy',
    label: 'Deployment',
    description: 'GitHub Pages hosting',
    items: ['GitHub Actions', 'CDN delivery', 'HTTPS', 'Custom domain'],
    color: 'emerald'
  },
];

const techStack = [
  { name: 'Astro', category: 'Framework', icon: '🚀' },
  { name: 'React', category: 'UI Library', icon: '⚛️' },
  { name: 'Tailwind CSS', category: 'Styling', icon: '🎨' },
  { name: 'TypeScript', category: 'Language', icon: '📘' },
  { name: 'MDX', category: 'Content', icon: '📝' },
  { name: 'GitHub Pages', category: 'Hosting', icon: '🌐' },
];

const PortfolioArchFlow: React.FC = () => {
  const getColorStyles = (color: ArchLayer['color']): string => {
    const colors = {
      blue: 'border-blue-500 bg-blue-950/30 hover:bg-blue-900/30',
      purple: 'border-purple-500 bg-purple-950/30 hover:bg-purple-900/30',
      orange: 'border-orange-500 bg-orange-950/30 hover:bg-orange-900/30',
      emerald: 'border-emerald-500 bg-emerald-950/30 hover:bg-emerald-900/30',
    };
    return colors[color];
  };

  const getTextColor = (color: ArchLayer['color']): string => {
    const colors = {
      blue: 'text-blue-300',
      purple: 'text-purple-300',
      orange: 'text-orange-300',
      emerald: 'text-emerald-300',
    };
    return colors[color];
  };

  return (
    <DiagramWrapper
      title="Portfolio Architecture"
      description="Modern static site architecture for optimal performance"
      showKeyMetric={{ value: '100', label: 'Lighthouse Score · Zero JS by Default' }}
    >
      {/* Architecture Flow */}
      <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-6 mb-8">
        {architectureLayers.map((layer, index) => (
          <React.Fragment key={layer.id}>
            <div className="group relative w-full lg:w-auto">
              <div
                className={`p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer min-w-[160px] ${getColorStyles(layer.color)}`}
              >
                <h4 className={`font-semibold mb-2 ${getTextColor(layer.color)}`}>
                  {layer.label}
                </h4>
                <p className="text-xs text-text-muted mb-3">{layer.description}</p>
                <ul className="space-y-1">
                  {layer.items.map((item, idx) => (
                    <li key={idx} className="text-xs text-text-secondary flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full ${getTextColor(layer.color).replace('text-', 'bg-')}`} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              {/* Tooltip */}
              <div className="absolute z-40 bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-slate-900 border border-border rounded-lg text-xs text-text-muted whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity shadow-lg">
                {layer.description}
              </div>
            </div>
            {index < architectureLayers.length - 1 && (
              <div className="hidden lg:block">
                <ArrowIcon direction="right" />
              </div>
            )}
            {index < architectureLayers.length - 1 && (
              <div className="lg:hidden">
                <ArrowIcon direction="down" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Tech Stack Grid */}
      <div className="pt-6 border-t border-border">
        <h4 className="text-sm font-semibold text-text-primary mb-4 text-center">Technology Stack</h4>
        <div className="flex flex-wrap justify-center gap-3">
          {techStack.map((tech) => (
            <div
              key={tech.name}
              className="flex items-center gap-2 px-4 py-2 bg-bg-surface border border-border rounded-lg hover:border-accent transition-colors"
            >
              <span className="text-lg">{tech.icon}</span>
              <div>
                <span className="text-sm font-medium text-text-primary">{tech.name}</span>
                <span className="text-xs text-text-muted ml-2">({tech.category})</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Features */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Zero JS Default', value: 'Astro Islands' },
            { label: 'Build Time', value: '< 30s' },
            { label: 'Bundle Size', value: '< 50KB' },
            { label: 'Lighthouse', value: '100/100' },
          ].map((metric) => (
            <div key={metric.label} className="text-center p-3 bg-bg-surface/50 rounded-lg border border-border">
              <div className="text-sm font-medium text-accent">{metric.value}</div>
              <div className="text-xs text-text-muted">{metric.label}</div>
            </div>
          ))}
        </div>
      </div>
    </DiagramWrapper>
  );
};

export default PortfolioArchFlow;
