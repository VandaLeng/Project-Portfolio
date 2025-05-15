document.addEventListener("DOMContentLoaded", () => {
    // Particle background animation
    createParticleBackground();

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

    // Set active navigation link
    setActiveNavLink();
});

// Particle background animation with bullet-like blue dots, filling the body
function createParticleBackground() {
    const canvas = document.createElement("canvas");
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.zIndex = "-1";
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 150; // Increased for fuller coverage
    const colors = ["#00d1ff"];

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = Math.random() * 1.2 - 0.6; // Fast motion
            this.speedY = Math.random() * 1.2 - 0.6;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.opacity = Math.random() * 0.5 + 0.3;
            this.rotation = Math.random() * 360;
            this.rotationSpeed = Math.random() * 0.6 - 0.3; // Fast rotation
            this.pulseSpeed = 0.02 + Math.random() * 0.01; // Fast pulsing
            this.pulseDirection = 1;
            this.originalSize = this.size;
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.rotation += this.rotationSpeed;

            // Bounce off edges
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

            // Pulsing size effect
            if (this.pulseDirection === 1) {
                this.size += this.pulseSpeed;
                if (this.size > this.originalSize * 1.2) this.pulseDirection = -1;
            } else {
                this.size -= this.pulseSpeed;
                if (this.size < this.originalSize * 0.6) this.pulseDirection = 1;
            }

            // Regenerate if needed
            if (Math.random() < 0.0005) {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.color = colors[Math.floor(Math.random() * colors.length)];
            }
        }

        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate((this.rotation * Math.PI) / 180);

            // No shadow effect
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = this.color;

            // Draw as a circle (bullet-like dot)
            ctx.beginPath();
            ctx.arc(0, 0, this.size, 0, Math.PI * 2);
            ctx.fill();

            ctx.restore();
        }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    // Animation loop
    function animateParticles() {
        ctx.fillStyle = document.body.classList.contains("light-theme") ? "rgba(244, 244, 244, 0.05)" : "rgba(26, 26, 26, 0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        particles.forEach((particle) => {
            particle.update();
            particle.draw();
        });

        requestAnimationFrame(animateParticles);
    }

    animateParticles();

    // Handle window resize
    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Typewriter animation for hero title
function typewriterAnimation() {
    const heroTitle = document.querySelector(".hero-content h1");
    if (!heroTitle) return;

    heroTitle.textContent = "";
    heroTitle.style.minHeight = "3.5rem";

    let charIndex = 0;
    let isDeleting = false;
    let currentText = "";
    let typingSpeed = 100;

    function type() {
        const sections = ["WEB DESIGN", "WEB DEVELOPMENT", "VANDA LENG", "FRONT_END DEV"];
        const currentSection = Math.floor(charIndex / 15) % sections.length;

        if (!isDeleting) {
            currentText = sections[currentSection].substring(0, currentText.length + 1);
            typingSpeed = 100;

            if (currentText === sections[currentSection]) {
                typingSpeed = 1000;
                isDeleting = true;
            }
        } else {
            currentText = sections[currentSection].substring(0, currentText.length - 1);
            typingSpeed = 50;

            if (currentText === "") {
                isDeleting = false;
                charIndex += 15;
            }
        }

        heroTitle.textContent = currentText;
        heroTitle.classList.add("typing");

        setTimeout(type, typingSpeed);
    }

    setTimeout(type, 1000);
}

// GSAP for Profile Image Animation
function animateProfileImage() {
    if (typeof gsap !== "undefined") {
        const profileImage = document.querySelector(".hero-image img");
        if (!profileImage) return;

        gsap.fromTo(
            profileImage, { y: -30, opacity: 0, scale: 0.8 }, {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 2.5,
                ease: "elastic.out(1, 0.3)",
                delay: 0.5,
            }
        );

        gsap.to(profileImage, {
            y: 15,
            yoyo: true,
            repeat: -1,
            duration: 4,
            ease: "sine.inOut",
        });

        gsap.to(profileImage, {
            rotation: 5,
            yoyo: true,
            repeat: -1,
            duration: 6,
            ease: "sine.inOut",
            delay: 1,
        });
    }
}

// Theme Toggle Functionality with ensured dark background
function setupThemeToggle() {
    const themeToggle = document.querySelector("#theme-toggle");
    if (!themeToggle) return;

    const themeLabel = themeToggle.nextElementSibling;

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
        document.body.classList.add("light-theme");
        themeToggle.checked = true;
        applyLightTheme(themeLabel);
    } else {
        document.body.classList.remove("light-theme");
        applyDarkTheme(themeLabel);
    }

    themeToggle.addEventListener("change", () => {
        document.body.classList.toggle("light-theme");

        if (document.body.classList.contains("light-theme")) {
            applyLightTheme(themeLabel);
            localStorage.setItem("theme", "light");
        } else {
            applyDarkTheme(themeLabel);
            localStorage.setItem("theme", "dark");
        }
    });
}

function applyLightTheme(themeLabel) {
    document.body.style.backgroundColor = "#f4f4f4";
    document.querySelectorAll(".hero-content h1, .hero-content h2 span, .btn.primary, .social-icons a").forEach((el) => {
        el.style.color = "#09317d";
    });

    const profileImage = document.querySelector(".hero-image img");
    if (profileImage) {
        profileImage.style.borderColor = "#09317d";
    }

    if (themeLabel) {
        themeLabel.style.backgroundColor = "#ffffff";
        themeLabel.style.boxShadow = "0 0 8px rgba(9, 49, 125, 0.4)";
    }
}

function applyDarkTheme(themeLabel) {
    document.body.style.backgroundColor = "#1a1a1a";
    document.querySelectorAll(".hero-content h1, .hero-content h2 span, .btn.primary, .social-icons a").forEach((el) => {
        el.style.color = "#00d1ff";
    });

    const profileImage = document.querySelector(".hero-image img");
    if (profileImage) {
        profileImage.style.borderColor = "#00d1ff";
    }

    if (themeLabel) {
        themeLabel.style.backgroundColor = "transparent";
        themeLabel.style.boxShadow = "0 2px 5px rgba(0, 0, 0, 0.2)";
    }
}

function setupLanguageToggle() {
    const languageSelect = document.querySelector("#language");
    if (!languageSelect) return;

    const savedLanguage = localStorage.getItem("language") || "en";
    languageSelect.value = savedLanguage;
    updateLanguage(savedLanguage);

    languageSelect.addEventListener("change", (e) => {
        const lang = e.target.value;
        updateLanguage(lang);
        localStorage.setItem("language", lang);
    });
}

function updateLanguage(lang) {
    console.log(`Language updated to: ${lang}`);
}

function setupMobileMenu() {
    const menuToggle = document.querySelector("#menu-toggle");
    if (!menuToggle) return;

    const menuOpenIcon = document.querySelector(".menu-open-icon");
    const menuCloseIcon = document.querySelector(".menu-close-icon");

    menuToggle.addEventListener("click", () => {
        document.body.classList.toggle("show-mobile-menu");

        if (document.body.classList.contains("show-mobile-menu")) {
            menuOpenIcon.style.display = "none";
            menuCloseIcon.style.display = "block";

            if (typeof gsap !== "undefined") {
                gsap.fromTo(".nav-menu", { x: -300, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, ease: "power2.out" });

                gsap.fromTo(
                    ".language-toggle", { x: -300, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, ease: "power2.out", delay: 0.1 }
                );

                gsap.fromTo(
                    ".nav-links li", { x: -20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3, stagger: 0.1, delay: 0.2 }
                );
            }
        } else {
            menuOpenIcon.style.display = "block";
            menuCloseIcon.style.display = "none";

            if (typeof gsap !== "undefined") {
                gsap.to(".nav-menu", { x: -300, opacity: 0, duration: 0.3, ease: "power2.in" });
                gsap.to(".language-toggle", { x: -300, opacity: 0, duration: 0.3, ease: "power2.in" });
            }
        }
    });

    document.querySelectorAll(".nav-links a").forEach((link) => {
        link.addEventListener("click", () => {
            if (window.innerWidth <= 768) {
                document.body.classList.remove("show-mobile-menu");
                menuOpenIcon.style.display = "block";
                menuCloseIcon.style.display = "none";

                if (typeof gsap !== "undefined") {
                    gsap.to(".nav-menu", { x: -300, opacity: 0, duration: 0.3 });
                    gsap.to(".language-toggle", { x: -300, opacity: 0, duration: 0.3 });
                }
            }
        });
    });
}

function setActiveNavLink() {
    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll(".nav-links a");

    navLinks.forEach((link) => {
        link.classList.remove("active");

        const linkPath = link.getAttribute("href");
        const linkPathname = linkPath.split("/").pop();

        if (currentPage.includes(linkPathname)) {
            link.classList.add("active");
        }

        if (linkPathname === "index.html" && (currentPage === "/" || currentPage.endsWith("/index.html"))) {
            link.classList.add("active");
        }
    });
}