
function startWebsite() {
  setupMobileMenu();
  setupLightbox();
  // Help page has static HTML content.
  setupAnimations();
  setupPageTransitions();
}

document.addEventListener("DOMContentLoaded", startWebsite);
