document.addEventListener('DOMContentLoaded', () => {
    // Particle Background
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
    const particleCount = 100;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 2 - 1;
            this.speedY = Math.random() * 2 - 1;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.size > 0.2) this.size -= 0.02;

            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }

        draw() {
            ctx.fillStyle = 'rgba(0, 209, 255, 0.5)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticles() {
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((particle, index) => {
            particle.update();
            particle.draw();

            if (particle.size <= 0.2) {
                particles.splice(index, 1);
                particles.push(new Particle());
            }
        });
        requestAnimationFrame(animateParticles);
    }

    initParticles();
    animateParticles();

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    // GSAP for Profile Image Animation (Slow Vertical Movement 10px)
    gsap.registerPlugin(Draggable);
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

    // Add Draggable Programming Language Cards with Continuous Animation
    const languages = [
        { name: 'HTML', icon: 'fab fa-html5', color: '#e34c26' },
        { name: 'CSS', icon: 'fab fa-css3-alt', color: '#264de4' },
        { name: 'JavaScript', icon: 'fab fa-js', color: '#f0db4f' },
        { name: 'PHP', icon: 'fab fa-php', color: '#777bb4' },
        { name: 'Git', icon: 'fab fa-git-alt', color: '#f05032' },
        { name: 'Bootstrap', icon: 'fab fa-bootstrap', color: '#563d7c' },
    ];

    languages.forEach((lang, index) => {
        const card = document.createElement('div');
        card.className = 'language-card';
        card.innerHTML = `
            <i class="${lang.icon}" style="color: ${lang.color};"></i>
            <span>${lang.name}</span>
        `;
        document.body.appendChild(card);

        // Initial position (random, avoiding header)
        const maxX = window.innerWidth - 60;
        const maxY = window.innerHeight - 60;
        const minY = 80;
        const x = Math.random() * maxX;
        const y = Math.random() * (maxY - minY) + minY;
        card.style.left = `${x}px`;
        card.style.top = `${y}px`;

        // Continuous wandering animation
        function wander() {
            gsap.to(card, {
                x: `+=${Math.random() * 100 - 50}`, // Random movement left/right
                y: `+=${Math.random() * 100 - 50}`, // Random movement up/down
                duration: 3 + Math.random() * 2,
                ease: 'power1.inOut',
                onComplete: wander,
                onUpdate: function() {
                    // Keep card within bounds
                    const rect = card.getBoundingClientRect();
                    if (rect.left < 0) gsap.set(card, { x: 0 });
                    if (rect.right > window.innerWidth) gsap.set(card, { x: window.innerWidth - rect.width });
                    if (rect.top < minY) gsap.set(card, { y: minY });
                    if (rect.bottom > window.innerHeight) gsap.set(card, { y: window.innerHeight - rect.height });
                }
            });
        }
        wander();

        // Make cards draggable
        Draggable.create(card, {
            bounds: 'body',
            onDragStart: function() {
                gsap.to(this.target, { scale: 1.1, boxShadow: '0 0 15px rgba(0, 209, 255, 0.6)', duration: 0.3 });
                gsap.killTweensOf(this.target); // Pause wandering while dragging
            },
            onDragEnd: function() {
                gsap.to(this.target, { scale: 1, boxShadow: '0 4px 10px rgba(0, 209, 255, 0.3)', duration: 0.3 });
                wander(); // Resume wandering after dragging
            },
        });
    });

    // Add Tech Icons in Hero Section (Static)
    const techContainer = document.createElement('div');
    techContainer.className = 'tech-icons';
    techContainer.style.display = 'flex';
    techContainer.style.gap = '20px';
    techContainer.style.marginTop = '20px';
    techContainer.style.flexWrap = 'wrap';

    languages.forEach((tech, index) => {
        const icon = document.createElement('i');
        icon.className = tech.icon;
        icon.style.fontSize = '24px';
        icon.style.color = tech.color;
        icon.style.cursor = 'pointer';
        icon.title = tech.name;
        techContainer.appendChild(icon);

        gsap.from(icon, {
            y: 50,
            opacity: 0,
            duration: 1,
            delay: index * 0.2 + 1,
            ease: 'power2.out',
        });
        icon.addEventListener('mouseenter', () => {
            gsap.to(icon, { scale: 1.3, duration: 0.3, ease: 'power2.out' });
        });
        icon.addEventListener('mouseleave', () => {
            gsap.to(icon, { scale: 1, duration: 0.3, ease: 'power2.out' });
        });
    });

    document.querySelector('.hero-content').appendChild(techContainer);

    // Theme Toggle Functionality
    const themeToggle = document.querySelector('#theme-toggle');
    const themeLabel = themeToggle.nextElementSibling;
    themeToggle.addEventListener('change', () => {
        document.body.classList.toggle('light-theme');
        if (document.body.classList.contains('light-theme')) {
            document.body.style.backgroundColor = '#f4f4f4';
            document.querySelectorAll('.hero-content h1, .hero-content h2 span, .btn.primary, .social-icons a, .hero-image img').forEach(el => {
                el.style.color = '#09317d';
                if (el.tagName === 'IMG') el.style.borderColor = '#09317d';
            });
            themeLabel.style.backgroundColor = '#ffffff';
            themeLabel.style.boxShadow = '0 0 8px rgba(9, 49, 125, 0.4)';
        } else {
            document.body.style.backgroundColor = '#1a1a1a';
            document.querySelectorAll('.hero-content h1, .hero-content h2 span, .btn.primary, .social-icons a, .hero-image img').forEach(el => {
                el.style.color = '#00d1ff';
                if (el.tagName === 'IMG') el.style.borderColor = '#00d1ff';
            });
            themeLabel.style.backgroundColor = 'transparent';
            themeLabel.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.2)';
        }
    });

    // Language Toggle
    const languageSelect = document.querySelector('#language');
    languageSelect.addEventListener('change', (e) => {
        const lang = e.target.value;
        updateLanguage(lang);
    });

    // Initialize language
    updateLanguage('en');

    // Smooth Scroll for Navigation Links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});