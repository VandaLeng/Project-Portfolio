document.addEventListener("DOMContentLoaded", () => {
    initExperiencePage();
});

function initExperiencePage() {
    setupTeamMembersCarousel();
    setupSpecialTeamCarousel();
    setupProjectCardEffects();
    setupTechIconEffects();
    animateStatsOnScroll();
    setupParallaxEffect();
}

function setupTeamMembersCarousel() {
    const carousels = document.querySelectorAll(".team-members-carousel");

    carousels.forEach((carousel) => {
        const slider = carousel.querySelector(".team-members-slider");
        const members = slider.querySelectorAll(".team-member");

        if (!members.length) return;

        let currentIndex = 0;
        const visibleCount = 3;
        const totalMembers = members.length;

        const prevBtn = carousel.querySelector(".prev-btn");
        const nextBtn = carousel.querySelector(".next-btn");

        updateActiveMembers();
        updateCarouselPosition();
        updateButtonStates();

        prevBtn.addEventListener("click", () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarouselPosition();
                updateActiveMembers();
                updateButtonStates();
            }
        });

        nextBtn.addEventListener("click", () => {
            if (currentIndex < totalMembers - visibleCount) {
                currentIndex++;
                updateCarouselPosition();
                updateActiveMembers();
                updateButtonStates();
            }
        });

        function updateCarouselPosition() {
            const translateX = -(currentIndex * (100 / visibleCount));
            slider.style.transform = `translateX(${translateX}%)`;
        }

        function updateActiveMembers() {
            members.forEach((member, index) => {
                member.classList.toggle("active", index >= currentIndex && index < currentIndex + visibleCount);
            });
        }

        function updateButtonStates() {
            prevBtn.disabled = currentIndex === 0;
            nextBtn.disabled = currentIndex >= totalMembers - visibleCount;
        }

        members.forEach((member) => {
            member.addEventListener("mouseenter", () => {
                const img = member.querySelector("img");
                if (img) {
                    img.style.transform = "scale(1.1)";
                    img.style.boxShadow = "0 0 20px rgba(0, 153, 255, 0.8)";
                }
            });

            member.addEventListener("mouseleave", () => {
                const img = member.querySelector("img");
                if (img) {
                    img.style.transform = "";
                    img.style.boxShadow = "";
                }
            });
        });
    });
}

function setupSpecialTeamCarousel() {
    const specialCarousel = document.querySelector(".team-members-special-carousel");
    if (!specialCarousel) return;

    const slider = specialCarousel.querySelector(".team-members-special-slider");
    const members = slider.querySelectorAll(".team-member-special");

    if (!members.length) return;

    let currentIndex = 0;
    const totalMembers = members.length;

    const prevBtn = specialCarousel.querySelector(".prev-btn");
    const nextBtn = specialCarousel.querySelector(".next-btn");

    updateSpecialCarouselPosition();
    updateSpecialButtonStates();

    prevBtn.addEventListener("click", () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSpecialCarouselPosition();
            updateSpecialButtonStates();
        }
    });

    nextBtn.addEventListener("click", () => {
        if (currentIndex < totalMembers - 1) {
            currentIndex++;
            updateSpecialCarouselPosition();
            updateSpecialButtonStates();
        }
    });

    function updateSpecialCarouselPosition() {
        const translateX = -(currentIndex * 100);
        slider.style.transform = `translateX(${translateX}%)`;
    }

    function updateSpecialButtonStates() {
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex === totalMembers - 1;
    }

    // Removed auto-rotation to simplify behavior
    specialCarousel.addEventListener("mouseenter", () => {
        // Optional: Add visual feedback if needed
    });

    specialCarousel.addEventListener("mouseleave", () => {
        // Optional: Add visual feedback if needed
    });
}

function setupProjectCardEffects() {
    const projectContainers = document.querySelectorAll(".project-container");

    projectContainers.forEach((container) => {
        container.addEventListener("mouseenter", () => {
            container.style.transform = "translateY(-10px)";
            container.style.boxShadow = "0 10px 30px rgba(0, 153, 255, 0.3)";

            const title = container.querySelector(".project-title");
            if (title) title.style.color = "#00ffcc";

            const viewBtn = container.querySelector(".view-btn");
            if (viewBtn) viewBtn.style.animation = "pulseButton 2s infinite";
        });

        container.addEventListener("mouseleave", () => {
            container.style.transform = "";
            container.style.boxShadow = "";

            const title = container.querySelector(".project-title");
            if (title) title.style.color = "";

            const viewBtn = container.querySelector(".view-btn");
            if (viewBtn) viewBtn.style.animation = "";
        });
    });
}

function setupTechIconEffects() {
    const toolItems = document.querySelectorAll(".tool-item");

    toolItems.forEach((item) => {
        item.addEventListener("mouseenter", () => {
            item.style.transform = "translateY(-5px) scale(1.05)";

            const icon = item.querySelector("i");
            if (icon) {
                icon.style.transform = "scale(1.2)";
                icon.style.textShadow = "0 0 15px rgba(0, 209, 255, 0.8)";
            }
        });

        item.addEventListener("mouseleave", () => {
            item.style.transform = "";

            const icon = item.querySelector("i");
            if (icon) {
                icon.style.transform = "";
                icon.style.textShadow = "";
            }
        });
    });
}

function animateStatsOnScroll() {
    const stats = document.querySelectorAll(".stat-number");

    if (!stats.length || !("IntersectionObserver" in window)) return;

    stats.forEach((stat) => {
        const text = stat.textContent.trim();
        const targetNumber = parseInt(text);
        stat.setAttribute("data-target", targetNumber);
        const hasPlus = text.includes("+");
        stat.innerHTML = hasPlus ? "0<span></span>" : "0";
    });

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const stat = entry.target;
                    const target = parseInt(stat.getAttribute("data-target"));
                    animateCounter(stat, 0, target, 2000);
                    observer.unobserve(stat);
                }
            });
        }, { threshold: 0.5 }
    );

    stats.forEach((stat) => observer.observe(stat));
}

function animateCounter(element, start, end, duration) {
    let startTime = null;
    const hasPlus = element.innerHTML.includes("<span>");

    function animation(currentTime) {
        if (!startTime) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const easeProgress = 1 - (1 - progress) * (1 - progress);
        const currentCount = Math.floor(easeProgress * (end - start) + start);

        element.innerHTML = hasPlus ? `${currentCount}<span></span>` : currentCount;

        if (progress < 1) {
            requestAnimationFrame(animation);
        } else {
            element.innerHTML = hasPlus ? `${end}<span></span>` : end;
        }
    }

    requestAnimationFrame(animation);
}

function setupParallaxEffect() {
    const animatedBg = document.getElementById("animated-bg");
    if (!animatedBg) return;

    for (let i = 0; i < 30; i++) {
        createParticle(animatedBg);
    }

    document.addEventListener("mousemove", (e) => {
        const particles = document.querySelectorAll(".particle");
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        particles.forEach((particle, index) => {
            const depth = 0.05 + (index % 5) * 0.01;
            const moveX = mouseX * depth * 100;
            const moveY = mouseY * depth * 100;

            particle.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });
}

function createParticle(container) {
    const particle = document.createElement("div");
    particle.classList.add("particle");

    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    const size = Math.random() * 3 + 1;
    const opacity = Math.random() * 0.3 + 0.1;

    particle.style.left = `${posX}%`;
    particle.style.top = `${posY}%`;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.opacity = opacity;

    container.appendChild(particle);
}