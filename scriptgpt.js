const toggleMenu = document.getElementById('toggleMenu');
    const navMenu = document.getElementById('navMenu');

    toggleMenu.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });