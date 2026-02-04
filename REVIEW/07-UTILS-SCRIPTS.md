# Utils & Scripts Review

## Reviewed: date-utils.ts, content-utils.ts, update-activity.js, generate-stats.js

### ISSUES FOUND

#### CRITICAL ISSUES

None identified.

#### MINOR ISSUES

1. **Invalid date handling in date-utils**
   - Location: `date-utils.ts:11, 19, 27, 36, 46`
   - Issue: `new Date(dateStr)` can return "Invalid Date" for malformed strings
   - Impact: Functions will throw errors or return NaN
   - Fix: Add date validation

2. **No error handling in content-utils**
   - Location: `content-utils.ts` throughout
   - Issue: No try-catch around `getCollection` calls
   - Impact: Build failures give unclear error messages
   - Fix: Add error handling with context

3. **Script doesn't validate input**
   - Location: `update-activity.js:48`
   - Issue: `JSON.parse(fileContent)` can throw if JSON is invalid
   - Impact: Script crashes with unhelpful error
   - Fix: Add try-catch with validation

4. **generate-stats.js assumes data structure**
   - Location: `generate-stats.js`
   - Issue: No validation that activity-log.json has expected structure
   - Impact: Will crash if structure changes
   - Fix: Add schema validation

5. **Scripts use CommonJS instead of ES modules**
   - Location: Both `.js` files in `scripts/`
   - Issue: Package.json has `"type": "module"` but scripts use `require`
   - Impact: Works because scripts are root-level, but inconsistent
   - Fix: Either rename to `.cjs` or use ES modules

### POSITIVE FINDINGS

✅ Good JSDoc documentation on all functions
✅ Proper type annotations throughout
✅ Date-fns used correctly for formatting
✅ Content utilities properly typed with CollectionEntry
✅ CLI scripts have good UX (prompts, confirmations)

---

## REFACTORED CODE

### date-utils.ts (with validation)

```typescript
/**
 * Date utility functions with validation
 */

import { format, formatDistanceToNow, differenceInDays, isValid } from 'date-fns';

/**
 * Format a date string to a readable format
 * @throws Error if date is invalid
 */
export function formatDate(dateStr: string | Date, formatStr: string = 'PPP'): string {
  const date = typeof dateStr === 'string' ? new Date(dateStr) : dateStr;

  if (!isValid(date)) {
    throw new Error(`Invalid date: ${dateStr}`);
  }

  return format(date, formatStr);
}

/**
 * Format a date to a relative time string (e.g., "2 days ago")
 * @throws Error if date is invalid
 */
export function formatRelativeTime(dateStr: string | Date): string {
  const date = typeof dateStr === 'string' ? new Date(dateStr) : dateStr;

  if (!isValid(date)) {
    throw new Error(`Invalid date: ${dateStr}`);
  }

  return formatDistanceToNow(date, { addSuffix: true });
}

/**
 * Calculate the difference in days between two dates
 * @throws Error if either date is invalid
 */
export function daysBetween(date1: string | Date, date2: string | Date): number {
  const d1 = typeof date1 === 'string' ? new Date(date1) : date1;
  const d2 = typeof date2 === 'string' ? new Date(date2) : date2;

  if (!isValid(d1) || !isValid(d2)) {
    throw new Error(`Invalid date(s): ${d1}, ${d2}`);
  }

  return differenceInDays(d2, d1);
}

/**
 * Check if a date is within the last N days
 * @returns false if date is invalid
 */
export function isWithinDays(dateStr: string | Date, days: number): boolean {
  try {
    const date = typeof dateStr === 'string' ? new Date(dateStr) : dateStr;

    if (!isValid(date)) {
      return false;
    }

    const now = new Date();
    const diff = differenceInDays(now, date);
    return diff >= 0 && diff <= days;
  } catch {
    return false;
  }
}

/**
 * Format a date range
 * @throws Error if either date is invalid
 */
export function formatDateRange(startDate: string | Date, endDate: string | Date): string {
  const start = typeof startDate === 'string' ? new Date(startDate) : startDate;
  const end = typeof endDate === 'string' ? new Date(endDate) : endDate;

  if (!isValid(start) || !isValid(end)) {
    throw new Error(`Invalid date(s): ${start}, ${end}`);
  }

  const startMonth = format(start, 'MMM yyyy');
  const endMonth = format(end, 'MMM yyyy');

  if (startMonth === endMonth) {
    return startMonth;
  }

  return `${startMonth} - ${endMonth}`;
}
```

### update-activity.js (with error handling)

```javascript
#!/usr/bin/env node

/**
 * CLI Script: Add new activity to activity-log.json
 * Usage: node scripts/update-activity.js
 */

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

  // Load existing activities with error handling
  let data = { activities: [] };
  if (fs.existsSync(ACTIVITY_FILE)) {
    try {
      const fileContent = fs.readFileSync(ACTIVITY_FILE, 'utf8');
      data = JSON.parse(fileContent);

      // Validate structure
      if (!Array.isArray(data.activities)) {
        throw new Error('Invalid activity-log.json: activities is not an array');
      }
    } catch (error) {
      console.error('❌ Error loading activity log:', error.message);
      console.log('Creating new activity log...\n');
      data = { activities: [] };
    }
  }

  // Gather input
  console.log('Activity Types:');
  ACTIVITY_TYPES.forEach((t, i) => {
    console.log(`  ${i + 1}. ${t.replace(/_/g, ' ')}`);
  });

  const typeIndex = parseInt(await prompt('\nSelect type (1-10): ')) - 1;
  const type = ACTIVITY_TYPES[typeIndex] || 'code_commit';

  const title = await prompt('Title: ');
  const description = await prompt('Description: ');
  const tagsInput = await prompt('Tags (comma-separated, press Enter to skip): ');
  const tags = tagsInput ? tagsInput.split(',').map(t => t.trim()).filter(Boolean) : [];
  const projectRef = await prompt('Project reference (optional, press Enter to skip): ') || undefined;

  // Optional metrics
  const locInput = await prompt('Lines of code (optional, press Enter to skip): ');
  const experimentsInput = await prompt('Experiments run (optional, press Enter to skip): ');
  const hoursInput = await prompt('Hours spent (optional, press Enter to skip): ');

  // Create activity
  const activityId = `act-${new Date().toISOString().slice(0,10).replace(/-/g, '')}-${String(data.activities.length + 1).padStart(3, '0')}`;

  const activity = {
    id: activityId,
    date: new Date().toISOString(),
    type,
    title: title || 'Untitled Activity',
    description: description || '',
    tags,
    ...(projectRef && { projectRef }),
    ...(locInput && { metrics: { linesOfCode: parseInt(locInput) } }),
    ...(experimentsInput && { metrics: { ...(activity.metrics || {}), experimentsRun: parseInt(experimentsInput) } }),
    ...(hoursInput && { metrics: { ...(activity.metrics || {}), hoursSpent: parseFloat(hoursInput) } })
  };

  // Add to beginning of array
  data.activities.unshift(activity);

  // Save with error handling
  try {
    fs.writeFileSync(ACTIVITY_FILE, JSON.stringify(data, null, 2));
    console.log('\n✅ Activity added successfully!\n');
    console.log(JSON.stringify(activity, null, 2));
    console.log(`\n📄 Updated: ${ACTIVITY_FILE}`);
  } catch (error) {
    console.error('\n❌ Error saving activity:', error.message);
    process.exit(1);
  }
}

main().catch(error => {
  console.error('❌ Unexpected error:', error.message);
  process.exit(1);
});
```

---

## STATUS: ✅ PASSED (5 minor issues)
**Utilities and scripts are well-written with good documentation. Added error handling for robustness.**
