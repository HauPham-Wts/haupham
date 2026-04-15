const header = document.querySelector('[data-header]');
const menuToggle = document.querySelector('[data-menu-toggle]');
const siteNav = document.querySelector('[data-nav]');
const navLinks = Array.from(document.querySelectorAll('.nav-link'));
const revealElements = Array.from(document.querySelectorAll('.reveal'));
const tiltCards = Array.from(document.querySelectorAll('.tilt-card'));
const skillMeterFills = Array.from(document.querySelectorAll('.skill-meter__fill'));
const contactForm = document.querySelector('[data-contact-form]');
const formFeedback = document.querySelector('[data-form-feedback]');
const copyEmailButton = document.querySelector('[data-copy-email]');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const desktopMenuBreakpoint = 860;

function setHeaderState() {
  if (!header) {
    return;
  }

  header.classList.toggle('is-scrolled', window.scrollY > 14);
}

function closeMenu() {
  if (!menuToggle || !siteNav) {
    return;
  }

  menuToggle.setAttribute('aria-expanded', 'false');
  siteNav.classList.remove('is-open');
}

function toggleMenu() {
  if (!menuToggle || !siteNav) {
    return;
  }

  const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isExpanded));
  siteNav.classList.toggle('is-open', !isExpanded);
}

function getHeaderOffset() {
  return header ? header.offsetHeight : 0;
}

function smoothScrollToSection(hash) {
  const target = document.querySelector(hash);

  if (!target) {
    return;
  }

  const sectionTop = target.getBoundingClientRect().top + window.scrollY;
  const offset = getHeaderOffset() + 14;
  window.scrollTo({
    top: sectionTop - offset,
    behavior: reduceMotion.matches ? 'auto' : 'smooth',
  });
}

function handleAnchorNavigation() {
  const anchors = Array.from(document.querySelectorAll('a[href^="#"]'));

  anchors.forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const hash = anchor.getAttribute('href');

      if (!hash || hash === '#') {
        return;
      }

      const targetExists = document.querySelector(hash);

      if (!targetExists) {
        return;
      }

      event.preventDefault();
      smoothScrollToSection(hash);

      if (anchor.classList.contains('nav-link')) {
        closeMenu();
      }
    });
  });
}

function initActiveNavState() {
  const sections = Array.from(document.querySelectorAll('main section[id]'));

  if (!sections.length || !('IntersectionObserver' in window)) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        const sectionId = entry.target.getAttribute('id');
        navLinks.forEach((link) => {
          const linkMatchesSection = link.getAttribute('href') === `#${sectionId}`;
          link.classList.toggle('is-active', linkMatchesSection);
        });
      });
    },
    {
      rootMargin: '-42% 0px -48% 0px',
      threshold: 0.1,
    },
  );

  sections.forEach((section) => observer.observe(section));
}

function initRevealAnimations() {
  if (!revealElements.length) {
    return;
  }

  if (reduceMotion.matches || !('IntersectionObserver' in window)) {
    revealElements.forEach((element) => element.classList.add('is-visible'));
    return;
  }

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.16,
      rootMargin: '0px 0px -10% 0px',
    },
  );

  revealElements.forEach((element) => revealObserver.observe(element));
}

function initCardTilt() {
  if (!tiltCards.length || reduceMotion.matches) {
    return;
  }

  const supportsPointerTilt = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  if (!supportsPointerTilt) {
    return;
  }

  tiltCards.forEach((card) => {
    const maxRotation = 5;

    function resetCard() {
      card.style.setProperty('--rx', '0deg');
      card.style.setProperty('--ry', '0deg');
      card.style.setProperty('--pointer-x', '50%');
      card.style.setProperty('--pointer-y', '50%');
    }

    card.addEventListener('mousemove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      const rotateX = (0.5 - y) * maxRotation * 2;
      const rotateY = (x - 0.5) * maxRotation * 2;

      card.style.setProperty('--rx', `${rotateX.toFixed(2)}deg`);
      card.style.setProperty('--ry', `${rotateY.toFixed(2)}deg`);
      card.style.setProperty('--pointer-x', `${(x * 100).toFixed(2)}%`);
      card.style.setProperty('--pointer-y', `${(y * 100).toFixed(2)}%`);
    });

    card.addEventListener('mouseleave', resetCard);
    card.addEventListener('blur', resetCard, true);
  });
}

function initSkillMeterAnimation() {
  if (!skillMeterFills.length) {
    return;
  }

  const animateFills = () => {
    skillMeterFills.forEach((fill) => fill.classList.add('is-animated'));
  };

  if (reduceMotion.matches || !('IntersectionObserver' in window)) {
    animateFills();
    return;
  }

  const skillsSection = document.querySelector('#skills');

  if (!skillsSection) {
    animateFills();
    return;
  }

  const observer = new IntersectionObserver(
    (entries, sectionObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        animateFills();
        sectionObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.34,
    },
  );

  observer.observe(skillsSection);
}

function setFormFeedback(message, state = '') {
  if (!formFeedback) {
    return;
  }

  formFeedback.textContent = message;
  formFeedback.classList.remove('is-success', 'is-error');

  if (state) {
    formFeedback.classList.add(state);
  }
}

function initContactForm() {
  if (!(contactForm instanceof HTMLFormElement)) {
    return;
  }

  const requiredFields = Array.from(contactForm.querySelectorAll('input[required], textarea[required]'));

  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
      contactForm.classList.add('is-invalid');
      setFormFeedback('Please complete all required fields with valid details.', 'is-error');
      return;
    }

    let firstName = '';
    const nameInput = contactForm.querySelector('#contact-name');

    if (nameInput instanceof HTMLInputElement) {
      firstName = nameInput.value.trim().split(/\s+/)[0] || '';
    }

    setFormFeedback(`Thanks${firstName ? `, ${firstName}` : ''}. Your message is queued, and I will respond soon.`, 'is-success');
    contactForm.reset();
    contactForm.classList.remove('is-invalid');
  });

  requiredFields.forEach((field) => {
    field.addEventListener('input', () => {
      if (!contactForm.classList.contains('is-invalid')) {
        return;
      }

      if (contactForm.checkValidity()) {
        contactForm.classList.remove('is-invalid');
        setFormFeedback('');
      }
    });
  });
}

function initCopyEmail() {
  if (!(copyEmailButton instanceof HTMLButtonElement)) {
    return;
  }

  const email = copyEmailButton.getAttribute('data-copy-email');

  if (!email) {
    return;
  }

  const defaultLabel = copyEmailButton.textContent || 'Copy Email';

  function setTemporaryLabel(label) {
    copyEmailButton.textContent = label;

    window.setTimeout(() => {
      copyEmailButton.textContent = defaultLabel;
    }, 1700);
  }

  function fallbackCopy(text) {
    const tempTextarea = document.createElement('textarea');
    tempTextarea.value = text;
    tempTextarea.setAttribute('readonly', 'true');
    tempTextarea.style.position = 'fixed';
    tempTextarea.style.opacity = '0';
    document.body.append(tempTextarea);
    tempTextarea.select();
    document.execCommand('copy');
    tempTextarea.remove();
  }

  copyEmailButton.addEventListener('click', async () => {
    try {
      if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        await navigator.clipboard.writeText(email);
      } else {
        fallbackCopy(email);
      }

      setTemporaryLabel('Email Copied');
    } catch (error) {
      setTemporaryLabel('Copy Failed');
    }
  });
}

function setCurrentYear() {
  const yearElement = document.querySelector('[data-year]');

  if (yearElement) {
    yearElement.textContent = String(new Date().getFullYear());
  }
}

if (menuToggle) {
  menuToggle.addEventListener('click', toggleMenu);
}

window.addEventListener('scroll', setHeaderState, { passive: true });
window.addEventListener('resize', () => {
  if (window.innerWidth > desktopMenuBreakpoint) {
    closeMenu();
  }
});

document.addEventListener('click', (event) => {
  if (!menuToggle || !siteNav) {
    return;
  }

  const target = event.target;

  if (!(target instanceof Node)) {
    return;
  }

  const clickedInsideMenu = siteNav.contains(target) || menuToggle.contains(target);

  if (!clickedInsideMenu) {
    closeMenu();
  }
});

setHeaderState();
handleAnchorNavigation();
initActiveNavState();
initRevealAnimations();
initCardTilt();
initSkillMeterAnimation();
initContactForm();
initCopyEmail();
setCurrentYear();
