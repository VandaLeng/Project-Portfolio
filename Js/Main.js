document.addEventListener("DOMContentLoaded", () => {
    // Cyber grid background animation
    createCyberGridBackground();

    // Typewriter animation for hero title
    typewriterAnimation();

    // GSAP for Profile Image Animation
    animateProfileImage();

    // Theme Toggle Functionality
    setupThemeToggle();

    // Mobile Menu Toggle
    setupMobileMenu();

    // Set active navigation link
    setActiveNavLink();

    // Initialize skills cards
    initializeSkillsCards();

    // Setup button animation replay
    setupButtonAnimationReplay();
});

// Cyber grid background animation with network nodes and lines in blue
function createCyberGridBackground() {
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

    const nodeCount = 50;
    const nodes = [];
    for (let i = 0; i < nodeCount; i++) {
        nodes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            radius: Math.random() * 3 + 2,
        });
    }

    let time = 0;

    // Add overlay for push effect
    const overlay = document.createElement("div");
    overlay.className = "cyber-grid-overlay";
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.zIndex = "0";
    overlay.style.pointerEvents = "none";
    document.body.appendChild(overlay);

    function drawGrid() {
        // Background fill with subtle grid
        ctx.fillStyle = document.body.classList.contains("light-theme") ?
            "rgba(244, 244, 244, 0.95)" :
            "rgba(0, 0, 50, 0.95)"; // Dark blue background
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw faint grid
        ctx.strokeStyle = "rgba(0, 209, 255, 0.1)";
        ctx.lineWidth = 0.5;
        for (let x = 0; x < canvas.width; x += 50) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
        }
        for (let y = 0; y < canvas.height; y += 50) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }

        // Update and draw nodes
        ctx.shadowBlur = 15;
        nodes.forEach(node => {
            // Update position with bounce
            node.x += node.vx;
            node.y += node.vy;
            if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
            if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

            // Blue color for nodes
            const blueIntensity = Math.sin(time + node.x * 0.01) * 100 + 155;
            ctx.fillStyle = `rgba(0, 209, ${blueIntensity}, 0.8)`;
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            ctx.fill();

            // Blue glow effect
            const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.radius * 5);
            gradient.addColorStop(0, `rgba(0, 209, ${blueIntensity}, 0.5)`);
            gradient.addColorStop(1, `rgba(0, 209, ${blueIntensity}, 0)`);
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius * 5, 0, Math.PI * 2);
            ctx.fill();
        });

        // Draw connecting lines
        ctx.shadowBlur = 10;
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 150) {
                    ctx.strokeStyle = `rgba(0, 209, 255, ${1 - distance / 150})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.stroke();
                }
            }
        }

        time += 0.05;
        requestAnimationFrame(drawGrid);
    }

    drawGrid();

    // Handle window resize
    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        nodes.forEach(node => {
            if (node.x > canvas.width) node.x = canvas.width;
            if (node.y > canvas.height) node.y = canvas.height;
        });
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
    document.querySelectorAll(".hero-content h1, .hero-content h2 span, .social-icons a").forEach((el) => {
        el.style.color = "#09317d";
    });

    const profileImage = document.querySelector(".hero-image img");
    if (profileImage) {
        profileImage.style.borderColor = "#09317d";
    }

    if (themeLabel) {
        themeLabel.style.backgroundColor = "#ffffff";
    }
}

function applyDarkTheme(themeLabel) {
    document.body.style.backgroundColor = "#1a1a1a";
    document.querySelectorAll(".hero-content h1, .hero-content h2 span, .social-icons a").forEach((el) => {
        el.style.color = "#00d1ff";
    });

    const profileImage = document.querySelector(".hero-image img");
    if (profileImage) {
        profileImage.style.borderColor = "#00d1ff";
    }

    if (themeLabel) {
        themeLabel.style.backgroundColor = "transparent";
    }
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

// Initialize skills cards with animation
function initializeSkillsCards() {
    const skillsSection = document.querySelector(".skills-section");
    if (!skillsSection) return;

    const originalCards = document.querySelectorAll(".skill-card");
    const skillsContainer = document.createElement("div");
    skillsContainer.className = "skills-container";

    originalCards.forEach((card) => {
        skillsContainer.appendChild(card);
    });

    originalCards.forEach((card) => {
        const clone = card.cloneNode(true);
        skillsContainer.appendChild(clone);
    });

    skillsSection.innerHTML = "";
    skillsSection.appendChild(skillsContainer);
}

// Setup button animation replay
function setupButtonAnimationReplay() {
    const buttons = document.querySelectorAll(".btn");
    buttons.forEach((button) => {
        button.addEventListener("mouseenter", () => {
            button.style.animation = "none";
            setTimeout(() => {
                button.style.animation = "pulseButton 2s infinite";
            }, 10);
        });

        button.addEventListener("click", () => {
            button.style.animation = "none";
            setTimeout(() => {
                button.style.animation = "pulseButton 2s infinite";
            }, 10);
        });
    });
}