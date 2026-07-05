const preview = document.querySelector('.hover-preview');
const img = preview.querySelector('img');
const text = preview.querySelector('.preview-text');
const links = document.querySelectorAll('.works-sidebar a');

const baseScale = 1;

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
