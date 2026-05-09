// ========== TOUR DETAILS PAGE ==========

function updateTravelers(amount, price) {
  selectedTravelers = Math.max(1, Math.min(20, selectedTravelers + amount));

  const total = price * selectedTravelers;

  selectAll(".traveler-count").forEach((element) => {
    element.textContent = selectedTravelers;
  });

  selectAll(".live-total-value").forEach((element) => {
    element.textContent = formatMoney(total);
  });
}

function renderTripDetailsPage() {
  const params = pageParams();
  const destinationKey = params.get("destination") || "hurghada";
  const tourIndex = params.get("tour") || "0";
  const { destination, trip, index } = findTrip(destinationKey, tourIndex);

  const pageRoot = select("#tourDetails");
  const breadcrumb = select("#tourCrumb");

  if (breadcrumb) {
    breadcrumb.textContent = `${destination.name} / ${trip.name}`;
  }

  if (!pageRoot) return;

  selectedTravelers = 2;

  const gallery = trip.gallery.length ? trip.gallery : [trip.img];

  pageRoot.innerHTML = `
    <section class="premium-main-card">
      <img class="premium-main-photo" id="mainTripPhoto" src="${trip.img}" alt="${trip.name}" data-lightbox>

      <div class="premium-gallery">
        ${gallery
          .map(
            (image) => `
          <img src="${image}" alt="${trip.name} photo" data-photo="${image}" data-lightbox>
        `,
          )
          .join("")}
      </div>

      <div class="premium-tabs">
        <span class="active">Overview</span>
        <span>Included</span>
        <span>Location</span>
      </div>

      <div class="premium-overview">
        <p>${trip.desc}</p>

        <div class="premium-facts">
          <div class="premium-fact"><b>Duration</b>${trip.duration}</div>
          <div class="premium-fact"><b>Food</b>${trip.food}</div>
          <div class="premium-fact"><b>Location</b>${trip.location}</div>
          <div class="premium-fact"><b>Type</b>Sea Trip</div>
        </div>
      </div>
    </section>

    <aside>
      <div class="premium-book-card">
        <span class="premium-badge">Best Seller</span>
        <h1>${trip.name}</h1>
        <div class="premium-stars">★★★★★ 4.9</div>

        <div class="premium-info">
          <div>📍 ${trip.location}</div>
          <div>⏱ ${trip.duration}</div>
          <div>🍽 ${trip.food}</div>
        </div>

        <div class="premium-price">
          <strong>${formatMoney(trip.price)}</strong> per person
        </div>

        <div class="traveler-box">
          <label>Travelers</label>

          <div class="traveler-control">
            <button type="button" id="minusTraveler">−</button>
            <span class="traveler-count">2</span>
            <button type="button" id="plusTraveler">+</button>
          </div>

          <div class="live-total">
            <span>Total</span>
            <strong class="live-total-value">${formatMoney(trip.price * 2)}</strong>
          </div>
        </div>

        <div class="date-box">
          <label>Trip Date</label>
          <input id="tripDate" type="date">
        </div>

        <div class="premium-book-actions">
          <button class="premium-book" id="bookBtn">Book Now</button>
          <button class="premium-wishlist" id="wishlistBtn">♡ Add to Wishlist</button>
        </div>
      </div>

      <div class="premium-include-card">
        <h3>What's Included</h3>
        <ul>
          <li class="yes">Professional guide</li>
          <li class="yes">Hotel pickup</li>
          <li class="yes">Soft drinks</li>
          <li class="yes">Snorkeling equipment when applicable</li>
        </ul>

        <h3>Not Included</h3>
        <ul>
          <li class="no">Personal expenses</li>
          <li class="no">Optional photos or videos</li>
        </ul>
      </div>
    </aside>
  `;

  selectAll("[data-photo]").forEach((image) => {
    image.addEventListener("click", () => {
      select("#mainTripPhoto").src = image.dataset.photo;
    });
  });

  select("#minusTraveler").addEventListener("click", () =>
    updateTravelers(-1, trip.price),
  );
  select("#plusTraveler").addEventListener("click", () =>
    updateTravelers(1, trip.price),
  );

  select("#wishlistBtn").addEventListener("click", () => {
    showToast("Added to wishlist");
  });

  select("#bookBtn").addEventListener("click", () => {
    const tripDate = select("#tripDate").value;
    const paymentLink = `payment.html?destination=${destinationKey}&tour=${index}&travelers=${selectedTravelers}&date=${encodeURIComponent(tripDate)}`;

    window.location.href = paymentLink;
  });
}

// ========== START THIS PAGE ==========

function startWebsite() {
  setupMobileMenu();
  setupLightbox();
  renderTripDetailsPage();
  setupAnimations();
  setupPageTransitions();
}

document.addEventListener("DOMContentLoaded", startWebsite);
