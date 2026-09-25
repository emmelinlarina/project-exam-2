import { register } from "../api/auth.js";
import { renderHeader } from "../components/header.js";
import { renderFooter } from "../components/footer.js";

renderHeader();
renderFooter();

const registerMount = document.getElementById("registerMount");

registerMount.innerHTML = /*html*/ ` 
<section 
    class="min-h-screen bg-primary px-6 py-6 text-white
           md:flex  md:items-center md:justify-center
           md:px-8 md:py-16">

    <div class="max-w-md w-full mx-auto
                md:max-w-sm md:rounded-3xl md:bg-secondary md:p-8">

    <div class="mt-8 flex items-center gap-4 md:mt-0">
        <a
            href="./index.html"
            aria-label="Back to homepage"
            class="inline-flex h-8 w-8 items-center justify-center
                    rounded-full focus:outline-none focus-visible:ring-2
                    focus-visible:ring-white"
                >
                <i class="fas fa-arrow-left"></i>
        </a>
            <h1 class="font-body text-2xl font-semibold">
                Create your account
            </h1>
        </div>
            
            <form 
                id="register-form" 
                class="mt-12 space-y-4 md:mt-8 md:px-0">

                <div>
                    <label 
                        for="register-name" 
                        class="mb-1 block text-sm">
                        Username
                    </label>

                    <input 
                        type="text" 
                        id="register-name" 
                        name="register-name" 
                        autocomplete="username"
                        required
                        class="w-full rounded-md border border-white/20
                               bg-transparent px-3 py-2 text-sm text-white
                               outline-none focus:border-white" 
                        />
                </div>

                <div>
                    <label 
                        for="register-email" 
                        class="mb-1 block text-sm"
                    >
                        Email
                    </label>

                    <input 
                        type="email" 
                        id="register-email" 
                        name="register-email"
                        autocomplete="email"
                        required
                        class="w-full rounded-md border border-white/20
                               bg-transparent px-3 py-2 text-sm text-white
                               outline-none focus:border-white" 
                        />
                </div>

                <div>
                    <label 
                        for="register-password" 
                        class="mb-1 block text-sm"
                    >
                        Password
                    </label>

                    <input 
                        type="password" 
                        id="register-password" 
                        name="register-password" 
                        autocomplete="new-password"
                        minlength="8"
                        required
                        class="w-full rounded-md border border-white/20
                                bg-transparent px-3 py-2 text-sm text-white
                                outline-none focus:border-white" 
                        />
                </div>

                <fieldset class="pt-2">
                    <legend class="mt-2 text-base font-medium">
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
                    class="mt-6 w-full rounded-md bg-secondary md:bg-primary px-4 py-2 text-sm font-semibold text-white"
                >
                    REGISTER    
                </button>

                <p class="mt-3 text-center text-sm">
                        Already have an account? 
                    <a href="./login.html" class="font-semibold">
                        LOGIN  
                    </a>
                </p>

            </form>

            
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

  if (!email.toLowerCase().endsWith("@stud.noroff.no")) {
    message.textContent = "Email must be a @stud.noroff.no address.";
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
