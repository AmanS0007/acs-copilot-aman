import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  // Extract testimonials data from the block
  const testimonialsData = [...block.children].map((row) => {
    const pictureElement = row.querySelector('picture');
    const imgElement = pictureElement ? pictureElement.querySelector('img') : null;

    // Extract title
    const titleElement = row.querySelector('h5');
    const testimonialTitle = titleElement ? titleElement.textContent.trim() : '';

    // Extract paragraphs
    const paragraphs = row.querySelectorAll('p');
    
    // Extract hyperlink from the first <p>
    const linkElement = paragraphs.length > 0 ? paragraphs[0].querySelector('a') : null;
    const testimonialLink = linkElement ? `<a href="${linkElement.href}" class="testimonial-link">${linkElement.textContent}</a>` : '';

    // Extract text from the second <p>
    const testimonialText = paragraphs.length > 1 ? paragraphs[1].textContent.trim() : '';

    return {
      src: imgElement ? imgElement.getAttribute('src') : '',
      alt: imgElement ? imgElement.getAttribute('alt') : '',
      testimonialTitle,
      testimonialLink, // Now properly formatted as an `<a>` tag
      testimonialText,
    };
  });

  // Generate HTML structure for testimonials
  const createTestimonialHTML = (items) => items
    .map((test) => `
      <div class="testimonial-card">
        <div class="testimonial-header">
          ${test.src ? createOptimizedPicture(test.src, test.alt).outerHTML : ''}
          <div class="testimonial-info">
            <h5>${test.testimonialTitle}</h5>
            ${test.testimonialLink ? `<p>${test.testimonialLink}</p>` : ''} <!-- Link inside <p> -->
          </div>
        </div>
        <div class="testimonial-content">
          <p>${test.testimonialText}</p>
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
}
