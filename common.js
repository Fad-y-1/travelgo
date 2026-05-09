/* TravelGo shared JavaScript */ 

// ========== GLOBAL DATA ==========

const destinations = {
  hurghada: {
    name: "Hurghada",
    subtitle: "Explore the beauty of the Red Sea",
    hero: "assets/images/hurghada-orange-bay-island-trip.jpg",
    tours: [
      {
        name: "Semi Submarine Trip",
        desc: "Enjoy underwater views of the Red Sea without diving in a semi-submarine experience.",
        price: 35,
        duration: "3 Hours",
        food: "Soft drinks included",
        location: "Hurghada Marina",
        img: "assets/images/hurghada-semi-submarine-trip.jpg",
        gallery: [
          "assets/images/hurghada-semi-submarine-trip.jpg",
          "assets/images/hurghada-semi-submarine-trip-gallery-2.jpg",
          "assets/images/hurghada-semi-submarine-trip-gallery-3.jpg",
          "assets/images/hurghada-semi-submarine-trip-gallery-4.jpg",
          "assets/images/hurghada-semi-submarine-trip-gallery-5.jpg",
        ],
      },
      {
        name: "Orange Bay Island Trip",
        desc: "Full day snorkeling tour to Orange Bay Island with lunch and water sports.",
        price: 45,
        duration: "8 Hours",
        food: "Lunch included",
        location: "Hurghada",
        img: "assets/images/hurghada-orange-bay-island-trip.jpg",
        gallery: ["assets/images/hurghada-orange-bay-island-trip.jpg"],
      },
      {
        name: "Desert Safari Adventure",
        desc: "Exciting desert safari with quad biking, BBQ dinner and Bedouin show.",
        price: 60,
        duration: "6 Hours",
        food: "Dinner included",
        location: "Hurghada",
        img: "assets/images/hurghada-desert-safari-adventure.jpg",
        gallery: ["assets/images/hurghada-desert-safari-adventure.jpg"],
      },
      {
        name: "Diving Trip",
        desc: "Discover the amazing underwater world of the Red Sea.",
        price: 55,
        duration: "7 Hours",
        food: "Equipment included",
        location: "Hurghada",
        img: "assets/images/hurghada-diving-trip.jpg",
        gallery: ["assets/images/hurghada-diving-trip.jpg"],
      },
    ],
  },

  sharm: {
    name: "Sharm El Sheikh",
    subtitle: "Luxury resorts and crystal clear waters",
    hero: "assets/images/sharm-hero.jpg",
    tours: [
      {
        name: "Ras Mohammed Tour",
        desc: "Visit Ras Mohammed National Park and enjoy snorkeling.",
        price: 40,
        duration: "8 Hours",
        food: "Lunch included",
        location: "Sharm El Sheikh",
        img: "assets/images/sharm-ras-mohammed-tour.jpg",
        gallery: ["assets/images/sharm-ras-mohammed-tour.jpg"],
      },
      {
        name: "Blue Hole & Dahab Trip",
        desc: "Explore the Blue Hole and the charming town of Dahab.",
        price: 45,
        duration: "10 Hours",
        food: "Lunch included",
        location: "Sharm El Sheikh",
        img: "assets/images/sharm-blue-hole-and-dahab-trip.jpg",
        gallery: ["assets/images/sharm-blue-hole-and-dahab-trip.jpg"],
      },
      {
        name: "Sunset Cruise",
        desc: "Enjoy a romantic sunset cruise with dinner and live entertainment.",
        price: 35,
        duration: "4 Hours",
        food: "Dinner included",
        location: "Sharm El Sheikh",
        img: "assets/images/sharm-sunset-cruise.jpg",
        gallery: ["assets/images/sharm-sunset-cruise.jpg"],
      },
      {
        name: "Tiran Island Snorkeling",
        desc: "Snorkel in the beautiful waters of Tiran Island.",
        price: 40,
        duration: "7 Hours",
        food: "Lunch included",
        location: "Sharm El Sheikh",
        img: "assets/images/sharm-tiran-island-snorkeling.jpg",
        gallery: ["assets/images/sharm-tiran-island-snorkeling.jpg"],
      },
    ],
  },
};

const homeHeroImage = "assets/images/hurghada-orange-bay-island-trip.jpg";
const loginBackgroundImage = "assets/images/sharm-sunset-cruise.jpg";

// ========== SHARED FUNCTIONS ==========

const select = (selector) => document.querySelector(selector);
const selectAll = (selector) => [...document.querySelectorAll(selector)];
const formatMoney = (number) => "$" + Number(number || 0);
const pageParams = () => new URLSearchParams(window.location.search);

// Login status is intentionally stored in sessionStorage, not localStorage.
// This prevents old browser data from making the payment page think the user is logged in.
const AUTH_KEY = "travelgoSessionLoggedIn";
const AUTH_EMAIL_KEY = "travelgoSessionUserEmail";
const PAYMENT_RETURN_KEY = "travelgoReturnAfterLogin";

function isTravelGoLoggedIn() {
  return (
    sessionStorage.getItem(AUTH_KEY) === "true" &&
    Boolean(sessionStorage.getItem(AUTH_EMAIL_KEY))
  );
}

function saveTravelGoLogin(email) {
  // Remove the old permanent login keys from earlier versions of the project.
  localStorage.removeItem("travelgoLoggedIn");
  localStorage.removeItem("travelgoUserEmail");

  sessionStorage.setItem(AUTH_KEY, "true");
  sessionStorage.setItem(AUTH_EMAIL_KEY, email);
}

function currentPageWithParams() {
  return window.location.pathname.split("/").pop() + window.location.search;
}

function findTrip(destinationKey, tourIndex) {
  const destination = destinations[destinationKey] || destinations.hurghada;
  const index = Number(tourIndex) || 0;
  const trip = destination.tours[index] || destination.tours[0];

  return { destination, trip, index };
}

function showToast(message) {
  const toast = select("#toast");
  if (!toast) return;

  toast.textContent = message;
  toast.style.display = "block";

  setTimeout(() => {
    toast.style.display = "none";
  }, 2500);
}

// ========== SHARED COMPONENTS ==========

function setupMobileMenu() {
  const menuButton = select("#menuBtn");
  const links = select("#links");

  if (!menuButton || !links) return;

  menuButton.addEventListener("click", () => {
    links.classList.toggle("open");
  });
}

function setupLightbox() {
  const box = select("#lightbox");
  const image = select("#lightboxImg");
  const closeButton = select("#lightboxClose");

  if (!box || !image || !closeButton) return;

  document.addEventListener("click", (event) => {
    const clickedImage = event.target.closest("img[data-lightbox]");

    if (!clickedImage) return;

    image.src = clickedImage.src;
    box.classList.add("open");
  });

  closeButton.addEventListener("click", () => {
    box.classList.remove("open");
  });

  box.addEventListener("click", (event) => {
    if (event.target === box) box.classList.remove("open");
  });
}

// ========== ANIMATIONS ==========

function setupAnimations() {
  const animatedItems = selectAll(`
    .section-title,
    .dest-card,
    .home-attraction-mini,
    .tour-card,
    .attr-card,
    .premium-main-card,
    .premium-book-card,
    .premium-include-card,
    .new-payment-card,
    .form-card,
    .help-card,
    .footer-grid > div
  `);

  animatedItems.forEach((item, index) => {
    item.classList.add("reveal");
    item.style.setProperty("--delay", Math.min(index * 0.05, 0.3) + "s");
  });

  if (!("IntersectionObserver" in window)) {
    animatedItems.forEach((item) => item.classList.add("show"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );

  animatedItems.forEach((item) => observer.observe(item));
}

function setupPageTransitions() {
  selectAll("a[href]").forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");

      if (
        !href ||
        href.startsWith("#") ||
        href.startsWith("http") ||
        link.target === "_blank"
      )
        return;

      event.preventDefault();
      document.body.classList.add("page-leaving");

      setTimeout(() => {
        window.location.href = href;
      }, 180);
    });
  });
}
