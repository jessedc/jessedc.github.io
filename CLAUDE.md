# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a Jekyll-based personal blog hosted on GitHub Pages. The site uses Jekyll 3.10.0 with the github-pages gem and is configured to be served at jessedc.dev.

## Development Commands

### Prerequisites
This project uses rbenv for Ruby version management. Always activate rbenv before running commands:
```bash
eval "$(rbenv init - zsh)" && rbenv shell 3.3.4
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

## Writing Style

When writing or editing blog posts, follow these conventions:

### Voice and Tone
- First person, direct, conversational but not casual. Reads like an experienced developer explaining something to peers.
- Lead with what the thing is and why it matters, not with preamble or throat-clearing.
- State opinions plainly without hedging excessively.
- Technical confidence without showing off. Explain things clearly but don't over-explain to an assumed-knowledgeable audience.

### Structure
- Short opening paragraph (1-3 sentences) that sets up the topic and the post's purpose. No abstract or thesis statement.
- `<!--more-->` break after the intro paragraph to control the excerpt on the index page.
- H3 (`###`) for section headings, occasionally H1 (`#`) for major sections in longer posts.
- Sections are relatively short — a heading followed by 1-3 paragraphs or a list. No long unbroken prose blocks.
- Bullet points and numbered lists used freely for concrete details (components, steps, stats, observations).
- End posts naturally without a formal conclusion or call-to-action. Often the last section is observations, notes, or a footnote.

### Formatting Conventions
- Jekyll front matter: `layout: post`, `title:`, `date:` with timezone, `comments: true`, `categories:`.
- Reference-style links at the bottom of the file (`[label]: url`) rather than inline links, especially when there are many.
- Code blocks with language hints (```yaml, ```bash) for configuration and commands.
- `<figure>` tags with `<figcaption>` for images. `<div class="image-pair">` for side-by-side images.
- Inline code backticks for technical terms, API names, file paths, and CLI commands within prose.

### Content Approach
- Practical and experience-driven. Posts describe what was actually done, not theoretical how-tos.
- Include specific versions, prices, measurements, dates — concrete details rather than vague descriptions.
- Acknowledge problems and limitations honestly (things that didn't work, caveats, gotchas).
- Credit and link to prior work, inspiration, and dependencies.
- Technical depth proportional to the topic's complexity — go deep on interesting technical details, stay brief on straightforward parts.

## Important Notes
- Uses rbenv for Ruby version management - always activate before running commands
- The _site/ directory contains the generated static site (excluded from git)
- CLAUDE.md, Gemfile, Gemfile.lock, README.md are are excluded from Jekyll processing (see _config.yml)
- VS Code Live Server is configured to serve from _site/ directory