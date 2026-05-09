// ========== HOME PAGE ==========

function initHomePage() {
  const hero = select("#homeHero");
  const destinationCards = select("#destinationCards");
  const homeAttractions = select("#homeAttractions");
  const searchButton = select("#searchBtn");

  if (hero) {
    hero.style.backgroundImage = `url('${homeHeroImage}')`;
  }

  if (destinationCards) {
    destinationCards.innerHTML = Object.keys(destinations)
      .map((key) => {
        const destination = destinations[key];

        return `
        <a class="dest-card" href="${key}.html" style="background-image:url('${destination.hero}')">
          <div class="body">
            <h3>${destination.name}</h3>
            <p>${destination.subtitle}</p>
            <span class="outline-small">View Trips</span>
          </div>
        </a>
      `;
      })
      .join("");
  }

  if (homeAttractions) {
    homeAttractions.innerHTML = getTopAttractions()
      .slice(0, 5)
      .map(
        (item) => `
      <a class="home-attraction-mini" href="tour.html?destination=${item.destinationKey}&tour=${item.tourIndex}" style="background-image:url('${item.trip.img}')">
        <span>${item.trip.name}</span>
      </a>
    `,
      )
      .join("");
  }

  if (searchButton) {
    searchButton.addEventListener("click", () => {
      const selectedDestination = select("#destSelect").value;

      if (!selectedDestination) {
        showToast("Please choose a destination first.");
        return;
      }

      window.location.href = selectedDestination + ".html";
    });
  }
}

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
  initHomePage();
  setupAnimations();
  setupPageTransitions();
}

document.addEventListener("DOMContentLoaded", startWebsite);
