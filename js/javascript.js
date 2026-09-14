/* ==========================================================================
   MENÚ MÓVIL
   ========================================================================== */
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Cerrar el menú al pulsar sobre cualquier enlace
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

/* ==========================================================================
   INTERACCIÓN SUAVE DEL FORMULARIO DE CONTACTO
   ========================================================================== */
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;

  submitBtn.disabled = true;
  submitBtn.innerHTML = 'Enviando...';

  // Simulación de envío asíncrono
  setTimeout(() => {
    submitBtn.innerHTML = 'Mensaje Enviado';
    submitBtn.style.backgroundColor = '#166534'; // Verde discreto de éxito
    contactForm.reset();

    setTimeout(() => {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      submitBtn.style.backgroundColor = '';
    }, 3500);
  }, 1000);
});
