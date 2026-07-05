function stackGalleryItemsVertically() {
  const gallery = document.querySelector('.gallery');

  if (!gallery) {
    return;
  }

  gallery.style.display = 'flex';
  gallery.style.flexDirection = 'column';
  gallery.style.gap = '24px';

  gallery.querySelectorAll('.gallery-item').forEach((item) => {
    item.style.display = 'block';
    item.style.width = '100%';
    item.style.margin = '0';
  });
}

document.addEventListener('DOMContentLoaded', () => {
  stackGalleryItemsVertically();

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
});
