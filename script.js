// ===============================================
// FAMIGLIA LONDI - WEBSITE JAVASCRIPT
// ===============================================

document.addEventListener('DOMContentLoaded', () => {

    // ===============================================
    // NAVIGATION & SECTION SWITCHING
    // ===============================================

    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    // Function to show a specific section
    function showSection(targetId) {
        // Hide all sections
        sections.forEach(section => {
            section.classList.remove('active');
        });

        // Show target section
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.classList.add('active');
        }

        // Update active nav link
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === targetId) {
                link.classList.add('active');
            }
        });

        // Scroll to top smoothly
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Add click event to all nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            showSection(targetId);

            // Update URL without page reload
            history.pushState(null, '', targetId);
        });
    });

    // Handle browser back/forward buttons
    window.addEventListener('popstate', () => {
        const hash = window.location.hash || '#home';
        showSection(hash);
    });

    // Show correct section on page load based on URL hash
    const initialHash = window.location.hash || '#home';
    showSection(initialHash);


    // ===============================================
    // ANIMATIONS ON SCROLL
    // ===============================================

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all member cards
    const animatedElements = document.querySelectorAll('.member-card');
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });


    // ===============================================
    // SCROLL-BASED STORY ANIMATIONS
    // ===============================================

    const storyItems = document.querySelectorAll('.story-item');

    const storyObserverOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };

    const storyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, storyObserverOptions);

    storyItems.forEach(item => {
        storyObserver.observe(item);
    });


    // ===============================================
    // MEMBER CARDS INTERACTIVE EFFECTS
    // ===============================================

    const memberCards = document.querySelectorAll('.member-card');

    memberCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });


    // ===============================================
    // GALLERY MASONRY ANIMATIONS
    // ===============================================

    const galleryItems = document.querySelectorAll('.gallery-item');

    const galleryObserverOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const galleryObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const index = entry.target.getAttribute('data-index');
                const delay = (index % 12) * 50; // Stagger animation based on index

                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);

                galleryObserver.unobserve(entry.target);
            }
        });
    }, galleryObserverOptions);

    galleryItems.forEach(item => {
        galleryObserver.observe(item);
    });


    // ===============================================
    // NAVBAR BACKGROUND ON SCROLL
    // ===============================================

    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.05)';
        }

        lastScroll = currentScroll;
    });


    // ===============================================
    // PARALLAX EFFECT FOR STORY IMAGES
    // ===============================================

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;

        storyItems.forEach((item, index) => {
            const itemTop = item.offsetTop;
            const itemHeight = item.offsetHeight;
            const windowHeight = window.innerHeight;

            if (scrolled + windowHeight > itemTop && scrolled < itemTop + itemHeight) {
                const parallaxSpeed = 0.3;
                const yPos = -((scrolled - itemTop) * parallaxSpeed);

                const storyImage = item.querySelector('.story-image');
                if (storyImage) {
                    storyImage.style.transform = `translateY(${yPos}px)`;
                }
            }
        });
    });


    // ===============================================
    // CONSOLE MESSAGE
    // ===============================================

    console.log('%c👨‍👩‍👦‍👦 Benvenuti nel sito della Famiglia Londi! 👨‍👩‍👦‍👦',
        'color: #f5576c; font-size: 16px; font-weight: bold;');
    console.log('%cCreato con ❤️ da Tino',
        'color: #4facfe; font-size: 12px;');
});
