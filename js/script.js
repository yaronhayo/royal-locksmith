// Document Ready Function
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Bootstrap tooltips
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.forEach(function(tooltipTriggerEl) {
        new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Mobile Navigation Toggle
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mainNav.classList.toggle('active');
            document.body.classList.toggle('nav-open');
        });
        
        // Close mobile nav when clicking outside
        document.addEventListener('click', function(event) {
            if (mainNav.classList.contains('active') && 
                !mainNav.contains(event.target) && 
                !mobileNavToggle.contains(event.target)) {
                mainNav.classList.remove('active');
                mobileNavToggle.classList.remove('active');
                document.body.classList.remove('nav-open');
            }
        });
    }
    
    // Sticky Header
    const header = document.querySelector('header');
    let scrollPos = 0;
    
    window.addEventListener('scroll', function() {
        // Determine scroll position
        const currentScrollPos = window.pageYOffset;
        
        // Add sticky class after scrolling down 100px
        if (currentScrollPos > 100) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
        
        // Store scroll position for next comparison
        scrollPos = currentScrollPos;
    });
    
    // Select active link based on current page
    const currentPage = window.location.pathname.split('/').pop();
    
    // Update main navigation
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage || 
            (currentPage === '' && link.getAttribute('href') === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    // Update mobile bottom navigation
    const mobileNavLinks = document.querySelectorAll('.mobile-bottom-nav a');
    mobileNavLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage || 
            (currentPage === '' && link.getAttribute('href') === 'index.html')) {
            link.classList.add('active');
        }
    });

    // Contact Form Validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Validate required fields
            let isValid = true;
            const name = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Basic validation
            if (name === '') {
                showError('name', 'Please enter your name');
                isValid = false;
            } else {
                clearError('name');
            }
            
            if (phone === '') {
                showError('phone', 'Please enter your phone number');
                isValid = false;
            } else if (!isValidPhone(phone)) {
                showError('phone', 'Please enter a valid phone number');
                isValid = false;
            } else {
                clearError('phone');
            }
            
            if (email === '') {
                showError('email', 'Please enter your email address');
                isValid = false;
            } else if (!isValidEmail(email)) {
                showError('email', 'Please enter a valid email address');
                isValid = false;
            } else {
                clearError('email');
            }
            
            if (message === '') {
                showError('message', 'Please enter your message');
                isValid = false;
            } else {
                clearError('message');
            }
            
            // Check reCAPTCHA
            if (isValid && typeof grecaptcha !== 'undefined') {
                const recaptchaResponse = grecaptcha.getResponse();
                if (recaptchaResponse.length === 0) {
                    showAlert('Please complete the reCAPTCHA verification', 'danger');
                    isValid = false;
                }
            }
            
            // If form is valid, submit it
            if (isValid) {
                showAlert('Your message has been sent successfully! We will get back to you shortly.', 'success');
                contactForm.reset();
                if (typeof grecaptcha !== 'undefined') {
                    grecaptcha.reset();
                }
            }
        });
    }
    
    // Booking Form Validation
    const bookingForm = document.getElementById('hero-booking-form');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            let isValid = true;
            const name = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone').value.trim();
            
            if (name === '') {
                showError('name', 'Please enter your name');
                isValid = false;
            } else {
                clearError('name');
            }
            
            if (phone === '') {
                showError('phone', 'Please enter your phone number');
                isValid = false;
            } else if (!isValidPhone(phone)) {
                showError('phone', 'Please enter a valid phone number');
                isValid = false;
            } else {
                clearError('phone');
            }
            
            if (isValid) {
                showAlert('Thank you! We will contact you shortly to confirm your booking.', 'success');
                bookingForm.reset();
            }
        });
    }
    
    // Recaptcha initialization
    function initRecaptcha() {
        if (document.querySelector('.g-recaptcha') && typeof grecaptcha === 'undefined') {
            loadRecaptcha();
        } else if (document.querySelector('.g-recaptcha') && typeof grecaptcha !== 'undefined') {
            grecaptcha.render(document.querySelector('.g-recaptcha'), {
                'sitekey': CONFIG.recaptchaSiteKey
            });
        }
    }
    
    // Initialize recaptcha if contact form exists
    if (document.querySelector('.g-recaptcha')) {
        initRecaptcha();
    }
    
    // Initialize all maps on the page
    initMaps();
    
    // Initialize scroll animations
    initScrollAnimations();
});

// Helper Functions
function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
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

function clearError(fieldId) {
    const field = document.getElementById(fieldId);
    field.classList.remove('is-invalid');
    
    // Remove error message if it exists
    const errorDiv = field.nextElementSibling;
    if (errorDiv && errorDiv.classList.contains('invalid-feedback')) {
        errorDiv.innerText = '';
    }
}

function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function isValidPhone(phone) {
    const regex = /^[\d\s\(\)\-\+]{10,15}$/;
    return regex.test(phone);
}

function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show mt-3`;
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    
    // Find form and append alert after it
    const form = document.querySelector('form');
    form.parentNode.insertBefore(alertDiv, form.nextElementSibling);
    
    // Auto dismiss after 5 seconds
    setTimeout(function() {
        const bsAlert = new bootstrap.Alert(alertDiv);
        bsAlert.close();
    }, 5000);
}

// Scroll Animation
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.animate__animated');
    
    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    element.style.visibility = 'visible';
                    element.style.animationDelay = element.dataset.delay || '0s';
                    observer.unobserve(element);
                }
            });
        }, {
            threshold: 0.1
        });
        
        animatedElements.forEach(element => {
            element.style.visibility = 'hidden';
            observer.observe(element);
        });
    }
}

// Initialize all maps on the page
function initMaps() {
    // Check if Google Maps API is loaded
    if (typeof google === 'undefined' || typeof google.maps === 'undefined') {
        console.log('Google Maps API not loaded yet, waiting...');
        // If not loaded, wait for it to load
        setTimeout(initMaps, 100);
        return;
    }
    
    console.log('Google Maps API loaded, initializing maps');
    
    // Initialize contact page map if it exists
    if (document.getElementById('contactMap')) {
        initMap();
    }
    
    // Initialize service areas map on homepage if it exists
    if (document.getElementById('serviceAreasMap')) {
        initServiceAreasMap();
    }
    
    // Initialize full service area map on the areas page if it exists
    if (document.getElementById('serviceAreaMap')) {
        initFullServiceAreaMap();
    }
}

// Initialize Google Map
function initMap() {
    if (!document.getElementById('contactMap')) return;
    
    const mapOptions = {
        center: { lat: 40.8859, lng: -74.0435 }, // Hackensack, NJ
        zoom: 12
    };
    
    const map = new google.maps.Map(document.getElementById('contactMap'), mapOptions);
    
    // Add marker for the business
    const mainMarker = new google.maps.Marker({
        position: { lat: 40.8859, lng: -74.0435 },
        map: map,
        title: 'Royal Locksmith',
        icon: {
            url: 'https://maps.google.com/mapfiles/ms/icons/red-pushpin.png',
            scaledSize: new google.maps.Size(32, 32)
        }
    });
    
    // Add info window to marker
    const infoWindow = new google.maps.InfoWindow({
        content: `
            <div style="text-align:center; padding:10px;">
                <h5 style="margin:0; color:#ea9e25; font-weight:bold;">Royal Locksmith</h5>
                <p style="margin:5px 0;">Mobile Service in Hackensack, NJ</p>
                <p style="margin:5px 0;"><a href="tel:5512928090" style="color:#ea9e25;">(551) 292-8090</a></p>
            </div>
        `
    });
    
    mainMarker.addListener('click', function() {
        infoWindow.open(map, mainMarker);
    });
    
    // Open info window by default
    infoWindow.open(map, mainMarker);
    
    // Add service area circle
    const serviceAreaCircle = new google.maps.Circle({
        strokeColor: '#ea9e25',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#ea9e25',
        fillOpacity: 0.1,
        map: map,
        center: { lat: 40.8859, lng: -74.0435 },
        radius: 8000 // 8 km radius
    });
}

// Initialize Service Areas Map on Homepage
function initServiceAreasMap() {
    const mapElement = document.getElementById('serviceAreasMap');
    if (!mapElement) return;
    
    // Service areas with coordinates
    const serviceAreas = [
        { 
            id: 'hackensack', 
            name: 'Hackensack, NJ', 
            position: { lat: 40.8859, lng: -74.0435 },
            description: 'Our headquarters location offering complete locksmith services.'
        },
        { 
            id: 'lodi', 
            name: 'Lodi, NJ', 
            position: { lat: 40.8776, lng: -74.0835 },
            description: 'Residential and commercial locksmith services.'
        },
        { 
            id: 'teaneck', 
            name: 'Teaneck, NJ', 
            position: { lat: 40.8841, lng: -74.0143 }, 
            description: 'Fast response locksmith service for homes and businesses.'
        },
        { 
            id: 'maywood', 
            name: 'Maywood, NJ', 
            position: { lat: 40.9009, lng: -74.0632 },
            description: 'Emergency and scheduled locksmith services available.'
        },
        { 
            id: 'south-hackensack', 
            name: 'South Hackensack, NJ', 
            position: { lat: 40.8584, lng: -74.0415 },
            description: 'Residential, commercial and automotive locksmith services.'
        }
    ];
    
    // Map options
    const mapOptions = {
        center: { lat: 40.8859, lng: -74.0435 }, // Centered on Hackensack
        zoom: 12,
        styles: [
            {
                "featureType": "administrative",
                "elementType": "labels.text.fill",
                "stylers": [{"color": "#444444"}]
            },
            {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [{"color": "#f2f2f2"}]
            },
            {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [{"visibility": "off"}]
            },
            {
                "featureType": "road",
                "elementType": "all",
                "stylers": [{"saturation": -100}, {"lightness": 45}]
            },
            {
                "featureType": "road.highway",
                "elementType": "all",
                "stylers": [{"visibility": "simplified"}]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels.icon",
                "stylers": [{"visibility": "off"}]
            },
            {
                "featureType": "transit",
                "elementType": "all",
                "stylers": [{"visibility": "off"}]
            },
            {
                "featureType": "water",
                "elementType": "all",
                "stylers": [{"color": "#c4c4c4"}, {"visibility": "on"}]
            }
        ]
    };
    
    // Create the map
    const map = new google.maps.Map(mapElement, mapOptions);
    
    // Create markers and info windows for each service area
    const markers = [];
    const infoWindows = [];
    
    serviceAreas.forEach(area => {
        // Create marker
        const marker = new google.maps.Marker({
            position: area.position,
            map: map,
            title: area.name,
            animation: google.maps.Animation.DROP,
            icon: {
                url: 'https://maps.google.com/mapfiles/ms/icons/red-pushpin.png',
                scaledSize: new google.maps.Size(32, 32)
            }
        });
        
        // Create info window for this marker
        const infoWindow = new google.maps.InfoWindow({
            content: `
                <div style="text-align:center; padding:10px; max-width:250px;">
                    <h5 style="margin:0; color:#ea9e25; font-weight:bold;">${area.name}</h5>
                    <p style="margin:10px 0;">${area.description}</p>
                    <div style="margin-top:10px;">
                        <a href="tel:5512928090" style="background-color:#ea9e25; color:#221f1f; padding:5px 10px; text-decoration:none; border-radius:4px; font-weight:bold;">
                            <i class="fas fa-phone"></i> Call Now
                        </a>
                    </div>
                </div>
            `
        });
        
        // Add click listener to marker
        marker.addListener('click', () => {
            // Close all open info windows
            infoWindows.forEach(iw => iw.close());
            
            // Open this info window
            infoWindow.open(map, marker);
            
            // Update active class on area items
            document.querySelectorAll('.area').forEach(el => {
                el.classList.remove('active');
            });
            const areaEl = document.querySelector(`.area[data-location="${area.id}"]`);
            if (areaEl) {
                areaEl.classList.add('active');
            }
        });
        
        markers.push(marker);
        infoWindows.push(infoWindow);
    });
    
    // Add service area circle
    const serviceAreaCircle = new google.maps.Circle({
        strokeColor: '#ea9e25',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#ea9e25',
        fillOpacity: 0.1,
        map: map,
        center: { lat: 40.8859, lng: -74.0435 },
        radius: 8000 // 8 km radius
    });
    
    // Add click events to area items in the list
    document.querySelectorAll('.area').forEach(areaElement => {
        areaElement.addEventListener('click', () => {
            const locationId = areaElement.getAttribute('data-location');
            const areaData = serviceAreas.find(area => area.id === locationId);
            
            if (areaData) {
                // Center map on this location
                map.panTo(areaData.position);
                map.setZoom(14);
                
                // Find the corresponding marker and trigger its click event
                const index = serviceAreas.findIndex(area => area.id === locationId);
                if (index >= 0) {
                    google.maps.event.trigger(markers[index], 'click');
                }
                
                // Update active class
                document.querySelectorAll('.area').forEach(el => {
                    el.classList.remove('active');
                });
                areaElement.classList.add('active');
            }
        });
    });
}

// Initialize Full Service Area Map on areas.html page
function initFullServiceAreaMap() {
    const mapElement = document.getElementById('serviceAreaMap');
    if (!mapElement) return;
    
    // Create an array of area cards with data attributes
    const areaCards = document.querySelectorAll('.area-card');
    const serviceAreas = [];
    
    areaCards.forEach(card => {
        const id = card.getAttribute('id');
        const lat = parseFloat(card.getAttribute('data-lat'));
        const lng = parseFloat(card.getAttribute('data-lng'));
        const name = card.querySelector('h2').textContent;
        
        if (id && !isNaN(lat) && !isNaN(lng)) {
            serviceAreas.push({
                id: id,
                name: name,
                position: { lat: lat, lng: lng },
                description: card.querySelector('.area-content p').textContent
            });
        }
    });
    
    // Map options
    const mapOptions = {
        center: { lat: 40.8859, lng: -74.0435 }, // Centered on Hackensack
        zoom: 12,
        styles: [
            {
                "featureType": "administrative",
                "elementType": "labels.text.fill",
                "stylers": [{"color": "#444444"}]
            },
            {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [{"color": "#f2f2f2"}]
            },
            {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [{"visibility": "off"}]
            },
            {
                "featureType": "road",
                "elementType": "all",
                "stylers": [{"saturation": -100}, {"lightness": 45}]
            },
            {
                "featureType": "road.highway",
                "elementType": "all",
                "stylers": [{"visibility": "simplified"}]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels.icon",
                "stylers": [{"visibility": "off"}]
            },
            {
                "featureType": "transit",
                "elementType": "all",
                "stylers": [{"visibility": "off"}]
            },
            {
                "featureType": "water",
                "elementType": "all",
                "stylers": [{"color": "#c4c4c4"}, {"visibility": "on"}]
            }
        ]
    };
    
    // Create the map
    const map = new google.maps.Map(mapElement, mapOptions);
    
    // Create markers for each service area
    serviceAreas.forEach(area => {
        // Create marker
        const marker = new google.maps.Marker({
            position: area.position,
            map: map,
            title: area.name,
            animation: google.maps.Animation.DROP,
            icon: {
                url: 'https://maps.google.com/mapfiles/ms/icons/red-pushpin.png',
                scaledSize: new google.maps.Size(32, 32)
            }
        });
        
        // Create info window for this marker
        const infoWindow = new google.maps.InfoWindow({
            content: `
                <div style="text-align:center; padding:10px; max-width:250px;">
                    <h5 style="margin:0; color:#ea9e25; font-weight:bold;">${area.name}</h5>
                    <p style="margin:10px 0;">${area.description}</p>
                    <div style="margin-top:10px;">
                        <a href="tel:5512928090" style="background-color:#ea9e25; color:#221f1f; padding:5px 10px; text-decoration:none; border-radius:4px; font-weight:bold;">
                            <i class="fas fa-phone"></i> Call Now
                        </a>
                    </div>
                </div>
            `
        });
        
        // Add click listener to marker
        marker.addListener('click', () => {
            infoWindow.open(map, marker);
            
            // Scroll to the corresponding area card
            const areaCard = document.getElementById(area.id);
            if (areaCard) {
                areaCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
        
        // Add click listener to area card
        const areaCard = document.getElementById(area.id);
        if (areaCard) {
            areaCard.addEventListener('click', () => {
                map.panTo(area.position);
                map.setZoom(14);
                infoWindow.open(map, marker);
            });
            
            // Make area card clickable
            areaCard.style.cursor = 'pointer';
        }
    });
    
    // Add service area circle
    const serviceAreaCircle = new google.maps.Circle({
        strokeColor: '#ea9e25',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#ea9e25',
        fillOpacity: 0.1,
        map: map,
        center: { lat: 40.8859, lng: -74.0435 },
        radius: 8000 // 8 km radius
    });
} 