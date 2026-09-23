export function renderVenueFilters(onFilterChange) {
  const filterSection = document.getElementById("venue-filters");

  filterSection.innerHTML = /*html*/ `
    <div class="px-4 py-4 md:px-8 lg:px-12">
        <div class="max-w-5xl">
          <div class="flex flex-wrap items-center gap-2">

            <span class="mr-1 text-sm font-semibold">
                Sort by
            </span>
                  
            <button 
              type="button" 
              class="sort-button rounded-full border border-accent-brown
                     bg-accent-blue px-4 py-2 text-xs text-white
                       transition hover:opacity-80"
              data-sort="default"
              aria-pressed="true"
              >
                Default
            </button>

            <button 
              type="button" 
              class="sort-button rounded-full border border-accent-brown
                     bg-white px-4 py-2 text-xs font-medium text-black
                      transition hover:opacity-80"
              data-sort="price-asc"
              aria-pressed="false"
              >
                Price: Low to High
            </button>

            <button 
            type="button" 
            class="sort-button rounded-full border border-accent-brown
                   bg-white px-4 py-2 text-xs font-medium text-black
                     transition hover:opacity-80"
            data-sort="price-desc"
            aria-pressed="false"
            >
            Price: High to Low
            </button>

            <button 
              type="button" 
              class="sort-button rounded-full border border-accent-brown
                     bg-white px-4 py-2 text-xs font-medium text-black
                       transition hover:opacity-80"
              data-sort="rating-desc"
              aria-pressed="false"
              >
               ★ Top rated
            </button>
          </div>
      </div>
   </div>
    `;

  const sortButtons = filterSection.querySelectorAll(".sort-button");

  sortButtons.forEach((button) => {
    button.addEventListener("click", () => {
      sortButtons.forEach((btn) => {
        btn.classList.remove("bg-accent-blue", "text-white");
        btn.classList.add("bg-white", "text-black");
        btn.setAttribute("aria-pressed", "false");
      });

      button.classList.remove("bg-white", "text-black");
      button.classList.add("bg-accent-blue", "text-white");
      button.setAttribute("aria-pressed", "true");

      const sort = button.getAttribute("data-sort");

      onFilterChange({ sort });
    });
  });
}
