const translations = {
    en: {
        "nav-home": "Home",
        "nav-experience": "Experience",
        "nav-about": "About Me",
        "nav-contact": "Contact Me",
        "language-label": "Language:",
        "lang-en": "English",
        "lang-kh": "Khmer",
        "hero-title": "WEB DESIGN / WEB DEVELOPMENT / VANDA LENG / FRONT_END DEV",
        "hero-subtitle": "Build Your Future Smarter With <span>Our Modern <br> Web Designs By Vanda Leng</span>",
        "hero-description": "Passionate Web Developer Focused on Crafting Beautiful, Functional Websites That Provide Great User Experiences. I Turn Ideas into Interactive Digital Solutions.",
        "btn-download": "Download CV",
        "btn-hire": "Hire Me",
        "skill-html": "HTML",
        "skill-css": "CSS",
        "skill-js": "JavaScript",
        "skill-vscode": "VS Code",
        "skill-bootstrap": "Bootstrap",
        "skill-php": "PHP",
        "skill-database": "Database",
        "skill-nodejs": "Node.js",
        "skill-github": "GitHub",
        "skill-jira": "Jira",
        "skill-oop": "OOP",
        "skill-laravel": "Laravel",
        "skill-vuejs": "Vue.js",
    },
    kh: {
        "nav-home": "ទំព័រដើម",
        "nav-experience": "បទពិសោធន៍",
        "nav-about": "អំពីខ្ញុំ",
        "nav-contact": "ទំនាក់ទំនង",
        "language-label": "ភាសា:",
        "lang-en": "អង់គ្លេស",
        "lang-kh": "ខ្មែរ",
        "hero-title": "ការរចនាវែ��សាយ / ការអភិវឌ្ឍន៍វែបសាយ / វណ្ណដា ឡេង / អ្នកអភិវឌ្ឍន៍ផ្នែកខាងមុខ",
        "hero-subtitle": "សាងសង់អនាគតរបស់អ្នកឱ្យកាន់តែឆ្លាតវៃជាមួយ <span>ការរចនាវែបសាយទំនើបរបស់យើងដោយ វណ្ណដា ឡេង</span>",
        "hero-description": "អ្នកអភិវឌ្ឍន៍វែបសាយដែលមានចំណង់ចំណូលចិត្តផ្តោតលើការបង្កើតវែបសាយដ៏ស្រស់ស្អាត និងមានមុខងារដែលផ្តល់នូវបទពិសោធន៍អ្នកប្រើប្រាស់ដ៏អស្ចារ្យ។ ខ្ញុំប្រែក្លាយគំនិតទៅជាដំណោះស្រាយឌីជីថលអន្តរកម្ម។",
        "btn-download": "ទាញយក CV",
        "btn-hire": "ជួលខ្ញុំ",
        "skill-html": "HTML",
        "skill-css": "CSS",
        "skill-js": "JavaScript",
        "skill-vscode": "VS Code",
        "skill-bootstrap": "Bootstrap",
        "skill-php": "PHP",
        "skill-database": "ទិន្នន័យ",
        "skill-nodejs": "Node.js",
        "skill-github": "GitHub",
        "skill-jira": "Jira",
        "skill-oop": "OOP",
        "skill-laravel": "Laravel",
        "skill-vuejs": "Vue.js",
    },
}

// Function to update all text content based on selected language
function updateLanguage(lang) {
    // Update text content for elements with data-lang attributes
    document.querySelectorAll("[data-lang]").forEach((element) => {
        const key = element.getAttribute("data-lang")
        if (translations[lang] && translations[lang][key]) {
            if (key === "hero-subtitle" || key.includes("skill-")) {
                element.innerHTML = translations[lang][key] // Preserve HTML tags
            } else {
                element.textContent = translations[lang][key] // Plain text
            }
        }
    })

    // Update skill cards
    document.querySelectorAll(".skill-card span").forEach((element) => {
        const skillType = element.parentElement.getAttribute("data-skill")
        const translationKey = `skill-${skillType}`
        if (translations[lang] && translations[lang][translationKey]) {
            element.textContent = translations[lang][translationKey]
        }
    })

    // Update document language
    document.documentElement.lang = lang

    // Update body class for font styling
    document.body.classList.remove("en", "khmer")
    document.body.classList.add(lang === "kh" ? "khmer" : "en")

    // Update select element to reflect current language
    const languageSelect = document.getElementById("language")
    if (languageSelect) {
        languageSelect.value = lang
    }

    // Save language preference
    localStorage.setItem("language", lang)
}

// Load saved language or default to English on page load
document.addEventListener("DOMContentLoaded", () => {
    const savedLang = localStorage.getItem("language") || "en"
    updateLanguage(savedLang)

    // Add event listener for language change
    const languageSelect = document.getElementById("language")
    if (languageSelect) {
        languageSelect.addEventListener("change", (event) => {
            updateLanguage(event.target.value)
        })
    }
})