// Carousel Version 1: Infinite loop, one image centered, partials visible
function initCarousel1(root) {
  const track = root.querySelector('.carousel-track');
  const slides = Array.from(track.children);
  const total = slides.length;
  // Clone first and last slides for seamless infinite effect
  const cloneFirst = slides[0].cloneNode(true);
  const cloneLast = slides[total-1].cloneNode(true);
  track.insertBefore(cloneLast, slides[0]);
  track.appendChild(cloneFirst);
  // Update slides after cloning
  const allSlides = Array.from(track.children);
  // Optional start index (1-based) via data-start-index on root; defaults to 1
  let startIndex = parseInt(root.dataset.startIndex || '1', 10);
  if (isNaN(startIndex) || startIndex < 1) startIndex = 1;
  if (startIndex > total) startIndex = total;
  let current = startIndex; // Start at specified real slide
  // Dot indicator setup (after current/total are defined)
  const dotsContainer = root.querySelector('.carousel-dots');
  dotsContainer.innerHTML = '';
  for (let i = 0; i < total; ++i) {
    const dot = document.createElement('button');
    dot.className = 'carousel-dot';
    dot.type = 'button';
    dot.setAttribute('aria-label', `Go to slide ${i+1}`);
    dot.onclick = () => {
      current = i + 1;
      update();
    };
    dotsContainer.appendChild(dot);
  }
  const dots = Array.from(dotsContainer.children);
  function update(animate = true) {
    if (!animate) track.style.transition = 'none';
    else track.style.transition = '';
    // Center the current slide (one full, partials on sides)
    // Use DOM measurements (slide width + margin) to compute accurate pixel offset
  // For single-slide view we simply translate by 100% increments
  track.style.transform = `translateX(${-current * 100}%)`;
    // Update dots (current-1 because of clones)
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === ((current-1+total)%total));
    });
  }
  // Initial position
  update(false);

  root.querySelector('.carousel-arrow.left').onclick = function() {
    current--;
    update();
  };
  root.querySelector('.carousel-arrow.right').onclick = function() {
    current++;
    update();
  };

  // Handle transition end for seamless looping
  track.addEventListener('transitionend', function() {
    if (current <= 0) {
      current = total;
      update(false);
    } else if (current >= total + 1) {
      current = 1;
      update(false);
    }
  });
}

// Carousel Version 2: Fade transition
function initCarousel2(root) {
  const slides = Array.from(root.querySelectorAll('.carousel-slide'));
  let index = 0;
  function update() {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index || i === (index+1)%slides.length);
    });
  }
  root.querySelector('.carousel-arrow.left').onclick = function() {
    index = (index - 1 + slides.length) % slides.length;
    update();
  };
  root.querySelector('.carousel-arrow.right').onclick = function() {
    index = (index + 1) % slides.length;
    update();
  };
  update();
}

// Carousel Version 3: Sliding animation
function initCarousel3(root) {
  const track = root.querySelector('.carousel-track');
  const slides = Array.from(track.children);
  let index = 0;
  function update() {
    track.style.transform = `translateX(${-index * 50}%)`;
  }
  root.querySelector('.carousel-arrow.left').onclick = function() {
    index = (index - 1 + slides.length) % slides.length;
    update();
  };
  root.querySelector('.carousel-arrow.right').onclick = function() {
    index = (index + 1) % slides.length;
    update();
  };
  update();
}

// Initialize all carousels on DOMContentLoaded
window.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.carousel-v1').forEach(initCarousel1);
  document.querySelectorAll('.carousel-v2').forEach(initCarousel2);
  document.querySelectorAll('.carousel-v3').forEach(initCarousel3);
});
