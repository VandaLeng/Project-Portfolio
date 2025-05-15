document.addEventListener('DOMContentLoaded', () => {
    // Tech stack particles background
    createTechParticles();

    // Typewriter animation for hero title
    typewriterAnimation();

    // GSAP for Profile Image Animation
    animateProfileImage();

    // Theme Toggle Functionality
    setupThemeToggle();

    // Language Toggle
    setupLanguageToggle();

    // Mobile Menu Toggle
    setupMobileMenu();
});

// Create tech stack particles
function createTechParticles() {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 30; // Reduced for performance
    const techIcons = [
        { name: 'HTML', color: '#e34c26' },
        { name: 'CSS', color: '#264de4' },
        { name: 'JavaScript', color: '#f0db4f' },
        { name: 'Bootstrap', color: '#563d7c' },
        { name: 'PHP', color: '#777bb4' },
        { name: 'Database', color: '#00ced1' },
        { name: 'Node.js', color: '#68a063' },
        { name: 'TypeScript', color: '#007acc' },
        { name: 'OOP', color: '#ff4500' },
        { name: 'Laravel', color: '#ff2d20' },
        { name: 'Vue.js', color: '#41b883' }
    ];

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 5 + 2;
            this.speedX = Math.random() * 0.3 - 0.15; // Slower speed
            this.speedY = Math.random() * 0.3 - 0.15; // Slower speed
            this.tech = techIcons[Math.floor(Math.random() * techIcons.length)];
            this.color = this.tech.color;
            this.opacity = Math.random() * 0.5 + 0.3; // Varying opacity
            this.rotation = Math.random() * 360; // Random rotation
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.rotation += 0.1; // Slow rotation

            // Bounce off edges
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

            // Regenerate if too small
            if (this.size > 0.5) this.size -= 0.005; // Slower shrink
            if (this.size <= 0.5) {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 5 + 2;
                this.tech = techIcons[Math.floor(Math.random() * techIcons.length)];
                this.color = this.tech.color;
            }
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation * Math.PI / 180);

            // Draw tech name with glow effect
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = this.color;
            ctx.font = `${this.size * 2}px Poppins`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.shadowColor = this.color;
            ctx.shadowBlur = 10;
            ctx.fillText(this.tech.name, 0, 0);
            ctx.shadowBlur = 0;

            ctx.restore();
        }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    // Animation loop
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((particle, index) => {
            particle.update();
            particle.draw();
        });

        requestAnimationFrame(animateParticles);
    }

    animateParticles();

    // Handle window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Typewriter animation for hero title
function typewriterAnimation() {
    const heroTitle = document.querySelector('.hero-content h1');
    const text = "WEB DESIGN / WEB DEVELOPMENT / VANDA LENG / FRONT_END DEV";
    heroTitle.textContent = "";

    let charIndex = 0;
    let isDeleting = false;
    let currentText = "";
    let typingSpeed = 100;

    function type() {
        // Current section being typed
        const sections = ["WEB DESIGN", "WEB DEVELOPMENT", "VANDA LENG", "FRONT_END DEV"];
        const currentSection = Math.floor(charIndex / 15) % sections.length;

        if (!isDeleting) {
            // Typing
            currentText = sections[currentSection].substring(0, currentText.length + 1);
            typingSpeed = 100;

            if (currentText === sections[currentSection]) {
                // Pause at end of word
                typingSpeed = 1000;
                isDeleting = true;
            }
        } else {
            // Deleting
            currentText = sections[currentSection].substring(0, currentText.length - 1);
            typingSpeed = 50;

            if (currentText === "") {
                isDeleting = false;
                charIndex += 15; // Move to next section
            }
        }

        heroTitle.textContent = currentText;
        heroTitle.classList.add('typing');

        setTimeout(type, typingSpeed);
    }

    // Start typing
    setTimeout(type, 1000);
}

// GSAP animation for profile image
function animateProfileImage() {
    if (typeof gsap !== 'undefined') {
        const profileImage = document.querySelector('.hero-image img');

        gsap.fromTo(
            profileImage, { y: -10, opacity: 0 }, {
                y: 0,
                opacity: 1,
                duration: 2.5,
                ease: 'power1.out',
                delay: 0.5,
            }
        );

        gsap.to(profileImage, {
            y: 10,
            yoyo: true,
            repeat: -1,
            duration: 4,
            ease: 'power1.inOut',
        });
    }
}

// Theme toggle functionality
function setupThemeToggle() {
    const themeToggle = document.querySelector('#theme-toggle');
    const themeLabel = themeToggle.nextElementSibling;

    themeToggle.addEventListener('change', () => {
        document.body.classList.toggle('light-theme');

        if (document.body.classList.contains('light-theme')) {
            document.body.style.backgroundColor = '#f4f4f4';
            document.querySelectorAll('.hero-content h1, .hero-content h2 span, .btn.primary, .social-icons a').forEach(el => {
                el.style.color = '#09317d';
            });

            document.querySelector('.hero-image img').style.borderColor = '#09317d';
            themeLabel.style.backgroundColor = '#ffffff';
            themeLabel.style.boxShadow = '0 0 8px rgba(9, 49, 125, 0.4)';
        } else {
            document.body.style.backgroundColor = '#1a1a1a';
            document.querySelectorAll('.hero-content h1, .hero-content h2 span, .btn.primary, .social-icons a').forEach(el => {
                el.style.color = '#00d1ff';
            });

            document.querySelector('.hero-image img').style.borderColor = '#00d1ff';
            themeLabel.style.backgroundColor = 'transparent';
            themeLabel.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.2)';
        }
    });
}

// Language toggle functionality
function setupLanguageToggle() {
    const languageSelect = document.querySelector('#language');

    languageSelect.addEventListener('change', (e) => {
        const lang = e.target.value;
        updateLanguage(lang);
    });

    // Initialize language
    updateLanguage('en');
}

// Mobile menu toggle
function setupMobileMenu() {
    const menuToggle = document.querySelector('#menu-toggle');
    const menuOpenIcon = document.querySelector('.menu-open-icon');
    const menuCloseIcon = document.querySelector('.menu-close-icon');

    menuToggle.addEventListener('click', () => {
        document.body.classList.toggle('show-mobile-menu');

        if (document.body.classList.contains('show-mobile-menu')) {
            menuOpenIcon.style.display = 'none';
            menuCloseIcon.style.display = 'block';

            // Animate menu items
            if (typeof gsap !== 'undefined') {
                gsap.fromTo('.nav-menu', { x: -300, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, ease: 'power2.out' });

                gsap.fromTo('.language-toggle', { x: -300, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, ease: 'power2.out', delay: 0.1 });

                // Animate each nav item with staggered delay
                gsap.fromTo('.nav-links li', { x: -20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3, stagger: 0.1, delay: 0.2 });
            }
        } else {
            menuOpenIcon.style.display = 'block';
            menuCloseIcon.style.display = 'none';

            // Animate menu out
            if (typeof gsap !== 'undefined') {
                gsap.to('.nav-menu', { x: -300, opacity: 0, duration: 0.3, ease: 'power2.in' });
                gsap.to('.language-toggle', { x: -300, opacity: 0, duration: 0.3, ease: 'power2.in' });
            }
        }
    });

    // Close menu when clicking on links (for mobile)
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                document.body.classList.remove('show-mobile-menu');
                menuOpenIcon.style.display = 'block';
                menuCloseIcon.style.display = 'none';

                if (typeof gsap !== 'undefined') {
                    gsap.to('.nav-menu', { x: -300, opacity: 0, duration: 0.3 });
                    gsap.to('.language-toggle', { x: -300, opacity: 0, duration: 0.3 });
                }
            }
        });
    });
}

function updateLanguage(lang) {
    // This function would handle the language update logic
    // For now, let's just log the selected language
    console.log(`Language selected: ${lang}`);
}