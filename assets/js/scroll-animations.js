// Enhanced Scroll Animations
function initScrollAnimations() {
  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        
        // Animate skill circles
        if (entry.target.classList.contains('skill-circle')) {
          const percent = entry.target.getAttribute('data-percent');
          const circle = entry.target.querySelector('.circle');
          const percentage = entry.target.querySelector('.skill-percentage');
          
          // Calculate circumference
          const radius = 70;
          const circumference = 2 * Math.PI * radius;
          
          // Set stroke dasharray and dashoffset
          circle.style.strokeDasharray = circumference;
          circle.style.strokeDashoffset = circumference;
          
          // Animate to target percentage
          setTimeout(() => {
            const offset = circumference - (percent / 100) * circumference;
            circle.style.strokeDashoffset = offset;
            
            // Animate percentage counter
            let current = 0;
            const increment = percent / 50; // 50 steps
            const timer = setInterval(() => {
              current += increment;
              if (current >= percent) {
                current = percent;
                clearInterval(timer);
              }
              percentage.textContent = Math.floor(current) + '%';
            }, 20);
          }, 300);
        }
        
        // Animate timeline items
        if (entry.target.classList.contains('timeline-item')) {
          const content = entry.target.querySelector('.timeline-content');
          content.style.transform = 'translateX(0)';
          content.style.opacity = '1';
        }
      }
    });
  }, observerOptions);

  // Observe elements
  document.querySelectorAll('.skill-circle, .timeline-item, .portfolio-item, .contact-item').forEach(el => {
    observer.observe(el);
  });

  // Scroll-triggered navigation highlighting
  function highlightNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (scrollY >= (sectionTop - 200)) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').substring(1) === current) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', highlightNavOnScroll);

  // Parallax effect for hero section
  function updateParallax() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero) {
      const rate = scrolled * -0.5;
      hero.style.transform = `translate3d(0, ${rate}px, 0)`;
    }
  }

  window.addEventListener('scroll', updateParallax);

  // Stagger animation for portfolio items
  function animatePortfolioItems() {
    const items = document.querySelectorAll('.portfolio-item');
    
    items.forEach((item, index) => {
      setTimeout(() => {
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
      }, index * 150);
    });
  }

  // Initialize animations on load
  window.addEventListener('load', () => {
    animatePortfolioItems();
    
    // Add initial styles for animations
    document.querySelectorAll('.portfolio-item').forEach(item => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(30px)';
      item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    document.querySelectorAll('.timeline-content').forEach(content => {
      content.style.transform = 'translateX(-20px)';
      content.style.opacity = '0';
      content.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
    });
  });
}

// Initialize scroll animations when DOM is loaded
document.addEventListener('DOMContentLoaded', initScrollAnimations);