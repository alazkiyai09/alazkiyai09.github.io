# Portfolio Website Review & Fixes
## alazkiyai09.github.io

**Review Date:** February 2026  
**Status:** Action Required

---

## Executive Summary

Your portfolio website is well-built and visually appealing. This document outlines issues found during review and recommended changes to transform it into a **general portfolio showcase** (removing PhD/MPhil-specific content).

### Quick Stats
- **Overall Score:** 8/10
- **Critical Issues:** 2
- **Minor Issues:** 5
- **Content to Remove:** PhD/supervisor references

---

## 🔴 Critical Issues (Fix Immediately)

### 1. Broken GitHub Links

**Problem:** Project links use wrong username `azka` instead of `alazkiyai09`

**Current (Broken):**
```
https://github.com/azka/signguard
https://github.com/azka/fraudware-analyzer
```

**Fix to:**
```
https://github.com/alazkiyai09/signguard
https://github.com/alazkiyai09/fraudware-analyzer
```

**Files to update:**
- `src/content/projects/day-10-signguard-core.md`
- `src/content/projects/day-18-malware-analyzer.md`
- Any other project files with GitHub links

---

### 2. Projects Counter Shows "1"

**Problem:** Hero section displays "1 Projects Done" but multiple projects exist

**Location:** Homepage hero stats section

**Fix:** Update the counter to reflect actual completed projects (should be 18+ based on journey progress)

**File to update:** `src/components/sections/Hero.astro` or `src/data/stats.json`

```javascript
// Change from:
projects: 1

// Change to:
projects: 18  // or actual count
```

---

## 🟡 Content to Remove (PhD/Research Focus)

### 3. Remove PhD Application References

**Remove from Activity Feed:**
```
❌ "MPhil Application Submitted - Prof. Zomaya"
❌ "application_sent" activity type entries
❌ Any references to University of Sydney supervision
❌ Any references to University of Auckland / Prof. Russello
```

**Files to update:**
- `src/data/activity-log.json` - Remove application_sent entries
- `src/content/activity/*.json` - Remove PhD-related activities

---

### 4. Remove "Seeking PhD/MPhil supervision" Badge

**Current:** Hero section shows "Seeking PhD/MPhil supervision"

**Action:** Remove or replace with neutral status

**Options:**
```
Option A: Remove entirely
Option B: Replace with "Open to Opportunities"
Option C: Replace with "Available for Projects"
Option D: Replace with "AI Security Researcher"
```

**File to update:** `src/components/sections/Hero.astro`

```astro
<!-- Remove this line -->
<span>Seeking PhD/MPhil supervision</span>

<!-- Or replace with -->
<span>Open to Opportunities</span>
```

---

### 5. Update Research Interests Section (If Exists)

**Remove references to:**
- Specific supervisor names
- University applications
- "Thesis" or "dissertation" mentions
- MPhil/PhD program references

**Keep:**
- Technical research interests (Federated Learning, Adversarial ML, etc.)
- Publications
- Research projects

---

## 🟢 Minor Issues to Fix

### 6. SignGuard Status Inconsistency

**Problem:** 
- Resume says: "(In Progress)"
- Website Activity says: "Completed SignGuard ECDSA Verification Module"
- Website Projects says: "completed"

**Recommendation:** Align status across all sources

**If module is done but full system isn't:**
```markdown
# In project description, clarify:
Status: Core Module Complete | Full System In Development
```

---

### 7. Activity Dates Are Relative

**Problem:** "1 day ago", "2 days ago" will become stale

**Options:**

**Option A:** Use absolute dates
```json
{
  "date": "2026-02-03",
  "displayDate": "Feb 3, 2026"
}
```

**Option B:** Keep relative but add actual date
```
"Completed SignGuard Module"
1 day ago • Feb 3, 2026
```

**Option C:** Regenerate on build (if using static dates)

---

### 8. Add Company Name for Credibility

**Problem:** Domain expertise mentions "major Indonesian financial institutions" but not employer

**Recommendation:** Add "ITSEC Asia" somewhere for verification

**Options:**
- Add to About page work experience section
- Add to Domain Expertise section subtitle
- Keep as is (acceptable for privacy)

**Suggested text:**
```
"Production fraud detection systems for major Indonesian financial institutions"

Change to:

"Production fraud detection systems at ITSEC Asia, serving major Indonesian financial institutions"
```

---

### 9. Papers Studied Counter

**Current:** Shows "3 Papers Studied"

**Check:** Is this accurate? If you've read more during the 30-day journey, update the count.

**File:** `src/data/stats.json` or dashboard component

---

### 10. Footer GitHub Link

**Verify:** Footer shows `https://github.com/alazkiyai09` - this is correct ✅

**Double-check:** All other GitHub references use the same username

---

## 📋 Complete Checklist

### Critical (Do First)
```
□ Fix GitHub links: azka → alazkiyai09
□ Fix projects counter: 1 → actual count (18+)
```

### Content Removal (PhD/Academic Focus)
```
□ Remove "Seeking PhD/MPhil supervision" badge
□ Remove Prof. Zomaya application from activity
□ Remove Prof. Russello references (if any)
□ Remove any "MPhil" or "PhD" text
□ Remove supervisor tracker component (if exists)
□ Remove/update Research Interests to be general
```

### Minor Fixes
```
□ Clarify SignGuard completion status
□ Consider absolute dates for activities
□ Add ITSEC Asia company name (optional)
□ Verify papers studied count
□ Check all internal links work
```

### Final Verification
```
□ Test all GitHub links
□ Test all navigation links
□ Check mobile responsiveness
□ Verify no PhD/supervisor references remain
□ Review About page content
□ Review Contact page content
```

---

## 🎯 Recommended New Positioning

### Before (Academic Focus)
```
"Seeking PhD/MPhil supervision"
"AI Security Researcher"
Focus: Getting into research programs
```

### After (Portfolio Showcase)
```
"Open to Opportunities" or "AI Security Practitioner"
"Published Researcher & AI Practitioner"
Focus: Showcasing skills to any audience
```

### Updated Hero Text Suggestion

**Current:**
```
Hi, I'm Ahmad Whafa Azka Al Azkiyai
Published Researcher & AI Practitioner
Federated Learning Security | Adversarial ML | Privacy-Preserving AI
🇮🇩 South Tangerang, Banten, Indonesia
[Seeking PhD/MPhil supervision]
```

**Recommended:**
```
Hi, I'm Ahmad Whafa Azka Al Azkiyai
Published Researcher & AI Security Practitioner
Federated Learning Security | Adversarial ML | Privacy-Preserving AI
🇮🇩 South Tangerang, Banten, Indonesia
[Open to Opportunities] or [Available for Collaboration]
```

---

## 📁 Files to Modify (Summary)

| File | Changes |
|------|---------|
| `src/components/sections/Hero.astro` | Remove PhD badge, fix stats |
| `src/data/activity-log.json` | Remove application_sent entries |
| `src/data/stats.json` | Fix projects count |
| `src/content/projects/day-10-signguard-core.md` | Fix GitHub link |
| `src/content/projects/day-18-malware-analyzer.md` | Fix GitHub link |
| `src/pages/about.astro` | Remove PhD references (if any) |
| `src/pages/journey.astro` | Remove supervisor mentions (if any) |
| `src/components/features/ActivityFeed.astro` | Filter out application activities |

---

## 💡 Strategic Recommendation

**Why removing PhD focus is smart:**

1. **Broader Appeal** - Website works for recruiters, collaborators, AND academics
2. **No Outdated Info** - Application statuses won't go stale
3. **Professional** - Shows work without revealing career strategy
4. **Flexible** - Can mention PhD goals in direct conversations/emails
5. **Privacy** - Supervisors won't see you're "shopping around"

**What to keep:**
- Publications (shows research capability)
- Research interests (shows depth)
- SignGuard project (shows innovation)
- Technical skills (shows competence)

**What to add instead:**
- "Open to collaboration"
- "Available for consulting"
- More industry-relevant projects if you have them

---

## ✅ After Fixes, Your Site Will Be

- ✅ A clean portfolio showcasing your 30-day journey
- ✅ Appealing to both industry and academia
- ✅ Free of broken links
- ✅ Accurate statistics
- ✅ No stale application status information
- ✅ Professional and versatile

---

**Document Version:** 1.0  
**Next Step:** Implement fixes using Claude Code + GLM-4.7
