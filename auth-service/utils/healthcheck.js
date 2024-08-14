const http = require('http');

// Define the health check server
const server = http.createServer((req, res) => {
  if (req.url === '/healthcheck' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Service is up and running');
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

// Listen on port 8080
const PORT = process.env.HEALTH_CHECK_PORT || 8080;
server.listen(PORT, () => {
  console.log(`Health check server running on port ${PORT}`);
});
