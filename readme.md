# Royal Locksmith Website

This repository contains the Royal Locksmith website with an integrated form submission system that captures user data and sends email notifications via Resend API.

## Features

- Responsive website for a locksmith business
- Contact form with reCAPTCHA verification
- Server-side email notifications using Resend API
- User and session tracking (UTM parameters, referrer, device info)
- Detailed form submissions with all captured data
- Beautiful responsive email template

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- NPM or Yarn
- A Resend API key (already in .env file)

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Make sure the `.env` file exists with the following variables:
   - `RESEND_API_KEY`: Your Resend API key
   - `GOOGLE_API_KEY`: Google API key for reCAPTCHA

### Running the Server

To start the development server:

```bash
npm run dev
```

For production:

```bash
npm start
```

The server will start on port 3000 by default. You can access the website at `http://localhost:3000`.

## Form Handling System

### Client-Side

The client-side form handling is managed by `js/form-handler.js`, which:

1. Captures UTM parameters and other tracking data
2. Stores user session information in localStorage
3. Handles form submissions from all forms on the website
4. Validates forms and shows appropriate feedback
5. Redirects users to thank-you page after successful submission

### Server-Side

The server-side handling is managed by `api/send-email.js`, which:

1. Processes form data from POST requests
2. Captures additional user data from request headers
3. Formats all data into a beautiful HTML email
4. Sends the email via the Resend API to yaron@gettmarketing.com
5. Returns appropriate success/error responses

### Email Template

The email notifications include:

- Branded header with Royal Locksmith logo
- Form submission details in a formatted table
- User/session data including:
  - UTM parameters (source, medium, campaign)
  - Referrer URL
  - IP address
  - User agent (browser/device)
  - Landing page
  - Keywords (if available)
  - Timestamp

## Deployment

This application can be deployed to any Node.js hosting provider such as:

- Heroku
- DigitalOcean
- AWS Elastic Beanstalk
- Vercel
- Netlify (with serverless functions)

## Customization

To modify the email template or add more tracking parameters, edit the following files:

- `api/send-email.js`: Email template and server-side logic
- `js/form-handler.js`: Client-side tracking and form submission

## License

All rights reserved. This project is proprietary to Royal Locksmith.

## Support

For support, contact Yaron at yaron@gettmarketing.com.

## Branding Elements

### Logo
The Royal Locksmith logo has been integrated throughout the site:
- As the main navigation header logo (replacing text)
- In the footer section
- As the site favicon
- As the social media preview image (Twitter Card/Open Graph)

Logo URL: `https://mtbgayqzjrxjjmsjikcg.supabase.co/storage/v1/object/public/royallocksmith//Royal%20Locksmith%20Logo%202.png`

### Brand Colors
- Primary Color (Gold/Amber): `#ea9e25`
- Secondary Color (Dark Charcoal): `#221f1f`

## Features

- Modern, responsive design optimized for all devices
- SEO-optimized with proper metadata, semantic HTML, and structured data
- Detailed service pages showcasing locksmith offerings
- Contact form with validation and reCAPTCHA protection
- Interactive Google Maps integration for service areas
- Schema.org LocalBusiness markup for enhanced search results
- Mobile-friendly navigation
- Secure API key management

## Technologies Used

- HTML5
- CSS3 (with CSS variables and responsive design)
- JavaScript (for mobile navigation, form validation, and map integration)
- Bootstrap 5 (for responsive components and layout)
- Font Awesome (for icons)
- Google Maps API (for interactive maps)
- Google reCAPTCHA (for form spam protection)
- Schema.org structured data (for SEO enhancement)
- Unsplash API (for dynamic images)
- Environment variables for secure API key management

## Pages

1. **Home** (index.html): Main landing page with service highlights and call-to-action buttons
2. **Services** (services.html): Detailed information about all locksmith services offered
3. **Service Areas** (areas.html): Information about all areas served with interactive map
4. **About Us** (about.html): Company information, values, and license details
5. **Contact** (contact.html): Contact information, form with reCAPTCHA, and location map

## Directory Structure

```
Royal Locksmith/
├── css/
│   └── style.css
├── js/
│   ├── script.js
│   └── config.js
├── img/
│   └── (placeholder for images)
├── .env  (contains sensitive API keys - not committed to version control)
├── index.html
├── services.html
├── areas.html
├── about.html
├── contact.html
├── RESOURCES.md
└── README.md
```

## Advanced Features

### Google Maps Integration
- Interactive service area map with custom markers
- Area-specific information windows
- Service coverage radius visualization
- Mobile-optimized map controls
- Custom-styled maps to match website theme

### reCAPTCHA Implementation
- Form protection against spam and bots
- Seamless integration with form validation
- Mobile-friendly implementation

### SEO Enhancements
- Schema.org LocalBusiness structured data
- Rich service offering catalog
- Geographic service area definitions
- Complete business information for search engines
- Mobile-specific action definitions

### Secure API Management
- API keys stored in .env file (not committed to version control)
- Dynamic loading of API keys via config.js
- No hardcoded API keys in client-side code
- Simulated environment variable approach

## Security Notes

For security, all API keys are stored in the `.env` file which should:
1. Never be committed to version control
2. Be restricted to specific domains in the Google Cloud Console
3. Have appropriate usage quotas set
4. Be replaced with production keys before deployment

In a production environment, the config.js file would use server-side rendering to inject the API keys securely rather than using client-side JavaScript.

## Notes

- The website is designed to be SEO-friendly with proper meta tags, semantic HTML, and structured data
- Responsive design works on all device sizes
- Contact form includes validation but requires backend implementation for actual submission
- Image placeholders are dynamically loaded from Unsplash
- No pricing information is mentioned as per instructions
- No specific ETAs or arrival times are promised
- Google Maps locations are clickable and provide business information

## Pricing Information

All pricing information has been removed from the website as per client requirements:
- No mention of specific service prices
- No price ranges or "starting at" pricing
- No price-related classes in the CSS
- All testimonials and FAQs have been updated to avoid mentioning costs or pricing
- Service descriptions focus on features and benefits rather than cost

Instead of pricing, the website emphasizes:
- Professional services
- Quality workmanship
- Licensed and insured status
- Transparent estimates (without mentioning specific prices)
- Consultation-based approach where estimates are provided after assessment

## License Information

NJ DCA License #13VH13550300 