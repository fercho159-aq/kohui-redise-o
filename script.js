document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    // Toggle navigation on mobile
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Unified Scroll Animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in-left, .fade-in-right, .service-card, .portfolio-item');

    animatedElements.forEach((el) => {
        el.classList.add('hidden-element'); // Add a class to hide initially
        observer.observe(el);
    });
    // About Us Carousel
    const carouselImages = document.querySelectorAll('.carousel img');
    if (carouselImages.length > 0) {
        let currentImageIndex = 0;

        setInterval(() => {
            // Remove active class from current
            carouselImages[currentImageIndex].classList.remove('active');

            // Increment index
            currentImageIndex = (currentImageIndex + 1) % carouselImages.length;

            // Add active class to next
            carouselImages[currentImageIndex].classList.add('active');
        }, 1200); // Change every 1.2s
    }
});
