/* ==========================================================================
   1. AMBIENT CANVAS: MATRIZ Y SPOTLIGHT SUTIL AL CURSOR
   ========================================================================== */
const canvas = document.getElementById('ambient-canvas');
const ctx = canvas.getContext('2d');

let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
let targetMouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

window.addEventListener('mousemove', (e) => {
  targetMouse.x = e.clientX;
  targetMouse.y = e.clientY;
});

function renderAmbient() {
  // Lerp suave para el movimiento del spotlight
  mouse.x += (targetMouse.x - mouse.x) * 0.05;
  mouse.y += (targetMouse.y - mouse.y) * 0.05;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Luz radial tenue alrededor del cursor
  const gradient = ctx.createRadialGradient(
    mouse.x, mouse.y, 10,
    mouse.x, mouse.y, 450
  );
  gradient.addColorStop(0, 'rgba(0, 180, 216, 0.045)');
  gradient.addColorStop(1, 'rgba(4, 4, 6, 0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Cuadrícula sutil
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.015)';
  ctx.lineWidth = 1;
  const gridSize = 60;

  for (let x = 0; x < canvas.width; x += gridSize) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
    ctx.stroke();
  }

  for (let y = 0; y < canvas.height; y += gridSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.width, y);
    ctx.stroke();
  }

  requestAnimationFrame(renderAmbient);
}
renderAmbient();

/* ==========================================================================
   2. NAVBAR COMPACTO EN SCROLL & MENÚ MÓVIL
   ========================================================================== */
const navbar = document.getElementById('navbar');
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

document.querySelectorAll('.nav-link, .nav-btn').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
  });
});

/* ==========================================================================
   3. REVEAL ANIMATION EN SCROLL (INTERSECTION OBSERVER)
   ========================================================================== */
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

/* ==========================================================================
   4. CONTADOR ANIMADO DE MÉTRICAS
   ========================================================================== */
const counterElements = document.querySelectorAll('.metric-value');
let countersTriggered = false;

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !countersTriggered) {
      countersTriggered = true;
      counterElements.forEach(counter => {
        const target = +counter.getAttribute('data-counter');
        let current = 0;
        const step = target / 40;

        const update = () => {
          current += step;
          if (current < target) {
            counter.innerText = Math.ceil(current);
            requestAnimationFrame(update);
          } else {
            counter.innerText = target;
          }
        };
        update();
      });
    }
  });
}, { threshold: 0.5 });

const metricsSection = document.querySelector('.metrics-row');
if (metricsSection) statsObserver.observe(metricsSection);

/* ==========================================================================
   5. CARRUSEL INTERACTIVO COMPLETO (TOUCH + DRAG + AUTOPLAY)
   ========================================================================== */
const track = document.getElementById('carouselTrack');
const slides = document.querySelectorAll('.carousel-slide');
const prevBtn = document.getElementById('carouselPrev');
const nextBtn = document.getElementById('carouselNext');
const indicatorsContainer = document.getElementById('carouselIndicators');
const viewport = document.getElementById('carouselViewport');

let currentIndex = 0;
let isDragging = false;
let startPos = 0;
let currentTranslate = 0;
let prevTranslate = 0;
let animationID = 0;
let autoPlayTimer = null;

// Crear indicadores
slides.forEach((_, idx) => {
  const bar = document.createElement('div');
  bar.classList.add('indicator-bar');
  if (idx === 0) bar.classList.add('active');
  bar.addEventListener('click', () => goToSlide(idx));
  indicatorsContainer.appendChild(bar);
});

const indicators = document.querySelectorAll('.indicator-bar');

function updateSlidePosition() {
  track.style.transform = `translateX(-${currentIndex * 100}%)`;
  indicators.forEach((ind, i) => {
    ind.classList.toggle('active', i === currentIndex);
  });
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  updateSlidePosition();
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateSlidePosition();
}

function goToSlide(index) {
  currentIndex = index;
  updateSlidePosition();
}

nextBtn.addEventListener('click', () => {
  nextSlide();
  resetAutoPlay();
});

prevBtn.addEventListener('click', () => {
  prevSlide();
  resetAutoPlay();
});

// Soporte Touch & Mouse Drag
function touchStart(e) {
  isDragging = true;
  startPos = getPositionX(e);
  track.style.transition = 'none';
  clearInterval(autoPlayTimer);
}

function touchMove(e) {
  if (!isDragging) return;
  const currentPosition = getPositionX(e);
  const diff = currentPosition - startPos;
  const currentPercent = -currentIndex * 100 + (diff / viewport.offsetWidth) * 100;
  track.style.transform = `translateX(${currentPercent}%)`;
}

function touchEnd(e) {
  if (!isDragging) return;
  isDragging = false;
  track.style.transition = 'transform 0.5s cubic-bezier(0.2, 1, 0.3, 1)';
  const currentPosition = getPositionX(e);
  const diff = currentPosition - startPos;

  if (diff < -60) {
    nextSlide();
  } else if (diff > 60) {
    prevSlide();
  } else {
    updateSlidePosition();
  }
  startAutoPlay();
}

function getPositionX(e) {
  return e.type.includes('mouse') ? e.pageX : e.touches[0].clientX;
}

viewport.addEventListener('mousedown', touchStart);
viewport.addEventListener('mousemove', touchMove);
viewport.addEventListener('mouseup', touchEnd);
viewport.addEventListener('mouseleave', () => {
  if (isDragging) touchEnd({ pageX: startPos });
});

viewport.addEventListener('touchstart', touchStart, { passive: true });
viewport.addEventListener('touchmove', touchMove, { passive: true });
viewport.addEventListener('touchend', touchEnd);

// Autoplay
function startAutoPlay() {
  autoPlayTimer = setInterval(nextSlide, 5000);
}

function resetAutoPlay() {
  clearInterval(autoPlayTimer);
  startAutoPlay();
}

viewport.addEventListener('mouseenter', () => clearInterval(autoPlayTimer));
viewport.addEventListener('mouseleave', startAutoPlay);

startAutoPlay();

/* ==========================================================================
   6. CONTACT FORM: FEEDBACK DE ENVÍO ELEGANTE
   ========================================================================== */
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const originalHTML = submitBtn.innerHTML;
  submitBtn.disabled = true;
  submitBtn.innerHTML = `<span>Procesando...</span> <i class="fa-solid fa-spinner fa-spin"></i>`;
  submitBtn.style.opacity = '0.8';

  try {
    const response = await fetch(contactForm.action, {
      method: contactForm.method,
      body: new FormData(contactForm),
      headers: {
        Accept: 'application/json'
      }
    });
    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || 'No se pudo enviar el formulario');
    }

    submitBtn.innerHTML = `<span>Solicitud Enviada con Éxito</span> <i class="fa-solid fa-check"></i>`;
    submitBtn.style.background = '#10b981';
    submitBtn.style.color = '#fff';
    submitBtn.style.opacity = '1';

    contactForm.reset();

    setTimeout(() => {
      submitBtn.innerHTML = originalHTML;
      submitBtn.style.background = '';
      submitBtn.style.color = '';
      submitBtn.disabled = false;
    }, 4000);
  } catch (error) {
    submitBtn.innerHTML = `<span>Error al enviar</span> <i class="fa-solid fa-circle-exclamation"></i>`;
    submitBtn.style.background = '#dc2626';
    submitBtn.style.color = '#fff';
    submitBtn.style.opacity = '1';

    setTimeout(() => {
      submitBtn.innerHTML = originalHTML;
      submitBtn.style.background = '';
      submitBtn.style.color = '';
      submitBtn.disabled = false;
    }, 4000);
  }
});
