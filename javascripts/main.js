// Modern JavaScript for Jekyll blog
(function() {
  'use strict';

  // Mobile navigation
  function initMobileNav() {
    const nav = document.querySelector('nav[role="navigation"]');
    const searchField = nav?.querySelector('fieldset[role="search"]');
    
    if (!searchField) return;
    
    // Create mobile nav select
    const mobileNav = document.createElement('fieldset');
    mobileNav.className = 'mobile-nav';
    const select = document.createElement('select');
    select.innerHTML = '<option value="">Navigate…</option>';
    
    // Add main navigation items
    const mainNavLinks = document.querySelectorAll('ul[role="main-navigation"] a');
    mainNavLinks.forEach(link => {
      const option = document.createElement('option');
      option.value = link.href;
      option.textContent = `» ${link.textContent}`;
      select.appendChild(option);
    });
    
    // Add subscription links
    const subLinks = document.querySelectorAll('ul.subscription a');
    subLinks.forEach(link => {
      const option = document.createElement('option');
      option.value = link.href;
      option.textContent = `» ${link.textContent}`;
      select.appendChild(option);
    });
    
    // Handle navigation
    select.addEventListener('change', (e) => {
      if (e.target.value) {
        window.location.href = e.target.value;
      }
    });
    
    mobileNav.appendChild(select);
    searchField.insertAdjacentElement('afterend', mobileNav);
    
    // Add main-navigation class
    const mainNav = document.querySelector('ul[role="main-navigation"]');
    if (mainNav) mainNav.classList.add('main-navigation');
  }

  // Sidebar toggler
  function initSidebarToggler() {
    const body = document.body;
    const content = document.getElementById('content');
    
    if (!body.classList.contains('sidebar-footer') && content) {
      // Create toggle button
      const toggleBtn = document.createElement('span');
      toggleBtn.className = 'toggle-sidebar';
      content.appendChild(toggleBtn);
      
      // Toggle sidebar on click
      toggleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        body.classList.toggle('collapse-sidebar');
      });
    }
    
    // Add classes to sidebar sections
    const sections = document.querySelectorAll('aside.sidebar > section');
    sections.forEach((section, index) => {
      if (sections.length >= 3 && index % 3 === 0) {
        section.classList.add('first');
      }
      section.classList.add((index + 1) % 2 ? 'odd' : 'even');
    });
    
    // Add thirds class if 3+ sections
    if (sections.length >= 3) {
      const sidebar = document.querySelector('aside.sidebar');
      if (sidebar) sidebar.classList.add('thirds');
    }
  }

  // Add line numbers to code blocks
  function addCodeLineNumbers() {
    const codeBlocks = document.querySelectorAll('div.gist-highlight');
    
    codeBlocks.forEach(block => {
      const lines = block.querySelectorAll('.line');
      const lineCount = lines.length;
      
      if (lineCount === 0) return;
      
      // Create line numbers
      let lineNumbers = '';
      for (let i = 1; i <= lineCount; i++) {
        lineNumbers += `<span class="line-number">${i}</span>\n`;
      }
      
      // Get original code
      const pre = block.querySelector('pre');
      if (!pre) return;
      
      // Build table structure
      const table = `
        <table>
          <tbody>
            <tr>
              <td class="gutter">
                <pre class="line-numbers">${lineNumbers}</pre>
              </td>
              <td class="code">
                <pre>${pre.innerHTML}</pre>
              </td>
            </tr>
          </tbody>
        </table>
      `;
      
      block.innerHTML = table;
    });
  }

  // GitHub repositories
  function loadGitHubRepos(user, count, target, skipForks) {
    if (!user || !target) return;
    
    const targetEl = document.querySelector(target);
    if (!targetEl) return;
    
    // Use GitHub API v3
    fetch(`https://api.github.com/users/${user}/repos`)
      .then(response => response.json())
      .then(data => {
        let repos = data;
        
        // Filter forks if requested
        if (skipForks) {
          repos = repos.filter(repo => !repo.fork);
        }
        
        // Sort by pushed_at date
        repos.sort((a, b) => {
          const aDate = new Date(a.pushed_at);
          const bDate = new Date(b.pushed_at);
          return bDate - aDate;
        });
        
        // Limit count
        if (count) {
          repos = repos.slice(0, count);
        }
        
        // Render repos
        const fragment = repos.map(repo => {
          const description = repo.description ? 
            `<p>${escapeHtml(repo.description)}</p>` : '';
          return `
            <li>
              <a href="${repo.html_url}">${repo.name}</a>
              ${description}
            </li>
          `;
        }).join('');
        
        targetEl.innerHTML = fragment;
      })
      .catch(error => {
        console.error('Error loading GitHub repos:', error);
        targetEl.innerHTML = '<li class="error">Error loading repositories</li>';
      });
  }

  // Escape HTML for security
  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // iOS viewport scaling fix
  function fixIOSScaling() {
    const viewport = document.querySelector('meta[name="viewport"]');
    if (!viewport) return;
    
    let scales = [1, 1];
    
    function fix() {
      viewport.content = `width=device-width,minimum-scale=${scales[0]},maximum-scale=${scales[1]}`;
      document.removeEventListener('gesturestart', fix, true);
    }
    
    if ('addEventListener' in document) {
      fix();
      scales = [0.25, 1.6];
      document.addEventListener('gesturestart', fix, true);
    }
  }

  // Feature detection (minimal, modern browsers support most features)
  function detectFeatures() {
    const html = document.documentElement;
    
    // Check for CSS mask-image support
    if (CSS.supports('mask-image', 'url(#)') || CSS.supports('-webkit-mask-image', 'url(#)')) {
      html.classList.add('maskImage');
    } else {
      html.classList.add('no-maskImage');
    }
    
    // Placeholder support (all modern browsers support this)
    if ('placeholder' in document.createElement('input')) {
      html.classList.add('placeholder');
    } else {
      html.classList.add('no-placeholder');
    }
  }

  // Add copy to clipboard functionality for code blocks
  function initCodeCopyButtons() {
    // Target Jekyll's code block structure
    const codeBlocks = document.querySelectorAll('.highlighter-rouge');
    
    codeBlocks.forEach(wrapper => {
      // Skip inline code (they don't have .highlight child)
      const highlight = wrapper.querySelector('.highlight');
      if (!highlight) return;
      
      // Create copy button
      const button = document.createElement('button');
      button.className = 'code-copy-button';
      button.textContent = 'Copy';
      button.type = 'button';
      
      // Add click handler
      button.addEventListener('click', async () => {
        const code = highlight.querySelector('pre code') || highlight.querySelector('pre');
        if (!code) return;
        
        // Get the text content
        const text = code.textContent || code.innerText;
        
        try {
          // Try modern clipboard API first
          if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(text);
          } else {
            // Fallback for older browsers
            const textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
          }
          
          // Show success feedback
          button.textContent = 'Copied!';
          button.classList.add('copied');
          
          // Reset after 2 seconds
          setTimeout(() => {
            button.textContent = 'Copy';
            button.classList.remove('copied');
          }, 2000);
        } catch (err) {
          console.error('Failed to copy:', err);
          button.textContent = 'Failed';
          setTimeout(() => {
            button.textContent = 'Copy';
          }, 2000);
        }
      });
      
      // Add button to the wrapper
      wrapper.appendChild(button);
    });
  }

  // Initialize everything when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    detectFeatures();
    initMobileNav();
    initSidebarToggler();
    addCodeLineNumbers();
    initCodeCopyButtons();
    fixIOSScaling();
    
    // Load GitHub repos if configured
    const githubUser = window.githubUser;
    const githubRepoCount = window.githubRepoCount || 5;
    const githubTarget = '#gh_repos';
    const githubSkipForks = window.githubSkipForks !== false;
    
    if (githubUser) {
      loadGitHubRepos(githubUser, githubRepoCount, githubTarget, githubSkipForks);
    }
  }

  // Export for global access if needed
  window.github = {
    showRepos: function(options) {
      loadGitHubRepos(options.user, options.count, options.target, options.skip_forks);
    }
  };

})();