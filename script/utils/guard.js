import { getToken, getProfile } from "./storage.js";

export function requireAuth() {
  const token = getToken();
  const profile = getProfile();

  if (!token || !profile) {
    window.location.href = "./login.html";
    return null;
  }
  return { token, profile };
}

export function requireVenueManager() {
  const auth = requireAuth();

  if (!auth) return null;

  const profile = auth.profile;

  if (!profile.venueManager) {
    window.location.href = "./index.html";
    return null;
  }

  return profile;
}
