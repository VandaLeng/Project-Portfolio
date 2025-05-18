document.addEventListener("DOMContentLoaded", () => {
    // Initialize experience page
    initExperiencePage()
})

function initExperiencePage() {
    // Setup team members carousel with navigation
    setupTeamMembersCarousel()

    // Add hover effects to project cards
    setupProjectCardEffects()

    // Add hover effects to technology icons
    setupTechIconEffects()

    // Animate stats on scroll with plus icon
    animateStatsOnScroll()

    // Add parallax effect to background particles
    setupParallaxEffect()
}

function setupTeamMembersCarousel() {
    const carousels = document.querySelectorAll(".team-members-carousel")

    carousels.forEach((carousel) => {
        const slider = carousel.querySelector(".team-members-slider")
        const members = slider.querySelectorAll(".team-member")

        // Only proceed if we have members
        if (!members.length) return

        // Create navigation buttons
        const navDiv = document.createElement("div")
        navDiv.className = "carousel-nav"

        const prevBtn = document.createElement("button")
        prevBtn.className = "carousel-btn prev-btn"
        prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>'

        const nextBtn = document.createElement("button")
        nextBtn.className = "carousel-btn next-btn"
        nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>'

        navDiv.appendChild(prevBtn)
        navDiv.appendChild(nextBtn)
        carousel.appendChild(navDiv)

        // Set initial state - show only 3 members
        let currentIndex = 0
        const visibleCount = 3

        // Calculate how many slides we can have
        const maxIndex = Math.max(0, members.length - visibleCount)

        // Initial positioning
        updateCarouselPosition()

        // Add event listeners for navigation
        prevBtn.addEventListener("click", () => {
            currentIndex = Math.max(0, currentIndex - 1)
            updateCarouselPosition()
        })

        nextBtn.addEventListener("click", () => {
            currentIndex = Math.min(maxIndex, currentIndex + 1)
            updateCarouselPosition()
        })

        // Function to update carousel position
        function updateCarouselPosition() {
            // Calculate the percentage to translate
            const translateX = -(currentIndex * (100 / visibleCount))
            slider.style.transform = `translateX(${translateX}%)`

            // Update button states
            prevBtn.disabled = currentIndex === 0
            prevBtn.style.opacity = currentIndex === 0 ? "0.5" : "1"

            nextBtn.disabled = currentIndex === maxIndex
            nextBtn.style.opacity = currentIndex === maxIndex ? "0.5" : "1"
        }

        // Add hover effects to team members
        members.forEach((member) => {
            member.addEventListener("mouseenter", () => {
                const img = member.querySelector("img")
                if (img) {
                    img.style.transform = "scale(1.1)"
                    img.style.boxShadow = "0 0 20px rgba(0, 153, 255, 0.8)"
                }
            })

            member.addEventListener("mouseleave", () => {
                const img = member.querySelector("img")
                if (img) {
                    img.style.transform = ""
                    img.style.boxShadow = ""
                }
            })
        })
    })
}

function setupProjectCardEffects() {
    const projectContainers = document.querySelectorAll(".project-container")

    projectContainers.forEach((container) => {
        // Add hover effect
        container.addEventListener("mouseenter", () => {
            container.style.transform = "translateY(-10px)"
            container.style.boxShadow = "0 10px 30px rgba(0, 153, 255, 0.3)"

            // Animate title
            const title = container.querySelector(".project-title")
            if (title) {
                title.style.color = "#00ffcc"
            }

            // Animate view button
            const viewBtn = container.querySelector(".view-btn")
            if (viewBtn) {
                viewBtn.style.animation = "pulseButton 2s infinite"
            }
        })

        container.addEventListener("mouseleave", () => {
            container.style.transform = ""
            container.style.boxShadow = ""

            // Reset title
            const title = container.querySelector(".project-title")
            if (title) {
                title.style.color = ""
            }

            // Reset view button
            const viewBtn = container.querySelector(".view-btn")
            if (viewBtn) {
                viewBtn.style.animation = ""
            }
        })
    })
}

function setupTechIconEffects() {
    // Tech icons
    const techIcons = document.querySelectorAll(".tech-icon")

    techIcons.forEach((icon) => {
        icon.addEventListener("mouseenter", () => {
            icon.style.transform = "translateY(-5px)"

            const iconElement = icon.querySelector("i")
            if (iconElement) {
                iconElement.style.transform = "scale(1.2)"
                iconElement.style.textShadow = "0 0 15px rgba(255, 255, 255, 0.8)"
            }
        })

        icon.addEventListener("mouseleave", () => {
            icon.style.transform = ""

            const iconElement = icon.querySelector("i")
            if (iconElement) {
                iconElement.style.transform = ""
                iconElement.style.textShadow = ""
            }
        })
    })

    // Tool items - language icons
    const toolItems = document.querySelectorAll(".tool-item")

    toolItems.forEach((item) => {
        item.addEventListener("mouseenter", () => {
            item.style.transform = "translateY(-5px) scale(1.05)"

            const icon = item.querySelector("i")
            if (icon) {
                icon.style.transform = "scale(1.2)"
                icon.style.textShadow = "0 0 15px rgba(0, 209, 255, 0.8)"
            }
        })

        item.addEventListener("mouseleave", () => {
            item.style.transform = ""

            const icon = item.querySelector("i")
            if (icon) {
                icon.style.transform = ""
                icon.style.textShadow = ""
            }
        })
    })
}

function animateStatsOnScroll() {
    const stats = document.querySelectorAll(".stat-number")

    // Only proceed if we have stats and IntersectionObserver is supported
    if (!stats.length || !("IntersectionObserver" in window)) return

    // Store the original numbers to animate to
    stats.forEach((stat) => {
        // Extract the number without the + sign
        const text = stat.textContent.trim()
        const targetNumber = Number.parseInt(text)

        // Store the target number as a data attribute
        stat.setAttribute("data-target", targetNumber)

        // Reset the content to 0, but keep the + span if it exists
        const hasPlus = text.includes("+")
        if (hasPlus) {
            stat.innerHTML = "0<span></span>"
        } else {
            stat.textContent = "0"
        }
    })

    // Create observer to trigger counting animation when stats are visible
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const stat = entry.target
                    const target = Number.parseInt(stat.getAttribute("data-target"))

                    // Animate the number counting up
                    animateCounter(stat, 0, target, 2000) // 2 seconds duration

                    // Unobserve after animation starts
                    observer.unobserve(stat)
                }
            })
        }, { threshold: 0.5 },
    )

    // Observe each stat element
    stats.forEach((stat) => observer.observe(stat))
}

function animateCounter(element, start, end, duration) {
    let startTime = null
    const hasPlus = element.innerHTML.includes("<span>")

    // Animation function
    function animation(currentTime) {
        if (!startTime) startTime = currentTime
        const timeElapsed = currentTime - startTime
        const progress = Math.min(timeElapsed / duration, 1)

        // Calculate current count using easeOutQuad easing
        const easeProgress = 1 - (1 - progress) * (1 - progress)
        const currentCount = Math.floor(easeProgress * (end - start) + start)

        // Update the element text
        if (hasPlus) {
            element.innerHTML = currentCount + "<span></span>"
        } else {
            element.textContent = currentCount
        }

        // Continue animation if not complete
        if (progress < 1) {
            requestAnimationFrame(animation)
        } else {
            // Ensure final value is exactly the target
            if (hasPlus) {
                element.innerHTML = end + "<span></span>"
            } else {
                element.textContent = end
            }
        }
    }

    // Start the animation
    requestAnimationFrame(animation)
}

function setupParallaxEffect() {
    const animatedBg = document.getElementById("animated-bg")
    if (!animatedBg) return

    // Create particles
    for (let i = 0; i < 30; i++) {
        createParticle(animatedBg)
    }

    // Add parallax effect on mouse move
    document.addEventListener("mousemove", (e) => {
        const particles = document.querySelectorAll(".particle")
        const mouseX = e.clientX / window.innerWidth
        const mouseY = e.clientY / window.innerHeight

        particles.forEach((particle, index) => {
            const depth = 0.05 + (index % 5) * 0.01
            const moveX = mouseX * depth * 100
            const moveY = mouseY * depth * 100

            particle.style.transform = `translate(${moveX}px, ${moveY}px)`
        })
    })
}

function createParticle(container) {
    const particle = document.createElement("div")
    particle.classList.add("particle")

    // Random position
    const posX = Math.random() * 100
    const posY = Math.random() * 100

    // Random size
    const size = Math.random() * 3 + 1

    // Random opacity
    const opacity = Math.random() * 0.3 + 0.1

    // Set styles
    particle.style.left = `${posX}%`
    particle.style.top = `${posY}%`
    particle.style.width = `${size}px`
    particle.style.height = `${size}px`
    particle.style.opacity = opacity

    // Add to container
    container.appendChild(particle)
}