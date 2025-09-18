# Free Resources Guide

This document outlines the free, open-source resources integrated into the Royal Locksmith website. These resources can be easily incorporated into future website designs.

## Libraries & Resources Used

### 1. Bootstrap 5
- **Implementation**: Added via CDN
- **Usage**: Provides responsive design framework, components, and utilities
- **Files Modified**: 
  - Added to all HTML files in the `<head>` section
  - Added JS bundle at end of HTML files
  - CSS overrides in `style.css`
- **License**: MIT License
- **Documentation**: [Bootstrap Documentation](https://getbootstrap.com/docs/5.3/getting-started/introduction/)

```html
<!-- CSS -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
<!-- JS Bundle with Popper -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
```

### 2. Font Awesome Icons
- **Implementation**: Added via CDN
- **Usage**: Provides extensive icon library (locks, keys, tools, etc.)
- **License**: Free tier under MIT License
- **Documentation**: [Font Awesome Documentation](https://fontawesome.com/docs)

```html
<!-- Font Awesome Icons -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
```

**Icon Usage Examples**:
```html
<i class="fas fa-key"></i> <!-- Key icon -->
<i class="fas fa-lock"></i> <!-- Lock icon -->
<i class="fas fa-unlock"></i> <!-- Unlock icon -->
<i class="fas fa-home"></i> <!-- Home icon -->
<i class="fas fa-car"></i> <!-- Car icon -->
<i class="fas fa-building"></i> <!-- Building icon -->
<i class="fas fa-tools"></i> <!-- Tools icon -->
```

### 3. Unsplash API for Images
- **Implementation**: Direct URL API integration
- **Usage**: Provides high-quality free images
- **License**: Unsplash License (free for commercial use)
- **Documentation**: [Unsplash Source API](https://unsplash.com/documentation)

**Direct implementation in CSS**:
```css
.hero {
    background: linear-gradient(...), url('https://source.unsplash.com/1600x900/?locks,keys,security') no-repeat center/cover;
}
```

**Dynamic implementation via JavaScript**:
```html
<!-- Add data-unsplash attribute to any element -->
<div data-unsplash="lock,key" data-size="800x600"></div>
```

```javascript
// Function in script.js will automatically load images
function loadUnsplashImages() {
    const unsplashElements = document.querySelectorAll('[data-unsplash]');
    
    unsplashElements.forEach(element => {
        const query = element.getAttribute('data-unsplash');
        const size = element.getAttribute('data-size') || '600x400';
        const imageUrl = `https://source.unsplash.com/${size}/?${query}`;
        
        if (element.tagName === 'IMG') {
            element.src = imageUrl;
        } else {
            element.style.backgroundImage = `url(${imageUrl})`;
        }
    });
}
```

### 4. Custom Animation System
- **Implementation**: CSS animations with JavaScript trigger
- **Usage**: Adds smooth animations to website elements
- **License**: MIT License (custom code)

**CSS Animation Classes**:
```css
.animate__animated {
    animation-duration: 1s;
    animation-fill-mode: both;
}

.animate__fadeIn {
    animation-name: fadeIn;
}

.animate__fadeInUp {
    animation-name: fadeInUp;
}
```

**JavaScript Implementation**:
```javascript
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.your-elements');
    
    animatedElements.forEach((element, index) => {
        element.classList.add('animate__animated', 'animate__fadeIn');
        // See script.js for full implementation with Intersection Observer
    });
}
```

## How to Use These Resources in Future Projects

### Step 1: Include Required CDNs
Add these links to your HTML's `<head>` section:

```html
<!-- Bootstrap CSS -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
<!-- Font Awesome Icons -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
<!-- Custom CSS -->
<link rel="stylesheet" href="css/style.css">
```

Add Bootstrap's JavaScript before the closing `</body>` tag:

```html
<!-- Bootstrap JS Bundle with Popper -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
```

### Step 2: Copy & Customize the CSS
Copy the `style.css` file, which includes:
- Custom variables setup
- Bootstrap overrides
- Animation classes
- Responsive design rules

Modify the variables to match your project's color scheme:

```css
:root {
    --primary-color: #your-primary-color;
    --secondary-color: #your-secondary-color;
    /* Other variables */
}
```

### Step 3: Copy JavaScript Utilities
Copy and adapt these functions from `script.js`:
- `showAlert()` - For displaying Bootstrap alerts
- `initScrollAnimations()` - For scroll-triggered animations
- `loadUnsplashImages()` - For dynamically loading Unsplash images

### Step 4: Use Unsplash Images for Backgrounds
Either set up backgrounds directly in CSS:

```css
.your-element {
    background-image: url('https://source.unsplash.com/1600x900/?your,search,terms');
}
```

Or use the data attribute approach for dynamic loading:

```html
<div data-unsplash="search,terms"></div>
```

### Step 5: Properly Attribute Resources
Include appropriate attributions in your project:

```html
<footer>
    <!-- Your footer content -->
    <div class="attribution">
        Icons by <a href="https://fontawesome.com/" target="_blank">Font Awesome</a>. 
        Images courtesy of <a href="https://unsplash.com/" target="_blank">Unsplash</a>.
    </div>
</footer>
```

## Locksmith-Specific Resources

### Common Locksmith Icons
- `fa-key` - For key services
- `fa-lock` & `fa-unlock` - For lock services
- `fa-door-closed` & `fa-door-open` - For door services
- `fa-home` - For residential services
- `fa-building` - For commercial services
- `fa-car` - For automotive services
- `fa-tools` - For locksmith tools/services
- `fa-shield-alt` - For security services
- `fa-exclamation-circle` - For emergency services

### Useful Unsplash Search Terms for Locksmith Websites
- locks
- keys
- locksmith
- security
- door+lock
- padlock
- keyhole
- safe
- car+key
- key+cutting
- home+security
- office+security

## License Information

All resources mentioned in this document are free to use for commercial purposes under their respective licenses. Always check for any license changes or limitations before using these resources in production projects. 