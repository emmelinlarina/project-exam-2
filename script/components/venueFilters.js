export function renderVenueFilters(onFilterChange) {
  const filterSection = document.getElementById("venue-filters");

  filterSection.innerHTML = /*html*/ `
    <div class="px-4 md:px-8 lg:px-12">
        <div class="flex flex-wrap items-center gap-2">

           <span class="mr-1 text-sm font-medium">
               Sort by
           </span>
                
           <button 
           type="button" 
           class="sort-button rounded-full border px-4 py-2 text-sm bg-accent-blue text-white"
           data-sort="default"
           >
           Default
           </button>

           <button 
           type="button" 
           class="sort-button rounded-full border px-4 py-2 text-sm"
           data-sort="price-asc"
           >
           Price (Low to High)
           </button>

           <button 
           type="button" 
           class="sort-button rounded-full border px-4 py-2 text-sm"
           data-sort="price-desc"
           >
           Price (High to Low)
           </button>

           <button 
           type="button" 
           class="sort-button rounded-full border px-4 py-2 text-sm"
           data-sort="rating-desc"
           >
           Top rated
           </button>
       </div>
   </div>
    `;

  const sortButtons = filterSection.querySelectorAll(".sort-button");

  sortButtons.forEach((button) => {
    button.addEventListener("click", () => {
      sortButtons.forEach((btn) => {
        btn.classList.remove("bg-accent-blue", "text-white");
      });

      const sort = button.getAttribute("data-sort");

      button.classList.add("bg-accent-blue", "text-white");
      onFilterChange({ sort });
    });
  });
}
