import { login, createApiKey } from "../api/auth.js";
import { setToken, setProfile, setApiKey } from "../utils/storage.js";
import { renderHeader } from "../components/header.js";
import { renderFooter } from "../components/footer.js";

renderHeader();
renderFooter();

const loginMount = document.getElementById("loginMount");

loginMount.innerHTML = /*html*/ `


<section 
    class="min-h-screen bg-primary px-6 py-6 text-white
           md:flex md:items-center md:justify-center
           md:px-8 md:py-16
        ">
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
                Welcome back!
            </h1>
        </div>

        <form 
            id="login-form" 
            class="mt-12 space-y-4 md:mt-8 md:px-0">

            <div>
                <label 
                    for="login-email" 
                    class="mb-1 block text-sm"
                    >
                        Email
                    </label>

                    <input 
                        type="email" 
                        id="login-email" 
                        name="login-email" 
                        autocomplete="email" 
                        required 
                        class="w-full rounded-md border     border-white/20
                               bg-transparent px-3 py-2 text-sm text-white
                               outline-none focus:border-white" 
                    />
            </div>

            <div>
                <label 
                    for="login-password" 
                    class="mb-1 block text-sm"
                    >
                        Password
                    </label>

                <div class="relative">

                    <input 
                        type="password" 
                        id="login-password" 
                        name="login-password" 
                        autocomplete="current-password"
                        required 
                        class="w-full rounded-md border border-white/20
                               bg-transparent px-3 py-2 text-sm text-white
                               outline-none focus:border-white" 
                    />

                        <button
                            type="button"
                            id="toggle-password"
                            class="absolute top-1/2 -translate-y-1/2 text-sm text-white/70 hover:text-white"
                            aria-label="Toggle password visibility"
                        >
                            <i class="fa-solid fa-eye"></i>
                        </button>
                    </div>
            </div>

            <p 
                id="login-message" 
                class="text-xs" 
                role="alert"
                aria-live="polite">
            </p>

        <div class="pt-24 md:pt-20 mb-20">

            <button 
                type="submit" 
                class="mt-6 w-full rounded-md bg-secondary md:bg-primary px-4 py-2
                       text-sm font-semibold text-white"
                >
                LOGIN
            </button>

                <p class="mt-3 text-center text-sm">
                    Don't have an account? 
                    <a 
                        href="./register.html" 
                        class="font-semibold text-white">REGISTER
                    </a>
                </p>
                </div>  
            </form>
        </div>
</section>

`;

const loginForm = document.getElementById("login-form");
const emailInput = document.getElementById("login-email");
const passwordInput = document.getElementById("login-password");
const loginMessage = document.getElementById("login-message");

const togglePassword = document.getElementById("toggle-password");

togglePassword.addEventListener("click", () => {
  const isHidden = passwordInput.getAttribute("type") === "password";

  passwordInput.type = isHidden ? "text" : "password";

  togglePassword.innerHTML = isHidden
    ? '<i class="fa-solid fa-eye-slash"></i>'
    : '<i class="fa-solid fa-eye"></i>';

  togglePassword.setAttribute(
    "aria-label",
    isHidden ? "Hide password" : "Show password",
  );
});

const params = new URLSearchParams(window.location.search);

if (params.get("registered") === "true") {
  loginMessage.textContent = "Registration successful. You can now log in.";
}

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  loginMessage.textContent = "";

  try {
    const response = await login({
      email: emailInput.value,
      password: passwordInput.value,
    });

    const user = response.data;

    setToken(user.accessToken);
    setProfile(user);

    const apiKeyResponse = await createApiKey();
    setApiKey(apiKeyResponse.data.key);

    window.location.href = "./index.html";
  } catch (error) {
    console.error("Login failed:", error);

    loginMessage.textContent =
      "Login failed. Please check your email and password.";
  }
});
