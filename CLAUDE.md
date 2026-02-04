# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a Jekyll-based personal blog hosted on GitHub Pages. The site uses Jekyll 3.10.0 with the github-pages gem and is configured to be served at jessedc.dev.

## Development Commands

### Prerequisites
This project uses RVM for Ruby version management. Always activate RVM before running commands:
```bash
source ~/.rvm/scripts/rvm && rvm use ruby-3.3.4
```

### Common Commands

Build the site:
```bash
bundle exec jekyll build
```

Serve the site locally (default: http://localhost:4000):
```bash
bundle exec jekyll serve
```

Serve with drafts:
```bash
bundle exec jekyll serve --drafts
```

Build with verbose output for debugging:
```bash
bundle exec jekyll build --verbose
```

Install dependencies:
```bash
bundle install
```

## Architecture and Structure

### Content Organization
- **_posts/**: Published blog posts in format `YYYY-MM-DD-title.markdown`
- **_drafts/**: Unpublished draft posts
- **images/**: Image assets for blog posts

### Theme Structure
- **_layouts/**: Page templates (default.html, post.html, page.html)
- **_includes/**: Reusable components
  - `asides/`: Sidebar components
  - `post/`: Post-specific partials
- **_sass/**: Sass stylesheets organized by:
  - `base/`: Base styles
  - `components/`: Component styles
  - `layout/`: Layout styles
  - `utilities/`: Utility classes
- **css/screen.scss**: Main stylesheet entry point that imports from _sass

### Key Configuration
- **_config.yml**: Site configuration including plugins, permalink structure, pagination
- **Gemfile**: Ruby dependencies (uses github-pages gem)
- **.ruby-version**: Specifies Ruby 3.3.4

### Jekyll Plugins
- jekyll-sitemap: Generates sitemap
- jekyll-paginate: Handles pagination (10 posts per page)
- jekyll-gist: Embeds GitHub gists

### Deployment
The site is deployed to GitHub Pages with custom domain jessedc.dev configured via CNAME file.

## Important Notes
- Uses RVM for Ruby version management - always activate before running commands
- The _site/ directory contains the generated static site (excluded from git)
- CLAUDE.md, Gemfile, Gemfile.lock, README.md are are excluded from Jekyll processing (see _config.yml)
- VS Code Live Server is configured to serve from _site/ directory