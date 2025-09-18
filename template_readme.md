# Royal Locksmith Website Template Structure

This document outlines the template structure used across the Royal Locksmith website to ensure consistency and responsive design across all pages.

## Template Components

### 1. Page Structure
All pages follow this basic structure:
- Header (with logo, contact info, and navigation)
- Page banner (with title and subtitle)
- Main content (specific to each page)
- Call-to-action section
- Footer (with contact info, quick links, and service areas)
- Mobile bottom navigation

### 2. Responsive Design Elements

#### Header
- **Desktop:** Full menu with logo, contact information, and horizontal navigation
- **Mobile:** Collapsible menu with mobile toggle button, hidden contact info
- **Sticky Header:** Header becomes fixed at the top after scrolling down

#### Footer
- **Desktop:** Four-column layout with detailed information
- **Mobile:** Single column stacked layout with condensed information

#### Mobile Bottom Navigation
- Only visible on mobile devices
- Fixed at the bottom of the screen
- Provides quick access to key pages and call functionality
- "Call Now" button prominently featured in the center

### 3. File Structure

- **page-template.html** - Base template for creating new pages
- **css/style.css** - Main stylesheet with responsive design rules
- **js/script.js** - JavaScript functionality including mobile navigation, sticky header
- **js/config.js** - Configuration for APIs (Google Maps, reCAPTCHA)

## Design Guidelines

### Colors
- Primary: #ea9e25 (gold/amber)
- Secondary: #221f1f (dark charcoal)
- Accents and buttons use variations of these colors

### Typography
- Headers: Montserrat or system sans-serif
- Body text: Open Sans or system sans-serif

### Icons
- Using Font Awesome 6.4.2
- Consistent icon usage across sections

## Responsive Breakpoints

- **Mobile:** Up to 767px
- **Tablet:** 768px to 991px
- **Desktop:** 992px and above

## JavaScript Functionality

The site includes several interactive features:
- Mobile menu toggle
- Sticky header on scroll
- Active page highlighting in navigation
- Form validation
- Google Maps integration
- reCAPTCHA validation

## Maintaining Consistency

When creating new pages or modifying existing ones:
1. Start with the page-template.html as a base
2. Keep the header, footer, and mobile navigation consistent
3. Ensure all meta tags and OpenGraph/Twitter card information is updated
4. Maintain the responsive design principles throughout

## Accessibility Considerations

- All images include alt text
- Color contrast meets WCAG guidelines
- Interactive elements are keyboard accessible
- Form elements have proper labels and validation

## SEO Elements

- Structured meta tags on all pages
- Schema.org markup where appropriate
- Social media sharing optimization
- Clean URL structure
- Semantic HTML elements

This template structure ensures a consistent user experience across all devices while providing a professional, modern design for the Royal Locksmith website. 