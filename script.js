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

    const animatedElements = document.querySelectorAll('.scroll-animate');

    animatedElements.forEach((el) => {
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

    // WhatsApp Widget Logic
    const waBtn = document.getElementById('whatsapp-btn');
    const waModal = document.getElementById('whatsapp-modal');
    const waClose = document.querySelector('.close-modal');
    const waForm = document.getElementById('whatsapp-form');

    if (waBtn) {
        waBtn.addEventListener('click', () => {
            waModal.classList.toggle('hidden');
        });
    }

    if (waClose) {
        waClose.addEventListener('click', () => {
            waModal.classList.add('hidden');
        });
    }

    if (waForm) {
        waForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nombre = document.getElementById('wa-nombre').value;
            const apellido = document.getElementById('wa-apellido').value;
            const obra = document.getElementById('wa-obra').value;

            const message = `Hola, soy ${nombre} ${apellido}. Mi proyecto es de tipo ${obra}. Me gustaría recibir información.`;
            const waUrl = `https://wa.me/50768306207?text=${encodeURIComponent(message)}`;

            window.open(waUrl, '_blank');
            waModal.classList.add('hidden');
            waForm.reset();
        });
    }

    // Metrics Counter Animation
    const counters = document.querySelectorAll('.number');
    const counterObserverOptions = {
        threshold: 0.5
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.innerText.replace('+', '').replace(',', '');
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;

                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        counter.innerText = (counter.innerText.startsWith('+') ? '+' : '') + Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.innerText = (counter.innerText.startsWith('+') ? '+' : '') + target;
                    }
                };
                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, counterObserverOptions);

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

    // Staggered Reveal for Client Logos
    const logoObserverOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const logoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const logos = entry.target.querySelectorAll('.client-card');
                logos.forEach((logo, index) => {
                    setTimeout(() => {
                        logo.classList.add('visible');
                    }, index * 100);
                });
                logoObserver.unobserve(entry.target);
            }
        });
    }, logoObserverOptions);

    const clientGrid = document.querySelector('.client-grid');
    if (clientGrid) {
        logoObserver.observe(clientGrid);
    }

    // Modular Internal Carousels for Services
    const initServiceCarousels = () => {
        const carouselContainers = document.querySelectorAll('.service-carousel');

        carouselContainers.forEach(container => {
            const track = container.querySelector('.carousel-track');
            const slides = Array.from(track.children);
            const nextBtn = container.querySelector('.carousel-next');
            const prevBtn = container.querySelector('.carousel-prev');
            const dotsNav = container.querySelector('.carousel-nav');
            const dots = Array.from(dotsNav.children);

            const slideWidth = slides[0].getBoundingClientRect().width;

            // Arrange slides next to each other
            const setSlidePosition = (slide, index) => {
                slide.style.left = slideWidth * index + 'px';
            };
            slides.forEach(setSlidePosition);

            const moveToSlide = (track, currentSlide, targetSlide) => {
                track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
                currentSlide.classList.remove('current-slide');
                targetSlide.classList.add('current-slide');
            };

            const updateDots = (currentDot, targetDot) => {
                currentDot.classList.remove('current-dot');
                targetDot.classList.add('current-dot');
            };

            // Click Prev
            prevBtn.addEventListener('click', e => {
                const currentSlide = track.querySelector('.current-slide') || slides[0];
                const prevSlide = currentSlide.previousElementSibling;
                if (!prevSlide) return;

                const currentDot = dotsNav.querySelector('.current-dot');
                const prevDot = currentDot.previousElementSibling;

                moveToSlide(track, currentSlide, prevSlide);
                updateDots(currentDot, prevDot);
            });

            // Click Next
            nextBtn.addEventListener('click', e => {
                const currentSlide = track.querySelector('.current-slide') || slides[0];
                const nextSlide = currentSlide.nextElementSibling;
                if (!nextSlide) return;

                const currentDot = dotsNav.querySelector('.current-dot');
                const nextDot = currentDot.nextElementSibling;

                moveToSlide(track, currentSlide, nextSlide);
                updateDots(currentDot, nextDot);
            });

            // Click Dots
            dotsNav.addEventListener('click', e => {
                const targetDot = e.target.closest('button');
                if (!targetDot) return;

                const currentSlide = track.querySelector('.current-slide') || slides[0];
                const currentDot = dotsNav.querySelector('.current-dot');
                const targetIndex = dots.findIndex(dot => dot === targetDot);
                const targetSlide = slides[targetIndex];

                moveToSlide(track, currentSlide, targetSlide);
                updateDots(currentDot, targetDot);
            });
        });
    };

    initServiceCarousels();

    // Recalculate slide positions on resize
    window.addEventListener('resize', () => {
        const carouselContainers = document.querySelectorAll('.service-carousel');
        carouselContainers.forEach(container => {
            const track = container.querySelector('.carousel-track');
            const slides = Array.from(track.children);
            const slideWidth = slides[0].getBoundingClientRect().width;

            slides.forEach((slide, index) => {
                slide.style.left = slideWidth * index + 'px';
            });

            // Adjust track position to stay on current slide
            const currentSlide = track.querySelector('.current-slide') || slides[0];
            track.style.transition = 'none'; // Disable animation during resize
            track.style.transform = 'translateX(-' + currentSlide.style.left + ')';
            setTimeout(() => {
                track.style.transition = 'transform 0.5s ease-in-out';
            }, 10);
        });
    });

    // Lightbox Functionality
    const initLightbox = () => {
        const galleryItems = document.querySelectorAll('.gallery-item img');
        if (galleryItems.length === 0) return;

        // Create Lightbox Elements
        const lightbox = document.createElement('div');
        lightbox.id = 'lightbox';
        lightbox.className = 'lightbox hidden';
        lightbox.innerHTML = `
            <div class="lightbox-overlay"></div>
            <div class="lightbox-content">
                <span class="lightbox-close">&times;</span>
                <img src="" alt="Lightbox Image">
            </div>
        `;
        document.body.appendChild(lightbox);

        const lightboxImg = lightbox.querySelector('img');
        const lightboxClose = lightbox.querySelector('.lightbox-close');
        const lightboxOverlay = lightbox.querySelector('.lightbox-overlay');

        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                lightboxImg.src = item.src;
                lightbox.classList.remove('hidden');
                document.body.style.overflow = 'hidden'; // Prevent scroll
            });
        });

        const closeLightbox = () => {
            lightbox.classList.add('hidden');
            document.body.style.overflow = '';
        };

        lightboxClose.addEventListener('click', closeLightbox);
        lightboxOverlay.addEventListener('click', closeLightbox);
    };

    initLightbox();
});
