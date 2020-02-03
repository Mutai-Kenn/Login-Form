// Grab elements and assign variables
const name = document.getElementById("name");
const password = document.getElementById("password");
const form = document.getElementById("form");
const errorElement = document.getElementById("error");

// Submit event listener for validation
form.addEventListener("submit", e => {
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
