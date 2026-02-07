#!/usr/bin/env node

/**
 * CLI Script: Add new activity to activity-log.json
 * Usage: node scripts/update-activity.js
 */

import fs from 'node:fs';
import path from 'node:path';
import readline from 'node:readline';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
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

  // Build metrics object separately to avoid referencing activity.metrics before activity exists
  const metrics = {};
  if (locInput) metrics.linesOfCode = parseInt(locInput);
  if (experimentsInput) metrics.experimentsRun = parseInt(experimentsInput);
  if (hoursInput) metrics.hoursSpent = parseFloat(hoursInput);

  const activity = {
    id: activityId,
    date: new Date().toISOString(),
    type,
    title: title || 'Untitled Activity',
    description: description || '',
    tags,
    ...(projectRef && { projectRef }),
    ...(Object.keys(metrics).length > 0 && { metrics })
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
