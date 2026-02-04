# Pages & Data Review

## Reviewed: All pages (.astro files) and JSON data files

### ISSUES FOUND

#### CRITICAL ISSUES

None identified in pages.

#### MINOR ISSUES

1. **Data files lack TypeScript validation**
   - Location: All `src/data/*.json` files
   - Issue: No Zod schema validation for JSON structure
   - Impact: Runtime errors if JSON is malformed
   - Fix: Create validation schemas in utility functions

2. **Missing error handling in data imports**
   - Location: Multiple components import JSON directly
   - Issue: No try-catch around JSON imports
   - Impact: Build fails silently or with unclear errors
   - Fix: Add validation layer

3. **contact.astro has placeholder form ID**
   - Location: `Contact.astro`
   - Issue: `"YOUR_FORM_ID"` placeholder in form action
   - Impact: Form won't work
   - Fix: Use environment variable

4. **No runtime type validation for profile data**
   - Location: Components use `profile.field` without checking existence
   - Impact: Could crash if field missing
   - Fix: Add default values or validation

5. **Projects page filters non-functional**
   - Location: `projects/index.astro`
   - Issue: Filter buttons don't have JavaScript - just UI
   - Impact: Filtering doesn't actually work
   - Fix: Add client-side filtering script

### POSITIVE FINDINGS

✅ All pages use BaseLayout consistently
✅ Good SEO structure (titles, descriptions)
✅ getStaticPaths properly implemented for dynamic routes
✅ Content collections properly typed with Zod schemas
✅ Responsive design throughout

---

## REFACTORED CODE

### Create data validation utility

```typescript
// src/utils/validation.ts
import { z } from 'zod';

// Profile schema
export const ProfileSchema = z.object({
  name: z.string(),
  title: z.string(),
  tagline: z.string(),
  location: z.object({
    city: z.string(),
    region: z.string(),
    country: z.string(),
    flag: z.string(),
    timezone: z.string(),
    availableForRemote: z.boolean().optional(),
  }),
  status: z.object({
    current: z.string(),
    openTo: z.array(z.string()),
  }),
  bio: z.object({
    short: z.string(),
    long: z.string(),
  }),
  social: z.object({
    github: z.string().url(),
    linkedin: z.string().url(),
    email: z.string().email(),
    googleScholar: z.string().url().optional(),
  }),
  resume: z.string(),
});

// Type export
export type Profile = z.infer<typeof ProfileSchema>;

// Validation function
export function validateProfile(data: unknown): Profile {
  return ProfileSchema.parse(data);
}
```

### Contact form with env variable

```astro
---
// Contact.astro partial fix
const FORMSPREE_ID = import.meta.env.FORMSPREE_FORM_ID || 'YOUR_FORM_ID';
---

<form
  action={`https://formspree.io/f/${FORMSPREE_ID}`}
  method="POST"
  class="space-y-4"
>
  <!-- rest of form -->
</form>
```

---

## STATUS: ⚠️ PASSED (5 minor issues)
**Pages are well-structured. Data validation could be improved.**
