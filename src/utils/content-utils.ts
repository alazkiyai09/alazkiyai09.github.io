/**
 * Content collection utility functions with error handling
 */

import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

/**
 * Get all projects sorted by title
 */
export async function getSortedProjects() {
  try {
    const projects = await getCollection('projects');
    return projects.sort((a, b) => (a.data.title || '').localeCompare(b.data.title || ''));
  } catch (error) {
    console.error('[content-utils] Error in getSortedProjects:', error);
    throw new Error(`Failed to fetch projects: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Get completed projects
 */
export async function getCompletedProjects() {
  try {
    const projects = await getCollection('projects');
    return projects
      .filter(p => p.data.status === 'completed')
      .sort((a, b) => (a.data.title || '').localeCompare(b.data.title || ''));
  } catch (error) {
    console.error('[content-utils] Error in getCompletedProjects:', error);
    throw new Error(`Failed to fetch completed projects: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Get projects by category
 */
export async function getProjectsByCategory(category: string) {
  try {
    const projects = await getCollection('projects');
    return projects
      .filter(p => p.data.category === category)
      .sort((a, b) => (a.data.title || '').localeCompare(b.data.title || ''));
  } catch (error) {
    console.error('[content-utils] Error in getProjectsByCategory:', error);
    throw new Error(`Failed to fetch projects for category "${category}": ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Get unique project categories
 */
export async function getProjectCategories() {
  try {
    const projects = await getCollection('projects');
    const categories = new Set(projects.map(p => p.data.category));
    return Array.from(categories);
  } catch (error) {
    console.error('[content-utils] Error in getProjectCategories:', error);
    throw new Error(`Failed to fetch project categories: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Get featured projects (first N completed projects)
 */
export async function getFeaturedProjects(count: number = 6) {
  try {
    const completed = await getCompletedProjects();
    return completed.slice(0, count);
  } catch (error) {
    console.error('[content-utils] Error in getFeaturedProjects:', error);
    throw new Error(`Failed to fetch featured projects: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Get projects by status
 */
export async function getProjectsByStatus(status: 'draft' | 'in-progress' | 'completed') {
  try {
    const projects = await getCollection('projects');
    return projects
      .filter(p => p.data.status === status)
      .sort((a, b) => (a.data.title || '').localeCompare(b.data.title || ''));
  } catch (error) {
    console.error('[content-utils] Error in getProjectsByStatus:', error);
    throw new Error(`Failed to fetch projects with status "${status}": ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Get all publications sorted by year
 */
export async function getSortedPublications() {
  try {
    const publications = await getCollection('publications');
    return publications.sort((a, b) => b.data.year - a.data.year);
  } catch (error) {
    console.error('[content-utils] Error in getSortedPublications:', error);
    throw new Error(`Failed to fetch publications: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Get all blog posts sorted by date
 */
export async function getSortedBlogPosts() {
  try {
    const posts = await getCollection('blog');
    return posts
      .filter(p => p.data.published !== false)
      .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());
  } catch (error) {
    console.error('[content-utils] Error in getSortedBlogPosts:', error);
    throw new Error(`Failed to fetch blog posts: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Get related projects based on tags
 */
export async function getRelatedProjects(currentProject: CollectionEntry<'projects'>, limit: number = 3) {
  try {
    const projects = await getCollection('projects');
    const currentTags = new Set(currentProject.data.tags);

    return projects
      .filter(p => p.slug !== currentProject.slug)
      .filter(p => p.data.tags.some(tag => currentTags.has(tag)))
      .sort((a, b) => {
        const aMatches = a.data.tags.filter(tag => currentTags.has(tag)).length;
        const bMatches = b.data.tags.filter(tag => currentTags.has(tag)).length;
        return bMatches - aMatches;
      })
      .slice(0, limit);
  } catch (error) {
    console.error('[content-utils] Error in getRelatedProjects:', error);
    throw new Error(`Failed to fetch related projects: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
