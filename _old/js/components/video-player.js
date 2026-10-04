// =============================================
// VIDEO PLAYER COMPONENT
// =============================================

class VideoPlayer {
  constructor() {
    this.modal = null;
    this.iframe = null;
    this.isOpen = false;
    this.init();
  }

  init() {
    // Create modal HTML
    this.modal = document.createElement('div');
    this.modal.className = 'video-modal';
    this.modal.setAttribute('role', 'dialog');
    this.modal.setAttribute('aria-modal', 'true');
    this.modal.setAttribute('aria-label', 'Video player');

    this.modal.innerHTML = `
      <div class="video-modal__backdrop"></div>
      <button class="video-modal__close" aria-label="Bağla">×</button>
      <div class="video-modal__content">
        <!-- Iframe will be injected here -->
      </div>
    `;

    document.body.appendChild(this.modal);

    // Event listeners
    const closeBtn = this.modal.querySelector('.video-modal__close');
    const backdrop = this.modal.querySelector('.video-modal__backdrop');

    closeBtn.addEventListener('click', () => this.close());
    backdrop.addEventListener('click', () => this.close());

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.close();
      }
    });

    // Attach click events to all video cards on the page
    this.attachEvents();
  }

  attachEvents() {
    const videoCards = document.querySelectorAll('.js-video-card');
    videoCards.forEach(card => {
      card.addEventListener('click', (e) => {
        e.preventDefault();
        const videoId = card.dataset.videoId;
        const type = card.dataset.type || 'short';
        if (videoId) {
          this.open(videoId, type);
        }
      });
    });
  }

  open(videoId, type = 'short') {
    const content = this.modal.querySelector('.video-modal__content');
    
    // Set aspect ratio class based on type
    if (type === 'regular') {
      this.modal.classList.add('video-modal--regular');
    } else {
      this.modal.classList.remove('video-modal--regular');
    }

    // Determine embed URL (Shorts use standard embed URL but with 9:16 aspect ratio in css)
    // Using autoplay=1 so it starts immediately when modal opens
    const embedUrl = \`https://www.youtube.com/embed/\${videoId}?autoplay=1&rel=0&modestbranding=1\`;

    // Inject iframe (prevents loading iframe until needed)
    content.innerHTML = \`<iframe class="video-modal__iframe" src="\${embedUrl}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>\`;

    this.modal.classList.add('is-open');
    this.isOpen = true;
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }

  close() {
    this.modal.classList.remove('is-open');
    this.isOpen = false;
    document.body.style.overflow = '';
    
    // Remove iframe to stop video playing in background
    setTimeout(() => {
      const content = this.modal.querySelector('.video-modal__content');
      content.innerHTML = '';
    }, 300); // Wait for transition to finish
  }
}

// Initialize when DOM is ready
let videoPlayerInstance;
document.addEventListener('DOMContentLoaded', () => {
  videoPlayerInstance = new VideoPlayer();
});
