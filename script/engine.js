// Toggle menu visibility on mobile
function toggleMenu() {
    const menu = document.getElementById('menu');
    if (menu) {
        menu.classList.toggle('active');
    }
}

// Close menu when a link is clicked
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const menu = document.getElementById('menu');
            if (menu) {
                menu.classList.remove('active');
            }
        });
    });
});
