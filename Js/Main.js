document.addEventListener("DOMContentLoaded", () => {
    createCyberGridBackground();
    typewriterAnimation();
    animateProfileImage();
    setupThemeToggle();
    setupMobileMenu();
    setActiveNavLink();
    initializeSkillsCards();
    setupButtonAnimationReplay();

    if (typeof AOS !== "undefined" && typeof AOS.init === "function") {
        AOS.init();
    }
});

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
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            radius: Math.random() * 3 + 2,
        });
    }

    let time = 0;

    const overlay = document.createElement("div");
    overlay.className = "cyber-grid-overlay";
    document.body.appendChild(overlay);

    function drawGrid() {
        if (document.body.classList.contains("light-theme")) {
            ctx.fillStyle = "rgba(255, 255, 255, 0.97)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        } else {
            ctx.fillStyle = "rgba(0, 0, 0, 0.97)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        const gridColor = document.body.classList.contains("light-theme") ?
            "rgba(0, 209, 255, 0.1)" :
            "rgba(0, 209, 255, 0.1)";
        ctx.strokeStyle = gridColor;
        ctx.lineWidth = 0.5;

        const gridSize = 50;
        for (let x = 0; x < canvas.width; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
        }
        for (let y = 0; y < canvas.height; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }

        ctx.shadowBlur = 15;
        nodes.forEach((node) => {
            node.x += node.vx;
            node.y += node.vy;
            if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
            if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

            const blueIntensity = Math.sin(time + node.x * 0.01) * 100 + 155;
            ctx.fillStyle = `rgba(0, 209, ${blueIntensity}, 0.8)`;
            ctx.shadowColor = `rgba(0, 209, ${blueIntensity}, 0.8)`;
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            ctx.fill();

            ctx.shadowBlur = 0;
            const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.radius * 5);
            gradient.addColorStop(0, `rgba(0, 209, ${blueIntensity}, 0.5)`);
            gradient.addColorStop(1, `rgba(0, 209, ${blueIntensity}, 0)`);
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius * 5, 0, Math.PI * 2);
            ctx.fill();
        });

        ctx.shadowBlur = 0;
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

        time += 0.02;
        requestAnimationFrame(drawGrid);
    }

    drawGrid();

    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        nodes.forEach((node) => {
            if (node.x > canvas.width) node.x = canvas.width;
            if (node.y > canvas.height) node.y = canvas.height;
        });
    });

    const themeToggle = document.querySelector("#theme-toggle");
    if (themeToggle) {
        themeToggle.addEventListener("change", () => {});
    }

    document.addEventListener("mouseover", (e) => {
        if (e.target.closest(".skill-card")) {
            const card = e.target.closest(".skill-card");
            const rect = card.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            nodes.forEach((node) => {
                const dx = node.x - centerX;
                const dy = node.y - centerY;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 150) {
                    const angle = Math.atan2(dy, dx);
                    const force = (150 - distance) / 150;
                    node.vx += Math.cos(angle) * force * 0.5;
                    node.vy += Math.sin(angle) * force * 0.5;
                }
            });
        }
    });
}

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

function animateProfileImage() {
    if (typeof gsap !== "undefined") {
        const profileImages = document.querySelectorAll(".hero-image img, .about-image img");
        profileImages.forEach((profileImage) => {
            if (!profileImage) return;

            gsap.fromTo(
                profileImage, { y: -20, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, duration: 2, ease: "power2.out", delay: 0.5 }
            );

            gsap.to(profileImage, {
                y: 10,
                yoyo: true,
                repeat: -1,
                duration: 6,
                ease: "sine.inOut",
            });

            gsap.to(profileImage, {
                rotation: 3,
                yoyo: true,
                repeat: -1,
                duration: 8,
                ease: "sine.inOut",
                delay: 1,
            });
        });
    }
}

function setupThemeToggle() {
    const themeToggle = document.querySelector("#theme-toggle");
    if (!themeToggle) return;

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
        document.body.classList.add("light-theme");
        themeToggle.checked = true;
        applyLightTheme();
    } else {
        document.body.classList.remove("light-theme");
        themeToggle.checked = false;
        applyDarkTheme();
    }

    themeToggle.addEventListener("change", () => {
        if (themeToggle.checked) {
            document.body.classList.add("light-theme");
            applyLightTheme();
            localStorage.setItem("theme", "light");
        } else {
            document.body.classList.remove("light-theme");
            applyDarkTheme();
            localStorage.setItem("theme", "dark");
        }
    });
}

function applyLightTheme() {
    document.body.style.backgroundColor = "#ffffff";
    document.querySelectorAll(".skill-card").forEach((card) => {
        card.style.color = "#1a1a1a";
    });
    document.querySelectorAll(".skill-card span").forEach((span) => {
        span.style.color = "#1a1a1a";
    });
}

function applyDarkTheme() {
    document.body.style.backgroundColor = "#1a1a1a";
    document.querySelectorAll(".skill-card").forEach((card) => {
        card.style.color = "#ffffff";
    });
    document.querySelectorAll(".skill-card span").forEach((span) => {
        span.style.color = "#ffffff";
    });
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
                gsap.fromTo(".language-toggle", { x: -300, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, ease: "power2.out", delay: 0.1 });
                gsap.fromTo(".nav-links li", { x: -20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3, stagger: 0.1, delay: 0.2 });
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

function initializeSkillsCards() {
    const skillsSection = document.querySelector(".skills-section");
    if (!skillsSection) return;

    const originalCards = document.querySelectorAll(".skill-card");
    const skillsContainer = document.createElement("div");
    skillsContainer.className = "skills-container";

    originalCards.forEach((card, index) => {
        card.setAttribute("data-aos", "fade-up");
        card.setAttribute("data-aos-delay", (index * 100).toString());
        card.setAttribute("data-aos-duration", "800");
        skillsContainer.appendChild(card);
    });

    originalCards.forEach((card, index) => {
        const clone = card.cloneNode(true);
        clone.setAttribute("data-aos", "fade-up");
        clone.setAttribute("data-aos-delay", (index * 100).toString());
        clone.setAttribute("data-aos-duration", "800");
        skillsContainer.appendChild(clone);
    });

    skillsSection.innerHTML = "";
    skillsSection.appendChild(skillsContainer);

    document.querySelectorAll(".skill-card").forEach((card) => {
        card.addEventListener("mouseenter", () => {
            const siblings = Array.from(card.parentNode.children).filter((sibling) => sibling !== card);
            siblings.forEach((sibling) => {
                const rect1 = card.getBoundingClientRect();
                const rect2 = sibling.getBoundingClientRect();
                const dx = rect1.left + rect1.width / 2 - (rect2.left + rect2.width / 2);
                const dy = rect1.top + rect1.height / 2 - (rect2.top + rect2.height / 2);
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 200) {
                    const pushFactor = ((200 - distance) / 200) * 10;
                    if (typeof gsap !== "undefined") {
                        gsap.to(sibling, {
                            x: (-dx / Math.abs(dx)) * pushFactor,
                            y: (-dy / Math.abs(dy)) * pushFactor,
                            duration: 0.3,
                            ease: "power2.out",
                        });
                    }
                }
            });
        });

        card.addEventListener("mouseleave", () => {
            const siblings = Array.from(card.parentNode.children);
            siblings.forEach((sibling) => {
                if (typeof gsap !== "undefined") {
                    gsap.to(sibling, {
                        x: 0,
                        y: 0,
                        duration: 0.5,
                        ease: "elastic.out(1, 0.5)",
                    });
                }
            });
        });
    });
}

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