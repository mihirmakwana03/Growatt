// Polyfill global object (useful for some libraries expecting Node.js-like environment)
if (typeof global === 'undefined') {
    window.global = window;
  }
  
  // Optional: Polyfill for `process` (some packages might expect this)
  if (typeof process === 'undefined') {
    window.process = {
      env: {
        NODE_ENV: 'development',
      },
    };
  }
  