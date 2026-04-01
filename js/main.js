/* ============================================================
   CTS Courier — Main JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Mobile Navigation Toggle ----
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }

  // ---- Navbar scroll shadow ----
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  });

  // ---- Active nav link on scroll ----
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-links a[href^="#"]');
  function setActiveNav() {
    const scrollY = window.scrollY + 120;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollY >= top && scrollY < top + height) {
        navItems.forEach(a => a.classList.remove('active'));
        const active = document.querySelector(`.nav-links a[href="#${id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }
  window.addEventListener('scroll', setActiveNav);

  // ---- Hero Slider ----
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dot');
  let currentSlide = 0;
  let slideInterval;

  function goToSlide(i) {
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    currentSlide = i;
    if (slides[currentSlide]) slides[currentSlide].classList.add('active');
    if (dots[currentSlide]) dots[currentSlide].classList.add('active');
  }
  function nextSlide() { goToSlide((currentSlide + 1) % slides.length); }
  function startSlider() { slideInterval = setInterval(nextSlide, 5000); }

  if (slides.length > 0) {
    goToSlide(0);
    startSlider();
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        clearInterval(slideInterval);
        goToSlide(i);
        startSlider();
      });
    });
  }

  // ---- Counter Animation ----
  const counters = document.querySelectorAll('[data-count]');
  let counterDone = false;
  function animateCounters() {
    if (counterDone) return;
    counters.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.85) {
        counterDone = true;
        const target = parseInt(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        let current = 0;
        const step = Math.max(1, Math.floor(target / 40));
        const timer = setInterval(() => {
          current += step;
          if (current >= target) { current = target; clearInterval(timer); }
          el.textContent = current.toLocaleString() + suffix;
        }, 30);
      }
    });
  }
  window.addEventListener('scroll', animateCounters);
  animateCounters();

  // ---- FAQ Accordion ----
  document.querySelectorAll('.faq-item').forEach(item => {
    const btn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(fi => {
        fi.classList.remove('open');
        fi.querySelector('.faq-answer').style.maxHeight = '0';
      });
      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  // ---- Back to Top ----
  const btt = document.querySelector('.back-to-top');
  if (btt) {
    window.addEventListener('scroll', () => btt.classList.toggle('visible', window.scrollY > 400));
    btt.addEventListener('click', e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); });
  }

  // ---- Scroll Animations ----
  const fadeEls = document.querySelectorAll('.fade-up');
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
    }, { threshold: 0.12 });
    fadeEls.forEach(el => obs.observe(el));
  } else {
    fadeEls.forEach(el => el.classList.add('visible'));
  }

  // ---- Corporate Form → WhatsApp ----
  const form = document.getElementById('corporate-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const d = new FormData(form);
      const text = `*CTS Corporate Account Enquiry*%0A%0A` +
        `*Company:* ${encodeURIComponent(d.get('company') || '')}%0A` +
        `*Contact:* ${encodeURIComponent(d.get('contact') || '')}%0A` +
        `*Email:* ${encodeURIComponent(d.get('email') || '')}%0A` +
        `*Phone:* ${encodeURIComponent(d.get('phone') || '')}%0A` +
        `*Services:* ${encodeURIComponent(d.get('services') || '')}%0A` +
        `*Message:* ${encodeURIComponent(d.get('message') || '')}`;
      window.open(`https://wa.me/265889941700?text=${text}`, '_blank');
      form.reset();
    });
  }

  // ---- General Enquiry Form → WhatsApp ----
  const genForm = document.getElementById('enquiry-form');
  if (genForm) {
    genForm.addEventListener('submit', e => {
      e.preventDefault();
      const d = new FormData(genForm);
      const text = `*CTS Courier Enquiry*%0A%0A` +
        `*Name:* ${encodeURIComponent(d.get('name') || '')}%0A` +
        `*Email:* ${encodeURIComponent(d.get('email') || '')}%0A` +
        `*Phone:* ${encodeURIComponent(d.get('phone') || '')}%0A` +
        `*Subject:* ${encodeURIComponent(d.get('subject') || '')}%0A` +
        `*Message:* ${encodeURIComponent(d.get('message') || '')}`;
      window.open(`https://wa.me/265889941700?text=${text}`, '_blank');
      genForm.reset();
    });
  }

});
