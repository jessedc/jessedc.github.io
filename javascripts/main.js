// JavaScript for Jekyll blog
(function() {
  'use strict';

  // Add copy to clipboard functionality for code blocks
  function initCodeCopyButtons() {
    var codeBlocks = document.querySelectorAll('.highlighter-rouge');

    codeBlocks.forEach(function(wrapper) {
      var highlight = wrapper.querySelector('.highlight');
      if (!highlight) return;

      var button = document.createElement('button');
      button.className = 'code-copy-button';
      button.textContent = 'Copy';
      button.type = 'button';

      button.addEventListener('click', function() {
        var code = highlight.querySelector('pre code') || highlight.querySelector('pre');
        if (!code) return;

        var text = code.textContent || code.innerText;

        navigator.clipboard.writeText(text).then(function() {
          button.textContent = 'Copied!';
          button.classList.add('copied');

          setTimeout(function() {
            button.textContent = 'Copy';
            button.classList.remove('copied');
          }, 2000);
        }).catch(function(err) {
          console.error('Failed to copy:', err);
        });
      });

      wrapper.appendChild(button);
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCodeCopyButtons);
  } else {
    initCodeCopyButtons();
  }
})();
