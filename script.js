document.querySelectorAll('.carousel-wrapper').forEach(wrapper => {
    const track = wrapper.querySelector('.carousel-track');
    const prevBtn = wrapper.querySelector('.prev-btn');
    const nextBtn = wrapper.querySelector('.next-btn');
    const itemWidth = 270;
    const visibleItems = 4;
    const totalItems = track.children.length;
    let currentSlide = 0;

    function updateCarousel(direction) {
      const maxSlide = totalItems - visibleItems;
      currentSlide += direction;

      if (currentSlide < 0) currentSlide = 0;
      if (currentSlide > maxSlide) currentSlide = maxSlide;

      const offset = currentSlide * itemWidth;
      track.style.transform = `translateX(-${offset}px)`;
    }

    prevBtn.addEventListener('click', () => updateCarousel(-1));
    nextBtn.addEventListener('click', () => updateCarousel(1));
  });