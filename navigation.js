document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.page-section');
    const navMenu = document.querySelector('.nav-menu');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');    function toggleMobileMenu(show) {
        if (mobileMenuToggle && navMenu) {
            const spans = mobileMenuToggle.querySelectorAll('span');
            const overlay = document.querySelector('.mobile-menu-overlay');
            
            if (show) {
                navMenu.classList.add('active');
                if (overlay) overlay.classList.add('active');
                spans[0].style.transform = 'rotate(45deg) translate(4px, 4px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(4px, -4px)';
                document.body.style.overflow = 'hidden'; // Previne rolagem
            } else {
                navMenu.classList.remove('active');
                if (overlay) overlay.classList.remove('active');
                spans.forEach(span => {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                });
                document.body.style.overflow = ''; // Restaura rolagem
            }
        }
    }

    function showSection(targetId) {
        // Hide all sections
        sections.forEach(section => section.style.display = 'none');

        // Show target section
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            targetSection.style.display = 'block';
        }

        // Update active nav link
        navLinks.forEach(link => {
            if (link.getAttribute('href') === targetId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // Close mobile menu
        toggleMobileMenu(false);

        // Scroll to top
        window.scrollTo(0, 0);
    }

    // Mobile menu toggle
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            const isActive = navMenu.classList.contains('active');
            toggleMobileMenu(!isActive);
        });
    }

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navMenu && !navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            toggleMobileMenu(false);
        }
    });

    // Navigation click handlers
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            showSection(targetId);
            history.pushState(null, null, targetId);
        });
    });

    // Handle browser back/forward
    window.addEventListener('popstate', () => {
        const hash = window.location.hash || '#home';
        showSection(hash);
    });

    // Initialize with correct section
    const initialHash = window.location.hash || '#home';
    showSection(initialHash);
});
