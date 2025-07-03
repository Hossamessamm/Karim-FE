const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://api.ibrahim-magdy.com',
      changeOrigin: true,
      // Don't rewrite the path since the API actually expects /api in the URL
      // pathRewrite: { '^/api': '' },
      onProxyRes: function(proxyRes, req, res) {
        // Log proxy activity for debugging
        console.log('Proxy Response:', req.method, req.path);
        
        // Fix CORS headers for credentials
        proxyRes.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000';
        proxyRes.headers['Access-Control-Allow-Credentials'] = 'true';
        proxyRes.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS';
        proxyRes.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization, X-Requested-With';
      },
    })
  );
}; 