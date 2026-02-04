---
layout: post
title: Modernizing a Decade-Old Jekyll Blog
date: 2026-01-31 10:00:00 +1000
comments: true
categories: jekyll
---

After nearly eight years of stagnation, I decided it was time to give this Jekyll blog a fresh coat of paint. The last visual update was in 2018 when Jekyll deprecated some plugins, but the design had remained largely unchanged since its Octopress roots. This week, I rolled up my sleeves and brought it into 2026.

<div style="display: flex; justify-content: space-between; gap: 20px; margin: 30px 0;">
  <figure style="flex: 1; margin: 0;">
    <img src="/images/2026-01-31/blog-style-2018.png" alt="Blog design in 2018" style="width: 100%; border: 1px solid #e1e4e8;" />
    <figcaption style="text-align: center; margin-top: 10px; font-size: 0.9em; color: #586069;">Blog design in 2018 with Octopress-era styling</figcaption>
  </figure>
  <figure style="flex: 1; margin: 0;">
    <img src="/images/2026-01-31/blog-style-2026.png" alt="Blog design in 2026" style="width: 100%; border: 1px solid #e1e4e8;" />
    <figcaption style="text-align: center; margin-top: 10px; font-size: 0.9em; color: #586069;">Modernized design in 2026 with clean typography</figcaption>
  </figure>
</div>

### The Problem

Running `bundle exec jekyll serve` in 2026 on a blog built with 2016-era dependencies felt like archeology. GitHub Actions kept warning about deprecated gems, the Octopress-era styling looked dated, and the entire codebase was carrying years of technical debt.

The original design served well for its time, but web standards have evolved significantly. Typography that looked fine in 2016 felt cramped on modern high-DPI displays. The code blocks lacked modern syntax highlighting, and the overall aesthetic screamed "vintage tech blog" rather than "actively maintained site."

### The Approach

Rather than starting from scratch, I decided to modernize incrementally. The Jekyll foundation was solid—it just needed updating. Here's what changed over the past week:

**Visual Design & Typography**
- Completely rewrote the Sass architecture, moving from a monolithic stylesheet to modular components
- Implemented a proper typography scale with modern, readable fonts
- Added responsive grid layouts that adapt cleanly from mobile to desktop
- Introduced GitHub's syntax highlighting theme for code blocks

**Technical Improvements**
- Simplified the Gemfile to just GitHub Pages essentials, eliminating dependency warnings
- Removed deprecated Octopress plugins and JavaScript libraries
- Added proper semantic HTML5 structure throughout
- Implemented accessible color contrasts and link states

**Content Enhancements**
- Updated the about section with a new hero image from my recent travels (IMG_8035.jpeg from Melbourne)
- Added proper image captions with location and copyright information
- Cleaned up the navigation to focus on essential sections
- Removed outdated social sharing widgets in favor of simpler, privacy-focused approach

### The Details That Matter

Some changes were subtle but significant:

The new blue link color (`#0969da`) matches modern GitHub styling, replacing the old teal that felt dated. Visited links now use a proper purple shade for better usability.

Code blocks got special attention. The old Solarized theme gave way to GitHub's theme with proper language detection and a subtle copy-to-clipboard feature. Line numbers are cleaner, and the overall readability improved dramatically.

```ruby
# Old syntax highlighting was functional but harsh
def old_style
  puts "Hard to read on modern screens"
end

# New highlighting feels more natural
def new_style
  puts "Easier on the eyes with better contrast"
end
```

The sidebar received a complete overhaul. Instead of cramped text and unclear hierarchy, it now features a proper author bio with a circular profile image, clear social links to GitHub and LinkedIn, and breathing room between elements.

### Looking Forward

This modernization isn't just about aesthetics—it's about maintainability. By aligning with GitHub Pages' recommended setup and removing legacy cruft, future updates will be simpler. The cleaner codebase means I can focus on writing rather than wrestling with dependencies.

The visual refresh also reignited my interest in blogging. Sometimes a fresh coat of paint is all you need to remember why you started something in the first place.

If you're sitting on an old Jekyll blog gathering dust, consider giving it some attention. The tools have gotten better, the process is smoother than you might expect, and the result might just inspire you to start writing again.

### Technical Notes

For those interested in the specifics:
- Jekyll 4.3.4 with GitHub Pages 232
- Complete Sass rewrite (~1500 lines added, ~4000 removed)
- Removed jQuery, Modernizr, and legacy Octopress JavaScript
- New responsive grid system using CSS Grid and Flexbox
- Accessibility improvements including proper ARIA labels and semantic HTML

The entire modernization took about a week of evening work, with most time spent on the visual design decisions rather than technical implementation. Sometimes the hardest part is just getting started.