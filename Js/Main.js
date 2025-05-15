// Theme Toggle Functionality
const toggle = document.getElementById('theme-toggle');
toggle.addEventListener('change', () => {
    document.body.classList.toggle('light-theme');
});

// Language Toggle (Placeholder Functionality)
const languageSelect = document.getElementById('language');
languageSelect.addEventListener('change', (e) => {
    console.log('Language changed to:', e.target.value);
    // Add language change logic here if needed
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});