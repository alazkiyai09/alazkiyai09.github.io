import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const InteractiveFilter = ({ categories, projects }) => {
    const [activeCategory, setActiveCategory] = useState('All');
    const [filteredProjects, setFilteredProjects] = useState(projects);

    const categoryMapping = {
        'All': [],
        'FL Security': ['federated-learning-security', 'federated-learning', 'federated learning', 'fl', 'adversarial', 'privacy-preserving'],
        'Fraud Detection': ['fraud-detection', 'fraud detection', 'anomaly-detection', 'malware'],
        'Production AI': ['production-ai', 'production ai', 'llmops', 'rag', 'agents', 'infrastructure'],
        'Cryptography': ['cryptography', 'crypto', 'ecdsa', 'steganography', 'zero-knowledge'],
        'Finance': ['financial-ml', 'finance', 'quantitative-finance', 'algorithmic-trading', 'trading', 'idx'],
        'Healthcare': ['healthcare', 'medicaid', 'clinical', 'public-health']
    };

    useEffect(() => {
        if (activeCategory === 'All') {
            setFilteredProjects(projects);
            return;
        }

        const mappingKeywords = categoryMapping[activeCategory] || [];

        const filtered = projects.filter(project => {
            const cardCategory = (project.category || '').toLowerCase().trim();
            const cardTags = (project.tags || []).map(tag => tag.toLowerCase());

            let isMatch = false;

            if (mappingKeywords.length > 0) {
                isMatch = mappingKeywords.some(keyword =>
                    cardCategory.includes(keyword) ||
                    cardTags.some(tag => tag.includes(keyword))
                );
            }

            if (!isMatch) {
                isMatch = cardCategory.includes(activeCategory.toLowerCase().trim());
            }

            return isMatch;
        });

        setFilteredProjects(filtered);
    }, [activeCategory, projects]);

    return (
        <div className="w-full">
            {/* Filter Bar */}
            <div className="flex flex-wrap gap-2 md:gap-3 justify-center mb-10">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`px-3 py-1.5 md:px-4 md:py-2 rounded-pill text-xs md:text-sm font-medium transition-all duration-200 whitespace-nowrap ${activeCategory === category
                                ? 'bg-accent text-white shadow-glow-sm'
                                : 'bg-bg-surface text-text-subtle hover:text-text-primary hover:bg-bg-surface-hover border border-border'
                            }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {/* Projects Grid */}
            <motion.div
                layout
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
                <AnimatePresence mode="popLayout">
                    {filteredProjects.map((project) => (
                        <motion.article
                            layout
                            key={project.slug}
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: -20 }}
                            transition={{ duration: 0.3, type: "spring", stiffness: 100, damping: 15 }}
                            className="glass-card p-6 flex flex-col project-card relative"
                        >
                            {/* Status and Category Badges */}
                            <div className="flex flex-wrap items-center gap-2 mb-3">
                                <span
                                    className={`badge text-xs ${project.status === 'completed' ? "bg-green-500/20 text-green-400 border border-green-500/30" :
                                            project.status === 'in-progress' ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30" :
                                                "bg-slate-500/20 text-slate-400 border border-slate-500/30"
                                        }`}
                                >
                                    {project.status}
                                </span>
                                <span className="badge-subtle text-xs px-2.5 py-0.5 rounded-full">{project.category}</span>
                            </div>

                            {/* Title */}
                            <h3 className="text-xl font-bold text-text-primary mb-2 line-clamp-2 font-display">
                                <a href={`/projects/${project.slug}`} className="hover:text-accent transition-colors">
                                    {project.title}
                                </a>
                            </h3>

                            {/* Summary */}
                            <p className="text-sm text-text-secondary mb-4 line-clamp-3 flex-1 leading-relaxed">
                                {project.summary}
                            </p>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.tags?.slice(0, 4).map((tag) => (
                                    <span key={tag} className="px-2 py-0.5 bg-white/5 text-text-primary text-xs rounded-md border border-white/10 hover:border-accent/40 transition-colors">
                                        {tag}
                                    </span>
                                ))}
                                {project.tags?.length > 4 && (
                                    <span className="text-xs text-text-muted mt-1">
                                        +{project.tags.length - 4} more
                                    </span>
                                )}
                            </div>

                            {/* Technologies */}
                            <div className="flex flex-wrap gap-1.5 mb-4">
                                {project.technologies?.slice(0, 4).map((tech) => (
                                    <span key={tech} className="px-2 py-0.5 bg-accent-bg text-accent-light text-xs rounded-md font-mono border border-accent-border hover:shadow-glow-sm transition-shadow">
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            {/* Links */}
                            <div className="flex gap-2 pt-4 border-t border-border mt-auto">
                                {project.repository && (
                                    <a
                                        href={project.repository}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 text-center py-2 px-3 bg-accent text-white text-xs font-medium rounded-btn hover:bg-accent-light transition-colors shadow-glow-sm hover:shadow-glow"
                                    >
                                        GitHub
                                    </a>
                                )}
                                {project.demo && (
                                    <a
                                        href={project.demo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 text-center py-2 px-3 border border-border text-text-primary text-xs font-medium rounded-btn hover:bg-bg-surface-hover hover:border-accent/50 transition-colors"
                                    >
                                        Demo
                                    </a>
                                )}
                                <a
                                    href={`/projects/${project.slug}`}
                                    className="flex-1 text-center py-2 px-3 border border-accent-border text-accent text-xs font-medium rounded-btn hover:bg-accent-bg transition-colors"
                                >
                                    Details
                                </a>
                            </div>
                        </motion.article>
                    ))}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default InteractiveFilter;
