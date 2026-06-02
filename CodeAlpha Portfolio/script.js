/**
 * script.js
 * Professional Portfolio Interactive Features
 */

document.addEventListener('DOMContentLoaded', () => {
  // =========================================================================
  // 1. Loading Screen Handler
  // =========================================================================
  const loader = document.getElementById('loader');
  
  // Hide loader after a delay when window loads
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.style.opacity = '0';
      loader.style.visibility = 'hidden';
    }, 800); // Small delay to feel premium and showcase logo load
  });

  // Fallback in case window load event already fired or delayed
  setTimeout(() => {
    if (loader && loader.style.visibility !== 'hidden') {
      loader.style.opacity = '0';
      loader.style.visibility = 'hidden';
    }
  }, 3000);

  // Initialize Lucide icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // =========================================================================
  // 2. Light & Dark Theme Toggle
  // =========================================================================
  const themeToggleBtn = document.getElementById('theme-toggle');
  const bodyElement = document.body;

  // Retrieve previous setting or fallback to dark (default)
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  if (savedTheme === 'light') {
    bodyElement.classList.add('light-theme');
  }

  themeToggleBtn.addEventListener('click', () => {
    bodyElement.classList.toggle('light-theme');
    
    // Check and store theme configuration
    if (bodyElement.classList.contains('light-theme')) {
      localStorage.setItem('portfolio-theme', 'light');
    } else {
      localStorage.setItem('portfolio-theme', 'dark');
    }
  });

  // =========================================================================
  // 3. Header Scroll Event & Navbar Sticky States
  // =========================================================================
  const headerElement = document.querySelector('header');
  const scrollThreshold = 50;

  window.addEventListener('scroll', () => {
    if (window.scrollY > scrollThreshold) {
      headerElement.classList.add('scrolled');
    } else {
      headerElement.classList.remove('scrolled');
    }
  });

  // Initialize scrolled state immediately in case page loads scrolled down
  if (window.scrollY > scrollThreshold) {
    headerElement.classList.add('scrolled');
  }

  // =========================================================================
  // 4. Mobile Navigation Hamburger Menu
  // =========================================================================
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const navLinksList = document.querySelector('.nav-links');
  const individualNavLinks = document.querySelectorAll('.nav-link');

  mobileMenuToggle.addEventListener('click', () => {
    mobileMenuToggle.classList.toggle('open');
    navLinksList.classList.toggle('open');
  });

  // Close hamburger menu when links are clicked
  individualNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenuToggle.classList.remove('open');
      navLinksList.classList.remove('open');
    });
  });

  // Close menu when clicking outside it
  document.addEventListener('click', (e) => {
    if (!mobileMenuToggle.contains(e.target) && !navLinksList.contains(e.target)) {
      mobileMenuToggle.classList.remove('open');
      navLinksList.classList.remove('open');
    }
  });

  // =========================================================================
  // 5. Hero Typewriter Animation
  // =========================================================================
  const typewriterText = document.getElementById('typewriter-text');
  const rolesArray = ['B.Tech IT Student', 'Aspiring Developer', 'Art & Anime Illustrator', 'Inquisitive Learner'];
  let currentWordIndex = 0;
  let currentCharIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function typeEffect() {
    const currentWord = rolesArray[currentWordIndex];
    
    if (isDeleting) {
      // Deleting characters
      typewriterText.textContent = currentWord.substring(0, currentCharIndex - 1);
      currentCharIndex--;
      typeSpeed = 50; // Deletion speed is faster
    } else {
      // Adding characters
      typewriterText.textContent = currentWord.substring(0, currentCharIndex + 1);
      currentCharIndex++;
      typeSpeed = 120; // Natural typing pace
    }

    // Word completely typed
    if (!isDeleting && currentCharIndex === currentWord.length) {
      isDeleting = true;
      typeSpeed = 1500; // Pause at full word
    } 
    // Word completely erased
    else if (isDeleting && currentCharIndex === 0) {
      isDeleting = false;
      currentWordIndex = (currentWordIndex + 1) % rolesArray.length;
      typeSpeed = 500; // Pause before typing next word
    }

    setTimeout(typeEffect, typeSpeed);
  }

  // Kick off typewriter typing animation
  if (typewriterText) {
    typeEffect();
  }

  // =========================================================================
  // 6. Section Scroll Reveal Observer
  // =========================================================================
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-active');
        // Stop observing once revealed to maintain state
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12, // Element is 12% in viewport
    rootMargin: '0px 0px -50px 0px' // Offset triggers slightly earlier for flow
  });

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });

  // =========================================================================
  // 7. Active Navigation Highlight Observer
  // =========================================================================
  const sections = document.querySelectorAll('section[id]');
  const activeNavLinks = document.querySelectorAll('.nav-link');

  const navHighlightObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const currentSectionId = entry.target.getAttribute('id');
        
        activeNavLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${currentSectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, {
    threshold: 0.35, // Trigger when 35% of section is visible
    rootMargin: '-80px 0px -40% 0px' // Account for sticky navbar offset
  });

  sections.forEach(section => {
    navHighlightObserver.observe(section);
  });

  // =========================================================================
  // 8. Animated About Me Counters
  // =========================================================================
  const countersSection = document.querySelector('.about-counters');
  const counterNumbers = document.querySelectorAll('.counter-num');
  let hasCountersAnimated = false;

  const animateCounters = () => {
    counterNumbers.forEach(counter => {
      const targetVal = parseInt(counter.getAttribute('data-target'), 10);
      let currentVal = 0;
      const animationDuration = 2000; // 2 seconds total animation time
      const incrementSteps = Math.ceil(targetVal / (animationDuration / 16)); // ~60fps refresh rate

      const updateCounter = () => {
        currentVal += incrementSteps;
        if (currentVal >= targetVal) {
          counter.textContent = targetVal + '+';
        } else {
          counter.textContent = currentVal + '+';
          requestAnimationFrame(updateCounter);
        }
      };

      updateCounter();
    });
  };

  const countersObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasCountersAnimated) {
        animateCounters();
        hasCountersAnimated = true;
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.5
  });

  if (countersSection) {
    countersObserver.observe(countersSection);
  }

  // =========================================================================
  // 9. Back To Top Button Handler
  // =========================================================================
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 600) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // =========================================================================
  // 10. Form Validation & Submissions
  // =========================================================================
  const contactForm = document.getElementById('contactForm');
  const toastMsg = document.getElementById('toast-msg');
  const toastText = document.getElementById('toast-text');

  function triggerToast(message, isSuccess = true) {
    toastText.textContent = message;
    
    // Clear existing classes
    toastMsg.className = 'toast-msg';
    
    // Apply styling
    if (isSuccess) {
      toastMsg.classList.add('toast-success', 'show');
    } else {
      toastMsg.classList.add('toast-error', 'show');
    }
    
    // Hide toast after 4 seconds
    setTimeout(() => {
      toastMsg.classList.remove('show');
    }, 4000);
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Retrieve form inputs
      const clientName = document.getElementById('name').value.trim();
      const clientEmail = document.getElementById('email').value.trim();
      const clientSubject = document.getElementById('subject').value.trim();
      const clientMessage = document.getElementById('message').value.trim();

      // Simple validations
      if (!clientName || !clientEmail || !clientSubject || !clientMessage) {
        triggerToast('Please complete all form fields.', false);
        return;
      }

      // Check email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(clientEmail)) {
        triggerToast('Please provide a valid email address.', false);
        return;
      }

      // Mock submitting state feedback
      const submitButton = contactForm.querySelector('button[type="submit"]');
      const originalBtnHtml = submitButton.innerHTML;
      
      submitButton.disabled = true;
      submitButton.innerHTML = `<i data-lucide="loader" class="animate-spin"></i> Sending...`;
      if (typeof lucide !== 'undefined') {
        lucide.createIcons({ attrs: { class: 'animate-spin' } });
      }

      // Simulating network request delay
      setTimeout(() => {
        // Success Mock Feedback
        triggerToast(`Thank you, ${clientName}! Your message was successfully sent.`);
        contactForm.reset();
        
        // Reset Button
        submitButton.disabled = false;
        submitButton.innerHTML = originalBtnHtml;
        if (typeof lucide !== 'undefined') {
          lucide.createIcons();
        }
      }, 1500);
    });
  }
});
