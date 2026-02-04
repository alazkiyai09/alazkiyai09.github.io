# Layout Components Review

## Reviewed: BaseLayout.astro, Header.astro, Navigation.astro

### ISSUES FOUND

#### MINOR ISSUES

1. **Mobile menu doesn't prevent body scroll**
   - Location: `Header.astro:65-67`
   - Issue: CSS selector `#mobile-menu:not(.hidden) ~ *` won't work because mobile menu is not a sibling of main content
   - Impact: Body scrolling not prevented when mobile menu is open
   - Fix: Use JavaScript to toggle body scroll or use fixed positioning

2. **Missing aria-expanded attribute**
   - Location: `Header.astro:30-34`
   - Issue: Mobile menu button doesn't have `aria-expanded` to indicate menu state
   - Impact: Accessibility issue for screen readers
   - Fix: Add dynamic `aria-expanded` based on menu state

3. **Missing skip-to-content link**
   - Location: `BaseLayout.astro`
   - Issue: No skip link for keyboard navigation
   - Impact: Accessibility issue - users must tab through all navigation
   - Fix: Add skip-to-main-content link at top of HTML

4. **Hardcoded default values duplicated**
   - Location: `BaseLayout.astro:15-18`
   - Issue: Default title and description are long and duplicated from plan
   - Impact: Harder to maintain, could be in config
   - Suggestion: Move to config or data file

#### POTENTIAL ISSUES

5. **Theme observer never disconnected**
   - Location: `BaseLayout.astro:72-78`
   - Issue: MutationObserver created but never disconnected
   - Impact: Minor memory leak (observer stays active)
   - Fix: Not critical for SPAs but good practice to clean up

6. **Navigation items hardcoded**
   - Location: `Navigation.astro:8-15`
   - Issue: Nav items defined in component, not from config
   - Impact: Harder to maintain navigation
   - Suggestion: Move to data/navigation.json

### POSITIVE FINDINGS

✅ Proper TypeScript interfaces defined
✅ Good SEO meta tags (OpenGraph, Twitter cards)
✅ Theme script properly placed inline
✅ View transitions configured
✅ Responsive design with breakpoints
✅ Dark mode classes properly applied
✅ Active link highlighting works correctly

---

## REFACTORED CODE

### Header.astro (Fixed mobile menu and accessibility)

```astro
---
import Navigation from './Navigation.astro';
import ThemeToggle from './ThemeToggle.astro';
---

<header class="sticky top-0 z-50 w-full backdrop-blur-lg bg-white/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800">
  <div class="container">
    <div class="flex h-16 items-center justify-between">
      <!-- Logo -->
      <a href="/" class="flex items-center space-x-2 group">
        <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-xl group-hover:scale-105 transition-transform">
          A
        </div>
        <div class="hidden sm:block">
          <div class="font-bold text-slate-900 dark:text-white">Azka</div>
          <div class="text-xs text-slate-600 dark:text-slate-400">AI Security Researcher</div>
        </div>
      </a>

      <!-- Desktop Navigation -->
      <div class="hidden md:flex items-center space-x-6">
        <Navigation />
      </div>

      <!-- Right side actions -->
      <div class="flex items-center space-x-4">
        <ThemeToggle />

        <!-- Mobile menu button -->
        <button
          id="mobile-menu-button"
          class="md:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Toggle menu"
          aria-expanded="false"
          aria-controls="mobile-menu"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>

  <!-- Mobile Navigation -->
  <div id="mobile-menu" class="hidden md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
    <Navigation mobile={true} />
  </div>
</header>

<script>
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');

  mobileMenuButton?.addEventListener('click', () => {
    const isHidden = mobileMenu?.classList.contains('hidden');
    mobileMenu?.classList.toggle('hidden');

    // Update aria-expanded
    mobileMenuButton?.setAttribute('aria-expanded', String(isHidden));

    // Prevent body scroll when menu is open
    if (isHidden) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  });
</script>
```

### BaseLayout.astro (Added skip link)

```astro
---
import Header from './Header.astro';
import Footer from './Footer.astro';
import '../../styles/global.css';

interface Props {
  title?: string;
  description?: string;
  image?: string;
  keywords?: string[];
  noindex?: boolean;
}

const {
  title = 'Azka - AI Security Researcher & Fraud Detection Specialist',
  description = 'Building secure federated learning systems for financial applications.',
  image = '/og-image.png',
  keywords = ['AI Security', 'Federated Learning', 'Fraud Detection', 'Machine Learning', 'Cryptography'],
  noindex = false
} = Astro.props;

const canonicalURL = new URL(Astro.url.pathname, Astro.site);
---

<!doctype html>
<html lang="en" class="scroll-smooth">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="generator" content={Astro.generator} />

    <!-- Canonical URL -->
    <link rel="canonical" href={canonicalURL} />

    <!-- SEO -->
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="keywords" content={keywords.join(', ')} />
    {noindex && <meta name="robots" content="noindex, nofollow" />}

    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content={canonicalURL} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={new URL(image, Astro.url)} />

    <!-- Twitter -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:url" content={canonicalURL} />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={new URL(image, Astro.url)} />

    <!-- Preconnect -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Fira+Code:wght@400;500;600&display=swap" rel="stylesheet" />

    <!-- Theme Script (must run before DOM) -->
    <script is:inline>
      const getThemePreference = () => {
        if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
          return localStorage.getItem('theme');
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      };
      const isDark = getThemePreference() === 'dark';
      document.documentElement.classList[isDark ? 'add' : 'remove']('dark');

      if (typeof localStorage !== 'undefined') {
        const observer = new MutationObserver(() => {
          const isDark = document.documentElement.classList.contains('dark');
          localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

        // Cleanup observer on page unload (minor improvement)
        window.addEventListener('beforeunload', () => {
          observer.disconnect();
        }, { once: true });
      }
    </script>
  </head>

  <body class="min-h-screen flex flex-col">
    <!-- Skip to main content link for accessibility -->
    <a href="#main-content" class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg">
      Skip to main content
    </a>

    <Header />

    <main id="main-content" class="flex-1">
      <slot />
    </main>

    <Footer />
  </body>
</html>

<style is:global>
  /* View Transitions */
  @view-transition {
    navigation: auto;
  }

  ::view-transition-old(root),
  ::view-transition-new(root) {
    animation: none;
    mix-blend-mode: normal;
  }

  ::view-transition-old(root) {
    z-index: 1;
  }

  ::view-transition-new(root) {
    z-index: 9999;
  }

  @supports (overflow-clip-margin: 1px) {
    html {
      overflow-clip-margin: 1px;
    }
  }

  /* Screen reader only class */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
</style>
```

---

## STATUS: ⚠️ PASSED (6 minor issues, 2 refactored)
