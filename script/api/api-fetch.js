const BASE = "https://v2.api.noroff.dev";

export async function apiFetch(endpoint, options = {}) {
  const response = await fetch(`${BASE}/${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
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
