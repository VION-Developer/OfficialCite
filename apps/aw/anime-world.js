document.addEventListener('DOMContentLoaded', () => {
  const platformButtons = document.querySelectorAll('.platform-btn');
  const platformStatus = document.getElementById('platformStatus');
  const downloadModal = document.getElementById('downloadModal');
  const modalCloseButtons = document.querySelectorAll('[data-modal-close]');
  const downloadOptions = document.querySelectorAll('[data-download-option]');

  const statusMap = {
    android: 'Android disponible',
    ios: 'iOS en preparación',
    web: 'Web disponible en navegador'
  };

  const platformUrls = {
    googlePlay: 'https://play.google.com/store/apps/details?id=ap.anime.world',
    apk: 'https://firebasestorage.googleapis.com/v0/b/anime-social-network.firebasestorage.app/o/apks%2FAnimeWorld.V.1.3.apk?alt=media&token=519fad4e-a78d-4fc6-bda8-4bb24d0b117a',
    web: 'https://anime-social-network.web.app/web-app/login'
  };

  function setModalVisibility(isVisible) {
    if (!downloadModal) return;
    downloadModal.classList.toggle('is-open', isVisible);
    downloadModal.setAttribute('aria-hidden', String(!isVisible));
    document.body.classList.toggle('modal-open', isVisible);
  }

  platformButtons.forEach((button) => {
    button.addEventListener('click', () => {
      platformButtons.forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');
      const platform = button.dataset.platform;
      platformStatus.textContent = statusMap[platform] || 'Disponible';

      if (platform === 'android') {
        setModalVisibility(true);
        return;
      }

      if (platformUrls[platform]) {
        window.open(platformUrls[platform], '_blank', 'noopener,noreferrer');
      }
    });
  });

  modalCloseButtons.forEach((button) => {
    button.addEventListener('click', () => setModalVisibility(false));
  });

  downloadOptions.forEach((option) => {
    option.addEventListener('click', () => {
      const destination = platformUrls[option.dataset.downloadOption === 'google-play' ? 'googlePlay' : 'apk'];
      setModalVisibility(false);
      window.open(destination, '_blank', 'noopener,noreferrer');
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setModalVisibility(false);
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
