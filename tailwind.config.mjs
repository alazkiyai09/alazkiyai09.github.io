/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Background colors
        bg: {
          primary: '#0a0f1c',
          secondary: '#0f1629',
          surface: 'rgba(255,255,255,0.02)',
          'surface-hover': 'rgba(14,165,233,0.06)',
        },
        // Accent colors (Cyan/Electric Blue)
        accent: {
          DEFAULT: '#0ea5e9',
          light: '#22d3ee',
          pale: '#38bdf8',
          glow: 'rgba(14,165,233,0.25)',
          bg: 'rgba(14,165,233,0.1)',
          border: 'rgba(14,165,233,0.15)',
        },
        // Text colors
        text: {
          primary: '#f1f5f9',
          secondary: '#e2e8f0',
          muted: '#94a3b8',
          subtle: '#64748b',
          faint: '#475569',
        },
        // Border colors
        border: {
          DEFAULT: 'rgba(255,255,255,0.06)',
          hover: 'rgba(14,165,233,0.3)',
          section: 'rgba(255,255,255,0.04)',
          subtle: 'rgba(255,255,255,0.08)',
        },
        // Keep slate for backward compatibility
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        },
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        body: ['DM Sans', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        // Keep sans for backward compatibility
        sans: ['DM Sans', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      fontSize: {
        // Hero h1
        'hero': ['clamp(36px, 5.5vw, 64px)', { lineHeight: '1.08', letterSpacing: '-0.03em', fontWeight: '800' }],
        // Stats numbers
        'stat': ['40px', { lineHeight: '1', fontWeight: '700' }],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'fade-in-up': 'fadeInUp 0.7s cubic-bezier(.16,1,.3,1) forwards',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'count-up': 'countUp 1.8s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        countUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      borderRadius: {
        'card': '16px',
        'btn': '10px',
        'pill': '100px',
      },
      spacing: {
        'section': '80px',
        'section-lg': '100px',
      },
      maxWidth: {
        'content': '1120px',
        'prose': '640px',
      },
      boxShadow: {
        'glow': '0 0 40px rgba(14,165,233,0.35)',
        'glow-sm': '0 0 20px rgba(14,165,233,0.2)',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(.16,1,.3,1)',
      },
    },
  },
  plugins: [],
};
