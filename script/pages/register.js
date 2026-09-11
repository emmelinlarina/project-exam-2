import { register } from "../api/auth.js";

const registerMount = document.getElementById("registerMount");

registerMount.innerHTML = /*html*/ ` 
<section class="min-h-screen bg-primary px-6 py-6 text-white">
    <div class="max-w-md mx-auto">

        <a
            href="./index.html"
            class="inline-flex h-9 w-9 items-center justify-center rounded-full focus:outline-none focus-visible:ring focus-visible:ring-white"
            aria-label="Back to home" 
        >
            <i class="fas fa-arrow-left"></i>
        </a>

        <div class="mt-10">
            <h1 class="font-body text-2xl font-semibold">
                Create your account
            </h1>

            <form id="register-form" class="m-8 space-y-4">

                <div>
                    <label for="register-name" class="block text-sm font-medium">
                        Username
                    </label>

                    <input 
                    type="text" 
                    id="register-name" 
                    name="register-name" 
                    autocomplete="username"
                    required
                    class="w-full rounded-md border border-white/30 bg-transparent px-3 py-2 text-sm text-white" 
                    />
                </div>

                <div>
                    <label for="register-email" class="block text-sm font-medium">
                        Email
                    </label>

                    <input 
                    type="email" 
                    id="register-email" 
                    name="register-email"
                    autocomplete="email"
                    required
                    class="w-full rounded-md border border-white/30 bg-transparent px-3 py-2 text-sm text-white" 
                    />
                </div>

                <div>
                    <label for="register-password" class="block text-sm font-medium">
                        Password
                    </label>

                    <input 
                    type="password" 
                    id="register-password" 
                    name="register-password" 
                    autocomplete="new-password"
                    minlength="8"
                    required
                    class="w-full rounded-md border border-white/30 bg-transparent px-3 py-2 text-sm text-white" 
                    />
                </div>

                <fieldset class="pt-2">
                    <legend class="mb-2 text-sm font-medium">
                        Account type
                    </legend>

                    <label class="flex items-center gap-2 text-sm">
                        <input type="radio" name="account-type" value="customer" checked/>
                        Book Stays
                    </label>

                    <label class="flex items-center gap-2 text-sm">
                        <input type="radio" name="account-type" value="manager" />
                        Manage Venues
                    </label>
                </fieldset>

                <p
                    id="register-message"
                    class="text-xs"
                    role="alert"
                    aria-live="polite"
                ></p>

                <button
                    type="submit"
                    class="mt-6 w-full rounded-md bg-secondary px-4 py-2 text-sm font-semibold text-white"
                >
                    REGISTER    
                </button>

            </form>

            <p class="mt-3 text-center text-xs">
                Already have an account? 
                <a href="./login.html" class="font-semibold underline">
                    LOGIN  
                </a>
            </p>
        </div>
    </div>
</section>

`;

const form = document.getElementById("register-form");
const nameInput = document.getElementById("register-name");
const emailInput = document.getElementById("register-email");
const passwordInput = document.getElementById("register-password");
const message = document.getElementById("register-message");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  message.textContent = "";

  const accountType = document.querySelector(
    'input[name="account-type"]:checked',
  ).value;

  const venueManager = accountType === "manager";
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const password = passwordInput.value;

  if (!email.toLowerCase().endsWith("@stud.noroff.com")) {
    message.textContent = "Email must be a @stud.noroff.com address.";
    return;
  }

  if (password.length < 8) {
    message.textContent = "Password must be at least 8 characters.";
    return;
  }

  try {
    await register({
      name,
      email,
      password,
      venueManager,
    });

    window.location.href = "./login.html?registered=true";
  } catch (error) {
    console.error("Registration failed", error);

    if (error.message.includes("Profile already exists")) {
      message.textContent =
        "An account with this username or email already exists.";
    } else {
      message.textContent =
        "Registration failed. Please try check your information and try again.";
    }
  }
});
