# Feature Components Review

## Reviewed: ActivityFeed.astro, ProgressDashboard.astro, JourneyMilestones.astro

### ISSUES FOUND

#### CRITICAL ISSUES

1. **Duplicate gradient ID in ProgressDashboard**
   - Location: `ProgressDashboard.astro:50`
   - Issue: Same duplicate ID issue as ProgressRing - `id="gradient"` hardcoded
   - Impact: Invalid HTML if multiple dashboards
   - Fix: Use unique ID (same approach as ProgressRing)

#### MINOR ISSUES

2. **Missing activity type validation**
   - Location: `ActivityFeed.astro:13-35`
   - Issue: No validation that activity.type exists in typeIcons/typeColors
   - Impact: Falls back to defaults silently
   - Fix: Add type checking or warning

3. **Hardcoded magic number**
   - Location: `ProgressDashboard.astro:44`
   - Issue: `5.53` for stroke-dasharray is magic number (circumference calculation)
   - Impact: Unclear what it represents
   - Fix: Calculate as `2 * Math.PI * radius` like ProgressRing

4. **Hardcoded default values**
   - Location: `ProgressDashboard.astro:11,16`
   - Issue: `|| 18` and `+ 3` are hardcoded fallbacks
   - Impact: Not maintainable, error-prone
   - Fix: Use constants or config

5. **JourneyMilestones hardcoded phases**
   - Location: `JourneyMilestones.astro`
   - Issue: All journey data hardcoded in component
   - Impact: Should be in data file for easier updates
   - Suggestion: Move to `data/journey-phases.json`

### POSITIVE FINDINGS

✅ Good use of date-fns for time formatting
✅ Proper handling of optional fields with `?.` operator
✅ Consistent dark mode implementation
✅ Good progress visualization with SVG

---

## STATUS: ⚠️ PASSED (1 critical, 4 minor)
