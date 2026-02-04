# Portfolio Website Architecture Specification
## Azka's AI Security & Federated Learning Research Portfolio

**Version:** 1.0  
**Date:** February 2026  
**Purpose:** Implementation guide for Claude Code + GLM-4.7

---

## 1. Executive Summary

### 1.1 Objective
Build a free, static portfolio website similar to GitHub Pages that:
- Showcases the 30-day federated learning and fraud detection portfolio journey
- Tracks updates and activity (commit-style activity tracking)
- Presents research progress visually (timeline, milestones)
- Supports easy content updates via markdown files
- Deploys automatically on push

### 1.2 Target Audience
- PhD/MPhil supervisors (Prof. Zomaya, Prof. Russello)
- AI Engineering recruiters
- Research collaborators
- Open source community

### 1.3 Recommended Tech Stack
| Component | Technology | Rationale |
|-----------|------------|-----------|
| Static Site Generator | **Astro** | Fast, markdown-first, partial hydration |
| Hosting | **GitHub Pages** or **Cloudflare Pages** | Free, auto-deploy, custom domain |
| Styling | **Tailwind CSS** | Utility-first, rapid development |
| Activity Tracking | **Custom JSON + GitHub API** | Track progress without database |
| Content | **Markdown + MDX** | Easy updates, code highlighting |
| Charts/Visualization | **Chart.js** or **D3.js** | Progress visualization |

---

## 2. Site Architecture

### 2.1 Directory Structure

```
portfolio-website/
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Actions for auto-deploy
├── public/
│   ├── favicon.ico
│   ├── og-image.png               # Social media preview
│   └── assets/
│       ├── images/
│       │   ├── projects/          # Project screenshots
│       │   └── diagrams/          # Architecture diagrams
│       └── documents/
│           └── resume.pdf
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.astro
│   │   │   ├── Footer.astro
│   │   │   ├── Navigation.astro
│   │   │   └── BaseLayout.astro
│   │   ├── ui/
│   │   │   ├── Card.astro
│   │   │   ├── Badge.astro
│   │   │   ├── Button.astro
│   │   │   ├── Timeline.astro
│   │   │   ├── ProgressBar.astro
│   │   │   └── ActivityFeed.astro
│   │   ├── sections/
│   │   │   ├── Hero.astro
│   │   │   ├── About.astro
│   │   │   ├── Skills.astro
│   │   │   ├── ProjectGrid.astro
│   │   │   ├── ResearchTimeline.astro
│   │   │   ├── Publications.astro
│   │   │   └── Contact.astro
│   │   └── features/
│   │       ├── ActivityTracker.astro
│   │       ├── GitHubContributions.astro
│   │       └── ProgressDashboard.astro
│   ├── content/
│   │   ├── config.ts              # Content collection schema
│   │   ├── projects/              # Individual project markdown files
│   │   │   ├── day-01-fraud-detection-baseline.md
│   │   │   ├── day-05-federated-learning-intro.md
│   │   │   ├── day-10-signguard-prototype.md
│   │   │   ├── day-15-mlops-pipeline.md
│   │   │   ├── day-20-zkp-integration.md
│   │   │   ├── day-25-cross-bank-simulation.md
│   │   │   └── day-30-complete-system.md
│   │   ├── blog/                   # Research notes, learnings
│   │   │   └── *.md
│   │   ├── publications/           # Academic papers
│   │   │   └── *.md
│   │   └── activity/               # Activity log entries
│   │       └── *.json
│   ├── data/
│   │   ├── skills.json
│   │   ├── experience.json
│   │   ├── education.json
│   │   └── activity-log.json      # Tracked activities
│   ├── pages/
│   │   ├── index.astro            # Homepage
│   │   ├── about.astro
│   │   ├── projects/
│   │   │   ├── index.astro        # Project listing
│   │   │   └── [slug].astro       # Dynamic project pages
│   │   ├── research.astro         # Research timeline
│   │   ├── publications.astro
│   │   ├── activity.astro         # Activity feed page
│   │   └── contact.astro
│   ├── styles/
│   │   └── global.css
│   └── utils/
│       ├── github-api.ts          # GitHub contribution fetcher
│       ├── activity-tracker.ts    # Activity logging utility
│       └── date-formatter.ts
├── scripts/
│   ├── update-activity.js         # CLI to add new activities
│   └── fetch-github-stats.js      # Fetch GitHub contribution data
├── astro.config.mjs
├── tailwind.config.mjs
├── package.json
├── tsconfig.json
└── README.md
```

### 2.2 Page Structure

```
/                          → Homepage (Hero + Featured Projects + Activity)
/about                     → About me, skills, experience
/projects                  → All 30-day portfolio projects grid
/projects/[slug]           → Individual project detail page
/research                  → Research timeline & PhD applications
/publications              → Academic publications
/activity                  → Full activity feed (GitHub-style)
/contact                   → Contact form & links
```

---

## 3. Feature Specifications

### 3.1 Activity Tracking System

**Purpose:** Track portfolio progress similar to GitHub contributions

#### 3.1.1 Activity Data Schema

```typescript
// src/content/config.ts
import { z, defineCollection } from 'astro:content';

const activitySchema = z.object({
  id: z.string(),
  date: z.string().datetime(),
  type: z.enum([
    'project_start',
    'project_complete', 
    'code_commit',
    'paper_read',
    'experiment_run',
    'blog_post',
    'skill_learned',
    'milestone_reached',
    'publication',
    'application_sent'
  ]),
  title: z.string(),
  description: z.string(),
  projectRef: z.string().optional(),
  tags: z.array(z.string()),
  metrics: z.object({
    linesOfCode: z.number().optional(),
    experimentsRun: z.number().optional(),
    papersRead: z.number().optional(),
    hoursSpent: z.number().optional()
  }).optional(),
  links: z.array(z.object({
    label: z.string(),
    url: z.string()
  })).optional()
});
```

#### 3.1.2 Sample Activity Entry

```json
// src/data/activity-log.json
{
  "activities": [
    {
      "id": "act-2026-02-03-001",
      "date": "2026-02-03T10:30:00Z",
      "type": "project_complete",
      "title": "Completed SignGuard ECDSA Verification Module",
      "description": "Implemented cryptographic signature verification for federated learning model updates using ECDSA with dynamic reputation scoring.",
      "projectRef": "day-10-signguard-prototype",
      "tags": ["federated-learning", "cryptography", "ecdsa", "security"],
      "metrics": {
        "linesOfCode": 450,
        "experimentsRun": 12,
        "hoursSpent": 8
      },
      "links": [
        { "label": "GitHub Repo", "url": "https://github.com/azka/signguard" }
      ]
    }
  ]
}
```

#### 3.1.3 Activity Feed Component

```astro
---
// src/components/features/ActivityFeed.astro
import { format, formatDistanceToNow } from 'date-fns';

interface Activity {
  id: string;
  date: string;
  type: string;
  title: string;
  description: string;
  tags: string[];
}

interface Props {
  activities: Activity[];
  limit?: number;
}

const { activities, limit = 10 } = Astro.props;
const displayActivities = activities.slice(0, limit);

const typeIcons: Record<string, string> = {
  'project_start': '🚀',
  'project_complete': '✅',
  'code_commit': '💻',
  'paper_read': '📄',
  'experiment_run': '🧪',
  'blog_post': '✍️',
  'skill_learned': '📚',
  'milestone_reached': '🏆',
  'publication': '📖',
  'application_sent': '📨'
};

const typeColors: Record<string, string> = {
  'project_start': 'bg-blue-100 text-blue-800',
  'project_complete': 'bg-green-100 text-green-800',
  'code_commit': 'bg-purple-100 text-purple-800',
  'paper_read': 'bg-yellow-100 text-yellow-800',
  'experiment_run': 'bg-orange-100 text-orange-800',
  'milestone_reached': 'bg-pink-100 text-pink-800',
};
---

<div class="activity-feed">
  <div class="space-y-4">
    {displayActivities.map((activity) => (
      <div class="activity-item flex gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
        <div class="activity-icon text-2xl">
          {typeIcons[activity.type] || '📌'}
        </div>
        <div class="activity-content flex-1">
          <div class="flex items-center gap-2 mb-1">
            <span class={`px-2 py-0.5 rounded-full text-xs font-medium ${typeColors[activity.type] || 'bg-gray-100 text-gray-800'}`}>
              {activity.type.replace('_', ' ')}
            </span>
            <time class="text-sm text-gray-500">
              {formatDistanceToNow(new Date(activity.date), { addSuffix: true })}
            </time>
          </div>
          <h4 class="font-semibold text-gray-900">{activity.title}</h4>
          <p class="text-gray-600 text-sm mt-1">{activity.description}</p>
          <div class="flex gap-2 mt-2 flex-wrap">
            {activity.tags.map((tag) => (
              <span class="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    ))}
  </div>
</div>
```

### 3.2 Progress Dashboard

#### 3.2.1 Portfolio Progress Visualization

```astro
---
// src/components/features/ProgressDashboard.astro
interface Props {
  totalDays: number;
  completedDays: number;
  totalProjects: number;
  completedProjects: number;
  papersRead: number;
  experimentsRun: number;
}

const { 
  totalDays = 30, 
  completedDays, 
  totalProjects,
  completedProjects,
  papersRead,
  experimentsRun 
} = Astro.props;

const progressPercent = Math.round((completedDays / totalDays) * 100);
---

<div class="progress-dashboard bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white">
  <h3 class="text-xl font-bold mb-6">Portfolio Progress</h3>
  
  <!-- Main Progress Ring -->
  <div class="flex items-center justify-center mb-6">
    <div class="relative w-40 h-40">
      <svg class="w-full h-full transform -rotate-90">
        <circle 
          cx="80" cy="80" r="70" 
          stroke="rgba(255,255,255,0.1)" 
          stroke-width="12" 
          fill="none" 
        />
        <circle 
          cx="80" cy="80" r="70" 
          stroke="url(#gradient)" 
          stroke-width="12" 
          fill="none"
          stroke-dasharray={`${progressPercent * 4.4} 440`}
          stroke-linecap="round"
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#3b82f6" />
            <stop offset="100%" stop-color="#8b5cf6" />
          </linearGradient>
        </defs>
      </svg>
      <div class="absolute inset-0 flex flex-col items-center justify-center">
        <span class="text-4xl font-bold">{completedDays}</span>
        <span class="text-sm text-gray-400">of {totalDays} days</span>
      </div>
    </div>
  </div>

  <!-- Stats Grid -->
  <div class="grid grid-cols-2 gap-4">
    <div class="stat-card bg-white/5 rounded-lg p-4">
      <div class="text-2xl font-bold text-blue-400">{completedProjects}</div>
      <div class="text-sm text-gray-400">Projects Completed</div>
    </div>
    <div class="stat-card bg-white/5 rounded-lg p-4">
      <div class="text-2xl font-bold text-purple-400">{papersRead}</div>
      <div class="text-sm text-gray-400">Papers Studied</div>
    </div>
    <div class="stat-card bg-white/5 rounded-lg p-4">
      <div class="text-2xl font-bold text-green-400">{experimentsRun}</div>
      <div class="text-sm text-gray-400">Experiments Run</div>
    </div>
    <div class="stat-card bg-white/5 rounded-lg p-4">
      <div class="text-2xl font-bold text-orange-400">{progressPercent}%</div>
      <div class="text-sm text-gray-400">Overall Progress</div>
    </div>
  </div>
</div>
```

### 3.3 Project Content Schema

#### 3.3.1 Project Frontmatter Structure

```markdown
---
# src/content/projects/day-10-signguard-prototype.md
title: "SignGuard: ECDSA-Based Federated Learning Defense"
day: 10
status: "completed" # draft | in-progress | completed
category: "federated-learning-security"
tags:
  - federated-learning
  - cryptography
  - ecdsa
  - poisoning-defense
  - signature-verification
summary: "Novel defense mechanism using ECDSA cryptographic signatures with dynamic reputation systems to detect and mitigate poisoning attacks in federated learning."
thumbnail: "/assets/images/projects/signguard-architecture.png"
repository: "https://github.com/azka/signguard"
demo: null
paper: null
startDate: "2026-01-15"
completedDate: "2026-01-20"
metrics:
  linesOfCode: 2500
  accuracy: 94.5
  experimentsRun: 45
technologies:
  - Python
  - PyTorch
  - PySyft
  - cryptography
  - FastAPI
researchConnection:
  supervisor: "Prof. Russello"
  university: "University of Auckland"
  relevance: "Directly supports thesis on verifiable federated learning"
---

## Overview

SignGuard is a novel defense mechanism designed to protect federated learning systems from model poisoning attacks...

## Problem Statement

Byzantine attacks in federated learning pose significant threats...

## Architecture

[Architecture diagram and explanation]

## Implementation Details

### Core Components

1. **Signature Generator**: ECDSA-based signing of model updates
2. **Reputation Manager**: Dynamic trust scoring system
3. **Aggregation Shield**: Byzantine-resilient aggregation

### Code Snippets

```python
# Example: ECDSA Signature Verification
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.asymmetric import ec

def verify_model_update(update: ModelUpdate, public_key: ec.EllipticCurvePublicKey) -> bool:
    """Verify the cryptographic signature of a model update."""
    try:
        public_key.verify(
            update.signature,
            update.serialize(),
            ec.ECDSA(hashes.SHA256())
        )
        return True
    except InvalidSignature:
        return False
```

## Results

| Metric | Baseline | SignGuard | Improvement |
|--------|----------|-----------|-------------|
| Detection Rate | 65% | 94.5% | +29.5% |
| False Positive Rate | 12% | 3.2% | -8.8% |
| Latency Overhead | - | 45ms | Acceptable |

## Key Learnings

1. ECDSA provides efficient signature generation suitable for FL updates
2. Reputation decay is crucial for adapting to dynamic adversaries
3. Threshold tuning significantly impacts false positive rates

## Future Work

- Integration with Zero-Knowledge Proofs for privacy-preserving verification
- Cross-silo deployment testing with banking simulation

## References

1. [Original SignGuard Design Document]
2. [ECDSA in Distributed Systems - Paper]
```

### 3.4 Research Timeline Component

```astro
---
// src/components/sections/ResearchTimeline.astro
interface TimelineItem {
  date: string;
  title: string;
  description: string;
  type: 'milestone' | 'application' | 'publication' | 'project';
  status: 'completed' | 'in-progress' | 'planned';
}

const timeline: TimelineItem[] = [
  {
    date: "2025-10",
    title: "Started 30-Day Portfolio Journey",
    description: "Began comprehensive federated learning and fraud detection portfolio development.",
    type: "milestone",
    status: "completed"
  },
  {
    date: "2025-11",
    title: "SignGuard Core Implementation",
    description: "Developed ECDSA-based cryptographic verification system for FL model updates.",
    type: "project",
    status: "completed"
  },
  {
    date: "2025-12",
    title: "Prof. Nguyen Supervision (Lost)",
    description: "Initial PhD arrangement with University of Sydney - later discontinued.",
    type: "application",
    status: "completed"
  },
  {
    date: "2026-01",
    title: "MPhil Application - Prof. Zomaya",
    description: "Applied for supervision at University of Sydney, focusing on distributed systems and FL.",
    type: "application",
    status: "in-progress"
  },
  {
    date: "2026-01",
    title: "MPhil Application - Prof. Russello",
    description: "Applied for supervision at University of Auckland, focusing on security and privacy.",
    type: "application",
    status: "in-progress"
  },
  {
    date: "2026-02",
    title: "ZKP + LLM Phishing Detection",
    description: "Integrating Zero-Knowledge Proofs with LLM agents for privacy-preserving phishing detection.",
    type: "project",
    status: "in-progress"
  }
];

const statusColors = {
  'completed': 'bg-green-500',
  'in-progress': 'bg-blue-500',
  'planned': 'bg-gray-400'
};
---

<div class="research-timeline relative">
  <!-- Vertical Line -->
  <div class="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
  
  <div class="space-y-8">
    {timeline.map((item, index) => (
      <div class="relative pl-12">
        <!-- Dot -->
        <div class={`absolute left-2.5 w-3 h-3 rounded-full ${statusColors[item.status]} ring-4 ring-white`}></div>
        
        <!-- Content -->
        <div class="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
          <div class="flex items-center gap-2 mb-2">
            <time class="text-sm font-medium text-gray-500">{item.date}</time>
            <span class={`px-2 py-0.5 rounded-full text-xs ${
              item.type === 'milestone' ? 'bg-yellow-100 text-yellow-800' :
              item.type === 'application' ? 'bg-purple-100 text-purple-800' :
              item.type === 'publication' ? 'bg-blue-100 text-blue-800' :
              'bg-green-100 text-green-800'
            }`}>
              {item.type}
            </span>
          </div>
          <h4 class="font-semibold text-gray-900">{item.title}</h4>
          <p class="text-gray-600 text-sm mt-1">{item.description}</p>
        </div>
      </div>
    ))}
  </div>
</div>
```

---

## 4. Implementation Phases

### Phase 1: Foundation (Days 1-3)

**Tasks:**
1. Initialize Astro project with TypeScript
2. Set up Tailwind CSS configuration
3. Create base layout components (Header, Footer, Navigation)
4. Configure content collections for projects and activities
5. Set up GitHub repository with GitHub Actions for deployment

**Commands:**
```bash
# Initialize project
npm create astro@latest portfolio-website -- --template minimal --typescript strict
cd portfolio-website

# Add integrations
npx astro add tailwind
npm install date-fns @astrojs/mdx @astrojs/sitemap

# Create directory structure
mkdir -p src/{components/{layout,ui,sections,features},content/{projects,blog,publications,activity},data,pages/projects,utils}
mkdir -p public/assets/{images/projects,documents}
mkdir -p scripts
```

**Deliverables:**
- [ ] Working Astro project with Tailwind
- [ ] Base layout components
- [ ] Content collection schemas defined
- [ ] GitHub repo with Actions workflow

### Phase 2: Core Pages (Days 4-6)

**Tasks:**
1. Build homepage with Hero, Featured Projects, Activity Feed sections
2. Create About page with skills, experience, education
3. Build Projects listing page with filtering
4. Create individual project page template
5. Implement responsive navigation

**Deliverables:**
- [ ] Fully functional homepage
- [ ] About page with all sections
- [ ] Projects grid with category filters
- [ ] Dynamic project detail pages

### Phase 3: Activity System (Days 7-9)

**Tasks:**
1. Implement activity data schema and sample data
2. Build ActivityFeed component
3. Create ProgressDashboard with visualizations
4. Build activity logging utility script
5. Create dedicated Activity page

**Deliverables:**
- [ ] Activity tracking JSON structure
- [ ] Real-time activity feed component
- [ ] Progress visualization dashboard
- [ ] CLI script for adding activities

### Phase 4: Research & Content (Days 10-12)

**Tasks:**
1. Build Research Timeline component
2. Add Publications page
3. Migrate all 30-day portfolio content to markdown
4. Add research proposal summaries
5. Link projects to research supervisors/themes

**Deliverables:**
- [ ] Research timeline with PhD applications
- [ ] Publications listing
- [ ] All portfolio projects as markdown content
- [ ] Research connection metadata

### Phase 5: Polish & Deploy (Days 13-14)

**Tasks:**
1. Add SEO metadata, OpenGraph images
2. Implement dark mode toggle
3. Add contact form (Formspree/Netlify Forms)
4. Performance optimization
5. Final testing and deployment

**Deliverables:**
- [ ] SEO-optimized pages
- [ ] Dark mode support
- [ ] Working contact form
- [ ] Live deployed site

---

## 5. Deployment Configuration

### 5.1 GitHub Actions Workflow

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: npm
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### 5.2 Astro Configuration

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://azka.github.io',
  base: '/portfolio',  // if using /portfolio subdirectory
  integrations: [
    tailwind(),
    mdx(),
    sitemap()
  ],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true
    }
  }
});
```

---

## 6. Activity Update CLI Script

```javascript
// scripts/update-activity.js
#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const ACTIVITY_FILE = path.join(__dirname, '../src/data/activity-log.json');

const ACTIVITY_TYPES = [
  'project_start',
  'project_complete',
  'code_commit',
  'paper_read',
  'experiment_run',
  'blog_post',
  'skill_learned',
  'milestone_reached',
  'publication',
  'application_sent'
];

async function prompt(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  return new Promise(resolve => {
    rl.question(question, answer => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

async function main() {
  console.log('\n📝 Add New Activity\n');
  
  // Load existing activities
  let data = { activities: [] };
  if (fs.existsSync(ACTIVITY_FILE)) {
    data = JSON.parse(fs.readFileSync(ACTIVITY_FILE, 'utf8'));
  }
  
  // Gather input
  console.log('Activity Types:', ACTIVITY_TYPES.map((t, i) => `${i+1}. ${t}`).join('\n'));
  const typeIndex = parseInt(await prompt('\nSelect type (1-10): ')) - 1;
  const type = ACTIVITY_TYPES[typeIndex] || 'code_commit';
  
  const title = await prompt('Title: ');
  const description = await prompt('Description: ');
  const tags = (await prompt('Tags (comma-separated): ')).split(',').map(t => t.trim());
  const projectRef = await prompt('Project reference (optional): ');
  
  // Create activity
  const activity = {
    id: `act-${new Date().toISOString().slice(0,10).replace(/-/g, '')}-${String(data.activities.length + 1).padStart(3, '0')}`,
    date: new Date().toISOString(),
    type,
    title,
    description,
    tags,
    ...(projectRef && { projectRef })
  };
  
  // Save
  data.activities.unshift(activity);
  fs.writeFileSync(ACTIVITY_FILE, JSON.stringify(data, null, 2));
  
  console.log('\n✅ Activity added successfully!\n');
  console.log(JSON.stringify(activity, null, 2));
}

main().catch(console.error);
```

---

## 7. Key Design Decisions

### 7.1 Why Astro?
- **Performance**: Ships zero JavaScript by default, partial hydration when needed
- **Content-first**: Built-in content collections with TypeScript validation
- **Flexibility**: Can use React/Vue components where interactivity needed
- **Developer Experience**: Fast builds, excellent markdown support

### 7.2 Why Static Site + JSON for Activity?
- **Free hosting**: GitHub Pages/Cloudflare Pages
- **No database**: Activity stored as JSON, versioned with Git
- **Transparency**: Every activity change is a Git commit
- **Simplicity**: Easy to update, no backend maintenance

### 7.3 Research Focus Integration
- Projects explicitly link to supervisor research interests
- Timeline shows PhD application progress
- Publications section highlights relevant academic work
- Tags connect projects to thesis themes

---

## 8. Content Migration Checklist

### 8.1 Portfolio Projects to Migrate
- [ ] Day 1-5: Fraud Detection Baseline → Advanced Features
- [ ] Day 6-10: Federated Learning Fundamentals → SignGuard
- [ ] Day 11-15: MLOps Infrastructure → Experiment Tracking
- [ ] Day 16-20: Security Research Projects (FraudwareAnalyzer, BankingTrojanHunter)
- [ ] Day 21-25: ZKP Integration → Cross-Bank Simulation
- [ ] Day 26-30: System Integration → Deployment

### 8.2 Research Documents
- [ ] SignGuard research proposal
- [ ] ZKP + LLM phishing detection proposal
- [ ] Supervisor alignment documents
- [ ] Publication drafts

---

## 9. Implementation Notes for Claude Code + GLM-4.7

### 9.1 Workflow Recommendation

1. **Architecture & Planning (Claude)**: Use this document as the master reference
2. **Implementation (GLM-4.7)**: Execute file creation and code writing
3. **Review & Refinement (Claude)**: Debug issues, optimize code
4. **Content Creation (Either)**: Markdown content can be written by either

### 9.2 Prompt Templates for GLM-4.7

**Initialize Project:**
```
Create an Astro project with the following structure:
[paste directory structure from Section 2.1]

Use TypeScript, Tailwind CSS, and configure for GitHub Pages deployment.
Include the GitHub Actions workflow from Section 5.1.
```

**Create Component:**
```
Create the ActivityFeed.astro component as specified:
[paste component code from Section 3.3.1]

Place it in src/components/features/ActivityFeed.astro
```

**Add Content:**
```
Create a new project markdown file following this schema:
[paste frontmatter structure from Section 3.3.1]

Project: SignGuard ECDSA-Based Federated Learning Defense
Day: 10
Status: completed
```

### 9.3 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| Astro build fails | Check content collection schema matches frontmatter |
| Tailwind not working | Ensure tailwind.config.mjs includes all content paths |
| GitHub Pages 404 | Set correct `base` in astro.config.mjs |
| Images not loading | Use absolute paths from /public or import |

---

## 10. Success Metrics

- [ ] Site loads in < 2s (Lighthouse Performance > 90)
- [ ] All 30 portfolio projects documented
- [ ] Activity feed shows at least 50 entries
- [ ] Mobile-responsive design
- [ ] Dark mode functional
- [ ] Contact form working
- [ ] GitHub Actions deploys on push
- [ ] SEO score > 90 (Lighthouse)

---

**Document Version**: 1.0  
**Last Updated**: February 2026  
**Author**: Claude (Architecture) / Azka (Implementation)
