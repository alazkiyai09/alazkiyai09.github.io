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
