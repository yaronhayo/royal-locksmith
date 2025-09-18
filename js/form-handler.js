/**
 * Form Handler - Handles form submissions and tracking data
 * Royal Locksmith Website
 */

console.log('Form Handler script loaded');

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

// Execute as soon as this script loads, before DOM ready
// Override the default form submit event to stop script.js handlers
window.addEventListener('load', function() {
  console.log('Window loaded - disabling default form handlers');
  
  // Override native submit method for all forms
  const originalSubmit = HTMLFormElement.prototype.submit;
  HTMLFormElement.prototype.submit = function() {
    console.log('Native form submit intercepted');
    return false;
  };
  
  // Remove existing event handlers from forms
  replaceFormEventListeners();
  
  // Track UTM parameters and other session data
  const sessionData = {
    // Capture URL parameters for tracking
    utmSource: getUrlParameter('utm_source') || localStorage.getItem('utm_source') || 'direct',
    utmMedium: getUrlParameter('utm_medium') || localStorage.getItem('utm_medium') || 'none',
    utmCampaign: getUrlParameter('utm_campaign') || localStorage.getItem('utm_campaign') || 'none',
    utmContent: getUrlParameter('utm_content') || localStorage.getItem('utm_content') || 'none',
    utmTerm: getUrlParameter('utm_term') || localStorage.getItem('utm_term') || 'none',
    keywords: getUrlParameter('keywords') || localStorage.getItem('keywords') || 'none',
    referrer: document.referrer || 'direct',
    landingPage: localStorage.getItem('landing_page') || window.location.pathname,
    device: getDeviceType(),
    browserInfo: navigator.userAgent,
    timestamp: formatDateET(new Date()) // Store time in ET format
  };
  
  // Store UTM parameters in localStorage if present
  saveTrackingData(sessionData);
});

// Also handle regular DOM ready event as a fallback
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded - checking form handlers');
  
  // Double-check form event handlers
  replaceFormEventListeners();
});

/**
 * Replace form elements to remove existing event listeners
 */
function replaceFormEventListeners() {
  // Get all forms on the page
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    // Clone the form deeply
    const newForm = form.cloneNode(true);
    
    // Define a direct submit handler that prevents default
    newForm.onsubmit = function(e) {
      e.preventDefault();
      e.stopPropagation();
      console.log('Direct form submit prevented');
      
      // Call our custom handler
      handleFormSubmit(e);
      
      return false;
    };
    
    // Replace the old form
    if (form.parentNode) {
      form.parentNode.replaceChild(newForm, form);
      console.log('Form replaced:', newForm.id || 'unnamed form');
    }
  });
}

/**
 * Get URL parameter value
 * @param {string} name - The parameter name
 * @returns {string|null} - The parameter value or null
 */
function getUrlParameter(name) {
  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
  const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  const results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

/**
 * Save tracking data to localStorage
 * @param {Object} data - The data to save
 */
function saveTrackingData(data) {
  // Only save the UTM parameters if they're in the URL
  if (getUrlParameter('utm_source')) localStorage.setItem('utm_source', data.utmSource);
  if (getUrlParameter('utm_medium')) localStorage.setItem('utm_medium', data.utmMedium);
  if (getUrlParameter('utm_campaign')) localStorage.setItem('utm_campaign', data.utmCampaign);
  if (getUrlParameter('utm_content')) localStorage.setItem('utm_content', data.utmContent);
  if (getUrlParameter('utm_term')) localStorage.setItem('utm_term', data.utmTerm);
  if (getUrlParameter('keywords')) localStorage.setItem('keywords', data.keywords);
  
  // Save landing page on first visit only
  if (!localStorage.getItem('landing_page')) {
    localStorage.setItem('landing_page', window.location.pathname);
  }
  
  // Save visit timestamp in Eastern Time
  localStorage.setItem('visit_timestamp', formatDateET(new Date()));
}

/**
 * Get device type based on screen size
 * @returns {string} - The device type
 */
function getDeviceType() {
  const width = window.innerWidth;
  if (width < 576) return 'Mobile';
  if (width < 992) return 'Tablet';
  return 'Desktop';
}

/**
 * Handle form submission
 * @param {Event} event - The form submit event
 */
async function handleFormSubmit(event) {
  event.preventDefault();
  event.stopPropagation(); // Prevent other handlers from executing
  console.log('Form submission handled by form-handler.js');
  
  const form = event.target;
  const submitButton = form.querySelector('button[type="submit"]');
  const originalButtonText = submitButton ? submitButton.innerHTML : 'Submit';
  
  // Show loading state
  if (submitButton) {
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i> Sending...';
  }
  
  try {
    // Validate form fields
    if (!validateForm(form)) {
      // Reset button state if validation fails
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonText;
      }
      return;
    }
    
    // Get form data for logging
    const formData = new FormData(form);
    const formObject = Object.fromEntries(formData.entries());
    
    // Add tracking data to form submission
    const trackingData = {
      utmSource: localStorage.getItem('utm_source') || 'direct',
      utmMedium: localStorage.getItem('utm_medium') || 'none',
      utmCampaign: localStorage.getItem('utm_campaign') || 'none',
      utmContent: localStorage.getItem('utm_content') || 'none',
      utmTerm: localStorage.getItem('utm_term') || 'none',
      keywords: localStorage.getItem('keywords') || 'none',
      referrer: document.referrer || 'direct',
      landingPage: localStorage.getItem('landing_page') || window.location.pathname,
      currentPage: window.location.pathname,
      device: getDeviceType(),
      browserInfo: navigator.userAgent
    };
    
    // Combine form data with tracking data
    const submissionData = {
      ...formObject,
      ...trackingData
    };
    
    console.log('Form submission data:', submissionData);

    // Actually send data to server
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submissionData),
    });
    
    const result = await response.json();
    console.log('Server response:', result);
    
    if (!result.success) {
      throw new Error(result.error || 'Server error');
    }
    
    // Show success message on successful server response
    const formContainer = form.closest('.card-body') || form.parentNode;
    const successAlert = document.createElement('div');
    successAlert.className = 'alert alert-success mt-3 animate__animated animate__fadeIn';
    successAlert.innerHTML = '<i class="fas fa-check-circle me-2"></i> Your message has been sent successfully! Redirecting...';
    formContainer.appendChild(successAlert);
    
    // Reset form
    form.reset();
    
    // Clear any existing form data from localStorage
    clearFormDataFromLocalStorage();
    
    // Redirect to thank you page
    console.log('Redirecting to thank-you.html in 2 seconds...');
    setTimeout(() => {
      window.location.href = 'thank-you.html';
    }, 2000);
  } catch (error) {
    console.error('Error submitting form:', error);
    
    // Show error message
    const formContainer = form.closest('.card-body') || form.parentNode;
    const errorAlert = document.createElement('div');
    errorAlert.className = 'alert alert-danger mt-3';
    
    // Prepare a more helpful error message based on the error type
    let errorMessage = 'There was a technical error. Please try again or call us directly.';
    
    // If there's a specific error message from the server, use it
    if (error.message && !error.message.includes('fetch') && !error.message.includes('Server error')) {
      errorMessage = `Error: ${error.message}`;
    }
    
    // Special case for email sending errors
    if (error.message && error.message.includes('Failed to send email')) {
      errorMessage = 'Unable to send your message via email. Please call us directly at (551) 292-8090.';
    }
    
    errorAlert.innerHTML = `<i class="fas fa-exclamation-circle me-2"></i> ${errorMessage}`;
    formContainer.appendChild(errorAlert);
    
    // Reset button state
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.innerHTML = originalButtonText;
    }
  }
}

/**
 * Validate form fields
 * @param {HTMLFormElement} form - The form to validate
 * @returns {boolean} - Whether the form is valid
 */
function validateForm(form) {
  let isValid = true;
  
  // Get form fields
  const nameField = form.querySelector('#name');
  const phoneField = form.querySelector('#phone');
  const emailField = form.querySelector('#email');
  const messageField = form.querySelector('#message');
  
  // Basic validation
  if (nameField && nameField.value.trim() === '') {
    showValidationError(nameField, 'Please enter your name');
    isValid = false;
  }
  
  if (phoneField && phoneField.value.trim() === '') {
    showValidationError(phoneField, 'Please enter your phone number');
    isValid = false;
  } else if (phoneField && !isValidPhone(phoneField.value.trim())) {
    showValidationError(phoneField, 'Please enter a valid phone number');
    isValid = false;
  }
  
  if (emailField && emailField.value.trim() === '') {
    showValidationError(emailField, 'Please enter your email address');
    isValid = false;
  } else if (emailField && !isValidEmail(emailField.value.trim())) {
    showValidationError(emailField, 'Please enter a valid email address');
    isValid = false;
  }
  
  if (messageField && messageField.value.trim() === '') {
    showValidationError(messageField, 'Please enter your message');
    isValid = false;
  }
  
  return isValid;
}

/**
 * Show validation error
 * @param {HTMLElement} field - The field with error
 * @param {string} message - The error message
 */
function showValidationError(field, message) {
  field.classList.add('is-invalid');
  
  // Create error message if it doesn't exist
  let errorDiv = field.nextElementSibling;
  if (!errorDiv || !errorDiv.classList.contains('invalid-feedback')) {
    errorDiv = document.createElement('div');
    errorDiv.className = 'invalid-feedback';
    field.parentNode.insertBefore(errorDiv, field.nextElementSibling);
  }
  
  errorDiv.innerText = message;
}

/**
 * Check if email is valid
 * @param {string} email - The email to validate
 * @returns {boolean} - Whether the email is valid
 */
function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

/**
 * Check if phone is valid
 * @param {string} phone - The phone to validate
 * @returns {boolean} - Whether the phone is valid
 */
function isValidPhone(phone) {
  const regex = /^[\d\s\(\)\-\+]{10,15}$/;
  return regex.test(phone);
}

/**
 * Clear any existing form data from localStorage
 */
function clearFormDataFromLocalStorage() {
  localStorage.removeItem('utm_source');
  localStorage.removeItem('utm_medium');
  localStorage.removeItem('utm_campaign');
  localStorage.removeItem('utm_content');
  localStorage.removeItem('utm_term');
  localStorage.removeItem('keywords');
  localStorage.removeItem('landing_page');
  localStorage.removeItem('visit_timestamp');
} 