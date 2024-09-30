document.addEventListener('DOMContentLoaded', () => {
    const menuIcon = document.getElementById('menu-icon');
    const dropdown = document.getElementById('dropdown');
    const modeToggle = document.getElementById('mode-toggle');
    const test = document.getElementById('edm');
    const body = document.body;

    // Check local storage for mode preference
    if (localStorage.getItem('dark-mode') === 'true') {
        body.classList.add('dark-mode');
        modeToggle.checked = true;
    }

    // Toggle dropdown menu
    menuIcon.addEventListener('click', () => {
        dropdown.classList.toggle('active');
    });

    // Toggle dark mode
    modeToggle.addEventListener('click', () => {
        if (modeToggle.checked) {
            body.classList.add('dark-mode');
        //     localStorage.setItem('dark-mode', 'true');
        } else {
            body.classList.remove('dark-mode');
        //     localStorage.setItem('dark-mode', 'false');
        2}
        console.log('click');
    });
});