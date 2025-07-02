export default function decorate(block) {
  // Get the heading element inside the block
  const logoTitle = block.querySelector(':scope > div > div').firstElementChild;

  // Extract all logo images from <picture> elements
  const logoImages = [...block.querySelectorAll('picture')].map((picture) => ({
    src: picture.querySelector('img').src, // Get image source
    alt: picture.querySelector('img').alt || 'Logo', // Set alt text or default to 'Logo'
  }));

  const logoSlides = document.createElement('div');
  logoSlides.className = 'logo-slideshow';

  // Create logo cards efficiently using `map` and `append`
  logoSlides.append(...logoImages.map(({ src, alt }) => {
    const logoCard = document.createElement('div');
    logoCard.className = 'logo-card';

    const logoImage = Object.assign(document.createElement('img'), { src, alt });
    logoCard.append(logoImage);

    return logoCard;
  }));

  const logoContent = document.createElement('div');
  logoContent.className = 'logo-content';
  logoContent.append(logoTitle, logoSlides);

  block.replaceChildren(logoContent);

  const slideshow = block.querySelector('.logo-slideshow');

  function createClones(times = 2) {
    const cards = Array.from(slideshow.querySelectorAll('.logo-card'));
    for (let i = 0; i < times; i += 1) {
      cards.forEach((card) => {
        const clone = card.cloneNode(true);
        slideshow.appendChild(clone);
      });
    }
  }
  createClones(2);

  function slideLogos() {
    const cards = slideshow.querySelectorAll('.logo-card');
    const singleSetWidth = Array.from(cards)
      .slice(0, cards.length / 3)
      .reduce((acc, card) => acc + card.offsetWidth, 0);

    let scrollAmount = 0;
    const speed = 0.5;
    function frame() {
      scrollAmount += speed;
      if (scrollAmount >= singleSetWidth * 2) {
        scrollAmount -= singleSetWidth;
      }
      slideshow.style.transform = `translateX(-${scrollAmount}px)`;
      requestAnimationFrame(frame);
    }

    frame();
  }

  const observer = new window.IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        slideLogos();
        obs.disconnect();
      }
    });
  }, { threshold: 0.1 });

  observer.observe(block);

  logoTitle.addEventListener('click', () => {
    logoTitle.classList.toggle('clicked');
  });
}
