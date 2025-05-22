document.addEventListener("DOMContentLoaded", () => {
    createContactBackground();
});

/**
 * Creates an animated background for the contact page with floating particles.
 */
function createContactBackground() {
    // Create a container for the background animation
    const animatedBg = document.createElement("div");
    animatedBg.id = "contact-animated-bg";
    animatedBg.style.position = "fixed";
    animatedBg.style.top = "0";
    animatedBg.style.left = "0";
    animatedBg.style.width = "100%";
    animatedBg.style.height = "100%";
    animatedBg.style.zIndex = "-1"; // Place behind all content
    animatedBg.style.pointerEvents = "none"; // Prevent interaction
    document.body.prepend(animatedBg);

    // Create particles
    const particleCount = 40; // Slightly fewer particles for a lighter effect
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("div");
        particle.className = "contact-bg-particle";

        // Random position
        const posX = Math.random() * window.innerWidth;
        const posY = Math.random() * window.innerHeight;

        // Random size
        const size = Math.random() * 4 + 2; // Smaller particles for subtlety

        // Style the particle
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}px`;
        particle.style.top = `${posY}px`;
        particle.style.borderRadius = "50%";
        particle.style.position = "absolute";
        particle.style.boxShadow = "0 0 8px rgba(0, 209, 255, 0.6)";

        // Theme-based background color
        const isLightTheme = document.body.classList.contains("light-theme");
        particle.style.background = isLightTheme ?
            "rgba(0, 209, 255, 0.3)" :
            "rgba(0, 209, 255, 0.7)";

        // Add animation with random duration
        const duration = Math.random() * 15 + 8; // Faster animation for contact page
        particle.style.animation = `floatContactParticle ${duration}s infinite ease-in-out`;

        // Add to background
        animatedBg.appendChild(particle);
    }

    // Add CSS animation keyframes
    const style = document.createElement("style");
    style.textContent = `
        @keyframes floatContactParticle {
            0% {
                transform: translate(0, 0);
            }
            20% {
                transform: translate(80px, -40px);
            }
            40% {
                transform: translate(40px, 80px);
            }
            60% {
                transform: translate(-80px, 40px);
            }
            80% {
                transform: translate(-40px, -80px);
            }
            100% {
                transform: translate(0, 0);
            }
        }
    `;
    document.head.appendChild(style);

    // Update particle colors when theme changes
    const themeToggle = document.querySelector("#theme-toggle");
    if (themeToggle) {
        themeToggle.addEventListener("change", () => {
            const isLightTheme = themeToggle.checked;
            document.querySelectorAll(".contact-bg-particle").forEach((particle) => {
                particle.style.background = isLightTheme ?
                    "rgba(0, 209, 255, 0.3)" :
                    "rgba(0, 209, 255, 0.7)";
                particle.style.boxShadow = isLightTheme ?
                    "0 0 8px rgba(0, 209, 255, 0.6)" :
                    "0 0 8px rgba(0, 209, 255, 0.8)";
            });
        });
    }

    // Handle window resize to reposition particles
    window.addEventListener("resize", () => {
        document.querySelectorAll(".contact-bg-particle").forEach((particle) => {
            const posX = Math.random() * window.innerWidth;
            const posY = Math.random() * window.innerHeight;
            particle.style.left = `${posX}px`;
            particle.style.top = `${posY}px`;
        });
    });
}