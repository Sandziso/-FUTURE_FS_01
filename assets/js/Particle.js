// Particle System for Background
function initParticles() {
  const canvas = document.getElementById('particlesCanvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  
  // Set canvas dimensions
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  // Particle array
  const particles = [];
  const particleCount = 150;
  
  // Colors based on theme
  const getParticleColor = () => {
    const theme = document.documentElement.getAttribute('data-theme');
    return theme === 'light' 
      ? 'rgba(79, 70, 229, 0.3)' 
      : 'rgba(99, 102, 241, 0.3)';
  };
  
  // Particle class
  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 1;
      this.speedX = Math.random() * 1 - 0.5;
      this.speedY = Math.random() * 1 - 0.5;
      this.color = getParticleColor();
      this.originalColor = this.color;
    }
    
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      
      // Bounce off walls
      if (this.x > canvas.width) this.x = 0;
      if (this.x < 0) this.x = canvas.width;
      if (this.y > canvas.height) this.y = 0;
      if (this.y < 0) this.y = canvas.height;
      
      // Mouse interaction
      const mouse = window.mousePosition;
      if (mouse) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 100;
        
        if (distance < maxDistance) {
          // Move away from mouse
          const force = (maxDistance - distance) / maxDistance;
          this.x += dx * force * 0.1;
          this.y += dy * force * 0.1;
          
          // Change color based on distance
          const alpha = 0.5 * (1 - distance / maxDistance);
          this.color = this.originalColor.replace('0.3', alpha);
        } else {
          this.color = this.originalColor;
        }
      }
    }
    
    draw() {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  
  // Create particles
  function createParticles() {
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }
  
  // Draw connections between particles
  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          ctx.beginPath();
          ctx.strokeStyle = getParticleColor().replace('0.3', (0.1 * (1 - distance/100)));
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }
  
  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(particle => {
      particle.update();
      particle.draw();
    });
    
    drawConnections();
    requestAnimationFrame(animate);
  }
  
  // Handle resize
  function handleResize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  // Track mouse position
  window.mousePosition = null;
  canvas.addEventListener('mousemove', (e) => {
    window.mousePosition = {
      x: e.clientX,
      y: e.clientY
    };
  });
  
  canvas.addEventListener('mouseleave', () => {
    window.mousePosition = null;
  });
  
  // Initialize
  createParticles();
  animate();
  
  // Event listeners
  window.addEventListener('resize', handleResize);
  
  // Update particles on theme change
  document.addEventListener('themeChange', () => {
    particles.forEach(particle => {
      particle.color = getParticleColor();
      particle.originalColor = particle.color;
    });
  });
}

// Initialize particles when DOM is loaded
document.addEventListener('DOMContentLoaded', initParticles);