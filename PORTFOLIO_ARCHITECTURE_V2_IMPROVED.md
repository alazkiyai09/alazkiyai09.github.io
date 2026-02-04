# Portfolio Website Architecture v2.0
## Azka's AI Security & Federated Learning Research Portfolio
### Based on Analysis of satriabahari.my.id with Research-Focused Improvements

**Version:** 2.0  
**Date:** February 2026  
**Purpose:** Implementation guide for Claude Code + GLM-4.7

---

## 1. Reference Analysis: satriabahari.my.id

### 1.1 What Satria's Site Does Well ✅

| Feature | Implementation | Why It Works |
|---------|----------------|--------------|
| **Wakatime Stats** | Live coding statistics via serverless API | Shows real-time activity proof |
| **Developer Dashboard** | GitHub contributions, Codewars, Monkeytype | Gamification + credibility |
| **Internationalization** | next-intl for EN/ID | Broader audience reach |
| **Project Showcase** | Supabase PostgreSQL + ISR | Dynamic, easily updatable |
| **Chat Room** | Firebase real-time | Engagement feature |
| **Achievements Page** | Certifications & milestones | Credibility building |
| **Clean Design** | Tailwind + Framer Motion | Professional appearance |
| **Tech Stack Display** | Skill badges/icons | Quick skill overview |

### 1.2 Gaps for Research-Focused Portfolio ❌

| Gap | Problem | Your Need |
|-----|---------|-----------|
| **No Research Timeline** | Generic software dev focus | PhD application tracking, supervisor connections |
| **No Publication Section** | Missing academic credibility | Show steganography papers, research proposals |
| **Generic Project Display** | All projects look equal | Need to highlight 30-day journey progression |
| **No Activity Feed** | Dashboard shows stats, not journey | Need commit-style progress tracking |
| **No Research Proposal Showcase** | Missing thesis alignment | Show SignGuard, ZKP+LLM proposals |
| **No Domain Expertise Section** | Generic skills list | Fraud detection, banking, FL security expertise |
| **Database Dependency** | Requires Supabase setup | You need simpler, free, Git-versioned approach |

### 1.3 Architecture Comparison

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        SATRIA'S ARCHITECTURE                                │
├─────────────────────────────────────────────────────────────────────────────┤
│  Next.js + TypeScript + Tailwind + SWR + Prisma + Supabase                 │
│  ├── Dynamic content from PostgreSQL database                               │
│  ├── Firebase for real-time chat                                            │
│  ├── Multiple API integrations (Wakatime, GitHub, Codewars, Monkeytype)    │
│  ├── NextAuth for authentication                                            │
│  └── Complex env setup (20+ variables)                                      │
└─────────────────────────────────────────────────────────────────────────────┘
                                    vs
┌─────────────────────────────────────────────────────────────────────────────┐
│                     YOUR IMPROVED ARCHITECTURE                              │
├─────────────────────────────────────────────────────────────────────────────┤
│  Astro + TypeScript + Tailwind (Static-first, simpler)                     │
│  ├── Content as Markdown files (Git-versioned, no database)                │
│  ├── JSON-based activity tracking (version controlled)                      │
│  ├── Selective API integrations (GitHub only, Wakatime optional)           │
│  ├── No authentication needed (public portfolio)                            │
│  ├── Research-focused components (Timeline, Publications, Proposals)        │
│  └── Minimal env setup (2-3 variables)                                      │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Improved Architecture Design

### 2.1 Technology Stack Rationale

| Component | Satria Uses | You Should Use | Why |
|-----------|-------------|----------------|-----|
| Framework | Next.js | **Astro** | Faster builds, simpler, better for content sites |
| Database | Supabase PostgreSQL | **Markdown + JSON** | Free, Git-versioned, no maintenance |
| Styling | Tailwind CSS | **Tailwind CSS** | Keep (excellent choice) |
| Animations | Framer Motion | **Astro View Transitions + CSS** | Lighter weight |
| State | Zustand + SWR | **None needed** | Static site, no complex state |
| Auth | NextAuth | **None** | Public portfolio, no auth needed |
| i18n | next-intl | **Optional** | Focus on English for academic audience |
| Hosting | Vercel | **GitHub Pages** | Completely free, simpler |

### 2.2 Enhanced Directory Structure

```
azka-portfolio/
├── .github/
│   └── workflows/
│       ├── deploy.yml                    # Auto-deploy on push
│       └── activity-bot.yml              # Auto-generate activity from commits
│
├── public/
│   ├── favicon.ico
│   ├── og-image.png
│   ├── resume-azka-2026.pdf
│   └── assets/
│       ├── images/
│       │   ├── projects/                 # Project screenshots/diagrams
│       │   ├── research/                 # Architecture diagrams
│       │   └── publications/             # Paper thumbnails
│       └── icons/
│           └── tech/                     # Technology icons
│
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── BaseLayout.astro
│   │   │   ├── Header.astro
│   │   │   ├── Footer.astro
│   │   │   ├── Navigation.astro
│   │   │   └── ThemeToggle.astro
│   │   │
│   │   ├── ui/
│   │   │   ├── Card.astro
│   │   │   ├── Badge.astro
│   │   │   ├── Button.astro
│   │   │   ├── Tooltip.astro
│   │   │   ├── ProgressRing.astro
│   │   │   ├── SkillBar.astro
│   │   │   └── Tag.astro
│   │   │
│   │   ├── sections/
│   │   │   ├── Hero.astro                # Main landing section
│   │   │   ├── About.astro               # Professional summary
│   │   │   ├── DomainExpertise.astro     # NEW: Banking/Fraud/FL expertise
│   │   │   ├── Skills.astro              # Technical skills grid
│   │   │   ├── Experience.astro          # Work history timeline
│   │   │   ├── ProjectShowcase.astro     # Featured projects
│   │   │   ├── ResearchProposals.astro   # NEW: SignGuard, ZKP+LLM
│   │   │   ├── Publications.astro        # NEW: Academic papers
│   │   │   ├── PhDJourney.astro          # NEW: Application timeline
│   │   │   └── Contact.astro
│   │   │
│   │   └── features/
│   │       ├── ActivityFeed.astro        # GitHub-style activity
│   │       ├── ProgressDashboard.astro   # 30-day journey progress
│   │       ├── GitHubStats.astro         # Contribution calendar
│   │       ├── ResearchTimeline.astro    # Academic milestones
│   │       ├── SupervisorTracker.astro   # NEW: PhD application status
│   │       └── JourneyMilestones.astro   # NEW: 30-day breakdown
│   │
│   ├── content/
│   │   ├── config.ts                     # Content collection schemas
│   │   │
│   │   ├── projects/                     # 30-day portfolio projects
│   │   │   ├── _schema.ts
│   │   │   ├── 01-fraud-detection-baseline.md
│   │   │   ├── 02-feature-engineering.md
│   │   │   ├── 03-model-training.md
│   │   │   ├── ...
│   │   │   ├── 10-signguard-core.md
│   │   │   ├── ...
│   │   │   ├── 20-zkp-integration.md
│   │   │   ├── ...
│   │   │   └── 30-complete-system.md
│   │   │
│   │   ├── research/                     # NEW: Research proposals
│   │   │   ├── signguard-proposal.md
│   │   │   ├── zkp-llm-phishing.md
│   │   │   └── federated-fraud-detection.md
│   │   │
│   │   ├── publications/                 # Academic papers
│   │   │   ├── steganography-2024.md
│   │   │   └── ecdsa-security-2023.md
│   │   │
│   │   ├── blog/                         # Technical blog posts
│   │   │   └── *.md
│   │   │
│   │   └── supervisors/                  # NEW: PhD supervisor info
│   │       ├── prof-zomaya.md
│   │       └── prof-russello.md
│   │
│   ├── data/
│   │   ├── profile.json                  # Personal info
│   │   ├── skills.json                   # Skills with proficiency
│   │   ├── experience.json               # Work history
│   │   ├── education.json                # Academic background
│   │   ├── activity-log.json             # Activity tracking
│   │   ├── domain-expertise.json         # NEW: Banking/Fraud expertise
│   │   └── phd-applications.json         # NEW: Application tracker
│   │
│   ├── pages/
│   │   ├── index.astro                   # Homepage
│   │   ├── about.astro                   # Detailed about
│   │   ├── projects/
│   │   │   ├── index.astro               # All projects (30-day grid)
│   │   │   └── [slug].astro              # Individual project
│   │   ├── research/
│   │   │   ├── index.astro               # Research overview
│   │   │   ├── proposals/
│   │   │   │   └── [slug].astro          # Individual proposal
│   │   │   └── publications.astro        # Academic papers
│   │   ├── journey.astro                 # NEW: 30-day journey timeline
│   │   ├── activity.astro                # Full activity feed
│   │   ├── dashboard.astro               # Stats dashboard (like Satria)
│   │   └── contact.astro
│   │
│   ├── styles/
│   │   ├── global.css
│   │   └── prose.css                     # Blog/content styling
│   │
│   └── utils/
│       ├── github-api.ts
│       ├── date-utils.ts
│       └── content-utils.ts
│
├── scripts/
│   ├── add-activity.js                   # CLI: Add new activity
│   ├── add-project.js                    # CLI: Create project template
│   └── generate-stats.js                 # Generate stats JSON
│
├── astro.config.mjs
├── tailwind.config.mjs
├── package.json
└── README.md
```

---

## 3. New Components Specification

### 3.1 Domain Expertise Section (Not in Satria's Site)

This showcases your unique banking/fraud detection background that differentiates you.

```astro
---
// src/components/sections/DomainExpertise.astro
interface ExpertiseArea {
  title: string;
  years: number;
  icon: string;
  description: string;
  highlights: string[];
  technologies: string[];
}

const expertise: ExpertiseArea[] = [
  {
    title: "Banking Fraud Detection",
    years: 3,
    icon: "🏦",
    description: "Managing enterprise fraud detection systems in production banking environments",
    highlights: [
      "SAS Fraud Management platform administration",
      "Real-time transaction monitoring",
      "Rule-based and ML-based detection systems",
      "Cross-border transaction analysis"
    ],
    technologies: ["SAS FM", "SQL", "Python", "Kafka"]
  },
  {
    title: "Federated Learning Security",
    years: 1,
    icon: "🔐",
    description: "Research focus on Byzantine-resilient federated learning for financial applications",
    highlights: [
      "SignGuard: ECDSA-based verification system",
      "Poisoning attack detection and mitigation",
      "Privacy-preserving model aggregation",
      "Cross-silo FL for banking compliance"
    ],
    technologies: ["PyTorch", "PySyft", "Flower", "cryptography"]
  },
  {
    title: "Cryptographic Security",
    years: 2,
    icon: "🔑",
    description: "Published research in steganography and cryptographic methods",
    highlights: [
      "ECDSA signature schemes",
      "Zero-Knowledge Proof integration",
      "Secure multi-party computation concepts",
      "Published academic research"
    ],
    technologies: ["ECDSA", "ZKP", "Python", "cryptography"]
  }
];
---

<section class="py-16 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
  <div class="container mx-auto px-4">
    <div class="text-center mb-12">
      <span class="text-sm font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wider">
        Domain Expertise
      </span>
      <h2 class="text-3xl font-bold text-slate-900 dark:text-white mt-2">
        Specialized Knowledge Areas
      </h2>
      <p class="text-slate-600 dark:text-slate-400 mt-4 max-w-2xl mx-auto">
        Combining industry experience in banking fraud detection with cutting-edge research 
        in federated learning security and cryptographic systems.
      </p>
    </div>

    <div class="grid md:grid-cols-3 gap-8">
      {expertise.map((area) => (
        <div class="group relative bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all border border-slate-100 dark:border-slate-700">
          <!-- Icon & Years Badge -->
          <div class="flex justify-between items-start mb-4">
            <span class="text-4xl">{area.icon}</span>
            <span class="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-medium rounded-full">
              {area.years}+ years
            </span>
          </div>
          
          <!-- Title & Description -->
          <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2">
            {area.title}
          </h3>
          <p class="text-slate-600 dark:text-slate-400 text-sm mb-4">
            {area.description}
          </p>
          
          <!-- Highlights -->
          <ul class="space-y-2 mb-4">
            {area.highlights.map((highlight) => (
              <li class="flex items-start gap-2 text-sm text-slate-700 dark:text-slate-300">
                <span class="text-green-500 mt-1">✓</span>
                {highlight}
              </li>
            ))}
          </ul>
          
          <!-- Technologies -->
          <div class="flex flex-wrap gap-2 pt-4 border-t border-slate-100 dark:border-slate-700">
            {area.technologies.map((tech) => (
              <span class="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs rounded">
                {tech}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
```

### 3.2 PhD Application Tracker (Research-Specific)

```astro
---
// src/components/features/SupervisorTracker.astro
interface Application {
  id: string;
  supervisor: string;
  university: string;
  country: string;
  program: string;
  researchFocus: string;
  status: 'researching' | 'contacted' | 'applied' | 'interviewing' | 'accepted' | 'declined' | 'lost';
  appliedDate?: string;
  lastUpdate: string;
  notes?: string;
  relevantProjects: string[];
}

const applications: Application[] = [
  {
    id: "sydney-zomaya",
    supervisor: "Prof. Albert Zomaya",
    university: "University of Sydney",
    country: "🇦🇺",
    program: "MPhil/PhD Computer Science",
    researchFocus: "Distributed Systems, Cloud Computing, FL",
    status: "applied",
    appliedDate: "2026-01-15",
    lastUpdate: "2026-01-20",
    relevantProjects: ["signguard", "federated-fraud-detection"]
  },
  {
    id: "auckland-russello",
    supervisor: "Prof. Giovanni Russello",
    university: "University of Auckland",
    country: "🇳🇿",
    program: "MPhil Computer Science",
    researchFocus: "Security, Privacy, Verifiable FL",
    status: "applied",
    appliedDate: "2026-01-18",
    lastUpdate: "2026-01-25",
    notes: "Strong alignment with ZKP research",
    relevantProjects: ["zkp-llm-phishing", "signguard"]
  },
  {
    id: "sydney-nguyen",
    supervisor: "Prof. Nguyen Tran",
    university: "University of Sydney",
    country: "🇦🇺",
    program: "PhD Computer Science",
    researchFocus: "Federated Learning",
    status: "lost",
    lastUpdate: "2025-12-15",
    notes: "Arrangement discontinued",
    relevantProjects: ["federated-fraud-detection"]
  }
];

const statusConfig = {
  'researching': { label: 'Researching', color: 'bg-gray-100 text-gray-800', icon: '🔍' },
  'contacted': { label: 'Contacted', color: 'bg-yellow-100 text-yellow-800', icon: '📧' },
  'applied': { label: 'Applied', color: 'bg-blue-100 text-blue-800', icon: '📤' },
  'interviewing': { label: 'Interviewing', color: 'bg-purple-100 text-purple-800', icon: '🎤' },
  'accepted': { label: 'Accepted', color: 'bg-green-100 text-green-800', icon: '🎉' },
  'declined': { label: 'Declined', color: 'bg-red-100 text-red-800', icon: '❌' },
  'lost': { label: 'Lost', color: 'bg-gray-100 text-gray-500', icon: '⏸️' }
};
---

<section class="py-12 bg-white dark:bg-slate-900">
  <div class="container mx-auto px-4">
    <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-8">
      PhD/MPhil Application Journey
    </h3>
    
    <div class="space-y-4">
      {applications.map((app) => {
        const status = statusConfig[app.status];
        return (
          <div class={`p-4 rounded-lg border-l-4 ${
            app.status === 'lost' ? 'border-l-gray-300 bg-gray-50 dark:bg-slate-800/50 opacity-60' :
            app.status === 'accepted' ? 'border-l-green-500 bg-green-50 dark:bg-green-900/20' :
            'border-l-blue-500 bg-white dark:bg-slate-800'
          } shadow-sm`}>
            <div class="flex flex-wrap justify-between items-start gap-4">
              <div>
                <div class="flex items-center gap-2 mb-1">
                  <span>{app.country}</span>
                  <h4 class="font-semibold text-slate-900 dark:text-white">
                    {app.supervisor}
                  </h4>
                  <span class={`px-2 py-0.5 rounded-full text-xs font-medium ${status.color}`}>
                    {status.icon} {status.label}
                  </span>
                </div>
                <p class="text-sm text-slate-600 dark:text-slate-400">
                  {app.university} • {app.program}
                </p>
                <p class="text-xs text-slate-500 dark:text-slate-500 mt-1">
                  Research: {app.researchFocus}
                </p>
                {app.notes && (
                  <p class="text-xs text-slate-500 italic mt-1">
                    Note: {app.notes}
                  </p>
                )}
              </div>
              <div class="text-right text-sm">
                {app.appliedDate && (
                  <div class="text-slate-600 dark:text-slate-400">
                    Applied: {app.appliedDate}
                  </div>
                )}
                <div class="text-slate-400 text-xs">
                  Updated: {app.lastUpdate}
                </div>
              </div>
            </div>
            
            {app.relevantProjects.length > 0 && (
              <div class="mt-3 pt-3 border-t border-slate-100 dark:border-slate-700">
                <span class="text-xs text-slate-500">Relevant Projects: </span>
                {app.relevantProjects.map((proj) => (
                  <a href={`/projects/${proj}`} class="text-xs text-blue-600 hover:underline ml-2">
                    #{proj}
                  </a>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  </div>
</section>
```

### 3.3 30-Day Journey Visualization

```astro
---
// src/components/features/JourneyMilestones.astro
interface Phase {
  name: string;
  days: string;
  description: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  projects: string[];
  skills: string[];
}

const phases: Phase[] = [
  {
    name: "Foundation",
    days: "1-5",
    description: "Fraud detection fundamentals and baseline models",
    status: "completed",
    projects: ["Baseline Classifier", "Feature Engineering", "Model Evaluation"],
    skills: ["Pandas", "Scikit-learn", "Imbalanced-learn"]
  },
  {
    name: "Federated Learning Core",
    days: "6-10",
    description: "FL fundamentals and SignGuard security implementation",
    status: "completed",
    projects: ["FL Simulation", "PySyft Intro", "SignGuard Core"],
    skills: ["PySyft", "Flower", "PyTorch", "Cryptography"]
  },
  {
    name: "MLOps & Infrastructure",
    days: "11-15",
    description: "Production-grade ML pipeline and experiment tracking",
    status: "completed",
    projects: ["MLflow Integration", "Medallion Architecture", "Docker Setup"],
    skills: ["MLflow", "Docker", "DVC", "FastAPI"]
  },
  {
    name: "Security Research",
    days: "16-20",
    description: "Advanced security projects and threat analysis",
    status: "in-progress",
    projects: ["FraudwareAnalyzer", "BankingTrojanHunter", "ZKP Integration"],
    skills: ["Static Analysis", "Threat Intelligence", "ZK-SNARKs"]
  },
  {
    name: "Cross-Bank Simulation",
    days: "21-25",
    description: "Multi-institution FL with compliance constraints",
    status: "upcoming",
    projects: ["Cross-Silo FL", "Privacy Budget", "GDPR Compliance"],
    skills: ["Differential Privacy", "Secure Aggregation"]
  },
  {
    name: "Integration & Deployment",
    days: "26-30",
    description: "Complete system integration and demonstration",
    status: "upcoming",
    projects: ["Full System Demo", "Documentation", "Research Paper Draft"],
    skills: ["Technical Writing", "System Design"]
  }
];

const statusStyles = {
  'completed': 'bg-green-500',
  'in-progress': 'bg-blue-500 animate-pulse',
  'upcoming': 'bg-slate-300 dark:bg-slate-600'
};
---

<section class="py-12">
  <div class="container mx-auto px-4">
    <div class="text-center mb-10">
      <h2 class="text-3xl font-bold text-slate-900 dark:text-white">
        30-Day Portfolio Journey
      </h2>
      <p class="text-slate-600 dark:text-slate-400 mt-2">
        From fraud detection fundamentals to production-ready federated learning security
      </p>
    </div>
    
    <!-- Progress Bar -->
    <div class="max-w-3xl mx-auto mb-12">
      <div class="flex justify-between text-sm text-slate-600 dark:text-slate-400 mb-2">
        <span>Progress</span>
        <span>18/30 days (60%)</span>
      </div>
      <div class="h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
        <div class="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500" style="width: 60%"></div>
      </div>
    </div>
    
    <!-- Phase Cards -->
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {phases.map((phase, index) => (
        <div class={`relative p-6 rounded-xl border ${
          phase.status === 'completed' ? 'border-green-200 bg-green-50/50 dark:bg-green-900/10 dark:border-green-800' :
          phase.status === 'in-progress' ? 'border-blue-300 bg-blue-50/50 dark:bg-blue-900/10 dark:border-blue-700 ring-2 ring-blue-300 dark:ring-blue-600' :
          'border-slate-200 bg-slate-50/50 dark:bg-slate-800/50 dark:border-slate-700'
        }`}>
          <!-- Status Dot -->
          <div class={`absolute -top-2 -right-2 w-4 h-4 rounded-full ${statusStyles[phase.status]}`}></div>
          
          <!-- Phase Header -->
          <div class="flex items-center gap-3 mb-3">
            <div class="flex items-center justify-center w-10 h-10 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-sm">
              {phase.days}
            </div>
            <div>
              <h3 class="font-bold text-slate-900 dark:text-white">{phase.name}</h3>
              <span class={`text-xs ${
                phase.status === 'completed' ? 'text-green-600' :
                phase.status === 'in-progress' ? 'text-blue-600' : 'text-slate-500'
              }`}>
                {phase.status === 'completed' ? '✅ Completed' : 
                 phase.status === 'in-progress' ? '🔄 In Progress' : '⏳ Upcoming'}
              </span>
            </div>
          </div>
          
          <!-- Description -->
          <p class="text-sm text-slate-600 dark:text-slate-400 mb-4">
            {phase.description}
          </p>
          
          <!-- Projects -->
          <div class="mb-3">
            <h4 class="text-xs font-semibold text-slate-500 uppercase mb-2">Projects</h4>
            <div class="flex flex-wrap gap-1">
              {phase.projects.map((proj) => (
                <span class="px-2 py-0.5 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-xs rounded border border-slate-200 dark:border-slate-600">
                  {proj}
                </span>
              ))}
            </div>
          </div>
          
          <!-- Skills -->
          <div>
            <h4 class="text-xs font-semibold text-slate-500 uppercase mb-2">Skills</h4>
            <div class="flex flex-wrap gap-1">
              {phase.skills.map((skill) => (
                <span class="px-2 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs rounded">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
```

### 3.4 Research Proposal Card

```astro
---
// src/components/ui/ResearchProposalCard.astro
interface Props {
  title: string;
  subtitle: string;
  abstract: string;
  status: 'draft' | 'submitted' | 'in-review' | 'accepted';
  targetSupervisor?: string;
  keywords: string[];
  pdfUrl?: string;
  slug: string;
}

const { title, subtitle, abstract, status, targetSupervisor, keywords, pdfUrl, slug } = Astro.props;

const statusConfig = {
  'draft': { label: 'Draft', color: 'bg-gray-100 text-gray-700' },
  'submitted': { label: 'Submitted', color: 'bg-blue-100 text-blue-700' },
  'in-review': { label: 'In Review', color: 'bg-yellow-100 text-yellow-700' },
  'accepted': { label: 'Accepted', color: 'bg-green-100 text-green-700' }
};

const statusInfo = statusConfig[status];
---

<article class="group bg-white dark:bg-slate-800 rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-slate-100 dark:border-slate-700">
  <!-- Header -->
  <div class="p-6 border-b border-slate-100 dark:border-slate-700">
    <div class="flex justify-between items-start gap-4 mb-3">
      <h3 class="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
        <a href={`/research/proposals/${slug}`}>{title}</a>
      </h3>
      <span class={`px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap ${statusInfo.color}`}>
        {statusInfo.label}
      </span>
    </div>
    <p class="text-sm text-slate-600 dark:text-slate-400 font-medium">
      {subtitle}
    </p>
    {targetSupervisor && (
      <p class="text-xs text-blue-600 dark:text-blue-400 mt-2">
        🎯 Target: {targetSupervisor}
      </p>
    )}
  </div>
  
  <!-- Abstract -->
  <div class="p-6">
    <p class="text-sm text-slate-600 dark:text-slate-400 line-clamp-3">
      {abstract}
    </p>
  </div>
  
  <!-- Footer -->
  <div class="px-6 pb-6">
    <div class="flex flex-wrap gap-2 mb-4">
      {keywords.map((kw) => (
        <span class="px-2 py-0.5 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs rounded">
          {kw}
        </span>
      ))}
    </div>
    
    <div class="flex gap-3">
      <a 
        href={`/research/proposals/${slug}`}
        class="flex-1 text-center py-2 px-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-medium rounded-lg hover:bg-slate-700 dark:hover:bg-slate-100 transition-colors"
      >
        Read Full Proposal
      </a>
      {pdfUrl && (
        <a 
          href={pdfUrl}
          class="py-2 px-4 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 text-sm font-medium rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          target="_blank"
        >
          PDF ↗
        </a>
      )}
    </div>
  </div>
</article>
```

---

## 4. Data Schemas

### 4.1 Profile Data

```json
// src/data/profile.json
{
  "name": "Azka",
  "title": "AI Security Researcher & Fraud Detection Specialist",
  "tagline": "Building secure federated learning systems for financial applications",
  "location": {
    "city": "South Tangerang",
    "region": "Banten",
    "country": "Indonesia",
    "flag": "🇮🇩",
    "timezone": "Asia/Jakarta",
    "availableForRemote": true
  },
  "status": {
    "current": "Seeking PhD/MPhil supervision",
    "openTo": ["PhD positions", "MPhil positions", "Remote AI Engineering roles"]
  },
  "bio": {
    "short": "Computer Science graduate with 3+ years managing fraud detection systems in banking. Currently transitioning to AI research with focus on trustworthy AI and adversarial machine learning.",
    "long": "I combine practical experience in banking fraud detection (SAS Fraud Management) with research interests in federated learning security, cryptographic verification, and adversarial robustness. My current work focuses on SignGuard - a novel defense mechanism using ECDSA signatures to protect federated learning from poisoning attacks."
  },
  "social": {
    "github": "https://github.com/azka",
    "linkedin": "https://linkedin.com/in/azka",
    "email": "azka@example.com",
    "googleScholar": "https://scholar.google.com/citations?user=xxx"
  },
  "resume": "/resume-azka-2026.pdf"
}
```

### 4.2 Domain Expertise Data

```json
// src/data/domain-expertise.json
{
  "areas": [
    {
      "id": "fraud-detection",
      "title": "Banking Fraud Detection",
      "years": 3,
      "icon": "🏦",
      "type": "industry",
      "description": "Production fraud detection systems in banking environments",
      "highlights": [
        "SAS Fraud Management platform administration",
        "Real-time transaction monitoring at scale",
        "Rule engine configuration and optimization",
        "ML model deployment for fraud scoring"
      ],
      "technologies": ["SAS FM", "SQL", "Python", "Kafka", "Hadoop"],
      "achievements": [
        "Managed system processing 1M+ transactions/day",
        "Reduced false positive rate by 15%"
      ]
    },
    {
      "id": "federated-learning",
      "title": "Federated Learning Security",
      "years": 1,
      "icon": "🔐",
      "type": "research",
      "description": "Byzantine-resilient FL for cross-institution collaboration",
      "highlights": [
        "SignGuard: ECDSA-based model verification",
        "Poisoning attack detection and mitigation",
        "Privacy-preserving aggregation strategies",
        "Cross-bank FL under GDPR/PCI-DSS constraints"
      ],
      "technologies": ["PyTorch", "PySyft", "Flower", "cryptography"],
      "achievements": [
        "94.5% poisoning detection accuracy",
        "Novel reputation-based defense system"
      ]
    },
    {
      "id": "cryptography",
      "title": "Cryptographic Security",
      "years": 2,
      "icon": "🔑",
      "type": "research",
      "description": "Published research in steganography and cryptographic methods",
      "highlights": [
        "ECDSA signature schemes for ML",
        "Zero-Knowledge Proof integration",
        "Steganographic data hiding methods"
      ],
      "technologies": ["ECDSA", "ZKP", "AES", "SHA-256"],
      "achievements": [
        "Published steganography research",
        "ZKP+LLM phishing detection proposal"
      ]
    }
  ]
}
```

### 4.3 PhD Applications Tracker

```json
// src/data/phd-applications.json
{
  "applications": [
    {
      "id": "sydney-zomaya",
      "supervisor": {
        "name": "Prof. Albert Zomaya",
        "title": "ARC Laureate Fellow, Chair Professor",
        "researchGroup": "Centre for Distributed and High Performance Computing"
      },
      "university": "University of Sydney",
      "country": "Australia",
      "countryCode": "AU",
      "program": "MPhil/PhD Computer Science",
      "researchAlignment": [
        "Distributed Systems",
        "Cloud Computing",
        "Resource Management",
        "Federated Learning"
      ],
      "status": "applied",
      "timeline": [
        { "date": "2026-01-10", "event": "Initial research" },
        { "date": "2026-01-15", "event": "Submitted application" },
        { "date": "2026-01-20", "event": "Confirmation received" }
      ],
      "proposalUsed": "federated-fraud-detection",
      "relevantProjects": ["signguard", "mlops-pipeline"],
      "notes": "Strong alignment with distributed systems focus"
    },
    {
      "id": "auckland-russello",
      "supervisor": {
        "name": "Prof. Giovanni Russello",
        "title": "Professor of Cyber Security",
        "researchGroup": "Cyber Security Foundry"
      },
      "university": "University of Auckland",
      "country": "New Zealand",
      "countryCode": "NZ",
      "program": "MPhil Computer Science",
      "researchAlignment": [
        "Security and Privacy",
        "Verifiable Computing",
        "Access Control",
        "Federated Learning Privacy"
      ],
      "status": "applied",
      "timeline": [
        { "date": "2026-01-12", "event": "Initial research" },
        { "date": "2026-01-18", "event": "Submitted application" },
        { "date": "2026-01-25", "event": "Follow-up email sent" }
      ],
      "proposalUsed": "zkp-llm-phishing",
      "relevantProjects": ["signguard", "zkp-integration"],
      "notes": "Best fit for ZKP + verifiable FL research direction"
    }
  ],
  "statistics": {
    "total": 3,
    "active": 2,
    "accepted": 0,
    "declined": 0,
    "lost": 1
  }
}
```

---

## 5. Page Structure Comparison

### Homepage Layout Comparison

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        SATRIA'S HOMEPAGE                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│  1. Hero (Name, Title, Location, Status)                                    │
│  2. Skills Grid (Technology badges)                                         │
│  3. [Rest on other pages]                                                   │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│                        YOUR IMPROVED HOMEPAGE                               │
├─────────────────────────────────────────────────────────────────────────────┤
│  1. Hero (Name, Research Focus, PhD Status, CTA to Research)               │
│  2. Domain Expertise (3 cards: Fraud, FL Security, Crypto) ← NEW           │
│  3. 30-Day Journey Progress (Visual progress + current phase) ← NEW         │
│  4. Featured Research Proposals (SignGuard, ZKP+LLM) ← NEW                  │
│  5. Activity Feed (Recent 5 activities)                                     │
│  6. Featured Projects Grid (Top 4 projects)                                 │
│  7. PhD Application Status (Compact tracker) ← NEW                          │
│  8. Publications Highlight (If any) ← NEW                                   │
│  9. Contact CTA                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 6. Implementation Priority

### Phase 1: Core Structure (Days 1-3)
1. Astro project setup with Tailwind
2. BaseLayout, Header, Footer, Navigation
3. Homepage with Hero
4. Basic content collection setup

### Phase 2: Research-Focused Sections (Days 4-6)
1. Domain Expertise section
2. 30-Day Journey visualization
3. PhD Application Tracker
4. Research Proposals page

### Phase 3: Content Migration (Days 7-9)
1. Migrate all 30 portfolio projects to markdown
2. Create research proposal content
3. Add publication entries
4. Build activity log

### Phase 4: Activity & Dashboard (Days 10-11)
1. Activity Feed component
2. Progress Dashboard
3. GitHub stats integration (optional)

### Phase 5: Polish & Deploy (Days 12-14)
1. Dark mode
2. SEO optimization
3. Contact form
4. GitHub Pages deployment

---

## 7. Key Differentiators from Satria's Site

| Feature | Satria | Your Site | Impact |
|---------|--------|-----------|--------|
| Primary Focus | Software Dev Portfolio | Research Portfolio | Targets PhD supervisors |
| Project Structure | Flat list | 30-day journey | Shows progression & dedication |
| Domain Expertise | Generic skills | Specialized knowledge | Demonstrates depth |
| PhD Tracking | None | Application timeline | Shows academic intent |
| Research Section | None | Proposals + Publications | Academic credibility |
| Database | Supabase (complex) | Markdown/JSON (simple) | Zero cost, git-versioned |
| Updates | Manual | CLI + auto-activity | Easy maintenance |

---

**Document Version**: 2.0  
**Last Updated**: February 2026  
**Reference**: satriabahari.my.id analysis
