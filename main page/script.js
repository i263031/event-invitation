// Mobile navigation
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
menuToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
});
mainNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  mainNav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

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
