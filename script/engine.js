class navbar{
    constructor(menuIcon, navLinks){
        this.menuIcon = menuIcon;
        this.navLinks = navLinks;
    }
}

addEventListener('DOMContentLoaded', () => {
    const menuIcon = document.querySelector('.menu-icon');
    const navLinks = document.querySelector('.nav-links');
    const navBar = new navbar(menuIcon, navLinks);
    navBar.menuIcon.addEventListener('click', () => {
        navBar.navLinks.classList.toggle('active');
    });
});

