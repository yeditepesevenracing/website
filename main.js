// Mobile Menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('toggle');
});

// Language Toggle
const langToggle = document.getElementById('langToggle');
const langElements = document.querySelectorAll('[data-lang]');

function updateLanguage(lang) {
    // Hide all elements not matching current language
    langElements.forEach(el => {
        // Skip the toggle button itself
        if(el !== langToggle) {
            el.classList.add('hidden');
            if (el.dataset.lang === lang) {
                el.classList.remove('hidden');
            }
        }
    });
    
    // Update UI language attributes
    document.documentElement.lang = lang;
    
    // Update toggle button text
    langToggle.textContent = lang === 'en' ? 'TR' : 'EN';
    langToggle.dataset.lang = lang;
}

// Set initial language on page load
document.addEventListener('DOMContentLoaded', () => {
    updateLanguage('en'); // Set default language to English
});

langToggle.addEventListener('click', () => {
    const newLang = document.documentElement.lang === 'en' ? 'tr' : 'en';
    updateLanguage(newLang);
});

// Intersection Observer for animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));

// Initialize Map
const map = L.map('map').setView([41.015137, 28.979530], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

// Navbar Scroll Behavior
const navbar = document.querySelector('.navbar');

function initContactMap() {
    const map = L.map('contact-map').setView([40.9818, 29.0573], 17); // Yeditepe University coordinates
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.marker([40.9818, 29.0573]).addTo(map)
        .bindPopup('Yeditepe University<br>Seven Racing Team Headquarters');
}

// Initialize map when page loads
window.addEventListener('load', initContactMap);