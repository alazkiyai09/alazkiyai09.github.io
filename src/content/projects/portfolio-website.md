---
title: "Portfolio Website"
status: "completed"
category: "web-development"
tags:
  - portfolio
  - astro
  - tailwind-css
  - typescript
  - markdown
  - static-site-generator
summary: "Personal portfolio website showcasing AI security research and projects. Built with Astro, Tailwind CSS, and TypeScript for optimal performance and developer experience."
simpleSummary: "A fast, modern portfolio website to showcase my research and projects - built with cutting-edge web technologies."
technologies:
  - Astro
  - Tailwind CSS
  - TypeScript
  - MDX
  - GitHub Pages
metrics:
  linesOfCode: 3500
  lighthouse: 98
  experimentsRun: 0
startDate: "2025-01-01"
completedDate: "2025-01-31"
repository: "https://github.com/alazkiyai09/alazkiyai09.github.io"
demo: "https://alazkiyai09.github.io"
---

## Overview

This portfolio website serves as the central hub for showcasing my research, projects, and professional activities as an AI Security Researcher. Built with modern web technologies to ensure optimal performance, accessibility, and developer experience.

## Tech Stack

| Technology | Purpose |
|------------|---------|
| **Astro** | Static site generator with zero JS by default |
| **Tailwind CSS** | Utility-first CSS framework |
| **TypeScript** | Type-safe JavaScript development |
| **MDX** | Enhanced Markdown with JSX support |
| **GitHub Pages** | Static hosting with CI/CD |

## Architecture

### Project Structure

```
portfolio-website/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── BaseLayout.astro
│   │   │   ├── Header.astro
│   │   │   └── Footer.astro
│   │   ├── ui/
│   │   │   ├── Card.astro
│   │   │   ├── Badge.astro
│   │   │   └── Button.astro
│   │   └── sections/
│   │       ├── Hero.astro
│   │       ├── About.astro
│   │       └── ProjectShowcase.astro
│   ├── content/
│   │   ├── projects/      # Project markdown files
│   │   ├── blog/          # Blog posts
│   │   └── publications/  # Academic papers
│   ├── pages/             # Route pages
│   ├── styles/            # Global CSS
│   └── utils/             # Helper functions
├── public/                # Static assets
├── astro.config.mjs       # Astro configuration
└── tailwind.config.mjs    # Tailwind configuration
```

## Key Features

### 1. Content Collections

Projects are managed through Astro's content collections:

```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    status: z.enum(['completed', 'in-progress', 'draft']),
    category: z.string(),
    tags: z.array(z.string()),
    summary: z.string(),
    technologies: z.array(z.string()),
    repository: z.string().url().optional(),
    demo: z.string().url().optional(),
  }),
});

export const collections = { projects };
```

### 2. Component-Based Architecture

Reusable UI components for consistent design:

```astro
---
// src/components/ui/Card.astro
interface Props {
  title: string;
  description: string;
  tags?: string[];
}

const { title, description, tags } = Astro.props;
---

<div class="glass-card p-6">
  <h3 class="text-xl font-bold mb-2">{title}</h3>
  <p class="text-text-secondary">{description}</p>
  {tags && (
    <div class="flex gap-2 mt-4">
      {tags.map(tag => (
        <span class="badge">{tag}</span>
      ))}
    </div>
  )}
</div>
```

### 3. Responsive Design

Mobile-first approach with Tailwind CSS:

```css
/* Responsive grid */
.grid {
  @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6;
}

/* Glass morphism effect */
.glass-card {
  @apply bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl;
}
```

### 4. Performance Optimization

- **Zero JS by default**: Minimal JavaScript for fast loading
- **Image optimization**: Automatic image optimization with Sharp
- **Code splitting**: Only load necessary code per page
- **Static generation**: Pre-rendered pages for instant delivery

## Performance Metrics

| Metric | Score |
|--------|-------|
| **Performance** | 98 |
| **Accessibility** | 100 |
| **Best Practices** | 100 |
| **SEO** | 100 |

*Lighthouse scores - Desktop*

## Content Management

### Adding Projects

Create a new markdown file in `src/content/projects/`:

```yaml
---
title: "Project Title"
status: "completed"
category: "federated-learning"
tags:
  - federated-learning
  - security
summary: "Brief project description"
technologies:
  - Python
  - PyTorch
repository: "https://github.com/user/repo"
---
```

### Interactive CLI

Built-in CLI for managing activity log:

```bash
npm run update-activity
```

## Development

### Installation

```bash
git clone https://github.com/alazkiyai09/alazkiyai09.github.io.git
cd alazkiyai09.github.io
npm install
```

### Local Development

```bash
npm run dev
# Server running at http://localhost:4321
```

### Production Build

```bash
npm run build
npm run preview
```

## Deployment

The site is automatically deployed to GitHub Pages via GitHub Actions:

1. Push to `main` branch
2. GitHub Actions builds the site
3. Deployed to `https://alazkiyai09.github.io`

### Workflow

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: withastro/action@v1
        with:
          path: ./
```

## Design System

### Color Palette

```css
:root {
  --color-accent: #3b82f6;
  --color-accent-light: #60a5fa;
  --color-accent-pale: #93c5fd;
  --color-text-primary: #1f2937;
  --color-text-secondary: #6b7280;
  --color-bg-surface: #f9fafb;
}
```

### Typography

```css
.font-display {
  font-family: 'Inter', system-ui, sans-serif;
}

.font-mono {
  font-family: 'Fira Code', monospace;
}
```

## Future Enhancements

1. **Dark Mode**: Toggle between light/dark themes
2. **Blog Comments**: Add commenting system
3. **Search**: Full-text search for projects
4. **RSS Feed**: Auto-generated RSS for blog
5. **Analytics**: Privacy-friendly analytics integration

## License

MIT License

## Credits

Built with:
- [Astro](https://astro.build)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript](https://www.typescriptlang.org)
