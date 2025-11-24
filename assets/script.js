// Master Grow Consulting – basic script
// Highlight active navigation link based on current URL path

document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll('.main-nav a');
    const currentPath = window.location.pathname.split('/').pop();
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        // Remove any existing active classes
        link.classList.remove('active');
        if (href === currentPath) {
            link.classList.add('active');
        }
    });

    // Append login/logout link dynamically
    const navList = document.querySelector('.main-nav ul');
    // Check if login link already exists
    let loginLink = document.querySelector('.main-nav a[href="login.html"]');
    let logoutLink = document.querySelector('.main-nav a[href="#logout"]');
    const isMember = localStorage.getItem('mgc_member') === 'true';
    if (isMember) {
        // Show logout link
        if (!logoutLink) {
            logoutLink = document.createElement('li');
            const a = document.createElement('a');
            a.href = '#logout';
            a.textContent = 'Log Out';
            a.addEventListener('click', (e) => {
                e.preventDefault();
                localStorage.removeItem('mgc_member');
                // reload to update nav and restrict content
                window.location.reload();
            });
            logoutLink.appendChild(a);
            navList.appendChild(logoutLink);
        }
        // Remove login link if exists
        if (loginLink) {
            loginLink.parentElement.removeChild(loginLink);
        }
    } else {
        // Show login link
        if (!loginLink) {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = 'login.html';
            a.textContent = 'Log In';
            li.appendChild(a);
            navList.appendChild(li);
        }
        // Remove logout link if exists
        if (logoutLink) {
            logoutLink.parentElement.removeChild(logoutLink);
        }
    }
});
