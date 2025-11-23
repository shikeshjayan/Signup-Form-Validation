"use strict";

/* ----------------------------------------------------
   DOM ELEMENT REFERENCES
---------------------------------------------------- */
const form = document.getElementById("signUpForm");
const submitBtn = document.getElementById("submitBtn");
const homeContainer = document.getElementById("homeContainer");
const popupContainer = document.getElementById("popupContainer");
const wecomeText = document.getElementById("wecomeText");
const goBackBtn = document.getElementById("goBackBtn");
const termsMsg = document.getElementById("termsMsg");

const userName = document.getElementById("InputFullname");
const email = document.getElementById("InputEmail");
const termsCheck = document.getElementById("termsCheck");

const fullnameError = document.getElementById("fullnameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const confirmPasswordError = document.getElementById("confirmPasswordError");

const password = document.getElementById("InputPassword");
const confirmPassword = document.getElementById("confirmPassword");

const hidePassword = document.getElementById("hidePassword");
const showPassword = document.getElementById("showPassword");

// Password confirmation visibility icons
const hideConfirmPassword = document.getElementById("hideCPassword");
const showConfirmPassword = document.getElementById("showCPassword");

/* ----------------------------------------------------
   NAME VALIDATION
---------------------------------------------------- */
const nameValidation = () => {
  const forbidden = /[{@#$%!?}]/;

  // Check if empty
  if (userName.value.trim() === "") {
    fullnameError.classList.remove("d-none");
    fullnameError.innerHTML = `<img src="images/icons8-error-16.png" alt="Error icon"> Full name is required.`;
    return false;
  }

  // Check invalid characters
  if (forbidden.test(userName.value)) {
    fullnameError.classList.remove("d-none");
    fullnameError.innerHTML = `<img src="images/icons8-error-16.png" alt="Error icon"> Please enter a valid name without special characters.`;
    return false;
  }

  fullnameError.classList.add("d-none");
  return true;
};

/* ----------------------------------------------------
   EMAIL VALIDATION
---------------------------------------------------- */
const emailValidation = () => {
  const emailValue = email.value.trim().toLowerCase();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Empty email
  if (emailValue === "") {
    emailError.classList.remove("d-none");
    emailError.innerHTML = `<img src="images/icons8-error-16.png" alt="Error icon"> Email address is required.`;
    return false;
  }

  // Invalid email format
  if (!emailPattern.test(emailValue)) {
    emailError.innerHTML = `<img src="images/icons8-error-16.png" alt="Error icon"> Enter a valid email address.`;
    emailError.classList.remove("d-none");
    return false;
  }

  emailError.classList.add("d-none");
  return true;
};

/* ----------------------------------------------------
   PASSWORD VALIDATION
   Must include uppercase, lowercase, number & symbol
---------------------------------------------------- */
const passwordValidation = () => {
  const passwordValue = password.value.trim();
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  // Empty password
  if (passwordValue === "") {
    passwordError.classList.remove("d-none");
    passwordError.innerHTML = `<img src="images/icons8-error-16.png" alt="Error icon"> Password is required.`;
    return false;
  }

  // Length check
  if (passwordValue.length < 8) {
    passwordError.classList.remove("d-none");
    passwordError.innerHTML = `<img src="images/icons8-error-16.png" alt="Error icon"> Password must be at least 8 characters.`;
    return false;
  }

  // Regex rules check
  if (!passwordRegex.test(passwordValue)) {
    passwordError.classList.remove("d-none");
    passwordError.innerHTML = `<img src="images/icons8-error-16.png" alt="Error icon"> Must include uppercase, lowercase, number, and special character.`;
    return false;
  }

  // Valid
  passwordError.classList.add("d-none");
  passwordError.innerHTML = "";
  return true;
};

/* ----------------------------------------------------
   CONFIRM PASSWORD VALIDATION
---------------------------------------------------- */
const confirmPasswordValidation = () => {
  const passwordValue = password.value.trim();
  const confirmPasswordValue = confirmPassword.value.trim();

  confirmPasswordError.style.color = "#d9534f";

  // Empty confirmation
  if (confirmPasswordValue === "") {
    confirmPasswordError.classList.remove("d-none");
    confirmPasswordError.innerHTML = `<img src="images/icons8-error-16.png" alt="Error icon"> Confirm password is required.`;
    return false;
  }

  // Password mismatch
  if (passwordValue !== confirmPasswordValue) {
    confirmPasswordError.classList.remove("d-none");
    confirmPasswordError.innerHTML = `<img src="images/icons8-error-16.png" alt="Error icon"> Passwords do not match.`;
    return false;
  }

  // Match success
  confirmPasswordError.classList.remove("d-none");
  confirmPasswordError.style.color = "#198754";
  confirmPasswordError.innerHTML = `<img src="images/success.png" alt="Checkmark indicating success"> Passwords match.`;
  return true;
};

/* ----------------------------------------------------
   PASSWORD VISIBILITY TOGGLE
---------------------------------------------------- */
function toggleVisibility(input, hideBtn, showBtn) {
  hideBtn.classList.toggle("d-none");
  showBtn.classList.toggle("d-none");
  input.type = input.type === "password" ? "text" : "password";
}

// Event listeners for both password fields
hidePassword.addEventListener("click", () =>
  toggleVisibility(password, hidePassword, showPassword)
);

showPassword.addEventListener("click", () =>
  toggleVisibility(password, hidePassword, showPassword)
);

hideConfirmPassword.addEventListener("click", () =>
  toggleVisibility(confirmPassword, hideConfirmPassword, showConfirmPassword)
);

showConfirmPassword.addEventListener("click", () =>
  toggleVisibility(confirmPassword, hideConfirmPassword, showConfirmPassword)
);

/* ----------------------------------------------------
   CHECKBOX VALIDATION (Terms & Conditions)
---------------------------------------------------- */
const checkboxValidation = () => {
  if (!termsCheck.checked) {
    termsMsg.classList.remove("d-none");
    submitBtn.classList.add("disabled");
    return false;
  }

  termsMsg.classList.add("d-none");
  submitBtn.classList.remove("disabled");
  return true;
};

/* ----------------------------------------------------
   REAL-TIME VALIDATION LISTENERS
---------------------------------------------------- */
userName.addEventListener("input", nameValidation);
email.addEventListener("input", emailValidation);
password.addEventListener("input", passwordValidation);
confirmPassword.addEventListener("input", confirmPasswordValidation);
termsCheck.addEventListener("change", checkboxValidation);

/* ----------------------------------------------------
   FORM SUBMISSION HANDLER
---------------------------------------------------- */
form.addEventListener("submit", (e) => {
  e.preventDefault();

  // Run all validations
  const isNameValid = nameValidation();
  const isEmailValid = emailValidation();
  const isPasswordValid = passwordValidation();
  const isPasswordMatch = confirmPasswordValidation();
  const isCheckboxValid = checkboxValidation();

  // If all validations pass → show popup
  if (
    isNameValid &&
    isEmailValid &&
    isPasswordValid &&
    isPasswordMatch &&
    isCheckboxValid
  ) {
    popupContainer.classList.remove("d-none");
    popupContainer.classList.add("show");

    // Display dynamic user welcome text
    wecomeText.innerHTML = `Welcome, ${userName.value}! `;

    homeContainer.classList.add("d-none");
    form.reset();

    // Reset confirmation fields & styles
    confirmPasswordError.classList.add("d-none");
    confirmPasswordError.innerHTML = "";
    confirmPasswordError.style.color = "#d9534f";

    passwordError.classList.add("d-none");
    passwordError.innerHTML = "";
  }
});

/* ----------------------------------------------------
   GO BACK BUTTON
   Restores original form screen
---------------------------------------------------- */
goBackBtn.addEventListener("click", () => {
  popupContainer.classList.add("d-none");
  homeContainer.classList.remove("d-none");
  form.reset();
});
