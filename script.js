// ===================================
// Kulturring Höckendorf - JavaScript
// ===================================

document.addEventListener('DOMContentLoaded', function() {
  // Initialize Feather icons
  feather.replace();

  // Navigation - Single Page Application
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.page-section');
  function showSection(targetId) {
      // Hide all sections
      sections.forEach(section => {
          if (section.classList.contains('active')) {
              section.classList.remove('active');
          }
      });

      // Show target section
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
          setTimeout(() => {
              targetSection.classList.add('active');
          }, 10);
      }

      // Update active nav link
      navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === targetId) {
              link.classList.add('active');
          }
      });

      // Close mobile menu
      navMenu.classList.remove('active');
      // Reset animação hamburguer
      const spans = mobileMenuToggle ? mobileMenuToggle.querySelectorAll('span') : [];
      spans.forEach(span => {
        span.style.transform = 'none';
        span.style.opacity = '1';
      });

      // Scroll to top
      window.scrollTo(0, 0);
  }

  // Handle navigation clicks
  navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
          e.preventDefault();
          const targetId = this.getAttribute('href');
          console.log('Navegando para:', targetId);
          showSection(targetId);
          
          // Update URL without reloading
          history.pushState(null, null, targetId);
      });
  });

  // Handle browser back/forward buttons
  window.addEventListener('popstate', function() {
      const hash = window.location.hash || '#home';
      showSection(hash);
  });

  // Initialize with home section
  showSection(window.location.hash || '#home');

  // Smooth scroll for anchor links within sections
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          const href = this.getAttribute('href');
          // Check if it's a section navigation or an anchor within a section
          if (!href.includes('-')) {
              return; // Let the SPA navigation handle it
          }
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
              target.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start'
              });
          }
      });
  });

  // Events filter
  const filterButtons = document.querySelectorAll('.filter-btn');
  const eventItems = document.querySelectorAll('.event-item');

  filterButtons.forEach(button => {
      button.addEventListener('click', function() {
          const filter = this.getAttribute('data-filter');
          
          // Update active button
          filterButtons.forEach(btn => btn.classList.remove('active'));
          this.classList.add('active');
          
          // Filter events
          eventItems.forEach(item => {
              if (filter === 'all' || item.getAttribute('data-category') === filter) {
                  item.style.display = 'flex';
                  setTimeout(() => {
                      item.style.opacity = '1';
                      item.style.transform = 'translateX(0)';
                  }, 10);
              } else {
                  item.style.opacity = '0';
                  item.style.transform = 'translateX(-20px)';
                  setTimeout(() => {
                      item.style.display = 'none';
                  }, 300);
              }
          });
      });
  });

  // Form handling
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
      form.addEventListener('submit', function(e) {
          e.preventDefault();
          
          // Get form data
          const formData = new FormData(this);
          const data = Object.fromEntries(formData);
          
          // Here you would normally send the data to a server
          console.log('Form submitted:', data);
          
          // Show success message
          showSuccessMessage(this);
          
          // Reset form
          this.reset();
      });
  });

  function showSuccessMessage(form) {
      const successMessage = document.createElement('div');
      successMessage.className = 'success-message';
      successMessage.innerHTML = `
          <i data-feather="check-circle"></i>
          <p>Vielen Dank! Ihre Nachricht wurde erfolgreich gesendet.</p>
      `;
      
      form.appendChild(successMessage);
      feather.replace();
      
      setTimeout(() => {
          successMessage.style.opacity = '1';
          successMessage.style.transform = 'translateY(0)';
      }, 10);
      
      setTimeout(() => {
          successMessage.style.opacity = '0';
          successMessage.style.transform = 'translateY(-10px)';
          setTimeout(() => {
              successMessage.remove();
          }, 300);
      }, 5000);
  }

  // Lazy loading for images
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              const img = entry.target;
              img.src = img.getAttribute('data-src');
              img.removeAttribute('data-src');
              observer.unobserve(img);
          }
      });
  });
  
  images.forEach(img => imageObserver.observe(img));

  // Animate elements on scroll
  const animateElements = document.querySelectorAll('.animate-on-scroll');
  
  const elementObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('animated');
          }
      });
  }, {
      threshold: 0.1
  });
  
  animateElements.forEach(el => elementObserver.observe(el));

  // Newsletter form special handling
  const newsletterForms = document.querySelectorAll('.newsletter-form, .footer-newsletter');
  
  newsletterForms.forEach(form => {
      form.addEventListener('submit', function(e) {
          e.preventDefault();
          const emailInput = this.querySelector('input[type="email"]');
          const email = emailInput.value;
          
          // Simulate newsletter subscription
          console.log('Newsletter subscription:', email);
          
          // Show success message
          const button = this.querySelector('button');
          const originalText = button.textContent;
          button.textContent = 'Erfolgreich angemeldet!';
          button.style.backgroundColor = '#4CAF50';
          
          setTimeout(() => {
              button.textContent = originalText;
              button.style.backgroundColor = '';
              emailInput.value = '';
          }, 3000);
      });
  });

  // Image gallery lightbox (for museum collections)
  const collectionItems = document.querySelectorAll('.collection-item');
  
  collectionItems.forEach(item => {
      item.addEventListener('click', function() {
          const img = this.querySelector('img');
          const title = this.querySelector('h3').textContent;
          
          // Create lightbox
          const lightbox = document.createElement('div');
          lightbox.className = 'lightbox';
          lightbox.innerHTML = `
              <div class="lightbox-content">
                  <span class="lightbox-close">&times;</span>
                  <img src="${img.src}" alt="${title}">
                  <p class="lightbox-caption">${title}</p>
              </div>
          `;
          
          document.body.appendChild(lightbox);
          
          // Show lightbox with animation
          setTimeout(() => {
              lightbox.classList.add('active');
          }, 10);
          
          // Close lightbox
          const closeBtn = lightbox.querySelector('.lightbox-close');
          closeBtn.addEventListener('click', closeLightbox);
          lightbox.addEventListener('click', function(e) {
              if (e.target === lightbox) {
                  closeLightbox();
              }
          });
          
          function closeLightbox() {
              lightbox.classList.remove('active');
              setTimeout(() => {
                  lightbox.remove();
              }, 300);
          }
      });
  });

  // Countdown timer for next event
  function updateEventCountdown() {
      const nextEventDate = new Date('2025-03-15T17:00:00');
      const now = new Date();
      const difference = nextEventDate - now;
      
      if (difference > 0) {
          const days = Math.floor(difference / (1000 * 60 * 60 * 24));
          const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
          
          const countdownElement = document.querySelector('.event-countdown');
          if (countdownElement) {
              countdownElement.innerHTML = `
                  <span>${days} Tage</span>
                  <span>${hours} Stunden</span>
                  <span>${minutes} Minuten</span>
              `;
          }
      }
  }
  
  // Update countdown every minute
  updateEventCountdown();
  setInterval(updateEventCountdown, 60000);

  // Print functionality for event details
  const printButtons = document.querySelectorAll('.print-event');
  
  printButtons.forEach(button => {
      button.addEventListener('click', function() {
          window.print();
      });
  });

  // Accessibility improvements
  // Skip to main content
  const skipLink = document.createElement('a');
  skipLink.href = '#main-content';
  skipLink.className = 'skip-link';
  skipLink.textContent = 'Zum Hauptinhalt springen';
  document.body.insertBefore(skipLink, document.body.firstChild);

  // Keyboard navigation
  let currentFocus = -1;
  
  document.addEventListener('keydown', function(e) {
      if (e.key === 'Tab') {
          // Handle tab navigation
          const focusableElements = document.querySelectorAll(
              'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          
          if (e.shiftKey) {
              currentFocus--;
              if (currentFocus < 0) currentFocus = focusableElements.length - 1;
          } else {
              currentFocus++;
              if (currentFocus >= focusableElements.length) currentFocus = 0;
          }
      }
  });

  // Dynamic year in footer
  const yearElement = document.querySelector('.footer-bottom p');
  if (yearElement) {
      const currentYear = new Date().getFullYear();
      yearElement.innerHTML = yearElement.innerHTML.replace('2025', currentYear);
  }

  // Handle broken images
  const allImages = document.querySelectorAll('img');
  
  allImages.forEach(img => {
      img.addEventListener('error', function() {
          this.src = 'placeholder.jpg';
          this.alt = 'Bild konnte nicht geladen werden';
      });
  });

  // Cookie consent (if needed)
  function checkCookieConsent() {
      if (!localStorage.getItem('cookieConsent')) {
          const cookieBanner = document.createElement('div');
          cookieBanner.className = 'cookie-banner';
          cookieBanner.innerHTML = `
              <div class="cookie-content">
                  <p>Wir verwenden Cookies, um Ihre Erfahrung auf unserer Website zu verbessern.</p>
                  <button class="btn btn-small btn-primary" id="acceptCookies">Akzeptieren</button>
                  <a href="#" class="cookie-link">Mehr erfahren</a>
              </div>
          `;
          
          document.body.appendChild(cookieBanner);
          
          document.getElementById('acceptCookies').addEventListener('click', function() {
              localStorage.setItem('cookieConsent', 'true');
              cookieBanner.remove();
          });
      }
  }
  
  // Check cookie consent after page load
  setTimeout(checkCookieConsent, 2000);

  // Performance optimization - debounce scroll events
  function debounce(func, wait) {
      let timeout;
      return function executedFunction(...args) {
          const later = () => {
              clearTimeout(timeout);
              func(...args);
          };
          clearTimeout(timeout);
          timeout = setTimeout(later, wait);
      };
  }

  // Sticky header on scroll
  const header = document.querySelector('header');
  let lastScrollTop = 0;
  
  const handleScroll = debounce(() => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      if (scrollTop > lastScrollTop && scrollTop > 100) {
          // Scrolling down
          header.style.transform = 'translateY(-100%)';
      } else {
          // Scrolling up
          header.style.transform = 'translateY(0)';
      }
      
      lastScrollTop = scrollTop;
  }, 10);
  
  window.addEventListener('scroll', handleScroll);

  // Add loading state to buttons on click
  const allButtons = document.querySelectorAll('.btn');
  
  allButtons.forEach(button => {
      button.addEventListener('click', function() {
          if (this.type !== 'submit') return;
          
          this.classList.add('loading');
          this.disabled = true;
          
          // Remove loading state after 2 seconds (simulate processing)
          setTimeout(() => {
              this.classList.remove('loading');
              this.disabled = false;
          }, 2000);
      });
  });

  // Initialize tooltips for abbreviated text
  const abbreviations = document.querySelectorAll('abbr');
  
  abbreviations.forEach(abbr => {
      abbr.addEventListener('mouseenter', function(e) {
          const tooltip = document.createElement('div');
          tooltip.className = 'tooltip';
          tooltip.textContent = this.getAttribute('title');
          document.body.appendChild(tooltip);
          
          const rect = this.getBoundingClientRect();
          tooltip.style.left = rect.left + 'px';
          tooltip.style.top = (rect.top - tooltip.offsetHeight - 5) + 'px';
          
          this.tooltip = tooltip;
      });
      
      abbr.addEventListener('mouseleave', function() {
          if (this.tooltip) {
              this.tooltip.remove();
          }
      });
  });

  // Log page views (analytics placeholder)
  function logPageView(page) {
      console.log('Page view:', page, new Date().toISOString());
      // Here you would send data to your analytics service
  }
  
  // Log initial page view
  logPageView(window.location.hash || '#home');
  
  // Log navigation changes
  navLinks.forEach(link => {
      link.addEventListener('click', function() {
          logPageView(this.getAttribute('href'));
      });
  });
});

// Service Worker registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
          .then(registration => console.log('ServiceWorker registered'))
          .catch(err => console.log('ServiceWorker registration failed'));
  });
}

// CSS para elementos criados dinamicamente
const style = document.createElement('style');
style.textContent = `
  .success-message {
      background: #4CAF50;
      color: white;
      padding: 15px;
      border-radius: 5px;
      margin-top: 20px;
      display: flex;
      align-items: center;
      gap: 10px;
      opacity: 0;
      transform: translateY(-10px);
      transition: all 0.3s ease;
  }
  
  .lightbox {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.9);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 2000;
      opacity: 0;
      transition: opacity 0.3s ease;
  }
  
  .lightbox.active {
      opacity: 1;
  }
  
  .lightbox-content {
      position: relative;
      max-width: 90%;
      max-height: 90%;
  }
  
  .lightbox-content img {
      max-width: 100%;
      max-height: 80vh;
      display: block;
  }
  
  .lightbox-close {
      position: absolute;
      top: -40px;
      right: 0;
      color: white;
      font-size: 30px;
      cursor: pointer;
      transition: color 0.3s ease;
  }
  
  .lightbox-close:hover {
      color: var(--gold);
  }
  
  .lightbox-caption {
      color: white;
      text-align: center;
      margin-top: 20px;
      font-size: 1.2rem;
  }
  
  .cookie-banner {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background: var(--wine);
      color: white;
      padding: 20px;
      box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.2);
      z-index: 1500;
      animation: slideUp 0.5s ease;
  }
  
  .cookie-content {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
      flex-wrap: wrap;
  }
  
  .cookie-link {
      color: var(--gold);
      text-decoration: underline;
  }
  
  @keyframes slideUp {
      from {
          transform: translateY(100%);
      }
      to {
          transform: translateY(0);
      }
  }
  
  .skip-link {
      position: absolute;
      top: -40px;
      left: 0;
      background: var(--wine);
      color: white;
      padding: 8px;
      text-decoration: none;
      border-radius: 0 0 4px 0;
  }
  
  .skip-link:focus {
      top: 0;
  }
  
  .tooltip {
      position: absolute;
      background: var(--text-dark);
      color: white;
      padding: 5px 10px;
      border-radius: 4px;
      font-size: 0.9rem;
      z-index: 1000;
      pointer-events: none;
  }
  
  .btn.loading {
      position: relative;
      color: transparent;
  }
  
  .btn.loading::after {
      content: '';
      position: absolute;
      width: 20px;
      height: 20px;
      top: 50%;
      left: 50%;
      margin-left: -10px;
      margin-top: -10px;
      border: 2px solid #f3f3f3;
      border-radius: 50%;
      border-top: 2px solid var(--wine);
      animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
  }
  
  header {
      transition: transform 0.3s ease;
  }
  
  @media print {
      header, footer, .no-print {
          display: none !important;
      }
      
      .page-section {
          page-break-inside: avoid;
      }
  }
`;
document.head.appendChild(style);