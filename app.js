/* ==========================================================================
   DESIGN PORTFOLIO INTERACTION ENGINE (app.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // 0. RAI LABS Animated Title Intro Reveal
  const preloader = document.getElementById('preloader');
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add('loaded');
      if (typeof gsap !== 'undefined') {
        gsap.from('.hero-portrait', { opacity: 0, y: 60, duration: 1.2, delay: 0.2, ease: 'power3.out' });
      }
    }, 1200);
  }

  // Project Database
  const projectDatabase = {
    'dhurandhar': {
      title: 'DURANDHAR film Poster',
      tags: 'movive/cinimatic / Poster',
      description: 'A cinematic poster design inspired by "Dhurandhar", created as a personal exploration of movie-poster design and visual storytelling. The composition combines bold red typography, metallic gold lettering, dramatic imagery, deep shadows, and distressed textures to create a dark and intense cinematic atmosphere. The design focuses on strong visual hierarchy, with the "REVENGE" typography forming a powerful background element while the "DHURANDHAR" title takes center stage in the foreground. The project showcases photo manipulation, typography styling, color grading, texture work, lighting, and composition, created entirely as a personal graphic design concept.',
      images: [
        'assets/durandar.png',
        'assets/breif-durandar.png',
      ],
      deliverables: 'Cinematic Movie Poster, Typography Design, Photo Manipulation, Visual Storytelling Asset',
      tools: 'Adobe Photoshop'
    },
    'captain-america': {
      title: 'Captain America Apparel',
      tags: 'Apparel / Illustration / Print',
      description: 'A premium apparel concept featuring a bold, custom vintage-styled Captain America illustration. The design integrates high-contrast halftone styling with distressed vector typography. The print layout is optimized for direct-to-garment (DTG) printing, showcasing the iconic shield in vibrant red, white, and blue against a detailed dark street grid. Included are both the raw design files and the final retail-ready apparel hanger mockups.',
      images: [
        'assets/tshirt_mockup.png',
        'assets/captain_america_print.png'
      ],
      deliverables: 'Apparel Print Layout, Fabric Mockup',
      tools: 'Adobe Photoshop'
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
      title: 'Tulu Lipi Kalpuga Poster',
      tags: 'Typography / Calligraphy / Visual Design',
      description: 'A cultural project designed to teach and promote regional script learning ("Tulu Lipi Kalpuga"). Features organic, hand-crafted calligraphic assets set against a dark textured green background. The visual system establishes a warm, academic, and accessible identity designed to preserve and celebrate local heritage across web and print materials.',
      images: [
        'assets/tulu_lipi.jpg'
      ],
      deliverables: 'Custom Calligraphy Assets,collrge club poster, Educational Poster',
      tools: 'Procreate, Adobe Photoshop'
    },
    'ancient-vibe': {
      title: 'The Ancient Vibe',
      tags: 'Event Poster / Typography / Visual Design',
      description: 'A mystical event poster crafted for "The Ancient Vibe", presented by The Infinity Tech, Digital Athnology, and Harmonic Science under the Save The Root initiative. The design merges a dramatic ancient Indian temple backdrop with a glowing geometric zodiac wheel, channeling a cinematic spiritual energy. Bold chrome 3D typography commands the center, creating a powerful contrast between heritage and modern design aesthetics.',
      images: [
        'assets/assetsancient_vibe.jpeg'
      ],
      deliverables: 'Event Poster, Typography Layout, Digital Asset',
      tools: 'Adobe Photoshop'
    },
    'tudar': {
      title: 'Tudar club Registration poster',
      tags: 'Event Design / Cultural Branding / Poster',
      description: 'A vibrant event promotional poster designed for "Tudar", the Tulu cultural fest organized at NMAM Institute of Technology, NITTE. The composition features an ornate scroll element set against a rich green backdrop, celebrating the Tulu community\'s heritage. The bilingual layout blends Tulu script with English, presenting a warm and festive invitation to the cultural gathering. The design incorporates traditional motifs and the official NITTE branding.',
      images: [
        'assets/assetstudar_poster.jpeg'
      ],
      deliverables: 'Event Poster, Bilingual Layout, Cultural Branding Asset',
      tools: 'Adobe Photoshop'
    }
  };

  // 1. Lenis Smooth Scroll Setup
  let lenis;

  function initLenis() {
    if (typeof Lenis === 'undefined') return;
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
      if (lenis) lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    if (typeof ScrollTrigger !== 'undefined') {
      lenis.on('scroll', ScrollTrigger.update);
    }
  }

  initLenis();

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

      cursor.style.opacity = '1';
      follower.style.opacity = '1';

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

    // Hero title text parallax scroll trigger - Desktop only
    if (isDesktop) {
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
    }

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
  const modalWrapper = document.querySelector('.modal-content-wrapper');
  const projectCards = document.querySelectorAll('.work-item');

  // Intercept wheel events inside modal so Lenis doesn't block them
  if (modalWrapper) {
    modalWrapper.addEventListener('wheel', (e) => {
      e.stopPropagation();
    }, { passive: true });

    // Fix touch scroll on mobile inside modal
    let touchStartY = 0;
    modalWrapper.addEventListener('touchstart', (e) => {
      touchStartY = e.touches[0].clientY;
    }, { passive: true });

    modalWrapper.addEventListener('touchmove', (e) => {
      e.stopPropagation();
    }, { passive: true });
  }

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

    // Reset modal scroll to top
    modal.scrollTop = 0;

    // Show modal
    modal.classList.add('active');

    // Destroy lenis completely so its event listeners don't block modal scroll
    if (lenis) {
      lenis.destroy();
      lenis = null;
    }

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
        modal.scrollTop = 0;
        // Reinitialize lenis for smooth page scrolling
        initLenis();
      }
    });
  }

  // Bind triggers
  if (modalClose) modalClose.addEventListener('click', closeProjectModal);

  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      const pId = card.getAttribute('data-project');
      openProjectModal(pId);
    });
  });

  // Close modal on clicking outside content (on the modal backdrop area)
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeProjectModal();
  });

  // Category Filter Engine (Option 1)
  const filterBtns = document.querySelectorAll('.filter-btn');
  const workItems = document.querySelectorAll('.work-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      workItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filterValue === 'all' || itemCategory === filterValue) {
          item.classList.remove('hidden');
          if (typeof gsap !== 'undefined') {
            gsap.fromTo(item, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' });
          }
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });

  // Interactive & Persistent Review System (Option 3 Dynamic)
  const addReviewForm = document.getElementById('add-review-form');
  const reviewsContainer = document.getElementById('reviews-container');
  const noReviewsMsg = document.getElementById('no-reviews-msg');
  const starBtns = document.querySelectorAll('.star-btn');
  const ratingInput = document.getElementById('reviewer-rating');

  // Interactive Star Selection
  if (starBtns.length > 0) {
    starBtns.forEach(star => {
      star.addEventListener('click', () => {
        const rating = star.getAttribute('data-rating');
        ratingInput.value = rating;

        starBtns.forEach(s => {
          if (parseInt(s.getAttribute('data-rating')) <= parseInt(rating)) {
            s.classList.add('active');
          } else {
            s.classList.remove('active');
          }
        });
      });
    });
  }

  // Load Reviews from LocalStorage
  function loadSavedReviews() {
    const saved = localStorage.getItem('rai_portfolio_reviews');
    const reviews = saved ? JSON.parse(saved) : [];

    if (!reviewsContainer) return;

    reviewsContainer.innerHTML = '';

    if (reviews.length === 0) {
      if (noReviewsMsg) noReviewsMsg.style.display = 'block';
    } else {
      if (noReviewsMsg) noReviewsMsg.style.display = 'none';

      reviews.forEach((r) => {
        const starsStr = '★'.repeat(r.rating) + '☆'.repeat(5 - r.rating);
        const card = document.createElement('div');
        card.className = 'review-card';
        card.innerHTML = `
          <div class="review-stars">${starsStr}</div>
          <p class="review-text">"${escapeHtml(r.text)}"</p>
          <div class="review-author">
            <span class="author-name">${escapeHtml(r.name)}</span>
            <span class="author-role">${escapeHtml(r.role || 'Visitor')}</span>
          </div>
        `;
        reviewsContainer.appendChild(card);
      });
    }
  }

  // Admin Helper: Expose deleteReview to browser console for Admin control
  window.deleteReview = function (index) {
    const existing = JSON.parse(localStorage.getItem('rai_portfolio_reviews') || '[]');
    if (index >= 0 && index < existing.length) {
      const removed = existing.splice(index, 1);
      localStorage.setItem('rai_portfolio_reviews', JSON.stringify(existing));
      loadSavedReviews();
      console.log(`✅ Admin: Removed review by "${removed[0].name}"`);
    } else {
      console.log(`❌ Admin: Review at index ${index} not found.`);
    }
  };

  window.deleteReviewByName = function (reviewerName) {
    const existing = JSON.parse(localStorage.getItem('rai_portfolio_reviews') || '[]');
    const filtered = existing.filter(r => r.name.toLowerCase() !== reviewerName.toLowerCase());
    localStorage.setItem('rai_portfolio_reviews', JSON.stringify(filtered));
    loadSavedReviews();
    console.log(`✅ Admin: Removed reviews matching name "${reviewerName}"`);
  };

  function escapeHtml(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  // Review Modal Popup Logic
  const openReviewModalBtn = document.getElementById('open-review-modal-btn');
  const closeReviewModalBtn = document.getElementById('close-review-modal-btn');
  const reviewModal = document.getElementById('review-modal');

  function openReviewModal() {
    if (reviewModal) reviewModal.classList.add('active');
  }

  function closeReviewModal() {
    if (reviewModal) reviewModal.classList.remove('active');
  }

  if (openReviewModalBtn) openReviewModalBtn.addEventListener('click', openReviewModal);
  if (closeReviewModalBtn) closeReviewModalBtn.addEventListener('click', closeReviewModal);

  if (reviewModal) {
    reviewModal.addEventListener('click', (e) => {
      if (e.target === reviewModal) closeReviewModal();
    });
  }

  // Handle Form Submission
  if (addReviewForm) {
    addReviewForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('reviewer-name').value.trim();
      const role = document.getElementById('reviewer-role').value.trim();
      const rating = parseInt(document.getElementById('reviewer-rating').value) || 5;
      const text = document.getElementById('reviewer-text').value.trim();

      if (!name || !text) return;

      const newReview = { name, role, rating, text, date: new Date().toISOString() };

      const existing = JSON.parse(localStorage.getItem('rai_portfolio_reviews') || '[]');
      existing.unshift(newReview); // Newest review on top
      localStorage.setItem('rai_portfolio_reviews', JSON.stringify(existing));

      // Reset form
      addReviewForm.reset();
      ratingInput.value = '5';
      starBtns.forEach(s => s.classList.add('active'));

      // Close Modal and Re-render reviews list
      closeReviewModal();
      loadSavedReviews();
    });
  }

  loadSavedReviews();

  // Mobile Navigation Drawer Toggle
  const mobileNavToggle = document.getElementById('mobile-nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navMenuLinks = document.querySelectorAll('.nav-links .nav-link');

  if (mobileNavToggle && navMenu) {
    mobileNavToggle.addEventListener('click', () => {
      mobileNavToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close mobile nav menu when any link is clicked
    navMenuLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileNavToggle.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

});
