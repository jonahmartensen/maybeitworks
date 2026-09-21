function makeExternalLinksOpenInNewTab() {
  document.querySelectorAll('a[href]').forEach((link) => {
    const href = link.getAttribute('href');

    if (!href || href.startsWith('#')) {
      return;
    }

    const url = new URL(href, window.location.href);

    if (url.origin !== window.location.origin) {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    }
  });
}

function initializeHoverPreview() {
  makeExternalLinksOpenInNewTab();

  const preview = document.querySelector('.hover-preview');

  if (!preview) {
    return;
  }

  const img = preview.querySelector('img');
  const text = preview.querySelector('.preview-text');
  const links = document.querySelectorAll('.works-sidebar a');
  const isTouch = window.matchMedia('(hover: none)').matches;

  links.forEach(link => {
    if (isTouch) {
      link.addEventListener('click', e => {
        if (!preview.classList.contains('visible')) {
          e.preventDefault();

          img.src = link.dataset.image;
          text.textContent = link.dataset.text;

          const scale = parseFloat(link.dataset.scale) || 1;
          img.style.transform = `scale(${scale})`;

          preview.classList.add('visible');
        }
      });
    } else {
      link.addEventListener('mouseenter', () => {
        img.src = link.dataset.image;
        text.textContent = link.dataset.text;

        const scale = parseFloat(link.dataset.scale) || 1;
        img.style.transform = `scale(${scale})`;

        preview.classList.add('visible');
      });

      link.addEventListener('mouseleave', () => {
        preview.classList.remove('visible');
      });
    }
  });
}

function initializeDetailModal() {
  const imageModal = document.getElementById('detail-image-modal');

  if (!imageModal) {
    return;
  }

  const detailButtons = document.querySelectorAll('.detail-gallery-button');
  const imageModalImage = imageModal.querySelector('img');
  const imageModalClose = imageModal.querySelector('.image-modal-close');

  const hideImageModal = () => {
    imageModal.classList.remove('visible');
    imageModal.setAttribute('aria-hidden', 'true');
  };

  detailButtons.forEach((button) => {
    button.addEventListener('click', () => {
      imageModalImage.src = button.dataset.image;
      imageModal.classList.add('visible');
      imageModal.setAttribute('aria-hidden', 'false');
    });
  });

  imageModalClose.addEventListener('click', hideImageModal);

  imageModal.addEventListener('click', (event) => {
    if (event.target === imageModal) {
      hideImageModal();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && imageModal.classList.contains('visible')) {
      hideImageModal();
    }
  });
}

function initializeMobileGallery() {
  document.querySelectorAll('.mobile-detail-gallery').forEach((gallery) => {
    const items = [...gallery.querySelectorAll('.detail-gallery-item')];

    if (items.length === 0) {
      return;
    }

    let activeIndex = 0;
    let touchStartX = 0;

    if (items.length < 2) {
      items[0].classList.add('is-active');
      return;
    }

    const previousButton = document.createElement('button');
    previousButton.className = 'mobile-gallery-control mobile-gallery-control--previous';
    previousButton.type = 'button';
    previousButton.setAttribute('aria-label', 'Show previous image');
    previousButton.textContent = '\u2190';

    const nextButton = document.createElement('button');
    nextButton.className = 'mobile-gallery-control mobile-gallery-control--next';
    nextButton.type = 'button';
    nextButton.setAttribute('aria-label', 'Show next image');
    nextButton.textContent = '\u2192';

    const showImage = (index) => {
      activeIndex = (index + items.length) % items.length;

      items.forEach((item, itemIndex) => {
        item.classList.toggle('is-active', itemIndex === activeIndex);
      });
    };

    showImage(0);

    gallery.append(previousButton, nextButton);
    previousButton.addEventListener('click', () => showImage(activeIndex - 1));
    nextButton.addEventListener('click', () => showImage(activeIndex + 1));

    gallery.addEventListener('touchstart', (event) => {
      touchStartX = event.changedTouches[0].clientX;
    }, { passive: true });

    gallery.addEventListener('touchend', (event) => {
      const touchDistance = event.changedTouches[0].clientX - touchStartX;

      if (Math.abs(touchDistance) >= 40) {
        showImage(activeIndex + (touchDistance < 0 ? 1 : -1));
      }
    }, { passive: true });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initializeHoverPreview();
  initializeDetailModal();
  initializeMobileGallery();
});
