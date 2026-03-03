$(document).ready(function () {
  // ----- Dark Mode Toggle -----
  const themeToggle = $('#theme-toggle');
  const body = $('body');
  const icon = themeToggle.find('i');

  if (localStorage.getItem('dark-mode') === 'enabled') {
    body.addClass('dark-mode');
    icon.removeClass('fa-moon').addClass('fa-sun');
  }

  themeToggle.on('click', function () {
    body.toggleClass('dark-mode');
    if (body.hasClass('dark-mode')) {
      icon.removeClass('fa-moon').addClass('fa-sun');
      localStorage.setItem('dark-mode', 'enabled');
    } else {
      icon.removeClass('fa-sun').addClass('fa-moon');
      localStorage.setItem('dark-mode', 'disabled');
    }
  });

  // ----- Mobile menu toggle -----
  $('#menu').click(function () {
    $(this).toggleClass('fa-times');
    $('.navbar').toggleClass('nav-toggle');
  });

  // ----- Scroll active link & scroll top button -----
  $(window).on('scroll load', function () {
    $('#menu').removeClass('fa-times');
    $('.navbar').removeClass('nav-toggle');

    if (window.scrollY > 60) {
      $('#scroll-top').addClass('active');
    } else {
      $('#scroll-top').removeClass('active');
    }

    const headerHeight = $('header').outerHeight();
    $('section').each(function () {
      let height = $(this).height();
      let offset = $(this).offset().top - headerHeight - 20;
      let top = $(window).scrollTop();
      let id = $(this).attr('id');

      if (top > offset && top < offset + height) {
        $('.navbar ul li a').removeClass('active');
        $('.navbar').find(`[href="#${id}"]`).addClass('active');
      }
    });

    // Trigger skill bar animation when skills section is in view
    animateSkills();
  });

  // ----- Smooth scrolling with header offset -----
  $('a[href*="#"]').on('click', function (e) {
    e.preventDefault();
    const target = $($(this).attr('href'));
    if (target.length) {
      const headerHeight = $('header').outerHeight();
      $('html, body').animate({
        scrollTop: target.offset().top - headerHeight,
      }, 500, 'linear');
    }
  });

  // ----- Preloader -----
  function loader() {
    $('.loader-container').addClass('fade-out');
  }
  function fadeOut() {
    setTimeout(loader, 500);
  }
  fadeOut();

  // ----- EmailJS -----
  (function () {
    // Replace with your actual public key from the API Keys page if changed
    emailjs.init("Hk6Xjzz70iGNxwSeI");
  })();

  $("#contact-form").submit(function (event) {
    event.preventDefault();
    // Updated service ID and template ID from your dashboard
    emailjs.sendForm('service_nsl49kr', 'template_92qbg1k', '#contact-form')
      .then(function (response) {
        console.log('SUCCESS!', response.status, response.text);
        alert("Message sent successfully!");
        $("#contact-form")[0].reset();
      }, function (error) {
        console.log('FAILED...', error);
        alert("Failed to send message. Please try again.");
      });
  });

  // ----- Typed.js -----
  var typed = new Typed(".typing-text", {
    strings: ["full-stack development", "web applications", "database design", "REST APIs", "problem solving"],
    loop: true,
    typeSpeed: 50,
    backSpeed: 25,
    backDelay: 500,
  });

  // ----- Vanilla Tilt -----
  VanillaTilt.init(document.querySelectorAll(".tilt"), {
    max: 15,
    speed: 400,
    glare: true,
    "max-glare": 0.5,
  });

  // ----- Scroll Reveal -----
  const srtop = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 1000,
    reset: false,
  });
  srtop.reveal('.home .content h2', { delay: 200 });
  srtop.reveal('.home .content p', { delay: 200 });
  srtop.reveal('.home .content .btn', { delay: 200 });
  srtop.reveal('.home .image', { delay: 400 });
  srtop.reveal('.about .content h3', { delay: 200 });
  srtop.reveal('.about .content .tag', { delay: 200 });
  srtop.reveal('.about .content p', { delay: 200 });
  srtop.reveal('.about .content .box-container', { delay: 200 });
  srtop.reveal('.about .content .resumebtn', { delay: 200 });
  srtop.reveal('.skills .skill-category', { interval: 200 });
  srtop.reveal('.education .box', { interval: 200 });
  srtop.reveal('.work .box', { interval: 200 });
  srtop.reveal('.contact .container', { delay: 400, reset: false });

  // ----- Particles.js -----
  particlesJS('particles-js', {
    particles: {
      number: { value: 80, density: { enable: true, value_area: 800 } },
      color: { value: '#6366f1' },
      shape: { type: 'circle' },
      opacity: { value: 0.5, random: false },
      size: { value: 3, random: true },
      line_linked: { enable: true, distance: 150, color: '#6366f1', opacity: 0.4, width: 1 },
      move: { enable: true, speed: 6, direction: 'none', random: false, straight: false, out_mode: 'out' }
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: { enable: true, mode: 'repulse' },
        onclick: { enable: true, mode: 'push' },
        resize: true
      }
    },
    retina_detect: true
  });

  // ----- Load projects dynamically -----
  fetch('assets/data/projects.json')
    .then(response => response.json())
    .then(data => {
      let projectsHTML = '';
      data.forEach(project => {
        projectsHTML += `
          <div class="box tilt">
            <img draggable="false" src="assets/images/projects/${project.image}" alt="${project.name}" />
            <div class="content">
              <div class="tag"><h3>${project.name}</h3></div>
              <div class="desc">
                <p>${project.desc}</p>
                <div class="btns">
                  <a href="${project.view}" class="btn" target="_blank"><i class="fas fa-eye"></i> View</a>
                  <a href="${project.code}" class="btn" target="_blank">Code <i class="fas fa-code"></i></a>
                </div>
              </div>
            </div>
          </div>
        `;
      });
      $('#projectsContainer').html(projectsHTML);
      VanillaTilt.init(document.querySelectorAll(".tilt"), {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.5,
      });
    })
    .catch(err => console.error('Error loading projects:', err));

  // ----- Animate skill bars on scroll -----
  function animateSkills() {
    $('.skill-progress').each(function () {
      const bar = $(this);
      const rect = bar[0].getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
      if (isVisible && !bar.hasClass('animate')) {
        const width = bar.data('width') || bar.attr('data-width');
        if (width) {
          bar.css('--target-width', width + '%');
          bar.addClass('animate');
        }
      }
    });
  }
  // Initial check
  animateSkills();
});