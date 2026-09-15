import { getToken, getApiKey } from "../utils/storage.js";

const BASE = "https://v2.api.noroff.dev";

export async function apiFetch(endpoint, options = {}) {
  const token = getToken();
  const apiKey = getApiKey();
  const response = await fetch(`${BASE}/${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(apiKey ? { "X-Noroff-API-Key": apiKey } : {}),
      ...(options.headers || {}),
    },
    ...options,
  });

  const json = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message =
      json?.errors?.[0]?.message || json?.message || "An error occurred";
    throw new Error(message);
  }

  return json;
}
