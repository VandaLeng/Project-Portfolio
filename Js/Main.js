document.addEventListener("DOMContentLoaded", () => {
    createAnimatedBackground()
    typewriterAnimation()
    animateProfileImage()
    setupThemeToggle()
    setupMobileMenu()
    setActiveNavLink()
    initializeSkillsCards()
    setupButtonAnimationReplay()
    initializeTrainerCarousel()
    initializeGoogleMap()

    const AOS = window.AOS
    if (typeof AOS !== "undefined" && typeof AOS.init === "function") {
        AOS.init()
    }
})

function createAnimatedBackground() {
    const animatedBg = document.getElementById("animated-bg")
    if (!animatedBg) return

    // Create particles
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement("div")
        particle.className = "bg-particle"

        // Random position
        const posX = Math.random() * window.innerWidth
        const posY = Math.random() * window.innerHeight

        // Random size
        const size = Math.random() * 5 + 2

        // Style the particle
        particle.style.width = `${size}px`
        particle.style.height = `${size}px`
        particle.style.left = `${posX}px`
        particle.style.top = `${posY}px`
        particle.style.background = "rgba(0, 209, 255, 0.5)"
        particle.style.borderRadius = "50%"
        particle.style.position = "absolute"
        particle.style.boxShadow = "0 0 10px rgba(0, 209, 255, 0.8)"

        // Add animation with random duration
        const duration = Math.random() * 20 + 10
        particle.style.animation = `floatParticle ${duration}s infinite linear`

        // Add to background
        animatedBg.appendChild(particle)
    }

    // Add CSS animation
    const style = document.createElement("style")
    style.textContent = `
    @keyframes floatParticle {
      0% {
        transform: translate(0, 0);
      }
      25% {
        transform: translate(100px, 50px);
      }
      50% {
        transform: translate(50px, 100px);
      }
      75% {
        transform: translate(-50px, 50px);
      }
      100% {
        transform: translate(0, 0);
      }
    }
  `
    document.head.appendChild(style)
}

function typewriterAnimation() {
    const heroTitle = document.querySelector(".hero-content h1")
    if (!heroTitle) return

    const originalText = heroTitle.textContent
    heroTitle.textContent = ""
    heroTitle.style.minHeight = "3.5rem"

    let charIndex = 0
    let isDeleting = false
    let currentText = ""
    let typingSpeed = 100

    function type() {
        const sections = originalText.split(" / ")
        const currentSection = Math.floor(charIndex / 15) % sections.length

        if (!isDeleting) {
            currentText = sections[currentSection].substring(0, currentText.length + 1)
            typingSpeed = 100

            if (currentText === sections[currentSection]) {
                typingSpeed = 1000
                isDeleting = true
            }
        } else {
            currentText = sections[currentSection].substring(0, currentText.length - 1)
            typingSpeed = 50

            if (currentText === "") {
                isDeleting = false
                charIndex += 15
            }
        }

        heroTitle.textContent = currentText
        heroTitle.classList.add("typing")

        setTimeout(type, typingSpeed)
    }

    setTimeout(type, 1000)
}

function animateProfileImage() {
    const gsap = window.gsap
    if (typeof gsap !== "undefined") {
        const profileImages = document.querySelectorAll(".hero-image img, .about-image img")
        profileImages.forEach((profileImage) => {
            if (!profileImage) return

            gsap.fromTo(
                profileImage, { y: -20, opacity: 0, scale: 0.9 }, { y: 0, opacity: 1, scale: 1, duration: 2, ease: "power2.out", delay: 0.5 },
            )

            gsap.to(profileImage, {
                y: 10,
                yoyo: true,
                repeat: -1,
                duration: 6,
                ease: "sine.inOut",
            })

            gsap.to(profileImage, {
                rotation: 3,
                yoyo: true,
                repeat: -1,
                duration: 8,
                ease: "sine.inOut",
                delay: 1,
            })
        })
    }
}

function setupThemeToggle() {
    const themeToggle = document.querySelector("#theme-toggle")
    if (!themeToggle) return

    const savedTheme = localStorage.getItem("theme")
    if (savedTheme === "light") {
        document.body.classList.add("light-theme")
        themeToggle.checked = true
        applyLightTheme()
    } else {
        document.body.classList.remove("light-theme")
        themeToggle.checked = false
        applyDarkTheme()
    }

    themeToggle.addEventListener("change", () => {
        if (themeToggle.checked) {
            document.body.classList.add("light-theme")
            applyLightTheme()
            localStorage.setItem("theme", "light")

            // Animate theme change
            animateThemeChange(true)
        } else {
            document.body.classList.remove("light-theme")
            applyDarkTheme()
            localStorage.setItem("theme", "dark")

            // Animate theme change
            animateThemeChange(false)
        }
    })
}

function animateThemeChange(isLight) {
    const gsap = window.gsap
    if (typeof gsap !== "undefined") {
        // Create a flash effect
        const flash = document.createElement("div")
        flash.style.position = "fixed"
        flash.style.top = "0"
        flash.style.left = "0"
        flash.style.width = "100%"
        flash.style.height = "100%"
        flash.style.backgroundColor = isLight ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.3)"
        flash.style.zIndex = "9999"
        flash.style.pointerEvents = "none"
        document.body.appendChild(flash)

        gsap.to(flash, {
            opacity: 0,
            duration: 0.8,
            onComplete: () => {
                document.body.removeChild(flash)
            },
        })

        // Animate elements
        gsap.fromTo(".logo", { scale: 0.8, opacity: 0.5 }, { scale: 1, opacity: 1, duration: 0.5, ease: "back.out" })

        gsap.fromTo(".nav-links li a", { y: -10, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.1, duration: 0.5 })

        gsap.fromTo(
            ".hero-content h1, .hero-content h2, .hero-content p", { opacity: 0.5 }, { opacity: 1, stagger: 0.2, duration: 0.8 },
        )
    }
}

function applyLightTheme() {
    document.body.style.backgroundColor = "#ffffff"
    document.querySelectorAll(".skill-card").forEach((card) => {
        card.style.color = "#1a1a1a"
    })
    document.querySelectorAll(".skill-card span").forEach((span) => {
        span.style.color = "#1a1a1a"
    })
}

function applyDarkTheme() {
    document.body.style.backgroundColor = "#1a1a1a"
    document.querySelectorAll(".skill-card").forEach((card) => {
        card.style.color = "#ffffff"
    })
    document.querySelectorAll(".skill-card span").forEach((span) => {
        span.style.color = "#ffffff"
    })
}

function setupMobileMenu() {
    const menuToggle = document.querySelector("#menu-toggle")
    if (!menuToggle) return

    const menuOpenIcon = document.querySelector(".menu-open-icon")
    const menuCloseIcon = document.querySelector(".menu-close-icon")

    menuToggle.addEventListener("click", () => {
        document.body.classList.toggle("show-mobile-menu")

        if (document.body.classList.contains("show-mobile-menu")) {
            menuOpenIcon.style.display = "none"
            menuCloseIcon.style.display = "block"

            const gsap = window.gsap
            if (typeof gsap !== "undefined") {
                gsap.fromTo(".nav-menu", { x: -300, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, ease: "power2.out" })
                gsap.fromTo(
                    ".language-toggle", { x: -300, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, ease: "power2.out", delay: 0.1 },
                )
                gsap.fromTo(
                    ".nav-links li", { x: -20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.3, stagger: 0.1, delay: 0.2 },
                )
            }
        } else {
            menuOpenIcon.style.display = "block"
            menuCloseIcon.style.display = "none"

            const gsap = window.gsap
            if (typeof gsap !== "undefined") {
                gsap.to(".nav-menu", { x: -300, opacity: 0, duration: 0.3, ease: "power2.in" })
                gsap.to(".language-toggle", { x: -300, opacity: 0, duration: 0.3, ease: "power2.in" })
            }
        }
    })

    document.querySelectorAll(".nav-links a").forEach((link) => {
        link.addEventListener("click", () => {
            if (window.innerWidth <= 768) {
                document.body.classList.remove("show-mobile-menu")
                menuOpenIcon.style.display = "block"
                menuCloseIcon.style.display = "none"

                const gsap = window.gsap
                if (typeof gsap !== "undefined") {
                    gsap.to(".nav-menu", { x: -300, opacity: 0, duration: 0.3 })
                    gsap.to(".language-toggle", { x: -300, opacity: 0, duration: 0.3 })
                }
            }
        })
    })
}

function setActiveNavLink() {
    const currentPage = window.location.pathname
    const navLinks = document.querySelectorAll(".nav-links a")

    navLinks.forEach((link) => {
        link.classList.remove("active")

        const linkPath = link.getAttribute("href")
        const linkPathname = linkPath.split("/").pop()

        if (currentPage.includes(linkPathname)) {
            link.classList.add("active")
        }

        if (linkPathname === "index.html" && (currentPage === "/" || currentPage.endsWith("/index.html"))) {
            link.classList.add("active")
        }
    })
}

function initializeSkillsCards() {
    const skillsSection = document.querySelector(".skills-section")
    if (!skillsSection) return

    const originalCards = document.querySelectorAll(".skill-card")
    const skillsContainer = document.createElement("div")
    skillsContainer.className = "skills-container"

    originalCards.forEach((card, index) => {
        card.setAttribute("data-aos", "fade-up")
        card.setAttribute("data-aos-delay", (index * 100).toString())
        card.setAttribute("data-aos-duration", "800")
        skillsContainer.appendChild(card)
    })

    originalCards.forEach((card, index) => {
        const clone = card.cloneNode(true)
        clone.setAttribute("data-aos", "fade-up")
        clone.setAttribute("data-aos-delay", (index * 100).toString())
        clone.setAttribute("data-aos-duration", "800")
        skillsContainer.appendChild(clone)
    })

    skillsSection.innerHTML = ""
    skillsSection.appendChild(skillsContainer)

    const gsap = window.gsap
    document.querySelectorAll(".skill-card").forEach((card) => {
        card.addEventListener("mouseenter", () => {
            const siblings = Array.from(card.parentNode.children).filter((sibling) => sibling !== card)
            siblings.forEach((sibling) => {
                const rect1 = card.getBoundingClientRect()
                const rect2 = sibling.getBoundingClientRect()
                const dx = rect1.left + rect1.width / 2 - (rect2.left + rect2.width / 2)
                const dy = rect1.top + rect1.height / 2 - (rect2.top + rect2.height / 2)
                const distance = Math.sqrt(dx * dx + dy * dy)

                if (distance < 200) {
                    const pushFactor = ((200 - distance) / 200) * 10
                    if (typeof gsap !== "undefined") {
                        gsap.to(sibling, {
                            x: (-dx / Math.abs(dx || 1)) * pushFactor,
                            y: (-dy / Math.abs(dy || 1)) * pushFactor,
                            duration: 0.3,
                            ease: "power2.out",
                        })
                    }
                }
            })
        })

        card.addEventListener("mouseleave", () => {
            const siblings = Array.from(card.parentNode.children)
            siblings.forEach((sibling) => {
                if (typeof gsap !== "undefined") {
                    gsap.to(sibling, {
                        x: 0,
                        y: 0,
                        duration: 0.5,
                        ease: "elastic.out(1, 0.5)",
                    })
                }
            })
        })
    })
}

function setupButtonAnimationReplay() {
    const buttons = document.querySelectorAll(".btn, .btn1")
    buttons.forEach((button) => {
        button.addEventListener("mouseenter", () => {
            button.style.animation = "none"
            setTimeout(() => {
                button.style.animation = "pulseButton 2s infinite"
            }, 10)
        })

        button.addEventListener("click", () => {
            button.style.animation = "none"
            setTimeout(() => {
                button.style.animation = "pulseButton 2s infinite"
            }, 10)
        })
    })
}

function initializeTrainerCarousel() {
    const trainerProfiles = document.querySelector(".trainer-profiles")
    const trainerCards = document.querySelectorAll(".trainer-profile")
    const prevBtn = document.querySelector(".trainer-prev")
    const nextBtn = document.querySelector(".trainer-next")
    const dots = document.querySelectorAll(".trainer-dot")

    if (!trainerProfiles || !trainerCards.length || !prevBtn || !nextBtn) return

    const visibleCards = window.innerWidth > 768 ? 3 : window.innerWidth > 480 ? 2 : 1
    const cardWidth = trainerCards[0].offsetWidth + 20
    let currentIndex = 0

    // Update slider position
    function updateSlider() {
        trainerProfiles.style.transform = `translateX(-${currentIndex * cardWidth}px)`
        updateDots()
    }

    // Update active dot
    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle("active", index === currentIndex)
        })
    }

    // Next button click
    nextBtn.addEventListener("click", () => {
        currentIndex++
        if (currentIndex > trainerCards.length - visibleCards) {
            currentIndex = 0
        }
        updateSlider()
    })

    // Previous button click
    prevBtn.addEventListener("click", () => {
        currentIndex--
        if (currentIndex < 0) {
            currentIndex = trainerCards.length - visibleCards
        }
        updateSlider()
    })

    // Dot click
    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            currentIndex = index
            updateSlider()
        })
    })

    // Auto slide
    let autoSlideInterval = setInterval(() => {
        currentIndex++
        if (currentIndex > trainerCards.length - visibleCards) {
            currentIndex = 0
        }
        updateSlider()
    }, 5000)

    // Pause auto slide on hover
    trainerProfiles.addEventListener("mouseenter", () => {
        clearInterval(autoSlideInterval)
    })

    // Resume auto slide on mouse leave
    trainerProfiles.addEventListener("mouseleave", () => {
        autoSlideInterval = setInterval(() => {
            currentIndex++
            if (currentIndex > trainerCards.length - visibleCards) {
                currentIndex = 0
            }
            updateSlider()
        }, 5000)
    })

    // Handle window resize
    window.addEventListener("resize", () => {
        const newVisibleCards = window.innerWidth > 768 ? 3 : window.innerWidth > 480 ? 2 : 1
        if (currentIndex > trainerCards.length - newVisibleCards) {
            currentIndex = 0
        }
        updateSlider()
    })

    // Initial setup
    updateSlider()
}

function initializeGoogleMap() {
    // This function will be called by the Google Maps API callback
    window.initMap = () => {
        // Coordinates for Phnom Penh, Cambodia
        const phnomPenh = { lat: 11.5564, lng: 104.9282 }

        // Create the map
        const google = window.google
        if (!google) return

        const mapElement = document.getElementById("google-map")
        if (!mapElement) return

        const map = new google.maps.Map(mapElement, {
            center: phnomPenh,
            zoom: 14,
            styles: [{
                    elementType: "geometry",
                    stylers: [{ color: "#212121" }],
                },
                {
                    elementType: "labels.icon",
                    stylers: [{ visibility: "off" }],
                },
                {
                    elementType: "labels.text.fill",
                    stylers: [{ color: "#757575" }],
                },
                {
                    elementType: "labels.text.stroke",
                    stylers: [{ color: "#212121" }],
                },
                {
                    featureType: "administrative",
                    elementType: "geometry",
                    stylers: [{ color: "#757575" }],
                },
                {
                    featureType: "administrative.country",
                    elementType: "labels.text.fill",
                    stylers: [{ color: "#9e9e9e" }],
                },
                {
                    featureType: "administrative.locality",
                    elementType: "labels.text.fill",
                    stylers: [{ color: "#bdbdbd" }],
                },
                {
                    featureType: "poi",
                    elementType: "labels.text.fill",
                    stylers: [{ color: "#757575" }],
                },
                {
                    featureType: "poi.park",
                    elementType: "geometry",
                    stylers: [{ color: "#181818" }],
                },
                {
                    featureType: "poi.park",
                    elementType: "labels.text.fill",
                    stylers: [{ color: "#616161" }],
                },
                {
                    featureType: "poi.park",
                    elementType: "labels.text.stroke",
                    stylers: [{ color: "#1b1b1b" }],
                },
                {
                    featureType: "road",
                    elementType: "geometry.fill",
                    stylers: [{ color: "#2c2c2c" }],
                },
                {
                    featureType: "road",
                    elementType: "labels.text.fill",
                    stylers: [{ color: "#8a8a8a" }],
                },
                {
                    featureType: "road.arterial",
                    elementType: "geometry",
                    stylers: [{ color: "#373737" }],
                },
                {
                    featureType: "road.highway",
                    elementType: "geometry",
                    stylers: [{ color: "#3c3c3c" }],
                },
                {
                    featureType: "road.highway.controlled_access",
                    elementType: "geometry",
                    stylers: [{ color: "#4e4e4e" }],
                },
                {
                    featureType: "road.local",
                    elementType: "labels.text.fill",
                    stylers: [{ color: "#616161" }],
                },
                {
                    featureType: "transit",
                    elementType: "labels.text.fill",
                    stylers: [{ color: "#757575" }],
                },
                {
                    featureType: "water",
                    elementType: "geometry",
                    stylers: [{ color: "#000000" }],
                },
                {
                    featureType: "water",
                    elementType: "labels.text.fill",
                    stylers: [{ color: "#3d3d3d" }],
                },
            ],
        })

        // Add a marker
        const marker = new google.maps.Marker({
            position: phnomPenh,
            map: map,
            title: "Vanda Leng",
            animation: google.maps.Animation.DROP,
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 10,
                fillColor: "#00d1ff",
                fillOpacity: 1,
                strokeColor: "#ffffff",
                strokeWeight: 2,
            },
        })

        // Add info window
        const infoWindow = new google.maps.InfoWindow({
            content: `
        <div style="padding: 10px; text-align: center;">
          <h3 style="margin: 0 0 5px; color: #00d1ff;">Vanda Leng</h3>
          <p style="margin: 0;">Web Developer</p>
          <p style="margin: 5px 0 0; font-size: 12px;">Phnom Penh, Cambodia</p>
        </div>
      `,
        })

        marker.addListener("click", () => {
            infoWindow.open(map, marker)
        })

        // Open info window by default
        infoWindow.open(map, marker)
    }
}