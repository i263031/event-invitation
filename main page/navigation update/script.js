// Dropdown navigation (desktop and mobile)
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
function closeNavigation() {
  mainNav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open navigation menu');
}
menuToggle.addEventListener('click', (event) => {
  event.stopPropagation();
  const isOpen = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
});
mainNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeNavigation));
document.addEventListener('click', (event) => {
  if (!event.target.closest('.nav-dropdown')) closeNavigation();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeNavigation();
    menuToggle.focus();
  }
});

// Responsive image carousel
const track = document.getElementById('carouselTrack');
const slides = Array.from(document.querySelectorAll('.slide'));
const dots = Array.from(document.querySelectorAll('.dot'));
let currentSlide = 0;
function visibleSlides() {
  if (window.innerWidth <= 620) return 1;
  if (window.innerWidth <= 850) return 2;
  return 3;
}
function showSlide(index) {
  const maxIndex = Math.max(0, slides.length - visibleSlides());
  currentSlide = Math.min(Math.max(index, 0), maxIndex);
  const slideWidth = slides[0].getBoundingClientRect().width;
  const gap = parseFloat(getComputedStyle(track).gap) || 0;
  track.style.transform = `translateX(-${currentSlide * (slideWidth + gap)}px)`;
  dots.forEach((dot, i) => dot.classList.toggle('active', i === currentSlide));
  slides.forEach((slide, i) => slide.classList.toggle('active', i === currentSlide));
}
document.getElementById('nextSlide').addEventListener('click', () => {
  const maxIndex = Math.max(0, slides.length - visibleSlides());
  showSlide(currentSlide >= maxIndex ? 0 : currentSlide + 1);
});
document.getElementById('prevSlide').addEventListener('click', () => {
  const maxIndex = Math.max(0, slides.length - visibleSlides());
  showSlide(currentSlide <= 0 ? maxIndex : currentSlide - 1);
});
dots.forEach((dot, i) => dot.addEventListener('click', () => showSlide(i)));
window.addEventListener('resize', () => showSlide(currentSlide));
showSlide(0);


// RSVP form: front-end demonstration only (no server or database connected)
const rsvpForm = document.getElementById('rsvpForm');
const rsvpFeedback = document.getElementById('rsvpFeedback');
rsvpForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!rsvpForm.reportValidity()) return;
  const formData = new FormData(rsvpForm);
  const guestName = String(formData.get('guestName')).trim();
  const attendance = formData.get('attendance');
  rsvpFeedback.textContent = attendance === 'yes'
    ? `Thank you, ${guestName}! Your sample RSVP has been recorded on this page.`
    : `Thank you for letting us know, ${guestName}. You will be missed!`;
  rsvpForm.reset();
});
