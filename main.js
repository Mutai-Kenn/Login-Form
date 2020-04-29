// Grab elements and assign variables
const name = document.getElementById("name");
const passwordInput = document.getElementById("password");
const form = document.getElementById("form");
const errorElement = document.getElementById("error");
const strengthMeter = document.getElementById("strength-meter");
const passwordStrenght = document.getElementById("rate");

// Submit event listener for validation
form.addEventListener("submit", (e) => {
  let messages = [];

  if (name.value === "" || name.value == null) {
    messages.push("Username is required !");
  }

  if (password.value.length <= 5) {
    messages.push("Password must be longer than 6 characters");
  }

  if (password.value === "password") {
    messages.push("Password cannot be password");
  }

  if (messages.length > 0) {
    e.preventDefault();
    errorElement.innerText = messages.join(", ");
  }
});

// Update the strength meter bar
const updateStrengthMeter = () => {
  const weaknesses = calculatePasswordStrength(passwordInput.value);
  let strength = 100;
  passwordStrenght.innerHTML = "";
  weaknesses.forEach((weakness) => {
    if (weakness == null) return;
    strength -= weakness.deduction;
    const msgElement = document.createElement("div");
    msgElement.innerText = weakness.msg;
    passwordStrenght.appendChild(msgElement);
  });
  strengthMeter.style.setProperty("--strength", strength);
};

// Listen to changes in the input
passwordInput.addEventListener("input", updateStrengthMeter);

// Password Strength
const calculatePasswordStrength = (password) => {
  const weaknesses = [];
  weaknesses.push(lengthWeakness(password));
  weaknesses.push(lowerCaseWeakness(password));
  weaknesses.push(upperCaseWeakness(password));
  weaknesses.push(numberWeakness(password));
  weaknesses.push(specialCharacterWeakness(password));
  weaknesses.push(repeatCharactersWeakness(password));
  return weaknesses;
};
// Test the Length Weakness
const lengthWeakness = (password) => {
  const length = password.length;

  if (length <= 5) {
    return {
      msg: "Your Password is too short",
      deduction: 50,
    };
  }
  if (length <= 8) {
    return {
      msg: "Your password could be longer",
      deduction: 10,
    };
  }
};

//Test LowerCase Weakness
const lowerCaseWeakness = (password) => {
  return characterTypeWeakness(password, /[a-z]/g, "lowercase characters");
};

//Test UpperCase Weakness
const upperCaseWeakness = (password) => {
  return characterTypeWeakness(password, /[A-Z]/g, "uppercase characters");
};
//Test Numbers Weakness
const numberWeakness = (password) => {
  return characterTypeWeakness(password, /[0-9]/g, "numbers");
};
//Test Special Characters Weakness
const specialCharacterWeakness = (password) => {
  return characterTypeWeakness(
    password,
    /[^0-9a-zA-Z\s]/g,
    "special characters"
  );
};

// Character test helper for upper and lowercase
const characterTypeWeakness = (password, regex, type) => {
  const matches = password.match(regex) || [];

  if (matches.length === 0) {
    return {
      msg: `Your password has no ${type}`,
      deduction: 20,
    };
  }
  if (matches.length <= 2) {
    return {
      msg: `Your password could use more ${type}`,
      deduction: 5,
    };
  }
};

//Test repeated charcters Weakness
const repeatCharactersWeakness = (password) => {
  const matches = password.match(/(.)\1/g) || [];

  if (matches.length > 0) {
    return {
      msg: "Your Password has repeated characters",
      deduction: matches.length * 10,
    };
  }
};
