import { requireVenueManager } from "../utils/guard.js";

const profile = requireVenueManager();

if (profile) {
  console.log("Venue manager access granted:", profile);
}
