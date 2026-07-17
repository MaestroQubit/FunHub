// Initialize Vercel Speed Insights
// This script injects the Speed Insights tracking code into the page

(function() {
  'use strict';

  // Initialize the queue for Speed Insights
  window.si = window.si || function() {
    (window.siq = window.siq || []).push(arguments);
  };

  // Create and inject the Speed Insights script
  function injectSpeedInsights() {
    // Check if script is already loaded
    const existingScript = document.head.querySelector('script[src*="speed-insights"]');
    if (existingScript) {
      return;
    }

    // Create script element
    const script = document.createElement('script');
    
    // Use the Vercel Speed Insights script path
    // This will be available after deploying to Vercel and enabling Speed Insights
    script.src = '/_vercel/speed-insights/script.js';
    script.defer = true;
    
    // Add SDK information
    script.dataset.sdkn = '@vercel/speed-insights';
    script.dataset.sdkv = '2.0.0';
    
    // Error handling
    script.onerror = function() {
      console.log('[Vercel Speed Insights] Failed to load script. Please ensure Speed Insights is enabled in your Vercel dashboard.');
    };
    
    // Inject the script
    document.head.appendChild(script);
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectSpeedInsights);
  } else {
    injectSpeedInsights();
  }
})();
