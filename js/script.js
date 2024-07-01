document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.carousel');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    const songItems = carousel.querySelectorAll('.song-item');
    let currentIndex = 0;

    function showSong(index) {
        songItems.forEach((item, i) => {
            item.style.display = i === index ? 'block' : 'none';
        });
    }

    function nextSong() {
        currentIndex = (currentIndex + 1) % songItems.length;
        showSong(currentIndex);
    }

    function prevSong() {
        currentIndex = (currentIndex - 1 + songItems.length) % songItems.length;
        showSong(currentIndex);
    }

    nextButton.addEventListener('click', nextSong);
    prevButton.addEventListener('click', prevSong);

    // Mostrar la primera canción inicialmente
    showSong(currentIndex);

    // Función para la navegación suave (mantén esta parte)
    function smoothScroll(target) {
        const element = document.querySelector(target);
        window.scrollTo({
            top: element.offsetTop,
            behavior: 'smooth'
        });
    }

    // Event listeners para los enlaces de navegación (mantén esta parte)
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            smoothScroll(this.getAttribute('href'));
        });
    });
});