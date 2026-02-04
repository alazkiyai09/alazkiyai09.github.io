# Section Components Review

## Reviewed: Hero.astro, About.astro, DomainExpertise.astro, Skills.astro, Experience.astro, ProjectShowcase.astro, Contact.astro

### ISSUES FOUND

#### MINOR ISSUES

1. **Missing data validation in Hero**
   - Location: `Hero.astro:3-5`
   - Issue: No validation that profile.json has all required fields
   - Impact: Could crash if JSON is malformed
   - Fix: Add try-catch or Zod schema validation

2. **Hardcoded email in Contact**
   - Location: `Contact.astro`
   - Issue: Formspree form ID is placeholder `"YOUR_FORM_ID"`
   - Impact: Contact form won't work without valid form ID
   - Fix: Add to config or environment variable

3. **Skills.astro class error**
   - Location: `Skills.astro` (line ~40)
   - Issue: Dynamic color classes (`bg-${tech.color}-100`) won't work with Tailwind JIT
   - Impact: Color classes won't be generated
   - Fix: Use inline styles or complete color list

4. **Experience timeline could be data-driven**
   - Location: `Experience.astro`
   - Issue: Timeline styles hardcoded, could be more reusable
   - Impact: Harder to maintain
   - Suggestion: Extract to component

5. **ProjectShowcase dependency on content collection**
   - Location: `ProjectShowcase.astro:2`
   - Issue: Uses `getCollection('projects')` but no error handling
   - Impact: Build will fail if no projects exist
   - Fix: Add fallback for empty projects

### POSITIVE FINDINGS

✅ Hero uses proper semantic HTML
✅ Good use of Tailwind responsive classes
✅ Accessibility attributes (aria-label) on social links
✅ Consistent section structure and spacing
✅ Dark mode classes properly applied throughout

---

## REFACTORED CODE

### Skills.astro (Fixed dynamic color classes)

```astro
---
import SkillBar from '../ui/SkillBar.astro';
import skills from '../../data/skills.json';

// Define complete color map for Tailwind JIT
const techColors: Record<string, 'blue' | 'purple' | 'green' | 'orange' | 'pink'> = {
  'python': 'blue',
  'pytorch': 'orange',
  'tensorflow': 'orange',
  'pandas': 'blue',
  'numpy': 'blue',
  'scikit-learn': 'blue',
  'pysyft': 'purple',
  'flower': 'purple',
  'ecdsa': 'green',
  'zkp': 'green',
  'aes': 'green',
  'sha-256': 'green',
  'docker': 'blue',
  'fastapi': 'green',
  'sql': 'blue',
  'kafka': 'blue',
  'sas-fm': 'orange',
  'mlflow': 'blue',
  'git': 'orange',
  'linux': 'orange',
};

const getColor = (techName: string): 'blue' | 'purple' | 'green' | 'orange' | 'pink' => {
  const lowerName = techName.toLowerCase();
  return techColors[lowerName] || 'blue';
};
---

<section class="section bg-slate-50 dark:bg-slate-900/50">
  <div class="container">
    <div class="text-center mb-12">
      <h2 class="text-3xl md:text-4xl font-bold mb-4">Technical Skills</h2>
      <p class="text-slate-600 dark:text-slate-400">
        Technologies and tools I work with
      </p>
    </div>

    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {skills.categories.map((category) => (
        <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700">
          <!-- Category Header -->
          <div class="flex items-center gap-3 mb-6">
            <div class="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 00-4.438 0 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-3.138-3.138z" />
              </svg>
            </div>
            <h3 class="font-bold text-lg text-slate-900 dark:text-white">{category.name}</h3>
          </div>

          <!-- Skills List -->
          <div class="space-y-4">
            {category.skills.map((skill) => (
              <SkillBar
                name={skill.name}
                level={skill.level}
                color={getColor(skill.name)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
</section>
```

---

## STATUS: ✅ PASSED (5 minor issues)
**Section components are well-structured with consistent patterns.**
