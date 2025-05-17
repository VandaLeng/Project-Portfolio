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
        "btn-download": "DOWNLOAD CV",
        "btn-hire": "HIRE ME",
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
        "about-title": "About Me",
        "about-experience": "One Year Experienced Programming",
        "about-description": "My name is Vanda Leng, Cambodian. I am a passionate student who study at Passerelles Numeriques Cambodia (PNC). I study only one year in PNC but I have many experiences in Programming such as HTML, CSS, JavaScript, Node.js, Laravel, Vue.js and many more. For my passionate in coding and learning in new technology, I always try my best to learn new things everyday.",
        "about-name-label": "Name:",
        "about-name": "Vanda Leng",
        "about-age-label": "Age:",
        "about-age": "20 Years Old",
        "about-email-label": "Email:",
        "about-address-label": "Address:",
        "about-address": "Phnom Penh, Cambodia",
        "trainer-title": "Trainer",
        "contact-title": "Contact Me",
    },
    kh: {
        "nav-home": "ទំព័រដើម",
        "nav-experience": "បទពិសោធន៍",
        "nav-about": "អំពីខ្ញុំ",
        "nav-contact": "ទំនាក់ទំនង",
        "language-label": "ភាសា:",
        "lang-en": "អង់គ្លេស",
        "lang-kh": "ខ្មែរ",
        "hero-title": "ការរចនាវែបសាយ / ការអភិវឌ្ឍន៍វែបសាយ / វណ្ណដា ឡេង / អ្នកអភិវឌ្ឍន៍ផ្នែកខាងមុខ",
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
        "about-title": "អំពីខ្ញុំ",
        "about-experience": "បទពិសោធន៍សរសេរកម្មវិធីមួយឆ្នាំ",
        "about-description": "ខ្ញុំឈ្មោះ វណ្ណដា ឡេង ជនជាតិខ្មែរ។ ខ្ញុំជានិស្សិតដែលមានចំណង់ចំណូលចិត្ត ដែលកំពុងសិក្សានៅ Passerelles Numeriques Cambodia (PNC)។ ខ្ញុំសិក្សាតែមួយឆ្នាំនៅ PNC ប៉ុន្តែខ្ញុំមានបទពិសោធន៍ច្រើនក្នុងការសរសេរកម្មវិធីដូចជា HTML, CSS, JavaScript, Node.js, Laravel, Vue.js និងច្រើនទៀត។ ដោយសារតែចំណង់ចំណូលចិត្តរបស់ខ្ញុំក្នុងការសរសេរកូដ និងការសិក្សាបច្ចេកវិទ្យាថ្មីៗ ខ្ញុំតែងតែព្យាយាមឱ្យអស់ពីសមត្ថភាពដើម្បីរៀនរបស់ថ្មីជារៀងរាល់ថ្ងៃ។",
        "about-name-label": "ឈ្មោះ:",
        "about-name": "វណ្ណដា ឡេង",
        "about-age-label": "អាយុ:",
        "about-age": "២០ ឆ្នាំ",
        "about-email-label": "អ៊ីមែល:",
        "about-address-label": "អាសយដ្ឋាន:",
        "about-address": "ភ្នំពេញ, កម្ពុជា",
        "trainer-title": "គ្រូបង្វឹក",
        "contact-title": "ទំនាក់ទំនងមកខ្ញុំ",
    },
}

function updateLanguage(lang) {
    document.querySelectorAll("[data-lang]").forEach((element) => {
        const key = element.getAttribute("data-lang")
        if (translations[lang] && translations[lang][key]) {
            if (key === "hero-subtitle" || key.includes("skill-")) {
                element.innerHTML = translations[lang][key]
            } else {
                element.textContent = translations[lang][key]
            }
        }
    })

    document.documentElement.lang = lang
    document.body.classList.remove("en", "khmer")
    document.body.classList.add(lang)

    const languageWrapper = document.querySelector(".language-wrapper")
    if (languageWrapper) {
        languageWrapper.classList.remove("en", "kh")
        languageWrapper.classList.add(lang)
    }

    localStorage.setItem("language", lang)
}

document.addEventListener("DOMContentLoaded", () => {
    const savedLang = localStorage.getItem("language") || "en"
    updateLanguage(savedLang)

    const languageSelect = document.getElementById("language")
    if (languageSelect) {
        languageSelect.addEventListener("change", (event) => {
            updateLanguage(event.target.value)
        })
    }
})