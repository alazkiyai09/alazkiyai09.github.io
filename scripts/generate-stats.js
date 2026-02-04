#!/usr/bin/env node

/**
 * CLI Script: Generate statistics from activity-log.json
 * Usage: node scripts/generate-stats.js
 */

const fs = require('fs');
const path = require('path');

const ACTIVITY_FILE = path.join(__dirname, '../src/data/activity-log.json');

function main() {
  console.log('\n📊 Portfolio Statistics\n');

  // Load activities with error handling
  if (!fs.existsSync(ACTIVITY_FILE)) {
    console.log('❌ No activity log found.');
    process.exit(1);
  }

  let data;
  try {
    const fileContent = fs.readFileSync(ACTIVITY_FILE, 'utf8');
    data = JSON.parse(fileContent);

    // Validate structure
    if (!Array.isArray(data.activities)) {
      throw new Error('Invalid activity-log.json: activities is not an array');
    }
  } catch (error) {
    console.error('❌ Error loading activity log:', error.message);
    process.exit(1);
  }

  const activities = data.activities;

  // Calculate stats
  const stats = {
    totalActivities: activities.length,
    byType: {},
    totalProjectsCompleted: 0,
    totalPapersRead: 0,
    totalExperiments: 0,
    totalLOC: 0,
    totalHours: 0,
    tags: {},
    latestDate: null,
    earliestDate: null
  };

  activities.forEach(activity => {
    // Count by type
    stats.byType[activity.type] = (stats.byType[activity.type] || 0) + 1;

    // Count specific types
    if (activity.type === 'project_complete') {
      stats.totalProjectsCompleted++;
    }

    // Count metrics
    if (activity.metrics) {
      if (activity.metrics.papersRead) stats.totalPapersRead += activity.metrics.papersRead;
      if (activity.metrics.experimentsRun) stats.totalExperiments += activity.metrics.experimentsRun;
      if (activity.metrics.linesOfCode) stats.totalLOC += activity.metrics.linesOfCode;
      if (activity.metrics.hoursSpent) stats.totalHours += activity.metrics.hoursSpent;
    }

    // Count tags
    if (activity.tags) {
      activity.tags.forEach(tag => {
        stats.tags[tag] = (stats.tags[tag] || 0) + 1;
      });
    }

    // Track dates
    const date = new Date(activity.date);
    if (isNaN(date.getTime())) {
      console.warn(`⚠️  Warning: Invalid date "${activity.date}" in activity "${activity.id}"`);
    } else {
      if (!stats.earliestDate || date < stats.earliestDate) {
        stats.earliestDate = date;
      }
      if (!stats.latestDate || date > stats.latestDate) {
        stats.latestDate = date;
      }
    }
  });

  // Display stats
  console.log(`Total Activities: ${stats.totalActivities}`);
  console.log(`Date Range: ${stats.earliestDate?.toLocaleDateString() || 'N/A'} - ${stats.latestDate?.toLocaleDateString() || 'N/A'}\n`);

  console.log('By Type:');
  Object.entries(stats.byType)
    .sort(([, a], [, b]) => b - a)
    .forEach(([type, count]) => {
      console.log(`  ${type.replace(/_/g, ' ')}: ${count}`);
    });

  console.log('\nKey Metrics:');
  console.log(`  Projects Completed: ${stats.totalProjectsCompleted}`);
  console.log(`  Papers Read: ${stats.totalPapersRead}`);
  console.log(`  Experiments Run: ${stats.totalExperiments}`);
  console.log(`  Total Lines of Code: ${stats.totalLOC.toLocaleString()}`);
  console.log(`  Total Hours Spent: ${stats.totalHours.toFixed(1)}h`);

  console.log('\nTop Tags:');
  Object.entries(stats.tags)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .forEach(([tag, count]) => {
      console.log(`  #${tag}: ${count}`);
    });

  console.log('\n✅ Statistics generated successfully!\n');
}

main();
