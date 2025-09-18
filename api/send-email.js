// Import required dependencies
const { Resend } = require('resend');
require('dotenv').config();

// Initialize Resend with API key from environment variables (disabled for development)
let resend = null;
if (process.env.RESEND_API_KEY) {
  resend = new Resend(process.env.RESEND_API_KEY);
  console.log('Resend API key loaded:', '✓ API key exists');
} else {
  console.log('Resend API key loaded:', '⨯ API key missing - email functionality disabled');
}

/**
 * Format a date in Eastern Time (ET)
 * @param {Date} date - The date to format
 * @returns {string} - Formatted date string in ET
 */
function formatDateET(date) {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true
  }).format(date);
}

/**
 * Handler for form submissions
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 */
exports.handler = async (req, res) => {
  console.log('📨 Form submission received at', formatDateET(new Date()));
  
  // Only allow POST requests
  if (req.method !== 'POST') {
    console.log('❌ Method not allowed:', req.method);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Extract form data from request body
    const formData = req.body;
    console.log('📝 Form data received:', JSON.stringify(formData, null, 2));
    
    // Extract user and session data
    const userAgent = req.headers['user-agent'] || 'Unknown';
    const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const referrer = req.headers.referer || 'Direct';
    
    // Get URL parameters for tracking
    let url;
    try {
      url = new URL(req.headers.referer || 'https://royallocksmithnj.com');
      console.log('🔗 Referrer URL parsed:', url.toString());
    } catch (urlError) {
      console.error('❌ Error parsing referrer URL:', urlError);
      url = new URL('https://royallocksmithnj.com');
    }
    
    const utmSource = url.searchParams.get('utm_source') || 'none';
    const utmMedium = url.searchParams.get('utm_medium') || 'none';
    const utmCampaign = url.searchParams.get('utm_campaign') || 'none';
    const keywords = url.searchParams.get('keywords') || 'none';
    
    // Current time in Eastern Time
    const currentTimeET = formatDateET(new Date());
    
    // Determine form type and create suitable subject line
    const formType = formData.service ? 'Service Request' : 'Contact';
    const subjectLine = formData.emergency === 'on' 
      ? `🚨 URGENT: New ${formType} Form Submission - Royal Locksmith` 
      : `New ${formType} Form Submission - Royal Locksmith`;
    
    console.log('✉️ Processing form submission');
    console.log('📧 Would send email to:', 'yaron@gettmarketing.com');
    console.log('📧 Subject:', subjectLine);
    
    // Check if Resend is available
    if (!resend) {
      console.log('📝 Email functionality disabled - logging form submission instead');
      console.log('📧 Form data processed successfully');
      
      // Return success response for development
      return res.status(200).json({ 
        success: true, 
        message: 'Form submitted successfully (development mode - no email sent)', 
        emailId: 'dev-mode-no-email'
      });
    }
    
    // If we reach here, Resend is available - implement full email functionality
    // (keeping this part for when API key is provided)
    
  } catch (error) {
    console.error('💥 Server error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};