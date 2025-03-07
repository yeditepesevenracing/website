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

// Navbar Scroll Behavior
const navbar = document.querySelector('.navbar');

// Slider fonksiyonelliği güncellemesi
document.addEventListener('DOMContentLoaded', () => {
    const sliders = document.querySelectorAll('.vehicle-slider');
    
    sliders.forEach(slider => {
        const slides = slider.querySelectorAll('.slide');
        let currentSlide = 0;
        
        // İlk slaytı aktif yap
        slides.forEach((slide, index) => {
            slide.classList.remove('active');
            slide.style.opacity = 0;
        });
        slides[currentSlide].classList.add('active');
        slides[currentSlide].style.opacity = 1;

        function showSlide(n) {
            slides.forEach((slide, index) => {
                slide.classList.remove('active');
                slide.style.opacity = 0;
            });
            
            currentSlide = (n + slides.length) % slides.length;
            slides[currentSlide].classList.add('active');
            slides[currentSlide].style.opacity = 1;
        }

        // Sadece otomatik geçiş kalsın
        let autoSlide = setInterval(() => {
            showSlide(currentSlide + 1);
        }, 5000);
        
        // Fareyle üzerine gelince duraklat
        slider.addEventListener('mouseenter', () => clearInterval(autoSlide));
        slider.addEventListener('mouseleave', () => {
            autoSlide = setInterval(() => {
                showSlide(currentSlide + 1);
            }, 3000);
        });
    });
});

// Add this to your existing JavaScript
// Remove the existing click event listener completely
// Just keep the HTML link with target="_blank"