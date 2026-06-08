const STORAGE_KEY = 'theme-preference'; // Key for theme in the local storage!

const applyTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    const btn = document.getElementById('themeToggle');
    if (btn) {
        btn.textContent = theme === 'dark' ? '☀️ Light' : '🌙 Dark'; // If the button currently says 'dark', then the current theme for the website must be light, else it must be dark!
        btn.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
    }
};

const savedTheme = localStorage.getItem(STORAGE_KEY) || 'light'; // Load the last used theme from the local storage, if the local storage is empty, the set the theme to light (Default Theme)!
applyTheme(savedTheme);

document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('themeToggle');
    if (!toggleBtn) return;

    toggleBtn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        applyTheme(next); // Apply the theme accordingly!
        localStorage.setItem(STORAGE_KEY, next); // Store the newly selected theme in the local storage!
    });
});
