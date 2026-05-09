// ========== LOGIN PAGE ==========

function setupLoginPage() {
  let signupMode = false;

  const loginArt = select("#loginArt");
  const switchButton = select("#authSwitch");
  const submitButton = select("#authSubmit");
  const title = select("#authTitle");
  const subtitle = select("#authSub");
  const confirmBox = select("#confirmBox");
  const message = select("#authMsg");

  if (loginArt) {
    loginArt.style.backgroundImage = `url('${loginBackgroundImage}')`;
  }

  if (!switchButton || !submitButton) return;

  switchButton.addEventListener("click", () => {
    signupMode = !signupMode;

    title.textContent = signupMode ? "Create Account" : "Login";
    subtitle.textContent = signupMode
      ? "Create your TravelGo account."
      : "Access your TravelGo account.";
    confirmBox.style.display = signupMode ? "block" : "none";
    submitButton.textContent = signupMode ? "Create Account" : "Login";
    switchButton.textContent = signupMode
      ? "Already have an account? Login"
      : "Create new account";
    message.textContent = "";
  });

  submitButton.addEventListener("click", () => {
    const email = select("#email").value.trim();
    const password = select("#password").value.trim();
    const confirmPassword = select("#confirmPassword").value.trim();

    if (!email || !password || (signupMode && password !== confirmPassword)) {
      message.style.color = "#be123c";
      message.textContent = signupMode
        ? "Please check your details and password confirmation."
        : "Please enter email and password.";
      return;
    }

    saveTravelGoLogin(email);

    message.style.color = "#16a34a";
    message.textContent = signupMode
      ? "Account created successfully! Redirecting..."
      : "Logged in successfully! Redirecting...";

    const returnPage = sessionStorage.getItem(PAYMENT_RETURN_KEY);
    sessionStorage.removeItem(PAYMENT_RETURN_KEY);

    setTimeout(() => {
      window.location.href = returnPage || "index.html";
    }, 800);
  });
}

// ========== START THIS PAGE ==========

function startWebsite() {
  setupMobileMenu();
  setupLightbox();
  setupLoginPage();
  setupAnimations();
  setupPageTransitions();
}

document.addEventListener("DOMContentLoaded", startWebsite);
