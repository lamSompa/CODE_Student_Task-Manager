document.addEventListener('DOMContentLoaded', () => {
    const menuIcon = document.getElementById('menu-icon');
    const dropdown = document.getElementById('dropdown');
    const modeToggle = document.getElementById('mode-toggle');
    const body = document.body;
    const taskBoxes = document.querySelectorAll('.task-box');

    // Check local storage for mode preference
    if (localStorage.getItem('dark-mode') === 'true') {
        body.classList.add('dark-mode');
        if (modeToggle) modeToggle.checked = true;
    }

    // Toggle dropdown menu
    if (menuIcon) {
        menuIcon.addEventListener('click', () => {
            if (dropdown) {
                dropdown.classList.toggle('active');
            }
        });
    }

    // Toggle dark mode
    if (modeToggle) {
        modeToggle.addEventListener('click', () => {
            if (modeToggle.checked) {
                body.classList.add('dark-mode');
                localStorage.setItem('dark-mode', 'true');
            } else {
                body.classList.remove('dark-mode');
                localStorage.setItem('dark-mode', 'false');
            }
        });
    }

    // Intersection Observer for task boxes
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    taskBoxes.forEach(box => observer.observe(box));

    // Tooltip Handling
    const titleInput = document.getElementById('title');
    const descriptionInput = document.getElementById('description');

    function showPopup(input, message) {
        const popup = document.createElement('div');
        popup.className = 'popup';
        popup.textContent = message;
    
        // Append the popup to the top of the section
        const section = document.querySelector('section');
        section.insertBefore(popup, section.firstChild);
    
        setTimeout(() => popup.classList.add('show'), 10);
    
        input.addEventListener('blur', () => {
            popup.classList.remove('show');
            setTimeout(() => popup.remove(), 300);
        });
    }

    if (titleInput) {
        titleInput.addEventListener('focus', () => {
            showPopup(titleInput, 'Title should contain only letters and spaces. Type numbers in words if necessary.');
        });
    }

    if (descriptionInput) {
        descriptionInput.addEventListener('focus', () => {
            showPopup(descriptionInput, 'Description should contain only letters and spaces. Type numbers in words if necessary.');
        });
    }

    // Login Form Handling
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            // Add login logic here
            console.log('Login submitted');
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const passwordInput = registerForm.querySelector('input[name="password"]');
            const confirmPasswordInput = registerForm.querySelector('input[name="confirmPassword"]');
            const emailInput = registerForm.querySelector('input[name="email"]');

            // Password match validation
            if (passwordInput.value !== confirmPasswordInput.value) {
                alert('Passwords do not match');
                return;
            }

            // Email format validation
            const pattern = /^[a-zA-Z0-9._%+-]+@code\.berlin$/;
            if (!pattern.test(emailInput.value)) {
                alert('Invalid email format');
                return;
            }

            // Submit the form if all validations pass
            console.log('Registration submitted');
            registerForm.submit();
        });
    }

    // Modal Handling
    function showModal() {
        document.getElementById('authModal').style.display = 'block';
    }

    function closeModal() {
        document.getElementById('authModal').style.display = 'none';
    }

    // Add event listeners to protected links
    const protectedLinks = document.querySelectorAll('.protected-link');
    protectedLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent default navigation
            showModal(); // Show the modal
        });
    });

    // Add event listener to close button
    const closeButton = document.querySelector('.close-button');
    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }
});