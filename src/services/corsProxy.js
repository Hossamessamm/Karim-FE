// This file is a simple CORS proxy that can be used during development
// It requires cors-anywhere to be installed: npm install -g cors-anywhere

const { BASE_URL } = require('../apiConfig');

const corsProxy = {
  // Instructions for setting up a local CORS proxy server
  setupInstructions: `
    To set up a local CORS proxy server:
    
    1. Install cors-anywhere globally:
       npm install -g cors-anywhere
    
    2. Run the proxy server:
       cors-anywhere --port 8080
    
    3. Then update your API_URL in api.ts to use:
       const API_URL = 'https://localhost:8080/https://api.ibrahim-magdy.com';
    
    This will proxy all requests through your local CORS proxy.
  `,

  // Function to format a URL to use the CORS proxy
  getProxiedUrl: (url) => {
    // Only use in development environment
    if (process.env.NODE_ENV === 'development') {
      // Check if already using localhost proxy
      if (url.includes('localhost:8080')) {
        return url;
      }
      
      // Add the proxy prefix
      if (url.startsWith('http')) {
        return `https://localhost:8080/${url}`;
      } else {
        // Ensure we maintain the /api prefix in the URL
        const path = url.startsWith('/') ? url : '/' + url;
        // Don't add /api if it's already there
        return `https://localhost:8080/https://api.ibrahim-magdy.com${path}`;
      }
    }
    
    // In production, just return the original URL
    return url;
  }
};

export default corsProxy; 