// Function to create and configure a video element
function createVideoElement(videoSrc) {
  const videoElement = document.createElement('video');
  videoElement.src = videoSrc;
  videoElement.controls = false;
  videoElement.muted = true;
  videoElement.autoplay = true;
  videoElement.loop = true;
  videoElement.classList.add('video');
  return videoElement;
}

// Function to handle video embedding inside the given block
function handleVideoEmbedding(block) {
  const videoContainer = block.querySelector('.button-container');
  if (!videoContainer) return;

  const videoAnchor = videoContainer.querySelector(':scope > p > a');
  if (!videoAnchor || block.querySelector('picture')) return;

  const videoUrl = videoAnchor.getAttribute('href');
  if (!videoUrl) return;

  const videoElement = createVideoElement(videoUrl);

  videoContainer.innerHTML = '';
  videoContainer.appendChild(videoElement);
}

// Main function to decorate the block by adding styling and embedding video
export default function decorate(block) {
  handleVideoEmbedding(block);
}
