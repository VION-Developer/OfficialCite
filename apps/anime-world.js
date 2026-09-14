document.addEventListener('DOMContentLoaded', () => {
  const platformButtons = document.querySelectorAll('.platform-btn');
  const platformStatus = document.getElementById('platformStatus');

  const statusMap = {
    android: 'Android disponible',
    ios: 'iOS en preparación',
    web: 'Web disponible en navegador'
  };

  platformButtons.forEach((button) => {
    button.addEventListener('click', () => {
      platformButtons.forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');
      const platform = button.dataset.platform;
      platformStatus.textContent = statusMap[platform] || 'Disponible';
    });
  });

  const featureItems = document.querySelectorAll('.feature-item');
  featureItems.forEach((item) => {
    item.addEventListener('mouseenter', () => {
      featureItems.forEach((entry) => entry.classList.remove('active'));
      item.classList.add('active');
    });
  });

  const description = document.getElementById('appDescription');
  const readMoreToggle = document.querySelector('.read-more-toggle');

  if (description && readMoreToggle) {
    readMoreToggle.addEventListener('click', () => {
      const expanded = description.classList.toggle('expanded');
      readMoreToggle.textContent = expanded ? 'Mostrar menos' : 'Leer más';
      readMoreToggle.setAttribute('aria-expanded', String(expanded));
    });
  }

  const track = document.querySelector('.screens-track');
  const prevBtn = document.querySelector('.screen-carousel-btn.prev');
  const nextBtn = document.querySelector('.screen-carousel-btn.next');

  if (track && prevBtn && nextBtn) {
    const cards = [...track.children];
    let index = 0;

    function getCardWidth() {
      const firstCard = cards[0];
      if (!firstCard) return 0;
      const styles = window.getComputedStyle(track);
      const gap = parseFloat(styles.gap || '0');
      return firstCard.getBoundingClientRect().width + gap;
    }

    function updateCarousel() {
      const offset = index * getCardWidth();
      track.style.transform = `translateX(-${offset}px)`;
    }

    prevBtn.addEventListener('click', () => {
      index = Math.max(0, index - 1);
      updateCarousel();
    });

    nextBtn.addEventListener('click', () => {
      index = Math.min(cards.length - 1, index + 1);
      updateCarousel();
    });

    window.addEventListener('resize', updateCarousel);
    updateCarousel();
  }
});
