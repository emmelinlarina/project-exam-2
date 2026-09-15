import { login, createApiKey } from "../api/auth.js";
import { setToken, setProfile, setApiKey } from "../utils/storage.js";

const loginMount = document.getElementById("loginMount");

loginMount.innerHTML = /*html*/ `

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
                Login
            </h1>

        <form id="login-form" class="m-8 space-y-4">
            <div>
                <label 
                for="login-email" 
                class="block text-sm font-medium"
                >
                    Email
                </label>

                <input 
                type="email" 
                id="login-email" 
                name="login-email" 
                autocomplete="email" 
                required 
                class="w-full rounded-md border border-white/30 bg-transparent px-3 py-2 text-sm text-white" />
            </div>

            <div>
                <label 
                for="login-password" 
                class="block text-sm font-medium"
                >
                    Password
                </label>

                <input 
                type="password" 
                id="login-password" 
                name="login-password" 
                autocomplete="current-password"
                required 
                class="w-full rounded-md border border-white/30 bg-transparent px-3 py-2 text-sm text-white" />
            </div>

            <p 
                id="login-message" 
                class="text-xs" 
                role="alert"
                aria-live="polite"></p>

            <button 
                type="submit" 
                class="mt-6 w-full rounded-md bg-secondary px-4 py-2 text-sm font-semibold text-white"
                >
                LOGIN
            </button>
        </form>

        <p class="mt-3 text-center text-xs">
            Don't have an account? 
            <a href="./register.html" class="font-semibold underline">REGISTER</a>
        </p>
        </div>
    </div>
</section>
`;

const loginForm = document.getElementById("login-form");
const emailInput = document.getElementById("login-email");
const passwordInput = document.getElementById("login-password");
const loginMessage = document.getElementById("login-message");

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
