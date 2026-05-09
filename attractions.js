// ========== TOP ATTRACTIONS PAGE ==========

function getTopAttractions() {
  const attractions = [
    { destinationKey: "hurghada", tourIndex: 1 },
    { destinationKey: "hurghada", tourIndex: 3 },
    { destinationKey: "hurghada", tourIndex: 0 },
    { destinationKey: "sharm", tourIndex: 0 },
    { destinationKey: "sharm", tourIndex: 1 },
    { destinationKey: "sharm", tourIndex: 2 },
    { destinationKey: "sharm", tourIndex: 3 },
  ];

  return attractions.map((item) => ({
    ...item,
    trip: destinations[item.destinationKey].tours[item.tourIndex],
  }));
}

function renderAttractionsPage() {
  const grid = select("#attractionsGrid");
  if (!grid) return;

  grid.innerHTML = getTopAttractions()
    .map(
      (item) => `
    <article class="attr-card">
      <img src="${item.trip.img}" alt="${item.trip.name}" data-lightbox>

      <div class="txt">
        <h3>${item.trip.name}</h3>
        <p>${item.trip.desc}</p>
        <a class="view-btn" href="tour.html?destination=${item.destinationKey}&tour=${item.tourIndex}">Book Now</a>
      </div>
    </article>
  `,
    )
    .join("");
}

let selectedTravelers = 2;

// ========== START THIS PAGE ==========

function startWebsite() {
  setupMobileMenu();
  setupLightbox();
  renderAttractionsPage();
  setupAnimations();
  setupPageTransitions();
}

document.addEventListener("DOMContentLoaded", startWebsite);
