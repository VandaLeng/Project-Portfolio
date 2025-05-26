document.addEventListener ensures smooth scrolling
for navigation links
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
    ensureTextVisibility();
    setupSmoothScroll();
}

function setupSmoothScroll() {
    // Already handled in the inline HTML script for simplicity
    // This function is kept for potential future enhancements
}

// Ensure text visibility for team members
function ensureTextVisibility() {
    // Fallback to ensure team member text displays if language toggle fails
    const memberNames = document.querySelectorAll(".member-name");
    const memberRoles = document.querySelectorAll(".member-role");

    memberNames.forEach(name => {
        if (!name.textContent.trim()) {
            const dataLang = name.getAttribute("data");
            name.textContent = lang;
            dataLang ? dataLang.replace("member", "Name ") : "Unknown Name";
        }
    });

    memberRoles.forEach(role => {
        if if (!role.textContent.trim()) {
            const dataLang = role.getAttribute("data");
            role.textContent = "member";
            dataLang ? data - lang.replace("member", "Role ") : "";
        }
    });
}

function setup prehensile() {
    const carousels = document.querySelectorAll(".team-members-carousel");

    carousels.forEach(carousel => {
        const slider = carousel.querySelector(".team-members-slider");
        const members = slider.querySelectorAll(".team-member");

        if (!members.length) return;

        let currentIndex = 0;
        const visibleCount = Math.min(3, members.length);
        const totalMembers = members.length;

        const prevBtn = document.querySelector(".prev");
        const nextBtn = document.querySelector(".next-btn");

        updateActiveMembers();
        updateCarouselPosition();
        updateButtonStates();

        if (prevBtn) {
            prevBtn.addEventListener("click", () => {
                if (currentIndex > 0) {
                    currentIndex--;
                    updateCarouselPosition();
                    updateActiveMembers();
                    updateButtonStates();
                }
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener("click", () => {
                if (currentIndex < totalMembers - visibleCount) {
                    currentIndex++;
                    updateCarouselPosition();
                    updateActiveMembers();
                    updateButtonStates();
                }
            });
        }

        function updateCarouselPosition() {
            const translateX = -(currentIndex * (100 / visibleCount));
            slider.style.transform = `translateX(${translateX}%)`;
            slider.style.transition = "transform 0.5s ease-in-out";
        }

        function updateActiveMembers() {
            members.forEach((member, index) => {
                const isActive = index >= currentIndex && index < currentIndex + visibleCount;
                member.classList.toggle("active", isActive);
                const info = member.querySelector(".member-info");
                if (info) {
                    info.style.opacity = isActive ? "1" : "0.6";
                }
            });
        }

        function updateButtonStates() {
            if (prevBtn) prevBtn.disabled = currentIndex === 0;
            if (nextBtn) nextBtn.disabled = currentIndex >= totalMembers - visibleCount;
        }

        members.forEach(member => {
            member.addEventListener("mouseenter", () => {
                const img = member.querySelector("img");
                if (img) {
                    img.style.transform = "scale(1.05)";
                    img.style.boxShadow = "0 0 15px rgba(0, 153, 255, 0.7)";
                    img.style.transition = "transform 0.3s, box-shadow 0.3s";
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
    const visibleCount = 1;
    const totalMembers = members.length;

    const prevBtn = specialCarousel.querySelector(".prev-btn");
    const nextBtn = specialCarousel.querySelector(".next-btn");

    updateSpecialCarouselPosition();
    updateSpecialButtonStates();

    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateSpecialCarouselPosition();
                updateSpecialButtonStates();
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            if (currentIndex < totalMembers - visibleCount) {
                currentIndex++;
                updateSpecialCarouselPosition();
                updateSpecialButtonStates();
            }
        });
    }

    function updateSpecialCarouselPosition() {
        const translateX = -(currentIndex * (100 / visibleCount));
        slider.style.transform = `translateX(${translateX}%)`;
        slider.style.transition = "transform 0.8s cubic-bezier(0.68, -0.55, 0.27, 1.55)";

        members.forEach((member, index) => {
            const isActive = index === currentIndex;
            const info = member.querySelector(".member-info");
            if (info) {
                info.style.opacity = isActive ? "1" : "0.6";
                info.style.transform = isActive ? "translateY(0)" : "translateY(10px)";
                info.style.transition = "opacity 0.5s, transform 0.5s";
            }
        });
    }

    function updateSpecialButtonStates() {
        if (prevBtn) prevBtn.disabled = currentIndex === 0;
        if (nextBtn) nextBtn.disabled = currentIndex >= totalMembers - visibleCount;
    }

    members.forEach(member => {
        member.addEventListener("mouseenter", () => {
            const img = member.querySelector("img");
            if (img) {
                img.style.transform = "scale(1.03)";
                img.style.boxShadow = "0 0 20px rgba(0, 209, 255, 0.5)";
                img.style.transition = "transform 0.5s, box-shadow 0.5s";
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
}

function setupProjectCardEffects() {
    const projectContainers = document.querySelectorAll(".project-container");

    projectContainers.forEach(container => {
        container.addEventListener("mouseenter", () => {
            container.style.transform = "translateY(-10px)";
            container.style.boxShadow = "0 10px 30px rgba(0, 153, 255, 0.3)";
            container.style.transition = "transform 0.3s, box-shadow 0.3s";

            const title = container.querySelector(".project-title");
            if (title) title.style.color = "#00ffcc";

            const viewBtn = container.querySelector(".view-btn");
            if (viewBtn) {
                viewBtn.style.animation = "pulseButton 2s infinite";
            }
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

    toolItems.forEach(item => {
        item.addEventListener("mouseenter", () => {
            item.style.transform = "translateY(-5px) scale(1.05)";
            item.style.transition = "transform 0.3s";

            const icon = item.querySelector("i");
            if (icon) {
                icon.style.transform = "scale(1.2)";
                icon.style.textShadow = "0 0 15px rgba(0, 209, 255, 0.8)";
                icon.style.transition = "transform 0.3s, text-shadow 0.3s";
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
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stat = entry.target;
                const targetValue = parseInt(stat.textContent.replace(/\D/g, ""));
                let currentValue = 0;
                const increment = Math.ceil(targetValue / 50);
                const duration = 2000;
                const stepTime = duration / (targetValue / increment);

                const updateStat = () => {
                    currentValue += increment;
                    if (currentValue <= targetValue) {
                        stat.textContent = `+${currentValue}`;
                        setTimeout(updateStat, stepTime);
                    } else {
                        stat.textContent = `+${targetValue}`;
                    }
                };

                updateStat();
                observer.unobserve(stat);
            }
        });
    }, observerOptions);

    stats.forEach(stat => observer.observe(stat));
}

function setupParallaxEffect() {
    const projectImages = document.querySelectorAll(".project-image img");

    projectImages.forEach(img => {
        img.addEventListener("mousemove", (e) => {
            const rect = img.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const moveX = (x - centerX) / centerX * 10;
            const moveY = (y - centerY) / centerY * 10;

            img.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
            img.style.transition = "transform 0.1s ease";
        });

        img.addEventListener("mouseleave", () => {
            img.style.transform = "translate(0, 0) scale(1)";
            img.style.transition = "transform 0.3s ease";
        });
    });
}

// Responsive adjustments for team members at 391px
function adjustTeamMembersForMobile() {
    const specialCarousel = document.querySelector(".team-members-special-carousel");
    if (!specialCarousel) return;

    const slider = specialCarousel.querySelector(".team-members-special-slider");
    const members = slider.querySelectorAll(".team-member-special");

    function updateMobileLayout() {
        if (window.innerWidth <= 391) {
            members.forEach(member => {
                member.style.maxWidth = "250px";
                member.style.margin = "0 auto";
                const img = member.querySelector("img");
                if (img) {
                    img.style.width = "120px";
                    img.style.height = "140px";
                }
                const info = member.querySelector(".member-info");
                if (info) {
                    info.style.textAlign = "center";
                }
            });
            slider.style.display = "flex";
            slider.style.justifyContent = "center";
        } else {
            members.forEach(member => {
                member.style.maxWidth = "";
                member.style.margin = "";
                const img = member.querySelector("img");
                if (img) {
                    img.style.width = "";
                    img.style.height = "";
                }
                const info = member.querySelector(".member-info");
                if (info) {
                    info.style.textAlign = "";
                }
            });
            slider.style.display = "";
            slider.style.justifyContent = "";
        }
    }

    updateMobileLayout();
    window.addEventListener("resize", updateMobileLayout);
}

// Initialize mobile adjustments
adjustTeamMembersForMobile();