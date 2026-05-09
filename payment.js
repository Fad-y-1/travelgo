// ========== PAYMENT PAGE ==========

function renderPaymentPage() {
  const params = pageParams();
  const destinationKey = params.get("destination") || "hurghada";
  const tourIndex = params.get("tour") || "0";
  const travelers = Math.max(1, Number(params.get("travelers") || 2));
  const tripDate = params.get("date") || "Not selected";
  const { destination, trip } = findTrip(destinationKey, tourIndex);
  const total = trip.price * travelers;
  const paymentContent = select("#paymentContent");

  if (!paymentContent) return;

  paymentContent.innerHTML = `
    <section class="new-payment-card">
      <h2>Booking Summary</h2>
      <p class="new-payment-note">Review your trip details before payment.</p>

      <div class="new-trip-box">
        <img src="${trip.img}" alt="${trip.name}" data-lightbox>
        <div>
          <div class="new-trip-title">${trip.name}</div>
          <p class="new-trip-location">📍 ${destination.name}</p>
        </div>
      </div>

      <div class="new-book-row">
        <span class="new-book-label">Price per person</span>
        <span class="new-book-value">${formatMoney(trip.price)}</span>
      </div>

      <div class="new-book-row">
        <span class="new-book-label">Travelers</span>
        <span class="new-book-value">${travelers}</span>
      </div>

      <div class="new-book-row">
        <span class="new-book-label">Trip Date</span>
        <span class="new-book-value">${tripDate}</span>
      </div>

      <div class="new-book-row new-book-total">
        <span>Total</span>
        <span>${formatMoney(total)}</span>
      </div>
    </section>

    <section class="new-payment-card new-payment-form-card">
      <h2>Payment Details</h2>
      <p class="new-payment-note">Please enter your details carefully to confirm your reservation.</p>

      <div class="new-payment-error" id="paymentErrorBox"></div>

      <div class="new-payment-form-grid">
        <div class="new-form-group">
          <label>First Name</label>
          <input id="payFirstName" placeholder="Enter first name">
        </div>

        <div class="new-form-group">
          <label>Last Name</label>
          <input id="payLastName" placeholder="Enter last name">
        </div>

        <div class="new-form-group full">
          <label>Email Address</label>
          <input id="payEmail" type="email" placeholder="example@email.com">
        </div>

        <div class="new-form-group full">
          <label>Phone Number</label>
          <input id="payPhone" placeholder="+20 100 000 0000">
        </div>

        <div class="new-form-group full">
          <label>Card Number</label>
          <input id="payCardNumber" maxlength="19" placeholder="0000 0000 0000 0000">
        </div>

        <div class="new-form-group">
          <label>Expiry Date</label>
          <input id="payExpiry" maxlength="5" placeholder="MM/YY">
        </div>

        <div class="new-form-group">
          <label>Security Code</label>
          <input id="payCvv" maxlength="3" placeholder="CVV">
        </div>
      </div>

      <button class="new-pay-btn" id="confirmPayment">Confirm Payment • ${formatMoney(total)}</button>
      <div class="new-secure">🔒 Secure encrypted payment simulation</div>
    </section>
  `;

  setupPaymentForm();
}

function setupPaymentForm() {
  const cardInput = select("#payCardNumber");
  const expiryInput = select("#payExpiry");
  const cvvInput = select("#payCvv");
  const confirmButton = select("#confirmPayment");
  const errorBox = select("#paymentErrorBox");

  cardInput.addEventListener("input", () => {
    const value = cardInput.value.replace(/\D/g, "").substring(0, 16);
    cardInput.value = value.replace(/(.{4})/g, "$1 ").trim();
  });

  expiryInput.addEventListener("input", () => {
    let value = expiryInput.value.replace(/\D/g, "").substring(0, 4);

    if (value.length >= 3) {
      value = value.substring(0, 2) + "/" + value.substring(2);
    }

    expiryInput.value = value;
  });

  cvvInput.addEventListener("input", () => {
    cvvInput.value = cvvInput.value.replace(/\D/g, "").substring(0, 3);
  });

  confirmButton.addEventListener("click", (event) => {
    event.preventDefault();

    // Hard stop: if the visitor is not logged in during THIS browser session,
    // show only the warning and do not run form validation or payment confirmation.
    if (!isTravelGoLoggedIn()) {
      event.stopImmediatePropagation();
      if (errorBox) {
        errorBox.textContent = "Please log in before confirming your payment.";
        errorBox.style.display = "block";
      }
      alert("Please log in before confirming your payment.");
      return;
    }

    const requiredFields = [
      "payFirstName",
      "payLastName",
      "payEmail",
      "payPhone",
      "payCardNumber",
      "payExpiry",
      "payCvv",
    ];

    const hasEmptyField = requiredFields.some(
      (id) => !select("#" + id).value.trim(),
    );

    if (hasEmptyField) {
      errorBox.textContent = "Please complete all payment fields.";
      errorBox.style.display = "block";
      return;
    }

    errorBox.style.display = "none";
    showToast("Payment confirmed successfully!");
  });
}

// ========== START THIS PAGE ==========

function startWebsite() {
  setupMobileMenu();
  setupLightbox();
  renderPaymentPage();
  setupAnimations();
  setupPageTransitions();
}

document.addEventListener("DOMContentLoaded", startWebsite);
