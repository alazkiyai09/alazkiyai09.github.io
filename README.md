# Azka's Portfolio Website

AI Security Researcher & Fraud Detection Specialist - Portfolio showcasing 30-day journey in federated learning security, fraud detection, and cryptographic research.

## Tech Stack

- **Framework:** Astro
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **Content:** Markdown + MDX
- **Deployment:** GitHub Pages

## Development

### Prerequisites

- Node.js 20+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Scripts

- `npm run dev` - Start development server (http://localhost:4321)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run update-activity` - Interactive CLI to add new activities
- `npm run generate-stats` - Generate statistics from activity log

## Project Structure

```
src/
├── components/
│   ├── layout/       # BaseLayout, Header, Footer, Navigation
│   ├── ui/           # Card, Badge, Button, etc.
│   ├── sections/     # Hero, About, Skills, etc.
│   └── features/     # ActivityFeed, ProgressDashboard, etc.
├── content/          # Markdown content collections
│   ├── projects/     # 30-day portfolio projects
│   ├── blog/         # Blog posts
│   └── publications/ # Academic papers
├── data/             # JSON data files
├── pages/            # Route pages
├── styles/           # Global CSS
└── utils/            # Utility functions
```

## Content Management

### Adding Activities

Use the interactive CLI to add new activities:

```bash
npm run update-activity
```

### Adding Projects

Create a new markdown file in `src/content/projects/` with the following frontmatter:

```yaml
---
title: "Project Title"
day: 1
status: "completed"
category: "federated-learning"
tags:
  - federated-learning
  - security
summary: "Brief project description"
technologies:
  - Python
  - PyTorch
---
```

## Deployment

The site is automatically deployed to GitHub Pages when pushing to the `main` branch.

### Manual Deployment

1. Push to `main` branch
2. GitHub Actions will build and deploy
3. Site will be available at `https://azka.github.io`

## License

MIT

## Contact

- GitHub: [@azka](https://github.com/azka)
- LinkedIn: [azka](https://linkedin.com/in/azka)
- Email: azka@example.com
