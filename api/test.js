/**
 * Simple test endpoint for Vercel deployment
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
module.exports = (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  res.json({
    success: true,
    message: 'API is working correctly',
    timestamp: new Date().toISOString(),
    method: req.method
  });
};