/* ============================================================================
   Portfolio — app.js
   ============================================================================ */

(function () {
  'use strict';

  /* --------------------------------------------------------------------------
     Helpers
     -------------------------------------------------------------------------- */
  function isVideo(src) {
    return /\.(mp4|webm|mov)$/i.test(src || '');
  }

  function escapeHtml(str) {
    if (str == null) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  /* Deterministic pseudo-random based on a string — so the SAME card always
     gets the same tape image and rotation between page loads. Otherwise tapes
     would re-shuffle on every refresh which feels jittery. */
  function hashString(str) {
    let h = 2166136261;
    for (let i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  }

  function pickTapeForId(id) {
    const tapes = window.TAPE_IMAGES || [];
    if (!tapes.length) return null;
    const idx = hashString(id || '') % tapes.length;
    return tapes[idx];
  }

  function rotationForId(id) {
    const h = hashString((id || '') + 'r');
    // Generate angle, then ensure |angle| >= 2 by pushing small values outward.
    let angle = (h % 121) / 10 - 6;   // -6 to +6
    if (Math.abs(angle) < 2) {
      angle = angle < 0 ? -2 : 2;
    }
    return angle;
  }

  /* --------------------------------------------------------------------------
     Custom cursor (꩜)
     -------------------------------------------------------------------------- */
  function initCursor() {
    if (window.matchMedia('(hover: none)').matches) return;

    const cursor = document.createElement('div');
    cursor.id = 'cursor';
    cursor.textContent = '꩜';
    cursor.style.opacity = '0';        // hidden until the first mousemove
    document.body.appendChild(cursor);

    let hasMoved = false;
    window.addEventListener('mousemove', (e) => {
      if (!hasMoved) {
        cursor.style.opacity = '1';
        hasMoved = true;
      }
      cursor.style.transform =
        `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    });
    window.addEventListener('mousedown', () => cursor.classList.add('is-down'));
    window.addEventListener('mouseup',   () => cursor.classList.remove('is-down'));
    window.addEventListener('mouseleave', () => { cursor.style.opacity = '0'; });
    window.addEventListener('mouseenter', () => {
      if (hasMoved) cursor.style.opacity = '1';
    });
  }

  /* --------------------------------------------------------------------------
     Scroll reveal
     -------------------------------------------------------------------------- */
  function initReveals() {
    const els = document.querySelectorAll('[data-reveal], .reveal');
    if (!('IntersectionObserver' in window) || !els.length) {
      els.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          } else {
            entry.target.classList.remove('is-visible');
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    els.forEach((el) => observer.observe(el));
  }

  /* --------------------------------------------------------------------------
     Cards
     -------------------------------------------------------------------------- */
  function renderCards() {
    const root = document.getElementById('projectGrid');
    if (!root || !window.PROJECTS) return;

    root.innerHTML = window.PROJECTS.map((p, idx) => {
      const tagsHtml = (p.tags || [])
        .map((t) => {
          const slug = t.toLowerCase();
          return `<span class="panel-stamp"><img src="assets/tags/${slug}.png" alt="${escapeHtml(t)}" /></span>`;
        })
        .join('');

      const displayCount = Math.max(
        1,
        Math.min(p.displayCount || 1, (p.images || []).length)
      );

      const mediaHtml = (p.images || [])
        .slice(0, displayCount)
        .map((src, i) => {
          const visibleClass = i === 0 ? 'is-visible' : '';
          if (isVideo(src)) {
            return `<video class="card-image ${visibleClass}"
                           src="${src}" autoplay loop muted playsinline
                           preload="metadata"></video>`;
          }
          return `<img class="card-image ${visibleClass}"
                       src="${src}" alt="${escapeHtml(p.title)}" loading="lazy" />`;
        })
        .join('');

      const tapeSrc = pickTapeForId(p.id);
      const tapeRot = rotationForId(p.id);
      const tapeHtml = tapeSrc
        ? `<div class="card-tape-wrap" style="--tape-rot:${tapeRot.toFixed(1)}deg;" aria-hidden="true">
             <img class="card-tape" src="${tapeSrc}" alt=""
                  onerror="this.parentNode.style.display='none';" />
           </div>`
        : '';

      const filterAttr = (p.tags || []).map((t) => t.toLowerCase()).join(' ');

      return `
        <a class="card reveal-child"
           href="#"
           data-id="${p.id}"
           data-index="${idx}"
           data-tags="${escapeHtml(filterAttr)}"
           data-clickable>
          <div class="card-frame">
            <div class="card-frame-inner">
              ${mediaHtml}
              ${tapeHtml}
            </div>
          </div>
          <div class="card-header">
            <span class="card-title">${escapeHtml(p.title)}</span>
            <span class="card-tags">${tagsHtml}</span>
          </div>
        </a>
      `;
    }).join('');

    bindCardInteractions();
  }

  /* --------------------------------------------------------------------------
     Card interactions
     -------------------------------------------------------------------------- */
  const rotationTimers = new Map();

  function bindCardInteractions() {
    const root = document.getElementById('projectGrid');
    if (!root) return;

    const AUTO_ROTATE_INTERVAL = 4000;  // default ms per image

    root.querySelectorAll('.card').forEach((card) => {
      const idx = parseInt(card.dataset.index, 10);
      const project = window.PROJECTS[idx];
      const imgs = card.querySelectorAll('.card-image');
      const durations = project.imageDurations || [];

      if (imgs.length > 1) {
        let current = 0;

        const scheduleNext = () => {
          // Wait the duration of the CURRENT image before flipping to next
          const currentDuration = durations[current] || AUTO_ROTATE_INTERVAL;
          const timer = setTimeout(() => {
            imgs.forEach((im) => im.classList.remove('is-visible'));
            current = (current + 1) % imgs.length;
            imgs[current].classList.add('is-visible');
            scheduleNext();
          }, currentDuration);
          rotationTimers.set(card, timer);
        };

        scheduleNext();
      }

      card.addEventListener('click', (e) => {
        e.preventDefault();
        openPanel(project);
      });
    });
  }

  /* --------------------------------------------------------------------------
     Filter tape bar
     -------------------------------------------------------------------------- */
     function initFilters() {
      const bar = document.querySelector('.filter-bar');
      if (!bar) return;
    
      function updateAllDimState() {
        const allBtn = bar.querySelector('.filter-tape-all');
        if (!allBtn) return;
        const allIsActive = allBtn.classList.contains('is-active');
        allBtn.classList.toggle('is-dim', !allIsActive);
      }
    
      bar.addEventListener('click', (e) => {
        const btn = e.target.closest('.filter-tape');
        if (!btn) return;
        e.preventDefault();
    
        const wasAlreadyActive = btn.classList.contains('is-active');
        const isAllButton = btn.classList.contains('filter-tape-all');
    
        bar.querySelectorAll('.filter-tape').forEach((b) => b.classList.remove('is-active'));
        btn.classList.add('is-active');
    
        const filter = btn.dataset.filter;
        const cards = document.querySelectorAll('#projectGrid .card');
        cards.forEach((card) => {
          const tags = (card.dataset.tags || '').toLowerCase();
          const show = filter === 'all' || tags.split(/\s+/).includes(filter);
          card.style.display = show ? '' : 'none';
        });
    
        updateAllDimState();
    
       // Scroll to gallery on any filter click
        const gallery = document.getElementById('projectGrid');
        if (gallery) {
          const offset = 80;
          const top = gallery.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      });
    
      updateAllDimState();
    }

  /* --------------------------------------------------------------------------
     Detail modal
     -------------------------------------------------------------------------- */
  let panelGalleryTimer = null;

  function openPanel(project) {
    const overlay = document.getElementById('panelOverlay');
    const panel = document.getElementById('panel');
    if (!overlay || !panel || !project) return;

    panel.innerHTML = buildPanelMarkup(project);
    overlay.classList.add('is-open');
    panel.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    document.body.classList.add('panel-open');

    panel.querySelector('.panel-close').addEventListener('click', closePanel);
    overlay.addEventListener('click', closePanel, { once: true });

    startPanelGallery(project.images || []);
  }

  function closePanel() {
    const overlay = document.getElementById('panelOverlay');
    const panel = document.getElementById('panel');
    if (!overlay || !panel) return;
    overlay.classList.remove('is-open');
    panel.classList.remove('is-open');
    document.body.style.overflow = '';
    if (panelGalleryTimer) {
      clearTimeout(panelGalleryTimer);
      panelGalleryTimer = null;
    }
    document.body.classList.remove('panel-open');
  }

  function buildPanelMarkup(p) {
    const tagsHtml = (p.tags || [])
      .map((t) => {
        const slug = t.toLowerCase();
        return `<span class="panel-stamp"><img src="assets/tags/${slug}.png" alt="${escapeHtml(t)}" /></span>`;
      })
      .join('');
    const detailsHtml = (p.details || []).map((d) => `<li>${escapeHtml(d)}</li>`).join('');
    const metaHtml = Object.entries(p.meta || {})
      .map(([k, v]) => `<dt>${escapeHtml(k)}</dt><dd>${escapeHtml(v)}</dd>`).join('');

    const galleryImgs = (p.images || [])
      .map((src, i) => {
        const visibleClass = i === 0 ? 'is-visible' : '';
        if (isVideo(src)) {
          return `<video class="${visibleClass}" src="${src}"
                         autoplay loop muted playsinline preload="metadata"></video>`;
        }
        return `<img class="${visibleClass}" src="${src}" alt="${escapeHtml(p.title)}" />`;
      }).join('');

    const dotsHtml = (p.images || [])
      .map((_, i) => `<button data-idx="${i}" class="${i === 0 ? 'is-active' : ''}" data-clickable></button>`)
      .join('');

    const captionsHtml = (p.images || [])
      .map((_, i) => {
        const caption = (p.captions || [])[i] || '';
        const visibleClass = i === 0 ? 'is-visible' : '';
        return `<div class="panel-caption ${visibleClass}" data-idx="${i}">${escapeHtml(caption)}</div>`;
      })
      .join('');

    return `
      <div class="panel-top">
        <span class="panel-crumb">Projects / ${escapeHtml(p.title)}</span>
        <button class="panel-close" data-clickable>Close</button>
      </div>
      <div class="panel-body">
        <div class="panel-info">
          <div class="col"><h4>Title</h4><div class="title-text">${escapeHtml(p.title)}</div></div>
          <div class="col"><h4>Company</h4><p>${escapeHtml(p.company || '')}</p></div>
          <div class="col"><h4>Role</h4><p>${escapeHtml(p.role || '')}</p></div>
        </div>
        ${detailsHtml ? `<div class="panel-detail"><h4>Detail</h4><ul>${detailsHtml}</ul></div>` : ''}
        ${tagsHtml ? `<div class="panel-tags">${tagsHtml}</div>` : ''}
        <div class="panel-gallery" id="panelGallery">
          <div class="panel-gallery-inner">${galleryImgs}</div>
          ${(p.images || []).length > 1 ? `
            <button class="panel-gallery-prev" data-clickable aria-label="Previous">‹</button>
            <button class="panel-gallery-next" data-clickable aria-label="Next">›</button>
            <div class="panel-gallery-dots">${dotsHtml}</div>
          ` : ''}
          ${captionsHtml ? `<div class="panel-captions" id="panelCaptions">${captionsHtml}</div>` : ''}
        </div>
        ${metaHtml ? `<dl class="panel-meta">${metaHtml}</dl>` : ''}
      </div>
    `;
  }

  function startPanelGallery(images) {
    if (!images || images.length <= 1) return;
    const gallery = document.getElementById('panelGallery');
    if (!gallery) return;

    const imgs = gallery.querySelectorAll('img, video');
    const dots = gallery.querySelectorAll('.panel-gallery-dots button');
    let current = 0;

    function setActive(i) {
      imgs.forEach((im, k) => im.classList.toggle('is-visible', k === i));
      dots.forEach((d, k) => d.classList.toggle('is-active', k === i));
      const captions = document.querySelectorAll('#panelCaptions .panel-caption');
      captions.forEach((c, k) => c.classList.toggle('is-visible', k === i));
      current = i;
    }

    // Click dots to jump
    dots.forEach((d) => {
      d.addEventListener('click', (e) => {
        e.stopPropagation();
        const i = parseInt(d.dataset.idx, 10);
        setActive(i);
      });
    });

    // Prev / next arrows
    const prevBtn = gallery.querySelector('.panel-gallery-prev');
    const nextBtn = gallery.querySelector('.panel-gallery-next');
    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        setActive((current - 1 + images.length) % images.length);
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        setActive((current + 1) % images.length);
      });
    }
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closePanel();
  });

  /* --------------------------------------------------------------------------
     Init
     -------------------------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', () => {
    initCursor();
    renderCards();
    initFilters();
    initReveals();

    const timeEl = document.querySelector('[data-localtime]');
    if (timeEl) {
      const update = () => {
        const d = new Date();
        const hh = d.getHours().toString().padStart(2, '0');
        const mm = d.getMinutes().toString().padStart(2, '0');
        timeEl.textContent = `${hh}:${mm}`;
      };
      update();
      setInterval(update, 30000);
    }
  });
})();
