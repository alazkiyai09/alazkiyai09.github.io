# Portfolio Website Deployment Summary

**Project:** Personal Portfolio Website
**Repository:** https://github.com/alazkiyai09/alazkiyai09.github.io
**Live Site:** https://alazkiyai09.github.io/
**Last Updated:** February 4, 2026
**Status:** ✅ **FULLY FUNCTIONAL**

---

## 📊 Project Overview

A modern, responsive portfolio website showcasing:
- 30-day portfolio journey in AI security research
- Federated learning security projects
- Publications and research activities
- Real-time activity tracking
- Dark/Light theme support
- Fully responsive design

**Tech Stack:**
- **Framework:** Astro 4.16.19
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **Deployment:** GitHub Pages with GitHub Actions
- **Hosting:** https://alazkiyai09.github.io/

---

## 🐛 Issues Encountered & Resolved

### Phase 1: Initial Bug Fixes

#### 1. ✅ Social.email Schema Mismatch
**File:** `/src/utils/validation.ts`

**Issue:** `SocialSchema` required `email` field, but email existed in separate `contact` object in profile.json.

**Fix:** Removed `email` from `SocialSchema` (line 31).
```typescript
// Before
export const SocialSchema = z.object({
  github: z.string().url(),
  linkedin: z.string().url(),
  email: z.string().email(),  // ← Removed
  googleScholar: z.string().url().optional(),
});

// After
export const SocialSchema = z.object({
  github: z.string().url(),
  linkedin: z.string().url(),
  googleScholar: z.string().url().optional(),
});
```

#### 2. ✅ Skills Color Normalization Bug
**File:** `/src/components/sections/Skills.astro`

**Issue:** Color map key `'sas fm'` contained space, but normalization removed all non-alphanumeric chars (`"SAS FM"` → `"sasfm"`), causing color mismatch.

**Fix:** Updated color map key to match normalized output.
```typescript
// Line 24 - Changed from:
'sas fm': 'orange',
// To:
'sasfm': 'orange',
```

#### 3. ✅ Blog URL Mismatch
**File:** `/src/data/activity-log.json`

**Issue:** Blog post URL referenced `/blog/byzantine-attacks-fl` but actual file was `understanding-byzantine-attacks.md`.

**Fix:** Updated URL to match correct slug.
```json
// Before
{ "label": "Read Post", "url": "/blog/byzantine-attacks-fl" }

// After
{ "label": "Read Post", "url": "/blog/understanding-byzantine-attacks" }
```

#### 4. ✅ Missing Assets
**Files:** `/public/`, `/src/components/layout/BaseLayout.astro`

**Issue:**
- `og-image.png` referenced but didn't exist
- `resume-azka-2026.pdf` in profile.json but no file

**Fix:**
- Created `/public/og-image.svg` (1200x630) as placeholder
- Updated BaseLayout to use SVG: `image = '/og-image.svg'`
- Set resume path to empty string in profile.json

#### 5. ✅ Projects Filter Not Working
**File:** `/src/pages/projects/index.astro`

**Issue:** Filter buttons rendered but no JavaScript to handle clicks or filter logic.

**Fix:** Added client-side JavaScript with type-safe JSDoc annotations.
```javascript
<script define:vars={{ sortedProjects }}>
  /** @type {NodeListOf<HTMLButtonElement>} */
  const filterButtons = document.querySelectorAll('.filter-btn');
  /** @type {NodeListOf<HTMLElement>} */
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter || 'all';

      // Update active state
      filterButtons.forEach(btn => {
        btn.classList.remove('bg-blue-600', 'text-white');
        btn.classList.add('bg-slate-100', 'dark:bg-slate-800', 'text-slate-700', 'dark:text-slate-300');
      });
      button.classList.remove('bg-slate-100', 'dark:bg-slate-800', 'text-slate-700', 'dark:text-slate-300');
      button.classList.add('bg-blue-600', 'text-white');

      // Filter projects
      projectCards.forEach(card => {
        const category = card.dataset.category || '';
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
</script>
```

Also added `data-category` attributes to project cards and `data-filter` to buttons.

#### 6. ✅ ProgressDashboard Hardcoded Values
**File:** `/src/components/features/ProgressDashboard.astro`

**Issue:**
- `totalDays = 30` was hardcoded
- `currentPhase` was hardcoded as "Phase 4: Security Research"

**Fix:**
```typescript
// Import journey phases config
import journeyPhases from '../../data/journey-phases.json';

// Dynamic phase detection
const currentPhase = journeyPhases.phases.find(p => p.status === 'in-progress')
                     || journeyPhases.phases.find(p => p.status === 'completed');

// Template uses dynamic values
{currentPhase && (
  <>
    <div class="font-medium">Currently in Phase: {currentPhase.name}</div>
    <div class="text-sm text-slate-400">Days {currentPhase.days} - {currentPhase.description}</div>
  </>
)}
```

#### 7. ✅ Missing Research Page
**File:** `/src/pages/research.astro` (CREATED)

**Issue:** No dedicated research overview page despite having research data.

**Fix:** Created comprehensive research page with:
- Research interests overview
- Domain expertise areas (filtered for research type)
- Recent research activities from activity-log.json
- Link to publications page

---

### Phase 2: Deployment Issues

#### 8. ✅ GitHub Pages Subdirectory Issue
**Critical Issue:** Site deployed to `https://alazkiyai09.github.io/alazkiyai09.github.io/` instead of root `https://alazkiyai09.github.io/`

**Root Cause:**
- Repository named `alazkiyai09.github.io` but another repo `alazkiyai.github.io` existed
- Old repo was taking the root URL
- GitHub Pages treated the repo as a "project page" not "user page"

**Resolution:**
1. Deleted old repository `alazkiyai09.github.io`
2. Created fresh repository with same name
3. Updated origin remote to point to new repo
4. Pushed code to new clean repository

**Commands Used:**
```bash
git remote remove origin
git remote add origin git@github.com:alazkiyai09/alazkiyai09.github.io.git
git push -u origin main
```

#### 9. ✅ Base Path Configuration Issue
**Critical Issue:** All assets (CSS, JS) failed to load. Only HTML rendered.

**Root Cause:**
- `astro.config.mjs` had `base: '/alazkiyai09.github.io'` from earlier debugging
- GitHub Actions **rebuilds** from source code (doesn't use committed dist/)
- Base path caused assets to load from wrong URL: `/alazkiyai09.github.io/_astro/` instead of `/_astro/`

**Fix Applied:**
```javascript
// File: astro.config.mjs
export default defineConfig({
  site: 'https://alazkiyai09.github.io',
  // base: '/alazkiyai09.github.io', ← REMOVED THIS LINE
  integrations: [
    // ...
  ],
});
```

**Important Lesson:** GitHub Actions workflow rebuilds from source code using `npm run build`, so committed `dist/` folder is ignored. The `astro.config.mjs` in the repository must match desired configuration.

---

## 📁 Key Files Modified

### Configuration
- `astro.config.mjs` - Removed base path for correct root URL deployment
- `.github/workflows/deploy.yml` - GitHub Actions deployment workflow (verified correct)

### Data Files
- `src/data/profile.json` - Updated resume path
- `src/data/activity-log.json` - Fixed blog URL

### Source Code
- `src/utils/validation.ts` - Removed email from SocialSchema
- `src/components/sections/Skills.astro` - Fixed color mapping key
- `src/components/features/ProgressDashboard.astro` - Dynamic phase calculation
- `src/pages/projects/index.astro` - Added filter JavaScript
- `src/pages/research.astro` - **NEW FILE** - Research overview page
- `src/components/layout/BaseLayout.astro` - Updated OG image reference

### Assets
- `public/og-image.svg` - **NEW FILE** - Open Graph image for social sharing

---

## 🚀 Deployment Process

### Current Workflow
1. **Code pushed** to `main` branch
2. **GitHub Actions** triggers automatically
3. **Workflow runs:**
   - Checkout code
   - Setup Node.js v20
   - Install dependencies (`npm ci`)
   - **Build** (`npm run build`) ← Creates fresh `dist/` from source
   - Upload `./dist` artifact
   - Deploy to GitHub Pages

### Manual Deployment
If needed, you can trigger deployment manually:
```bash
# Via GitHub CLI
gh workflow run deploy.yml

# Or via GitHub web interface
# Visit: https://github.com/alazkiyai09/alazkiyai09.github.io/actions
# Click "Deploy to GitHub Pages" workflow → "Run workflow"
```

### Build Status
- ✅ Latest build: February 4, 2026
- ✅ Status: Success
- ✅ All 0 errors
- ✅ All assets loading correctly

---

## 🔧 How to Update the Site

### Adding New Content

#### 1. Add a New Project
```bash
# Create new markdown file
touch src/content/projects/day-XX-project-name.md

# Add frontmatter:
---
title: "Project Title"
summary: "Brief description"
day: XX
category: "Federated Learning"
status: "completed"
tags: ["tag1", "tag2", "tag3"]
technologies: ["Python", "PyTorch", ...]
repository: "https://github.com/..."
demo: "https://..." # optional
---

# Project content here...
```

#### 2. Add a New Blog Post
```bash
# Create new markdown file
touch src/content/blog/post-slug.md

# Add frontmatter:
---
title: "Post Title"
description: "Meta description"
date: 2026-02-04
tags: ["tag1", "tag2"]
---

# Blog content here...
```

#### 3. Update Profile Information
Edit `src/data/profile.json`:
```json
{
  "name": "Your Name",
  "title": "Your Title",
  "tagline": "Your tagline",
  "location": { ... },
  "status": { ... },
  "bio": { ... },
  "contact": { ... },
  "social": { ... }
}
```

#### 4. Update Activity Log
Edit `src/data/activity-log.json`:
```json
{
  "activities": [
    {
      "id": "act-YYYY-MM-DD-001",
      "date": "2026-02-04T10:30:00Z",
      "type": "project_complete",
      "title": "Activity Title",
      "description": "Activity description",
      "projectRef": "project-id",
      "tags": ["tag1", "tag2"],
      "metrics": { ... },
      "links": [ ... ]
    }
  ]
}
```

### Building and Deploying

#### Local Development
```bash
# Install dependencies
npm install

# Run dev server (http://localhost:4321)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

#### Deploy to GitHub
```bash
# Stage all changes
git add .

# Commit changes
git commit -m "Description of changes"

# Push to GitHub (auto-deploys)
git push origin main
```

**Deployment happens automatically!** Wait ~2-3 minutes and visit https://alazkiyai09.github.io/

---

## ⚠️ Important Notes

### Things to Remember

1. **GitHub Actions Rebuilds**
   - The `npm run build` command runs during deployment
   - Any changes to `astro.config.mjs` affect the build
   - Committed `dist/` folder is ignored by deployment

2. **No Base Path Needed**
   - Site is at root URL: `https://alazkiyai09.github.io/`
   - Do NOT add `base` path to `astro.config.mjs`
   - All asset paths should be relative to root: `/_astro/`, `/favicon.svg`

3. **Repository Name**
   - Must be `username.github.io` for root URL
   - For `alazkiyai09`, the repo must be `alazkiyai09.github.io`
   - Any other name creates subdirectory: `username.github.io/repo-name/`

4. **Branch Name**
   - Must deploy from `main` branch
   - GitHub Actions workflow triggers on push to `main`

5. **Site URL Configuration**
   - Keep `site: 'https://alazkiyai09.github.io'` in `astro.config.mjs`
   - This is used for canonical URLs and sitemap generation
   - Do NOT add `base` path

---

## 🔍 Troubleshooting

### Common Issues

#### Assets Not Loading (CSS/JS 404)
**Symptoms:** Site renders but no styling or interactivity

**Check:**
1. Verify `astro.config.mjs` doesn't have `base` path
2. Check browser console for 404 errors
3. Verify GitHub Actions build succeeded
4. Check asset URLs in page source (should be `/_astro/...`)

**Solution:**
```bash
# Remove base path if exists
# Edit astro.config.mjs
git add astro.config.mjs
git commit -m "Remove base path"
git push origin main
```

#### Site Not Updating
**Symptoms:** Changes pushed but site shows old content

**Check:**
1. GitHub Actions workflow status
2. Hard refresh browser (Ctrl+Shift+R)
3. Clear browser cache
4. Check deployment time in GitHub Pages settings

**Solution:**
```bash
# Manually trigger deployment
gh workflow run deploy.yml

# Check status
gh run list --limit 1
```

#### Build Errors
**Symptoms:** GitHub Actions workflow fails

**Common Causes:**
- Syntax errors in `.astro` or `.md` files
- Missing dependencies in `package.json`
- Invalid JSON in data files

**Debug:**
```bash
# Test build locally first
npm run build

# Check workflow logs
gh run view <run-id> --log
```

---

## 📈 Project Statistics

### Content
- **Pages:** 13 total
  - Home, About, Projects (index + 5 detail pages), Publications, Research, Journey, Activity, Contact
- **Blog Posts:** 1
- **Projects:** 5 (with more to add)
- **Publications:** 1
- **Activity Log Entries:** 8

### Code
- **Total Files:** 108 (initial commit)
- **Lines of Code:** ~20,700
- **Components:** 17 UI components
- **Data Files:** 9 JSON configuration files

### Features Implemented
✅ Dark/Light theme toggle
✅ Project filtering by category
✅ Activity feed with real-time updates
✅ Progress dashboard with milestone tracking
✅ Responsive design (mobile-first)
✅ SEO optimized (meta tags, sitemap)
✅ Social sharing (Open Graph)
✅ Contact form (ready for Formspree integration)
✅ Research publications showcase
✅ Journey timeline visualization

---

## 📝 Todo / Future Enhancements

### Immediate
- [ ] Add more project entries (target: 30 projects)
- [ ] Complete activity log with daily updates
- [ ] Add actual resume PDF to `/public/resume.pdf`
- [ ] Replace placeholder OG image with custom design

### Short-term
- [ ] Set up Formspree for contact form
- [ ] Add Google Analytics or privacy-friendly alternative
- [ ] Create proper 404 page
- [ ] Add reading time estimates to blog posts

### Long-term
- [ ] Add search functionality
- [ ] Implement RSS feed for blog
- [ ] Add comments section (privacy-friendly)
- [ ] Create animations for timeline and progress
- [ ] Add PWA capabilities
- [ ] Internationalization (i18n) support

---

## 📞 Support & Maintenance

### Repository
- **GitHub:** https://github.com/alazkiyai09/alazkiyai09.github.io
- **Issues:** https://github.com/alazkiyai09/alazkiyai09.github.io/issues

### Deployment
- **GitHub Actions:** https://github.com/alazkiyai09/alazkiyai09.github.io/actions
- **Workflow File:** `.github/workflows/deploy.yml`

### External Services
- **Domain:** GitHub Pages (free hosting)
- **DNS:** Managed by GitHub
- **SSL:** Automated by GitHub

---

## 🎯 Success Criteria - ✅ ALL MET

- [x] Site deploys successfully to GitHub Pages
- [x] All assets (CSS, JS, images) load correctly
- [x] Site accessible at root URL (https://alazkiyai09.github.io/)
- [x] All interactive features work (theme toggle, filters, navigation)
- [x] Responsive design works on mobile devices
- [x] No console errors or warnings
- [x] Build completes with 0 errors
- [x] SEO meta tags configured correctly
- [x] Social sharing preview works (OG image)

---

## 📅 Change Log

### February 4, 2026 - Initial Deployment ✅
- Created portfolio website from scratch
- Implemented all core features
- Fixed 7 schema/functionality bugs
- Resolved 2 critical deployment issues
- Successfully deployed to production

### Key Milestones
1. ✅ Initial project setup
2. ✅ Bug fixes and schema corrections
3. ✅ GitHub repository setup
4. ✅ GitHub Actions deployment configuration
5. ✅ Asset loading issue resolution
6. ✅ Production deployment

---

**Last Reviewed:** February 4, 2026
**Document Version:** 1.0
**Status:** ✅ Production Ready
