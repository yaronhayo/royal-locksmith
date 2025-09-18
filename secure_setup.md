# Secure API Setup Guide

This document provides instructions for setting up API keys securely for the Royal Locksmith website in a production environment.

## Environment Variables

The website uses environment variables stored in a `.env` file for sensitive information. This file is **not** committed to version control for security reasons.

### Required Environment Variables

```
GOOGLE_API_KEY=your_google_api_key_here
```

## Local Development Setup

1. Create a `.env` file in the root directory
2. Add the required environment variables (see above)
3. The `config.js` file will load these variables (simulated in our demo)

## Production Setup

For a production environment, implement one of these secure approaches:

### Option 1: Server-Side Rendering

In a server environment (Node.js, PHP, etc.):

1. Store API keys as environment variables on the server
2. Use server-side code to inject the keys into HTML/JS during render
3. Ensure the `.env` file is not publicly accessible

Example with Node.js/Express:

```javascript
app.get('/', (req, res) => {
  const htmlContent = fs.readFileSync('index.html', 'utf8')
    .replace('%%GOOGLE_API_KEY%%', process.env.GOOGLE_API_KEY);
  res.send(htmlContent);
});
```

### Option 2: Build-Time Variable Injection

1. Use a build tool (Webpack, Parcel, etc.)
2. Configure the build tool to inject environment variables at build time
3. Deploy only the built files, not source files with placeholders

Example with Webpack:

```javascript
// webpack.config.js
const webpack = require('webpack');
require('dotenv').config();

module.exports = {
  // ...other config
  plugins: [
    new webpack.DefinePlugin({
      'process.env.GOOGLE_API_KEY': JSON.stringify(process.env.GOOGLE_API_KEY)
    })
  ]
};
```

### Option 3: Backend API Proxy

1. Create an API endpoint on your server
2. The endpoint returns a configuration object with necessary API keys
3. Client-side code requests this configuration at runtime
4. API keys never appear in client-side source code

Example implementation:

```javascript
// Server endpoint
app.get('/api/config', (req, res) => {
  res.json({
    googleApiKey: process.env.GOOGLE_API_KEY
  });
});

// Client-side code
fetch('/api/config')
  .then(response => response.json())
  .then(config => {
    // Initialize maps with config.googleApiKey
  });
```

## Security Best Practices

1. **API Key Restrictions**:
   - Restrict API keys by HTTP referrer in the Google Cloud Console
   - Limit to specific domains and IP addresses
   - Set usage quotas to prevent unexpected billing

2. **Content Security Policy**:
   - Implement a CSP to prevent unauthorized script execution
   - Example: `Content-Security-Policy: script-src 'self' https://maps.googleapis.com;`

3. **Regular Rotation**:
   - Rotate API keys periodically
   - Update environment variables without modifying application code

4. **Monitoring**:
   - Monitor API usage in the Google Cloud Console
   - Set up alerts for unusual activity

## Important Note

The current implementation in `config.js` is for demonstration purposes only. In a real production environment, API keys should never be visible in client-side source code, even with placeholder values.

## reCAPTCHA Configuration

The website is configured to use reCAPTCHA in two possible modes:

### Development Mode (Current Setting)

The website currently uses reCAPTCHA in development mode, which allows it to work on any domain, including:
- Local file:// URLs
- Any domain without restrictions
- Development environments

This is controlled by the setting in `js/config.js`:
```javascript
recaptchaMode: 'development'
```

### Production Mode

For production use, we recommend:

1. Creating a specific reCAPTCHA site key in the Google reCAPTCHA Admin Console
2. Setting domain restrictions in the Google Console for your production domain
3. Updating the configuration to production mode:
```javascript
recaptchaMode: 'production'
```

### Important Security Notes for reCAPTCHA

1. **Development vs Production Keys**:
   - Use separate keys for development and production
   - Never use unrestricted keys in production

2. **Domain Restrictions**:
   - In the Google reCAPTCHA Admin Console, add your production domains
   - For local development, you can use `localhost` and `127.0.0.1`

3. **Monitor Usage**:
   - Regularly check the Google reCAPTCHA Admin Console for unusual patterns
   - Set up usage alerts 