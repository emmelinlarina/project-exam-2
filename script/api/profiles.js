import { apiFetch } from "./api-fetch.js";

export function updateProfile(name, profileData) {
  return apiFetch(`holidaze/profiles/${encodeURIComponent(name)}`, {
    method: "PUT",
    body: JSON.stringify(profileData),
  });
}
