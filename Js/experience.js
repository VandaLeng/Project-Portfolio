document.addEventListener("DOMContentLoaded", () => {
    // Initialize animations and interactions specific to the experience page
    initExperienceAnimations();

    // Check if AOS is loaded and initialize it
    if (typeof AOS !== "undefined") {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true
        });
    }
});

function initExperienceAnimations() {
    // Animate stats on scroll
    animateStatsOnScroll();

    // Add hover effects to project containers
    setupProjectContainerEffects();

    // Add scroll reveal animations to projects
    revealProjectsOnScroll();

    // Animate team members
    animateTeamMembers();

    // Animate tools grid
    animateToolsGrid();

    // Add floating animation to view buttons
    animateViewButtons();
}

function animateStatsOnScroll() {
    const stats = document.querySelectorAll('.stat-number');

    // Only proceed if we have stats and IntersectionObserver is supported
    if (!stats.length || !('IntersectionObserver' in window)) return;

    // Store the original numbers to animate to
    stats.forEach(stat => {
        const targetNumber = parseInt(stat.textContent);
        stat.setAttribute('data-target', targetNumber);
        stat.textContent = '0';
    });

    // Create observer to trigger counting animation when stats are visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stat = entry.target;
                const target = parseInt(stat.getAttribute('data-target'));

                // Animate the number counting up
                animateCounter(stat, 0, target, 2000); // 2 seconds duration

                // Unobserve after animation starts
                observer.unobserve(stat);
            }
        });
    }, { threshold: 0.5 });

    // Observe each stat element
    stats.forEach(stat => observer.observe(stat));
}

function animateCounter(element, start, end, duration) {
    let startTime = null;
    const hasPlus = element.innerHTML.includes('+');

    // Animation function
    function animation(currentTime) {
        if (!startTime) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);

        // Calculate current count using easeOutQuad easing
        const easeProgress = 1 - (1 - progress) * (1 - progress);
        const currentCount = Math.floor(easeProgress * (end - start) + start);

        // Update the element text
        element.textContent = currentCount + (hasPlus ? '<span>+</span>' : '');

        // Continue animation if not complete
        if (progress < 1) {
            requestAnimationFrame(animation);
        } else {
            // Ensure final value is exactly the target
            element.innerHTML = end + (hasPlus ? '<span>+</span>' : '');
        }
    }

    // Start the animation
    requestAnimationFrame(animation);
}

function setupProjectContainerEffects() {
    const projectContainers = document.querySelectorAll('.project-container');

    projectContainers.forEach(container => {
        // Add parallax effect to project images on mouse move
        container.addEventListener('mousemove', (e) => {
            const containerRect = container.getBoundingClientRect();
            const containerCenterX = containerRect.left + containerRect.width / 2;
            const containerCenterY = containerRect.top + containerRect.height / 2;

            const mouseX = e.clientX - containerCenterX;
            const mouseY = e.clientY - containerCenterY;

            // Calculate rotation based on mouse position
            const rotateX = mouseY * -0.01;
            const rotateY = mouseX * 0.01;

            // Apply subtle 3D rotation
            container.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;

            // Move image slightly for parallax effect
            const image = container.querySelector('.project-image img');
            if (image) {
                image.style.transform = `scale(1.05) translateX(${mouseX * 0.02}px) translateY(${mouseY * 0.02}px)`;
            }

            // Animate team members based on mouse position
            const teamMembers = container.querySelectorAll('.team-member');
            teamMembers.forEach((member, index) => {
                const delay = index * 0.05;
                member.style.transform = `translateX(${mouseX * 0.01}px) translateY(${mouseY * 0.01}px)`;
                member.style.transition = `transform 0.3s ease ${delay}s`;
            });

            // Animate tools based on mouse position
            const toolItems = container.querySelectorAll('.tool-item');
            toolItems.forEach((tool, index) => {
                const delay = index * 0.03;
                tool.style.transform = `translateX(${mouseX * -0.005}px) translateY(${mouseY * -0.005}px)`;
                tool.style.transition = `transform 0.3s ease ${delay}s`;
            });
        });

        // Reset transforms when mouse leaves
        container.addEventListener('mouseleave', () => {
            container.style.transform = '';

            const image = container.querySelector('.project-image img');
            if (image) {
                image.style.transform = '';
            }

            // Reset team members
            const teamMembers = container.querySelectorAll('.team-member');
            teamMembers.forEach(member => {
                member.style.transform = '';
            });

            // Reset tools
            const toolItems = container.querySelectorAll('.tool-item');
            toolItems.forEach(tool => {
                tool.style.transform = '';
            });

            // Add hover animation
            container.style.transition = 'transform 0.5s ease';
            container.style.transform = 'translateY(-10px)';

            // Reset after animation
            setTimeout(() => {
                container.style.transition = 'transform 0.3s ease';
                container.style.transform = '';
            }, 500);
        });
    });
}

function revealProjectsOnScroll() {
    const projectContainers = document.querySelectorAll('.project-container');

    // Only proceed if we have projects and IntersectionObserver is supported
    if (!projectContainers.length || !('IntersectionObserver' in window)) return;

    // Create observer to trigger reveal animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);

                // Animate project components sequentially
                animateProjectComponents(entry.target);
            }
        });
    }, { threshold: 0.2 });

    // Add initial styles and observe each project
    projectContainers.forEach((container, index) => {
        // Set initial state (hidden)
        container.style.opacity = '0';
        container.style.transform = 'translateY(50px)';
        container.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

        // Add delay based on index
        container.style.transitionDelay = `${index * 0.2}s`;

        // Add revealed class handler
        container.addEventListener('transitionend', () => {
            if (container.classList.contains('revealed')) {
                container.style.transitionDelay = '0s';
            }
        });

        // Observe the container
        observer.observe(container);
    });

    // Add CSS for revealed state
    const style = document.createElement('style');
    style.textContent = `
        .project-container.revealed {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

function animateProjectComponents(projectContainer) {
    const gsap = window.gsap;
    if (!gsap) return;

    // Get project components
    const projectTitle = projectContainer.querySelector('.project-title');
    const projectDescription = projectContainer.querySelector('.project-description');
    const teamMembers = projectContainer.querySelectorAll('.team-member');
    const toolItems = projectContainer.querySelectorAll('.tool-item');
    const viewBtn = projectContainer.querySelector('.view-btn');

    // Animate project title
    gsap.fromTo(projectTitle, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", delay: 0.2 });

    // Animate project description
    gsap.fromTo(projectDescription, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", delay: 0.4 });

    // Animate team members
    gsap.fromTo(teamMembers, { x: 20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out", delay: 0.6 });

    // Animate tool items
    gsap.fromTo(toolItems, { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: "power2.out", delay: 0.8 });

    // Animate view button
    if (viewBtn) {
        gsap.fromTo(viewBtn, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: "back.out", delay: 1 });
    }
}

function animateTeamMembers() {
    const teamMembers = document.querySelectorAll('.team-member');

    teamMembers.forEach((member, index) => {
        // Add hover effect
        member.addEventListener('mouseenter', () => {
            const img = member.querySelector('img');
            const info = member.querySelector('.member-info');

            if (img) {
                img.style.transform = 'scale(1.1) rotate(5deg)';
                img.style.boxShadow = '0 0 15px rgba(0, 209, 255, 0.7)';
            }

            if (info) {
                info.style.transform = 'translateX(5px)';
            }
        });

        member.addEventListener('mouseleave', () => {
            const img = member.querySelector('img');
            const info = member.querySelector('.member-info');

            if (img) {
                img.style.transform = '';
                img.style.boxShadow = '';
            }

            if (info) {
                info.style.transform = '';
            }
        });
    });
}

function animateToolsGrid() {
    const toolItems = document.querySelectorAll('.tool-item');

    toolItems.forEach((tool, index) => {
        // Add staggered animation on page load
        tool.style.opacity = '0';
        tool.style.transform = 'translateY(20px)';

        setTimeout(() => {
            tool.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            tool.style.opacity = '1';
            tool.style.transform = 'translateY(0)';
        }, 1000 + (index * 100));

        // Add hover effect
        tool.addEventListener('mouseenter', () => {
            tool.style.transform = 'translateY(-5px) scale(1.05)';
            tool.style.boxShadow = '0 5px 15px rgba(0, 209, 255, 0.3)';

            const icon = tool.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1.2)';
                icon.style.color = '#ffffff';
            }
        });

        tool.addEventListener('mouseleave', () => {
            tool.style.transform = '';
            tool.style.boxShadow = '';

            const icon = tool.querySelector('i');
            if (icon) {
                icon.style.transform = '';
                icon.style.color = '';
            }
        });
    });
}

function animateViewButtons() {
    const viewButtons = document.querySelectorAll('.view-btn');

    viewButtons.forEach(button => {
        // Add floating animation
        button.addEventListener('mouseenter', () => {
            button.style.animation = 'floatAnimation 1s ease infinite';

            const icon = button.querySelector('i');
            if (icon) {
                icon.style.transform = 'translateX(5px)';
            }
        });

        button.addEventListener('mouseleave', () => {
            button.style.animation = '';

            const icon = button.querySelector('i');
            if (icon) {
                icon.style.transform = '';
            }
        });
    });
}