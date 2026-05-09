// ========== HURGHADA & SHARM PAGES ==========

function renderDestinationPage() {
  const destinationKey = document.body.dataset.destination;
  const destination = destinations[destinationKey];
  const tourList = select("#tourList");

  if (!destination || !tourList) return;

  tourList.innerHTML = destination.tours
    .map(
      (trip, index) => `
    <article class="tour-card">
      <img src="${trip.img}" alt="${trip.name}" data-lightbox>

      <div>
        <h3>${trip.name}</h3>
        <p>${trip.desc}</p>
        <div class="meta">
          <span>⏱ ${trip.duration}</span>
          <span>🍽 ${trip.food}</span>
          <span>📍 ${trip.location}</span>
        </div>
      </div>

      <div class="tour-price">
        ${formatMoney(trip.price)}
        <span>per person</span>
      </div>

      <a class="view-btn" href="tour.html?destination=${destinationKey}&tour=${index}">Book Now</a>
    </article>
  `,
    )
    .join("");
}

// ========== START THIS PAGE ==========

function startWebsite() {
  setupMobileMenu();
  setupLightbox();
  renderDestinationPage();
  setupAnimations();
  setupPageTransitions();
}

document.addEventListener("DOMContentLoaded", startWebsite);
