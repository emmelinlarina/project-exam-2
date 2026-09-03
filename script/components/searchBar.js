import { searchVenues } from "../api/venues.js";

export function renderSearchBar() {
  const searchSection = document.getElementById("venue-search");

  searchSection.innerHTML = /*html*/ `
    <div class="px-4 py-4 flex justify-center">
        <form 
        id="venue-search-form" 
        class="flex w-full max-w-xs items-center rounded-full bg-accent-blue px-5 py-2">
            <input 
            id="venue-search-input" 
            type="search" 
            placeholder="Find your stay" 
            class="w-full bg-transparent text-sm text-white placeholder:text-white outline-none"
            />

            <button 
            type="submit" 
            class="ml-2 text-white"
            aria-label="Search for venues"
            >
            <i class="fa-solid fa-magnifying-glass"></i>
        </button>
        </form>
    </div>
    `;

  const form = document.getElementById("venue-search-form");
  const input = document.getElementById("venue-search-input");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const query = input.value;

    if (!query) return;

    try {
      const response = await searchVenues(query);

      console.log("Search results", response.data);
    } catch (error) {
      console.error("Error searching venues", error);
    }
  });
}
