/* ==========================================================================
   DESIGN PORTFOLIO INTERACTION ENGINE (app.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // Project Database
  const projectDatabase = {
    'captain-america': {
      title: 'Captain America Apparel',
      tags: 'Apparel / Illustration / Print',
      description: 'A premium apparel concept featuring a bold, custom vintage-styled Captain America illustration. The design integrates high-contrast halftone styling with distressed vector typography. The print layout is optimized for direct-to-garment (DTG) printing, showcasing the iconic shield in vibrant red, white, and blue against a detailed dark street grid. Included are both the raw design files and the final retail-ready apparel hanger mockups.',
      images: [
        'assets/tshirt_mockup.png',
        'assets/captain_america_print.png'
      ],
      deliverables: 'Apparel Print Layout, Vector Illustration, Fabric Mockup',
      tools: 'Adobe Photoshop, Adobe Illustrator'
    },
    'conquest': {
      title: 'The Conquest Poster',
      tags: 'Poster Design / Double Exposure / Branding',
      description: 'An editorial double-exposure commemorative poster celebrating Virat Kohli and Royal Challengers Bangalore\'s historic triumph. The art piece blends multiple high-contrast silhouette layers, capturing the intense determination and the raw emotion of the victory moments. The composition uses elegant serif typography, clean spacing, and detailed masks to construct a premium sport art piece.',
      images: [
        'assets/virat_conquest.png'
      ],
      deliverables: 'Double Exposure Digital Art, Typography Poster, Commemorative Asset',
      tools: 'Adobe Photoshop, Lightroom'
    },
    'tulu-lipi': {
      title: 'Tulu Lipi Kalpuga branding',
      tags: 'Typography / Calligraphy / Visual Design',
      description: 'A cultural branding and lettering project designed to teach and promote regional script learning ("Tulu Lipi Kalpuga"). Features organic, hand-crafted calligraphic assets set against a dark textured green background. The visual system establishes a warm, academic, and accessible identity designed to preserve and celebrate local heritage across web and print materials.',
      images: [
        'assets/tulu_lipi.jpg'
      ],
      deliverables: 'Custom Calligraphy Assets, Brand Identity System, Educational Poster',
      tools: 'Procreate, Adobe Illustrator'
    }
  };

  // 1. Lenis Smooth Scroll Setup
  let lenis;
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Sync GSAP ScrollTrigger with Lenis
    lenis.on('scroll', ScrollTrigger.update);
  }

  // 2. Custom Cursor & Follower Logic
  const cursor = document.querySelector('.custom-cursor');
  const follower = document.querySelector('.custom-cursor-follower');
  const isDesktop = window.innerWidth >= 1024;

  let cursorX = 0, cursorY = 0;
  let followerX = 0, followerY = 0;

  if (isDesktop && cursor && follower) {
    window.addEventListener('mousemove', (e) => {
      cursorX = e.clientX;
      cursorY = e.clientY;
      
      // Move main cursor instantly
      cursor.style.left = `${cursorX}px`;
      cursor.style.top = `${cursorY}px`;
    });

    // Smooth follow effect for follower
    function updateFollower() {
      followerX += (cursorX - followerX) * 0.15;
      followerY += (cursorY - followerY) * 0.15;

      follower.style.left = `${followerX}px`;
      follower.style.top = `${followerY}px`;

      requestAnimationFrame(updateFollower);
    }
    updateFollower();

    // Hover states for cursor expansion
    const hoverElements = document.querySelectorAll('a, button, .work-item, .magnetic');
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('hovering');
        follower.classList.add('hovering');
      });
      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('hovering');
        follower.classList.remove('hovering');
      });
    });

    // Hide custom cursor when mouse leaves window
    document.addEventListener('mouseleave', () => {
      cursor.style.opacity = 0;
      follower.style.opacity = 0;
    });
    document.addEventListener('mouseenter', () => {
      cursor.style.opacity = 1;
      follower.style.opacity = 1;
    });
  }

  // 3. Magnetic Hover Button Effect
  const magneticElements = document.querySelectorAll('.magnetic');
  if (isDesktop) {
    magneticElements.forEach(el => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        // Pull elements slightly towards cursor
        gsap.to(el, {
          x: x * 0.35,
          y: y * 0.35,
          duration: 0.3,
          ease: 'power2.out'
      });
    });

      el.addEventListener('mouseleave', () => {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.3)'
        });
      });
    });
  }

  // 4. Hero Portrait Intro Animation & Mouse Parallax
  const portrait = document.querySelector('.hero-portrait');
  if (portrait) {
    // Entrance Animation
    gsap.to(portrait, {
      opacity: 1,
      y: 0,
      duration: 1.5,
      ease: 'power4.out',
      delay: 0.2
    });

    // Parallax on mouse move - only on Desktop
    if (isDesktop) {
      window.addEventListener('mousemove', (e) => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const moveX = (e.clientX - width / 2) / (width / 2) * 20; // max 20px
        const moveY = (e.clientY - height / 2) / (height / 2) * 20; // max 20px

        gsap.to(portrait, {
          x: moveX,
          y: moveY,
          duration: 0.8,
          ease: 'power2.out'
        });

        // Background typography parallax
        gsap.to('.hero-bg-text-back', {
          x: -moveX * 0.8,
          y: -moveY * 0.8,
          duration: 0.8,
          ease: 'power2.out'
        });

        gsap.to('.hero-bg-text-front', {
          x: moveX * 0.5,
          y: moveY * 0.5,
          duration: 0.8,
          ease: 'power2.out'
        });
      });
    }
  }

  // 5. Scroll Triggered Entrance Animations
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Hero title text parallax scroll trigger
    gsap.to('.hero-bg-text-back', {
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      },
      yPercent: -15
    });

    gsap.to('.hero-bg-text-front', {
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      },
      yPercent: 15
    });

    // Staggered fade-up for section headers and work cards
    const fadeUpTriggers = ['.section-header', '.work-item', '.service-item', '.about-container', '.contact-wrap'];
    fadeUpTriggers.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(element => {
        gsap.fromTo(element, 
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        );
      });
    });
  }

  // 6. Modal Case Study View System
  const modal = document.getElementById('projectModal');
  const modalClose = document.querySelector('.close-modal-btn');
  const modalOverlay = document.querySelector('.modal-overlay');
  const projectCards = document.querySelectorAll('.work-item');

  function openProjectModal(projectId) {
    const data = projectDatabase[projectId];
    if (!data) return;

    // Fill details
    modal.querySelector('.modal-tags').textContent = data.tags;
    modal.querySelector('.modal-title').textContent = data.title;
    modal.querySelector('.overview-text').textContent = data.description;
    modal.querySelector('.deliverables-text').textContent = data.deliverables;
    modal.querySelector('.tools-text').textContent = data.tools;

    // Build images
    const mediaContainer = modal.querySelector('.modal-media-grid');
    mediaContainer.innerHTML = '';
    data.images.forEach(imgSrc => {
      const img = document.createElement('img');
      img.src = imgSrc;
      img.alt = data.title;
      mediaContainer.appendChild(img);
    });

    // Show modal
    modal.classList.add('active');
    if (lenis) lenis.stop(); // Stop scroll behind modal
    document.body.style.overflow = 'hidden';

    // Animate content up
    gsap.fromTo('.modal-content', 
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power4.out', delay: 0.1 }
    );
  }

  function closeProjectModal() {
    gsap.to('.modal-content', {
      y: 50,
      opacity: 0,
      duration: 0.4,
      ease: 'power3.in',
      onComplete: () => {
        modal.classList.remove('active');
        if (lenis) lenis.start(); // Resume scroll
        document.body.style.overflow = '';
      }
    });
  }

  // Bind triggers
  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      const pId = card.getAttribute('data-project');
      openProjectModal(pId);
    });
  });

  modalClose.addEventListener('click', closeProjectModal);
  modalOverlay.addEventListener('click', closeProjectModal);

  // Close modal with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeProjectModal();
    }
  });

});
