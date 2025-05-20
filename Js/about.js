// Skills data with logo URLs

const skills = [{
    id: "HTML",
    name: "HTML",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
    color: "#E44D26",
    category: "frontend",
    level: 85
}, {
    id: "CSS",
    name: "CSS",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
    color: "#264DE4",
    category: "frontend",
    level: 80
}, {
    id: "JS",
    name: "JavaScript",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    color: "#F7DF1E",
    category: "frontend",
    level: 75
}, {
    id: "PHP",
    name: "PHP",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
    color: "#777BB4",
    category: "backend",
    level: 67
}, {
    id: "MySQL",
    name: "MySQL",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    color: "#00758F",
    category: "database",
    level: 70
}, {
    id: "Node",
    name: "Node.js",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    color: "#68A063",
    category: "backend",
    level: 65
}, {
    id: "Vue",
    name: "Vue.js",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg",
    color: "#4FC08D",
    category: "frontend",
    level: 60
}, {
    id: "Laravel",
    name: "Laravel",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-plain.svg",
    color: "#FF2D20",
    category: "backend",
    level: 55
}, {
    id: "Bootstrap",
    name: "Bootstrap",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg",
    color: "#563D7C",
    category: "frontend",
    level: 78
}, {
    id: "VSCode",
    name: "VS Code",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
    color: "#007ACC",
    category: "frontend",
    level: 85
}, {
    id: "GitHub",
    name: "GitHub",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    color: "#181717",
    category: "frontend",
    level: 75
}];

// Skill info data
const skillInfo = {
    HTML: {
        description: "HTML is the standard markup language for creating web pages and web applications.",
        level: 85
    },
    CSS: {
        description: "CSS is a style sheet language used for describing the presentation of a document written in HTML.",
        level: 80
    },
    JS: {
        description: "JavaScript is a versatile programming language used to create interactive effects within web browsers.",
        level: 75
    },
    PHP: {
        description: "PHP is a server-side language used to create dynamic websites and connect to databases.",
        level: 67,
        subtitle: "MVC Structure"
    },
    MySQL: {
        description: "MySQL is an open-source relational database management system.",
        level: 70
    },
    Node: {
        description: "Node.js is a runtime environment that allows you to run JavaScript on the server side.",
        level: 65
    },
    Vue: {
        description: "Vue.js is a progressive JavaScript framework for building user interfaces.",
        level: 60
    },
    Laravel: {
        description: "Laravel is a PHP web application framework with expressive, elegant syntax.",
        level: 55
    },
    Bootstrap: {
        description: "Bootstrap is a popular CSS framework for building responsive and mobile-first websites.",
        level: 78
    },
    VSCode: {
        description: "Visual Studio Code is a lightweight but powerful source code editor with support for many programming languages.",
        level: 85
    },
    GitHub: {
        description: "GitHub is a platform and cloud-based service for software development and version control using Git.",
        level: 75
    }
};

// DOM elements
const skillsCircleContainer = document.querySelector('.skills-circle-container');
const skillsCircle = document.querySelector('.skills-circle');
const skillInfoElement = document.getElementById('skillInfo');
const frontendSkillsList = document.getElementById('frontendSkills');
const backendSkillsList = document.getElementById('backendSkills');
const databaseSkillsList = document.getElementById('databaseSkills');

// Function to create language logos around the circle
function createLanguageLogos() {
    if (!skillsCircleContainer) return;

    const radius = skillsCircleContainer.offsetWidth / 2 + 70; // Position OUTSIDE the circle with more space
    const centerX = skillsCircleContainer.offsetWidth / 2;
    const centerY = skillsCircleContainer.offsetHeight / 2;

    skills.forEach((skill, index) => {
        // Calculate position in circle
        const angle = (index / skills.length) * 2 * Math.PI;
        const x = centerX + radius * Math.cos(angle) - 30; // 30 is half the logo size
        const y = centerY + radius * Math.sin(angle) - 30;

        // Create language logo
        const langLogo = document.createElement('div');
        langLogo.className = 'lang-logo';
        langLogo.style.backgroundColor = skill.color;
        langLogo.style.left = `${x}px`;
        langLogo.style.top = `${y}px`;
        langLogo.dataset.id = skill.id;

        // Create logo image
        const logoImg = document.createElement('img');
        logoImg.src = skill.logo;
        logoImg.alt = skill.name;
        langLogo.appendChild(logoImg);

        // Create glow effect
        const glow = document.createElement('div');
        glow.className = 'glow';
        glow.style.width = '80px';
        glow.style.height = '80px';
        glow.style.backgroundColor = skill.color;
        glow.style.left = `${x - 10}px`;
        glow.style.top = `${y - 10}px`;

        // Add click event
        langLogo.addEventListener('click', () => showSkillInfo(skill.id));

        // Append to container
        skillsCircleContainer.appendChild(glow);
        skillsCircleContainer.appendChild(langLogo);

        // Animate glow
        gsap.to(glow, {
            opacity: 0.2,
            duration: 1.5 + Math.random(),
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

        // Animate language logo with floating effect
        gsap.to(langLogo, {
            y: `+=${5 + Math.random() * 10}`,
            duration: 2 + Math.random(),
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });
    });
}

// Function to show skill info
function showSkillInfo(skillId) {
    if (!skillInfoElement) return;

    const skill = skillInfo[skillId];

    // Update skill info content
    skillInfoElement.innerHTML = `
        <h3>${skillId}</h3>
        <p>${skill.description}</p>
        <div class="progress-bar">
            <div class="progress" style="width: 0%"></div>
        </div>
        <p class="progress-text">${skill.subtitle ? skill.subtitle + ': ' : ''}${skill.level}%</p>
    `;

    // Animate progress bar
    gsap.to(skillInfoElement.querySelector('.progress'), {
        width: `${skill.level}%`,
        duration: 0.8,
        ease: "power2.out"
    });
}

// Function to populate skill categories
function populateSkillCategories() {
    if (!frontendSkillsList || !backendSkillsList || !databaseSkillsList) return;

    // Filter skills by category
    const frontendSkills = skills.filter(skill => skill.category === 'frontend');
    const backendSkills = skills.filter(skill => skill.category === 'backend');
    const databaseSkills = skills.filter(skill => skill.category === 'database');

    // Create HTML for each category
    frontendSkillsList.innerHTML = createSkillListHTML(frontendSkills);
    backendSkillsList.innerHTML = createSkillListHTML(backendSkills);
    databaseSkillsList.innerHTML = createSkillListHTML(databaseSkills);
}

// Helper function to create skill list HTML
function createSkillListHTML(skills) {
    return skills.map(skill => `
        <li>
            <span>${skill.name}</span>
            <div class="mini-bar">
                <div class="mini-progress" style="width: 0%"></div>
            </div>
        </li>
    `).join('');
}

// Function to animate skill progress bars
function animateSkillBars() {
    // Animate mini progress bars
    const miniProgressBars = document.querySelectorAll('.mini-progress');
    miniProgressBars.forEach((bar, index) => {
        const skill = skills[index % skills.length]; // In case there are more bars than skills
        gsap.to(bar, {
            width: `${skill.level}%`,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: bar,
                start: "top 90%"
            }
        });
    });
}

// Function to handle responsive adjustments for the skills circle
function handleResponsiveCircle() {
    if (!skillsCircleContainer) return;

    const container = skillsCircleContainer;
    const containerWidth = container.offsetWidth;
    const langLogos = document.querySelectorAll('.lang-logo');
    const glows = document.querySelectorAll('.glow');

    // Recalculate positions based on current container size
    const radius = containerWidth / 2 + 70; // Position OUTSIDE the circle with more space
    const centerX = containerWidth / 2;
    const centerY = containerWidth / 2;

    langLogos.forEach((logo, index) => {
        const angle = (index / langLogos.length) * 2 * Math.PI;
        const x = centerX + radius * Math.cos(angle) - logo.offsetWidth / 2;
        const y = centerY + radius * Math.sin(angle) - logo.offsetHeight / 2;

        // Update logo position
        logo.style.left = `${x}px`;
        logo.style.top = `${y}px`;

        // Update glow position if it exists
        if (glows[index]) {
            glows[index].style.left = `${x - 10}px`;
            glows[index].style.top = `${y - 10}px`;
        }
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    createLanguageLogos();
    populateSkillCategories();

    // Set initial skill info
    if (skillInfoElement && skills.length > 0) {
        showSkillInfo(skills[3].id); // Show PHP by default (index 3)
    }

    // Animate the skills circle
    if (skillsCircle) {
        gsap.from('.skills-circle', {
            opacity: 0,
            scale: 0.5,
            duration: 1.5,
            ease: "back.out(1.7)",
            scrollTrigger: {
                trigger: '.skills-circle',
                start: "top 80%"
            }
        });
    }

    // Animate the language logos
    gsap.from('.lang-logo', {
        opacity: 0,
        scale: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.7)",
        delay: 0.5
    });

    // Animate skill bars
    animateSkillBars();

    // Handle window resize for responsive adjustments
    window.addEventListener('resize', handleResponsiveCircle);

    // Initial call to position elements correctly
    handleResponsiveCircle();

    // Add hover effects to education cards
    const educationCards = document.querySelectorAll('.education-card');
    educationCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -10,
                boxShadow: '0 15px 30px rgba(0, 255, 255, 0.3)',
                duration: 0.3
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
                duration: 0.3
            });
        });
    });

    // Add hover effects to soft skill cards
    const softSkillCards = document.querySelectorAll('.soft-skill-card');
    softSkillCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card.querySelector('.soft-skill-icon'), {
                scale: 1.2,
                duration: 0.3
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card.querySelector('.soft-skill-icon'), {
                scale: 1,
                duration: 0.3
            });
        });
    });
});