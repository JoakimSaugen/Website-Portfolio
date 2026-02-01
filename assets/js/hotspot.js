// Image Hotspot System
(function() {
  'use strict';

  // Initialize hotspots when DOM is ready
  window.addEventListener('DOMContentLoaded', function() {
    initHotspots();
  });

  function initHotspots() {
    // Get all hotspot markers and skill links
    const markers = document.querySelectorAll('.hotspot-marker, .skill-link');
    const modals = document.querySelectorAll('.hotspot-modal');

    // Add click handlers to markers and skill links
    markers.forEach(function(marker) {
      marker.addEventListener('click', function(e) {
        e.preventDefault();
        const modalId = this.getAttribute('data-modal');
        const modal = document.getElementById(modalId);
        if (modal) {
          modal.classList.add('active');
          document.body.style.overflow = 'hidden'; // Prevent scrolling
        }
      });
    });

    // Add close handlers to modals
    modals.forEach(function(modal) {
      // Close button
      const closeBtn = modal.querySelector('.hotspot-modal-close');
      if (closeBtn) {
        closeBtn.addEventListener('click', function() {
          closeModal(modal);
        });
      }

      // Click outside content to close
      modal.addEventListener('click', function(e) {
        if (e.target === modal) {
          closeModal(modal);
        }
      });
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        modals.forEach(function(modal) {
          if (modal.classList.contains('active')) {
            closeModal(modal);
          }
        });
      }
    });
  }

  function closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
  }
})();
