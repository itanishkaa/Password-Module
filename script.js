const passwordInput = document.getElementById("password");
const toggleBtn = document.getElementById("toggleBtn");
const eyeOpen = document.getElementById("eyeOpen");
const eyeClosed = document.getElementById("eyeClosed");

const strengthBar = document.getElementById("strengthBar");
const strengthText = document.getElementById("strengthText");

// Criteria rules mapping
const criteria = {
  length: (val) => val.length >= 8,
  lowercase: (val) => /[a-z]/.test(val),
  uppercase: (val) => /[A-Z]/.test(val),
  number: (val) => /[0-9]/.test(val),
  symbol: (val) => /[!@#$%^&*(),.?":{}|<>]/.test(val),
};

// Strength levels configuration
const strengthLevels = [
  { text: "Too Weak", color: "#ef4444", percent: "20%" },
  { text: "Weak", color: "#f97316", percent: "40%" },
  { text: "Medium", color: "#facc15", percent: "60%" },
  { text: "Strong", color: "#3b82f6", percent: "80%" },
  { text: "Very Strong", color: "#10b981", percent: "100%" },
];

// 1. Password Visibility Toggle
toggleBtn.addEventListener("click", () => {
  const isPassword = passwordInput.type === "password";
  passwordInput.type = isPassword ? "text" : "password";
  eyeOpen.classList.toggle("hidden", isPassword);
  eyeClosed.classList.toggle("hidden", !isPassword);
});

// 2. Real-time Criteria & Strength Checker
passwordInput.addEventListener("input", () => {
  const val = passwordInput.value;
  let passedCount = 0;

  // Check each criterion
  Object.keys(criteria).forEach((key) => {
    const isPassed = criteria[key](val);
    const item = document.querySelector(`[data-criterion="${key}"]`);
    const icon = item.querySelector(".icon");

    if (isPassed) {
      item.classList.add("valid");
      icon.textContent = "✓";
      passedCount++;
    } else {
      item.classList.remove("valid");
      icon.textContent = "✕";
    }
  });

  // Update Strength Meter
  if (val.length === 0) {
    strengthBar.style.width = "0%";
    strengthBar.style.backgroundColor = "transparent";
    strengthText.textContent = "Too Weak";
    strengthText.style.color = "#4b5563";
  } else {
    const level = strengthLevels[passedCount - 1] || strengthLevels[0];
    strengthBar.style.width = level.percent;
    strengthBar.style.backgroundColor = level.color;
    strengthText.textContent = level.text;
    strengthText.style.color = level.color;
  }
});
