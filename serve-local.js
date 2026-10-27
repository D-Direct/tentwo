#!/usr/bin/env node

/**
 * Simple local server for testing TenTwo website
 * Run: node serve-local.js
 * Then open: http://localhost:3000
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm'
};

const server = http.createServer((req, res) => {
  let filePath = '.' + req.url;

  // Handle root
  if (filePath === './') {
    filePath = './index.html';
  }

  // Handle clean URLs (Vercel-style rewrites)
  if (filePath === './about') {
    filePath = './about.html';
  } else if (filePath === './kandy-guide') {
    filePath = './kandy-guide.html';
  }

  // If no extension, try adding .html
  if (!path.extname(filePath) && filePath !== './index.html' && filePath !== './about.html' && filePath !== './kandy-guide.html') {
    const htmlPath = filePath + '.html';
    if (fs.existsSync(htmlPath)) {
      filePath = htmlPath;
    }
  }

  const extname = String(path.extname(filePath)).toLowerCase();
  const contentType = mimeTypes[extname] || 'application/octet-stream';

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 - File Not Found</h1>', 'utf-8');
      } else {
        res.writeHead(500);
        res.end('Server Error: ' + error.code, 'utf-8');
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log('╔════════════════════════════════════════════════════╗');
  console.log('║     TenTwo Local Development Server               ║');
  console.log('╚════════════════════════════════════════════════════╝');
  console.log('');
  console.log(`✓ Server running at http://localhost:${PORT}/`);
  console.log('');
  console.log('  Pages available:');
  console.log(`  • Homepage:     http://localhost:${PORT}/`);
  console.log(`  • About:        http://localhost:${PORT}/about`);
  console.log(`  • Kandy Guide:  http://localhost:${PORT}/kandy-guide`);
  console.log('');
  console.log('  Press CTRL+C to stop the server');
  console.log('');
});
