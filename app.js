/* ==========================================================================
   DESIGN PORTFOLIO INTERACTION ENGINE (app.js)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // URL Hash Auto-Routing (#professional and #design)
  if (window.location.hash === '#professional' || window.location.hash === '#pro') {
    if (!window.location.pathname.endsWith('professional.html')) {
      window.location.href = 'professional.html';
      return;
    }
  } else if (window.location.hash === '#design' || window.location.hash === '#creative') {
    if (window.location.pathname.endsWith('professional.html')) {
      window.location.href = 'index.html';
      return;
    }
  }

  // 0. RAI LABS Animated Title Intro Reveal
  const preloader = document.getElementById('preloader');
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add('loaded');
      if (typeof gsap !== 'undefined') {
        gsap.from('.hero-portrait', { opacity: 0, y: 60, duration: 1.2, delay: 0.2, ease: 'power3.out' });
      }
    }, 1800);
  }

  // Project Database
  const projectDatabase = {
    'dhurandhar': {
      title: 'DHURANDHAR film Poster',
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
      title: 'Tudar Club Registration Poster',
      tags: 'Tudar / Event Design / Cultural Branding',
      description: 'A vibrant event promotional poster designed for "Tudar", the Tulu cultural club and fest organized at NMAM Institute of Technology, NITTE. The composition features an ornate scroll element set against a rich green backdrop, celebrating the Tulu community\'s heritage. The bilingual layout blends Tulu script with English, presenting a warm and festive invitation to the cultural gathering.',
      images: [
        'assets/assetstudar_poster.jpeg'
      ],
      deliverables: 'Event Poster, Bilingual Layout, Cultural Branding Asset',
      tools: 'Adobe Photoshop'
    },
    'tudar-marnemi': {
      title: 'Marnemi Da Eddeppulu - Festival Poster',
      tags: 'Tudar / Festive Poster / Visual Art',
      description: 'A festive poster designed for Tudar club to celebrate Navratri and Dussehra (Marnemi) across Tulunad. The composition highlights the resplendent Mangalore Dasara Sharada deity adorned in traditional gold ornaments and floral garlands, backlit with warm ambient illumination and traditional Pili Nalike (tiger dance) background art textures.',
      images: [
        'assets/tudar_marnemi.jpg'
      ],
      deliverables: 'Festival Poster Art, Social Media Creative, Traditional Typography Layout',
      tools: 'Adobe Photoshop, Lightroom'
    },
    'tudar-attemi': {
      title: 'Attemi Da Eddeppulu - Krishna Janmashtami',
      tags: 'Tudar / Digital Art / Festive Poster',
      description: 'A vibrant cultural poster designed for Krishna Janmashtami (Attemi) for Tudar. Features an illustration of infant Krishna asleep on Adisesha in a wooden vessel over sacred waters, framed with rich green gradients, peacock feather textures, and authentic Tulu calligraphy.',
      images: [
        'assets/tudar_attemi.jpg'
      ],
      deliverables: 'Digital Illustration Poster, Festival Creative, Tulu Script Lettering',
      tools: 'Adobe Photoshop, Illustrator'
    },
    'tudar-nagarapanchami': {
      title: 'Nagarapanchami Da Eddeppulu',
      tags: 'Tudar / Heritage / Festival Poster',
      description: 'A reverent cultural poster celebrating the sacred festival of Nagarapanchami in coastal Karnataka. The design centers around a carved serpent stone idol adorned with fresh jasmine (sevanthige) garlands and deep ceremonial green textures, embodying traditional spiritual heritage.',
      images: [
        'assets/tudar_nagarapanchami.jpg'
      ],
      deliverables: 'Festival Poster, Visual Direction, Typography Styling',
      tools: 'Adobe Photoshop'
    },
    'tudar-tulu-lipi': {
      title: 'Tulu Lipi Dinotha - Cultural Commemoration',
      tags: 'Tudar / Typography / Cultural Poster',
      description: 'Commemorative educational poster for Tulu Lipi Dinotha (Tulu Script Day) created for Tudar at NMAM Institute of Technology, Nitte. Highlights academic preservation of the indigenous Tulu lipi script with bilingual headings and portraiture honoring pioneering linguistic scholars.',
      images: [
        'assets/tudar_tulu_lipi_dinotha.jpg'
      ],
      deliverables: 'Commemorative Poster, Academic Branding, Tulu Calligraphy Layout',
      tools: 'Adobe Photoshop, Illustrator'
    },
    'tudar-su-paniyaadi': {
      title: 'S.U. Paniyaadi - Official Language Tribute',
      tags: 'Tudar / Editorial / Cultural Tribute',
      description: 'An editorial tribute poster honoring literary legend S.U. Paniyaadi and his historic advocacy for Tulu as an official state language ("Tulu Nana Karnataka Rajyoda Adhikrutha Raajya Baase"). Designed for Tudar, blending classical portraiture, historic motifs, and dignified typography.',
      images: [
        'assets/tudar_su_paniyaadi.jpg'
      ],
      deliverables: 'Tribute Poster Design, Typography Layout, Historical Heritage Art',
      tools: 'Adobe Photoshop'
    },
    'tudar-president': {
      title: 'Tudar Executive Board - President Announcement',
      tags: 'Tudar / Leadership Poster / Photo Manipulation',
      description: 'Official announcement poster introducing Gagan R Rai as President (2025-26) of Tudar at NMAMIT. Features composite photography blending the executive president portrait wearing the ceremonial Jai Tulunad stole with team archives and energetic brushed typography.',
      images: [
        'assets/tudar_president_gagan_rai.jpg'
      ],
      deliverables: 'Executive Announcement Poster, Photo Retouching & Composite, Social Creative',
      tools: 'Adobe Photoshop, Lightroom'
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

    // Tight, crisp follow effect for follower (eliminates wobble)
    function updateFollower() {
      followerX += (cursorX - followerX) * 0.45;
      followerY += (cursorY - followerY) * 0.45;

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

        // Subtle pull towards cursor (reduced offset for natural hover)
        gsap.to(el, {
          x: x * 0.08,
          y: y * 0.08,
          duration: 0.3,
          ease: 'power2.out'
        });
      });

      el.addEventListener('mouseleave', () => {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 0.4,
          ease: 'power2.out'
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

    // Staggered fade-up for section headers, cards and work items
    const fadeUpTriggers = [
      '.section-header', '.work-item', '.service-item', '.about-container', '.contact-wrap',
      '.pro-sec-head', '.metric-block', '.timeline-card-clean', '.skill-box', '.pro-card-clean', '.contact-box-clean', '.proj-card-clean'
    ];
    fadeUpTriggers.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(element => {
        gsap.fromTo(element,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: element,
              start: 'top 88%',
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
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeProjectModal();
    });
  }

  // Category Filter Engine
  const filterBtns = document.querySelectorAll('.filter-btn');
  const workItems = document.querySelectorAll('.work-item');

  function applyFilter(filterValue) {
    const filter = (filterValue || 'poster').toLowerCase();
    workItems.forEach(item => {
      const itemCategory = (item.getAttribute('data-category') || '').toLowerCase();
      const categories = itemCategory.split(/\s+/);
      if (filter === 'all' || categories.includes(filter)) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = (btn.getAttribute('data-filter') || '').toLowerCase();
      applyFilter(filterValue);

      workItems.forEach(item => {
        if (!item.classList.contains('hidden') && typeof gsap !== 'undefined') {
          gsap.fromTo(item, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' });
        }
      });
    });
  });

  // Apply default active filter ('poster') on page load
  const initialActiveBtn = document.querySelector('.filter-btn.active');
  if (initialActiveBtn) {
    applyFilter(initialActiveBtn.getAttribute('data-filter'));
  } else {
    applyFilter('poster');
  }

  // Comprehensive Header Navigation & Scroll-Spy Active Indicator
  const mobileNavToggle = document.getElementById('mobile-nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const allNavLinks = document.querySelectorAll('.nav-links .nav-link');

  function updateActiveNavLink(targetHref) {
    allNavLinks.forEach(l => l.classList.remove('active'));
    if (targetHref) {
      const matchingLink = Array.from(allNavLinks).find(l => l.getAttribute('href') === targetHref);
      if (matchingLink) matchingLink.classList.add('active');
    }
  }

  // Bind click handlers to all nav links (Desktop + Mobile)
  allNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      if (mobileNavToggle && navMenu) {
        mobileNavToggle.classList.remove('active');
        navMenu.classList.remove('active');
      }

      const href = link.getAttribute('href');

      if (href && href.startsWith('#')) {
        e.preventDefault();
        updateActiveNavLink(href);

        if (href === '#' || href === '#home' || href === '#top') {
          if (lenis) {
            lenis.scrollTo(0);
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        } else {
          const targetElem = document.querySelector(href);
          if (targetElem) {
            const headerOffset = 80;
            const elementPosition = targetElem.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - headerOffset;

            if (lenis) {
              lenis.scrollTo(offsetPosition);
            } else {
              window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
            }
          }
        }
      }
    });
  });

  // Mobile Hamburger Toggle
  if (mobileNavToggle && navMenu) {
    mobileNavToggle.addEventListener('click', () => {
      mobileNavToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
  }

  // Bind Main Logo to scroll top
  const siteLogo = document.querySelector('.logo');
  if (siteLogo) {
    siteLogo.addEventListener('click', (e) => {
      e.preventDefault();
      updateActiveNavLink('#');
      if (lenis) {
        lenis.scrollTo(0);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  // ScrollSpy: Update active nav link dynamically as user scrolls down the page
  const pageSections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let currentSectionId = '#';
    const scrollPosition = window.scrollY + 120;

    pageSections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSectionId = '#' + section.getAttribute('id');
      }
    });

    if (window.scrollY < 200) {
      currentSectionId = '#';
    }

    updateActiveNavLink(currentSectionId);
  });

});
