const translations = {
    en: {
        'nav-home': 'Home',
        'nav-experience': 'Experience',
        'nav-about': 'About Me',
        'nav-contact': 'Contact Me',
        'language-label': 'Language:',
        'lang-en': 'English',
        'lang-kh': 'Khmer',
        'hero-title': 'WEB DESIGN / WEB DEVELOPMENT / VANDA LENG / FRONT_END DEV',
        'hero-subtitle': 'Build Your Future Smarter With <span>Our Modern <br> Web Designs By Vanda Leng</span>',
        'hero-description': 'Passionate Web Developer Focused on Crafting Beautiful, Functional Websites That Provide Great User Experiences. I Turn Ideas into Interactive Digital Solutions.',
        'btn-download': 'Download CV',
        'btn-hire': 'Hire Me',
    },
    kh: {
        'nav-home': 'ទំព័រដើម',
        'nav-experience': 'បទពិសោធន៍',
        'nav-about': 'អំពីខ្ញុំ',
        'nav-contact': 'ទំនាក់ទំនង',
        'language-label': 'ភាសា:',
        'lang-en': 'អង់គ្លេស',
        'lang-kh': 'ខ្មែរ',
        'hero-title': 'ការរចនាវែបសាយ / ការអភិវឌ្ឍន៍វែបសាយ / វណ្ណដា ឡេង / អ្នកអភិវឌ្ឍន៍ផ្នែកខាងមុខ',
        'hero-subtitle': 'សាងសង់អនាគតរបស់អ្នកឱ្យកាន់តែឆ្លាតវៃជាមួយ <span>ការរចនាវែបសាយទំនើបរបស់យើងដោយ វណ្ណដា ឡេង</span>',
        'hero-description': 'អ្នកអភិវឌ្ឍន៍វែបសាយដែលមានចំណង់ចំណូលចិត្តផ្តោតលើការបង្កើតវែបសាយដ៏ស្រស់ស្អាត និងមានមុខងារដែលផ្តល់នូវបទពិសោធន៍អ្នកប្រើប្រាស់ដ៏អស្ចារ្យ។ ខ្ញុំប្រែក្លាយគំនិតទៅជាដំណោះស្រាយឌីជីថលអន្តរកម្ម។',
        'btn-download': 'ទាញយក CV',
        'btn-hire': 'ជួលខ្ញុំ',
    }
};

function updateLanguage(lang) {
    document.querySelectorAll('[data-lang]').forEach(element => {
        const key = element.getAttribute('data-lang');
        if (translations[lang] && translations[lang][key]) {
            if (key === 'hero-subtitle') {
                element.innerHTML = translations[lang][key];
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });

    document.documentElement.lang = lang;
    document.body.classList.remove('en', 'khmer');
    document.body.classList.add(lang === 'kh' ? 'khmer' : 'en');
}