// Import required dependencies
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

// Import route handlers
const emailHandler = require('./api/send-email');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Serve static files
app.use(express.static(path.join(__dirname)));

// API routes
app.post('/api/send-email', emailHandler.handler);

// Simple test endpoint
app.get('/api/test', (req, res) => {
  res.json({
    success: true,
    message: 'API is working correctly',
    timestamp: new Date().toISOString()
  });
});

// Route for specific HTML files
const htmlPages = [
  'index.html', 
  'services.html', 
  'areas.html', 
  'faq.html', 
  'about.html', 
  'contact.html',
  'thank-you.html',
  '404.html',
  'privacy-policy.html',
  'terms-conditions.html'
];

// Set up routes for HTML pages
htmlPages.forEach(page => {
  app.get(`/${page}`, (req, res) => {
    res.sendFile(path.join(__dirname, page));
  });
});

// Special case for the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// 404 handler - must be after all other routes
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, '404.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT} to view the website`);
}); 