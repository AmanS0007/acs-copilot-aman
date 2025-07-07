export default function decorate(block) {
  // Add centering styles to the block
  block.style.display = 'flex';
  block.style.flexDirection = 'column';
  block.style.alignItems = 'center';
  block.style.width = '100%';
  block.style.margin = '0 auto';
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
  // Create a container div for better centering
  const containerDiv = document.createElement('div');
  containerDiv.className = 'testimonial-container';
  containerDiv.style.width = '100%';
  containerDiv.style.maxWidth = '1200px';
  containerDiv.style.margin = '0 auto';
  containerDiv.style.display = 'flex';
  containerDiv.style.justifyContent = 'center';
  // Update block content - combine all testimonials into a single row
  containerDiv.innerHTML = `
    <div class="testimonial-wrapper">
      <div class="testimonial-scroll">
        <div class="testimonial-content-wrapper">
          ${createTestimonialHTML(testimonialsData)}
          ${createTestimonialHTML(testimonialsData)} <!-- Duplicate for smooth loop -->
        </div>
      </div>
    </div>
  `;
  // Clear the block and append the container
  block.innerHTML = '';
  block.appendChild(containerDiv);
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
