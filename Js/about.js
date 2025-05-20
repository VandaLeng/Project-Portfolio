 // Register GSAP plugins
 gsap.registerPlugin(ScrollTrigger);

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
     id: "React",
     name: "React",
     logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
     color: "#61DAFB",
     category: "frontend",
     level: 72
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
     React: {
         description: "React is a JavaScript library for building user interfaces, particularly single-page applications.",
         level: 72
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
     }
 };

 // DOM elements
 const skillsCircleContainer = document.querySelector('.skills-circle-container');
 const skillsCircle = document.querySelector('.skills-circle');
 const skillInfoElement = document.getElementById('skillInfo');
 const frontendSkillsList = document.getElementById('frontendSkills');
 const backendSkillsList = document.getElementById('backendSkills');
 const databaseSkillsList = document.getElementById('databaseSkills');

 // Function to create language logos outside the circle
 function createLanguageLogos() {
     const radius = skillsCircleContainer.offsetWidth / 2 + 50; // Position OUTSIDE the circle
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