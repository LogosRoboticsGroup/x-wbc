const video = document.getElementById('hero-video');
const videoToggle = document.getElementById('video-toggle');

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  video.pause();
  videoToggle.classList.add('is-paused');
  videoToggle.setAttribute('aria-label', 'Play hero video');
  videoToggle.setAttribute('aria-pressed', 'true');
}

videoToggle.addEventListener('click', () => {
  if (video.paused) {
    video.play();
    videoToggle.classList.remove('is-paused');
    videoToggle.setAttribute('aria-label', 'Pause hero video');
    videoToggle.setAttribute('aria-pressed', 'false');
  } else {
    video.pause();
    videoToggle.classList.add('is-paused');
    videoToggle.setAttribute('aria-label', 'Play hero video');
    videoToggle.setAttribute('aria-pressed', 'true');
  }
});

const tabs = [...document.querySelectorAll('[role="tab"]')];
const panels = [...document.querySelectorAll('[role="tabpanel"]')];

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    tabs.forEach((item) => item.setAttribute('aria-selected', String(item === tab)));
    panels.forEach((panel) => {
      const active = panel.id === tab.dataset.panel;
      panel.hidden = !active;
      panel.classList.toggle('is-active', active);
    });
  });
});

const copyButton = document.getElementById('copy-bibtex');
copyButton.addEventListener('click', async () => {
  const bibtex = document.getElementById('bibtex').innerText;
  try {
    await navigator.clipboard.writeText(bibtex);
    copyButton.textContent = 'Copied';
    window.setTimeout(() => { copyButton.textContent = 'Copy BibTeX'; }, 1800);
  } catch {
    copyButton.textContent = 'Select to copy';
  }
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach((section) => revealObserver.observe(section));
