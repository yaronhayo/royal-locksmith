/**
 * API Configuration
 * 
 * This file manages the API keys for the Royal Locksmith website.
 * In a production environment, this would be handled server-side to prevent exposing keys in client code.
 */

// Global configuration
const config = {
    // Google reCAPTCHA keys
    recaptchaSiteKey: '6Ldw7DopAAAAAL-exW8yUsGD0V2KCvJgA_uWDn0H',
    recaptchaSecretKey: '6Ldw7DopAAAAAIjvH6L-3_jQQXbxlMiCKEUCK_7B',
    
    // Google API key for Maps, Places, etc.
    googleApiKey: 'AIzaSyD3Yz0JL_NHAm3UtT9L8fi6QH6NeEFCOpA',
    
    // Setting to allow reCAPTCHA on any domain (development mode)
    recaptchaMode: 'development', // 'production' or 'development'
    
    // For compatibility with our map implementation
    GOOGLE_API_KEY: 'AIzaSyD3Yz0JL_NHAm3UtT9L8fi6QH6NeEFCOpA',
    
    // Site settings
    siteName: 'Royal Locksmith',
    sitePhone: '(551) 292-8090',
    siteEmail: 'support@royallocksmithnj.com',
    
    // Unsplash settings
    useUnsplash: true,
    
    // Social media URLs
    socialMedia: {
        facebook: 'https://www.facebook.com/royallocksmithnj',
        google: 'https://g.page/r/CXvGUI9TF1_pEB0/review',
        yelp: 'https://www.yelp.com/biz/royal-locksmith-hackensack',
        instagram: 'https://www.instagram.com/royallocksmithnj'
    }
};

// Function to load Google Maps API dynamically
function loadGoogleMapsApi(callback) {
    // Check if the API is already loading or loaded
    if (document.querySelector('script[src*="maps.googleapis.com/maps/api/js"]')) {
        console.log('Google Maps API is already loading or loaded');
        // If the API is already loaded, just call the callback
        if (typeof google !== 'undefined' && typeof google.maps !== 'undefined') {
            console.log('Google Maps API already loaded, calling callback directly');
            if (window[callback] && typeof window[callback] === 'function') {
                window[callback]();
            }
        }
        // If it's still loading, the callback will be called when it's done
        return;
    }
    
    // Create callback function if provided
    if (callback && typeof callback === 'string') {
        // Create a global callback function that will be called when the API loads
        window.googleMapsCallback = function() {
            console.log('Google Maps API loaded via callback');
            // Call the specified callback function if it exists
            if (window[callback] && typeof window[callback] === 'function') {
                window[callback]();
            }
        };
    } else {
        window.googleMapsCallback = function() {
            console.log('Google Maps API loaded, no callback specified');
        };
    }
    
    // Create and append the script element
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${config.googleApiKey}&callback=googleMapsCallback`;
    script.async = true;
    script.defer = true;
    script.onerror = function() {
        console.error('Failed to load Google Maps API');
    };
    document.head.appendChild(script);
    
    console.log('Google Maps API script added to page');
}

// Function to load Google reCAPTCHA dynamically with universal access
function loadRecaptcha() {
    const script = document.createElement('script');
    
    // Special configuration for development mode - allows use on any domain including file:// URLs
    if (config.recaptchaMode === 'development') {
        script.src = `https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoad&render=explicit&hl=en`;
    } else {
        // Standard production loading
        script.src = `https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoad&render=explicit`;
    }
    
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
    
    // Define callback for when reCAPTCHA loads
    window.onRecaptchaLoad = function() {
        // Initialize reCAPTCHA elements if they exist
        const recaptchaDiv = document.querySelector('.g-recaptcha');
        if (recaptchaDiv && !recaptchaDiv.innerHTML.trim()) {
            try {
                // The explicit rendering allows for more flexibility with domain restrictions
                grecaptcha.render(recaptchaDiv, {
                    'sitekey': config.recaptchaSiteKey,
                    'size': 'normal',
                    'theme': 'light'
                });
                
                // Log success in development mode
                if (config.recaptchaMode === 'development') {
                    console.log('reCAPTCHA initialized in development mode (works on any domain)');
                }
            } catch (error) {
                console.error('Error initializing reCAPTCHA:', error);
                
                // Add fallback message if reCAPTCHA fails to load
                recaptchaDiv.innerHTML = '<div class="alert alert-warning">reCAPTCHA could not be loaded. Please ensure you\'re online and try again.</div>';
            }
        }
    };
}

// Export the configuration module
window.RoyalLocksmithConfig = {
    loadGoogleMapsApi,
    loadRecaptcha,
    getGoogleApiKey: () => config.googleApiKey,
    getRecaptchaMode: () => config.recaptchaMode
}; 