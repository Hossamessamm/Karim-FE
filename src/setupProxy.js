const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://api.ibrahim-magdy.com',
      changeOrigin: true,
      secure: false, // Ignore SSL certificate issues
      onProxyReq: function(proxyReq, req, res) {
        // Log outgoing requests for debugging
        console.log('Proxying request:', req.method, req.path);
      },
      onProxyRes: function(proxyRes, req, res) {
        // Log incoming responses for debugging
        console.log('Proxy Response:', req.method, req.path, proxyRes.statusCode);
      },
      onError: function(err, req, res) {
        // Log proxy errors
        console.error('Proxy Error:', err);
      }
    })
  );
}; 