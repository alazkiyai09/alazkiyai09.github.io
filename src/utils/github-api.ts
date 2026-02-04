/**
 * GitHub API utility functions for fetching user and repository statistics
 */

export interface GitHubStats {
  totalRepositories: number;
  totalStars: number;
  totalForks: number;
  languages: Record<string, number>;
  recentRepos: Array<{
    name: string;
    description: string | null;
    language: string | null;
    stars: number;
    forks: number;
    url: string;
  }>;
}

/**
 * Fetch GitHub statistics for a given username
 * Note: This only fetches public repositories and doesn't require authentication
 * For contribution graphs and detailed stats, GitHub GraphQL API with auth is needed
 */
export async function fetchGitHubStats(username: string): Promise<GitHubStats | null> {
  try {
    // Fetch public repositories
    const reposResponse = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
      {
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'Portfolio-Stats-Fetcher',
        },
      }
    );

    if (!reposResponse.ok) {
      console.warn(`GitHub API returned status: ${reposResponse.status}`);
      return null;
    }

    const repos = await reposResponse.json();

    // Calculate statistics
    const languages: Record<string, number> = {};
    let totalStars = 0;
    let totalForks = 0;

    // Get recent repos (last 6 updated)
    const recentRepos = repos.slice(0, 6).map((repo: any) => {
      totalStars += repo.stargazers_count;
      totalForks += repo.forks_count;

      if (repo.language) {
        languages[repo.language] = (languages[repo.language] || 0) + 1;
      }

      return {
        name: repo.name,
        description: repo.description,
        language: repo.language,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        url: repo.html_url,
      };
    });

    return {
      totalRepositories: repos.length,
      totalStars,
      totalForks,
      languages,
      recentRepos,
    };
  } catch (error) {
    console.error('Error fetching GitHub stats:', error);
    return null;
  }
}

/**
 * Fetch GitHub user profile information
 */
export async function fetchGitHubProfile(username: string) {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'Portfolio-Stats-Fetcher',
      },
    });

    if (!response.ok) return null;

    return await response.json();
  } catch (error) {
    console.error('Error fetching GitHub profile:', error);
    return null;
  }
}
