# Azka's Portfolio Website - Project Documentation

**Repository:** [alazkiyai09/alazkiyai09.github.io](https://github.com/alazkiyai09/alazkiyai09.github.io)
**Live Site:** [https://alazkiyai09.github.io](https://alazkiyai09.github.io)
**Last Updated:** February 6, 2026

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Setup & Development](#setup--development)
5. [Content Management](#content-management)
6. [Deployment](#deployment)
7. [Recent Changes (Feb 2026)](#recent-changes-feb-2026)
8. [Important Files](#important-files)
9. [Troubleshooting](#troubleshooting)
10. [Future Improvements](#future-improvements)

---

## Project Overview

A personal portfolio website showcasing a 30-day journey in AI security, federated learning, and fraud detection research. Built with Astro and Tailwind CSS, featuring:

- **Hero Section:** Dynamic stats (projects, publications, journey progress)
- **Activity Feed:** Real-time tracking of portfolio work
- **Project Showcase:** 30-day journey projects with detailed pages
- **Publications:** Academic research papers
- **About Page:** Background, skills, and experience

**Target Audience:** Industry recruiters, academic collaborators, and general visitors

---

## Tech Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| **Astro** | Static Site Generator | Latest |
| **Tailwind CSS** | Styling | v3.x |
| **TypeScript** | Type Safety | Latest |
| **Markdown** | Content Authoring | - |
| **MDX** | Enhanced Markdown | - |

**Why Astro?**
- Static site generation (fast, SEO-friendly)
- Zero JavaScript by default
- Content collections for structured data
- Easy deployment to GitHub Pages

---

## Project Structure

```
PersonalWeb/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── BaseLayout.astro      # Main layout wrapper
│   │   │   ├── Footer.astro          # Site footer
│   │   │   ├── Header.astro          # Navigation header
│   │   │   └── Navigation.astro      # Nav menu
│   │   ├── sections/
│   │   │   ├── Hero.astro            # Hero section with stats
│   │   │   ├── About.astro           # About section
│   │   │   ├── Skills.astro          # Skills display
│   │   │   └── Experience.astro      # Work experience
│   │   ├── ui/
│   │   │   ├── Button.astro          # Reusable button
│   │   │   ├── Badge.astro           # Status badges
│   │   │   ├── Card.astro            # Project cards
│   │   │   └── Tag.astro             # Tag components
│   │   └── features/
│   │       ├── ActivityFeed.astro    # Activity timeline
│   │       └── ProgressDashboard.astro # Journey progress
│   ├── content/
│   │   ├── projects/                 # Project markdown files
│   │   │   ├── day-01-fraud-detection-baseline.md
│   │   │   ├── day-05-feature-engineering.md
│   │   │   ├── day-10-signguard-core.md
│   │   │   ├── day-18-malware-analyzer.md
│   │   │   └── day-20-zkp-integration.md
│   │   └── publications/             # Publication entries
│   │       └── steganography-2024.md
│   ├── data/
│   │   ├── profile.json              # Personal info & status
│   │   ├── activity-log.json         # Activity feed entries
│   │   ├── publications.json         # Publications list
│   │   ├── skills.json               # Skills data
│   │   └── education.json            # Education history
│   ├── pages/
│   │   ├── index.astro               # Homepage
│   │   ├── about.astro               # About page
│   │   ├── projects/
│   │   │   ├── index.astro           # Projects listing
│   │   │   └── [slug].astro          # Dynamic project pages
│   │   ├── activity.astro            # Activity feed page
│   │   ├── publications.astro        # Publications page
│   │   ├── journey.astro             # Journey timeline
│   │   └── contact.astro             # Contact page
│   ├── styles/
│   │   └── global.css                # Global styles
│   └── utils/
│       └── content-utils.ts          # Helper functions
├── public/                           # Static assets
├── dist/                             # Build output (gitignored)
├── astro.config.mjs                  # Astro configuration
├── tailwind.config.mjs               # Tailwind configuration
├── tsconfig.json                     # TypeScript config
└── package.json                      # Dependencies

```

---

## Setup & Development

### Prerequisites
- Node.js 20+
- npm or yarn

### Installation

```bash
# Clone repository
git clone https://github.com/alazkiyai09/alazkiyai09.github.io.git
cd PersonalWeb

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:4321
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (localhost:4321) |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run update-activity` | Add new activity entries |
| `npm run generate-stats` | Generate statistics |

---

## Content Management

### Adding Projects

Create a new markdown file in `src/content/projects/`:

```yaml
---
title: "Project Title"
day: 1
status: "completed"  # or "in-progress"
category: "federated-learning"
tags:
  - federated-learning
  - security
summary: "Brief project description"
technologies:
  - Python
  - PyTorch
metrics:
  linesOfCode: 1000
  accuracy: 95.5
  experimentsRun: 10
startDate: "2026-01-15"
completedDate: "2026-01-17"
repository: "https://github.com/alazkiyai09/repo-name"
---

## Overview

Project description...
```

### Adding Activities

Edit `src/data/activity-log.json`:

```json
{
  "id": "act-2026-02-06-001",
  "date": "2026-02-06T10:30:00Z",
  "type": "project_complete",
  "title": "Completed Project X",
  "description": "Detailed description...",
  "projectRef": "day-XX-project-slug",
  "tags": ["tag1", "tag2"],
  "metrics": {
    "linesOfCode": 500,
    "hoursSpent": 8
  },
  "links": [
    { "label": "GitHub", "url": "https://github.com/..." }
  ]
}
```

**Activity Types:**
- `project_complete`
- `project_start`
- `code_commit`
- `experiment_run`
- `paper_read`
- `blog_post`
- `milestone_reached`

### Updating Profile

Edit `src/data/profile.json`:

```json
{
  "name": "Your Full Name",
  "displayName": "Display Name",
  "title": "Your Title",
  "tagline": "One-line description",
  "status": {
    "current": "Open to Opportunities",
    "openTo": ["Role 1", "Role 2"]
  },
  "social": {
    "github": "https://github.com/alazkiyai09",
    "linkedin": "https://linkedin.com/in/...",
    "googleScholar": ""
  }
}
```

---

## Deployment

### GitHub Pages (Automatic)

**Repository Settings:**
- Source: Deploy from a branch
- Branch: `main` /root
- Build command: `npm run build`
- Build output: `dist`

**Workflow:**
1. Push to `main` branch
2. GitHub Actions builds site automatically
3. Deployed to `https://alazkiyai09.github.io`

### Manual Deployment

```bash
# Build site
npm run build

# Deploy (if using custom workflow)
# The dist/ folder contains the built site
```

### Important Notes

⚠️ **Repository Visibility:**
- **Free Account:** Repository must be **PUBLIC** for GitHub Pages to work
- **Paid Account:** Can use private repos, but website is still public
- Making repo private on free account = website goes offline

---

## Recent Changes (Feb 2026)

### Major Fixes Implemented

**Date:** February 4, 2026
**Commit:** `21604177`, `a1ec118f`

#### 1. Fixed Broken GitHub Links (5 files)
- Changed from `github.com/azka` → `github.com/alazkiyai09`
- Files:
  - `src/content/projects/day-10-signguard-core.md`
  - `src/content/projects/day-18-malware-analyzer.md`
  - `src/content/publications/steganography-2024.md`
  - `src/components/layout/Footer.astro`
  - `src/data/activity-log.json`

#### 2. Fixed Projects Counter
- **Before:** Hero showed "1 Projects Done"
- **After:** Hero shows "4 Projects Done"
- **File:** `src/components/sections/Hero.astro`
- **Change:** `const completedProjects = 4; // day-01, day-05, day-10, day-18`

#### 3. Removed PhD/MPhil References (5 files)
- **Purpose:** Transform from "PhD-seeking" to "general portfolio showcase"
- Changes:
  - Status: "Seeking PhD/MPhil supervision" → "Open to Opportunities"
  - Removed MPhil application entry (Prof. Zomaya)
  - Removed `researchConnection` blocks from projects
  - Removed Research Connection display section
- Files:
  - `src/data/profile.json`
  - `src/data/activity-log.json`
  - `src/content/projects/day-01-fraud-detection-baseline.md`
  - `src/content/projects/day-10-signguard-core.md`
  - `src/pages/projects/[slug].astro`

#### 4. Updated Footer LinkedIn Link
- Changed: `linkedin.com/in/azka` → `linkedin.com/in/azka-alazkiyai`
- File: `src/components/layout/Footer.astro`

### Verification Results

✅ All content changes live on deployed site
✅ No PhD/MPhil references remain
✅ No broken GitHub links in source code
✅ Build successful (13 pages in 21.37s)
⚠️ GitHub repositories don't exist yet (404s on clicked links)

---

## Important Files

### Configuration Files

| File | Purpose |
|------|---------|
| `astro.config.mjs` | Astro config (site, collections, plugins) |
| `tailwind.config.mjs` | Tailwind theme and customization |
| `tsconfig.json` | TypeScript compiler options |

### Data Files

| File | Purpose | Key Fields |
|------|---------|------------|
| `src/data/profile.json` | Personal info | status, social, contact |
| `src/data/activity-log.json` | Activity feed | activities array |
| `src/data/publications.json` | Papers list | publications array |
| `src/data/skills.json` | Skills data | categorized skills |
| `src/data/education.json` | Education history | degrees, thesis |

### Content Collections

| Collection | Location | Schema |
|-----------|----------|--------|
| Projects | `src/content/projects/` | Defined in `src/config.ts` |
| Publications | `src/content/publications/` | Defined in `src/config.ts` |

### Key Components

| Component | Location | Purpose |
|-----------|----------|---------|
| Hero | `src/components/sections/Hero.astro` | Main landing section with stats |
| ActivityFeed | `src/components/features/ActivityFeed.astro` | Displays activity timeline |
| Footer | `src/components/layout/Footer.astro` | Site footer with social links |

---

## Troubleshooting

### Common Issues

#### 1. Projects Counter Shows Wrong Number

**Problem:** Hero section shows incorrect project count

**Solution:**
```javascript
// src/components/sections/Hero.astro
// Update this line:
const completedProjects = 4; // Count of completed projects manually
```

#### 2. GitHub Links Return 404

**Problem:** Repository links don't work

**Solution:**
- Create repositories on GitHub under `alazkiyai09` account
- OR remove `repository` field from project frontmatter
- Verify username is `alazkiyai09` not `azka`

#### 3. Build Fails

**Problem:** `npm run build` errors

**Solutions:**
```bash
# Clear cache and rebuild
rm -rf node_modules dist .astro
npm install
npm run build

# Check for syntax errors in markdown files
# Validate JSON files (activity-log.json, profile.json, etc.)
```

#### 4. Changes Not Reflecting on Live Site

**Problem:** Pushed changes but website unchanged

**Solutions:**
- Wait 5-10 minutes for GitHub Pages to rebuild
- Check GitHub Actions tab for build status
- Hard refresh browser (Ctrl+Shift+R)
- Clear browser cache

#### 5. Activity Feed Not Updating

**Problem:** New activities not showing

**Solutions:**
- Check `activity-log.json` for valid JSON syntax
- Verify date format: ISO 8601 (`2026-02-06T10:30:00Z`)
- Ensure `type` field matches one of the valid activity types
- Rebuild: `npm run build`

### GitHub Actions Issues

**Check deployment status:**
1. Go to repository on GitHub
2. Click "Actions" tab
3. View recent workflow runs
4. Check for errors in build logs

**Common fixes:**
- Ensure `package-lock.json` is committed
- Check Node.js version in workflow file (should be 20+)
- Verify build command: `npm run build`

---

## Future Improvements

### Planned Features

#### High Priority
- [ ] Create actual GitHub repositories for projects
- [ ] Add search functionality to projects page
- [ ] Implement dark mode toggle
- [ ] Add RSS feed for blog/activity

#### Medium Priority
- [ ] Add project filtering by category/tag
- [ ] Implement reading time estimates
- [ ] Add related projects section
- [ ] Create printable resume page

#### Low Priority
- [ ] Add commenting system (via giscus)
- [ ] Implement newsletter signup
- [ ] Add analytics (privacy-focused)
- [ ] Create PWA version

### Technical Debt

- [ ] Consolidate duplicate JSON schemas
- [ ] Add TypeScript strict mode
- [ ] Implement error boundaries
- [ ] Add automated testing
- [ ] Improve accessibility (a11y) scores

### Content Gaps

- [ ] Add remaining 30-day journey projects
- [ ] Write blog posts for each project
- [ ] Add demo videos for key projects
- [ ] Create case studies from industry experience

---

## Resources

### Documentation
- [Astro Docs](https://docs.astro.build)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Markdown Guide](https://www.markdownguide.org)

### Tools
- [GitHub Pages Docs](https://docs.github.com/pages)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

### Design Inspiration
- [Astro Themes](https://astro.build/themes)
- [Tailwind UI](https://tailwindui.com)

---

## Quick Reference

### Essential Commands
```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run preview          # Preview production build

# Git
git add .
git commit -m "message"
git push origin main

# Deployment
# (Automatic via GitHub Pages when pushing to main)
```

### Important Links
- **Local:** http://localhost:4321
- **Live:** https://alazkiyai09.github.io
- **Repo:** https://github.com/alazkiyai09/alazkiyai09.github.io

### File Quick-Edit
```
Profile/Status:     src/data/profile.json
Activities:         src/data/activity-log.json
Projects:           src/content/projects/
Hero Stats:         src/components/sections/Hero.astro
Footer Links:       src/components/layout/Footer.astro
```

---

## Changelog

### Version 2.0 (February 6, 2026)
- Fixed broken GitHub links (azka → alazkiyai09)
- Fixed projects counter (1 → 4)
- Removed PhD/MPhil references
- Updated status to "Open to Opportunities"
- Fixed LinkedIn link in footer
- Created comprehensive documentation

### Version 1.0 (Initial)
- 30-day portfolio structure
- Activity feed system
- Project showcase pages
- Publications section
- Journey timeline

---

**Maintainer:** Azka Al Azkiyai
**Last Updated:** February 6, 2026
**Documentation Version:** 2.0
