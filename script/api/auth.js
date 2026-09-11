import { apiFetch } from "./api-fetch.js";

export function register({ name, email, password, venueManager }) {
  return apiFetch("auth/register", {
    method: "POST",
    body: JSON.stringify({
      name,
      email,
      password,
      venueManager: Boolean(venueManager),
    }),
  });
}

export function login({ email, password }) {
  return apiFetch("auth/login?_holidaze=true", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}
