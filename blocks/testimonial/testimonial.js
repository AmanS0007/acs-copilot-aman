export default function decorate(block) {
  // Extract testimonials data from the block
  const testimonialsData = [...block.children].map((row) => {
    // Extract title
    const titleElement = row.querySelector(':scope > div:nth-child(2)').firstElementChild;
    const testimonialTitle = titleElement ? titleElement.textContent.trim() : '';

    // Extract paragraphs
    const paragraphs = row.querySelectorAll('p');
    const testimonialText = paragraphs.length > 1 ? paragraphs[1].textContent.trim() : '';

    return {
      testimonialTitle,
      // testimonialLink, // Now properly formatted as an `<a>` tag
      testimonialText,
    };
  });

  // Generate HTML structure for testimonials
  const createTestimonialHTML = (items) => items
    .map((test) => `
      <div class="testimonial-card">
        <div class="testimonial-content">
          <p class="quote">${test.testimonialText}</p>
        </div>
        <div class="testimonial-author">
          <div class="author-info">
            <h5>${test.testimonialTitle}</h5>
            ${test.testimonialLink ? `<p>${test.testimonialLink}</p>` : ''}
          </div>
        </div>
      </div>
    `).join('');

  // Update block content
  block.innerHTML = `
    <div class="testimonial-wrapper">
      <div class="testimonial-scroll top">
        <div class="testimonial-content-wrapper">
          ${createTestimonialHTML(testimonialsData.slice(0, 4))}
          ${createTestimonialHTML(testimonialsData.slice(0, 4))} <!-- Duplicate for smooth loop -->
        </div>
      </div>
      <div class="testimonial-scroll bottom">
        <div class="testimonial-content-wrapper">
          ${createTestimonialHTML(testimonialsData.slice(4))}
          ${createTestimonialHTML(testimonialsData.slice(4))} <!-- Duplicate for smooth loop -->
        </div>
      </div>
    </div>
  `;

  // Functionality to pause and play the testimonial rows
  const testimonialWrapper = document.querySelector('.testimonial-wrapper');

  testimonialWrapper.addEventListener('mouseenter', () => {
    document.querySelectorAll('.testimonial-content-wrapper').forEach((card) => {
      card.style.animationPlayState = 'paused';
    });
  });

  testimonialWrapper.addEventListener('mouseleave', () => {
    document.querySelectorAll('.testimonial-content-wrapper').forEach((card) => {
      card.style.animationPlayState = 'running';
    });
  });
}
