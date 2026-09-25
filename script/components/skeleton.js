export function createHeroSkeleton() {
  return `
    <div 
        class="relative min-h-90 w-full bg-gray-light
               md:h-120 lg:h-135"
        aria-hidden="true"
    >
        <div class="absolute inset-0 bg-gray-light"></div>
    </div>
  `;
}

export function createFeaturedSkeleton() {
  return `
    <article 
        class="h-75 w-60 shrink-0 rounded-3xl bg-gray-light"
        aria-hidden="true"
    ></article>
  `;
}
export function createSkeletonCard() {
  return `
    <article 
        class="overflow-hidden rounded-lg bg-white"
        aria-hidden="true"
    >
        <div class="h-40 w-full bg-gray-light"></div>

        <div class="p-3">
            <div class="mb-2 h-4 w-3/4 rounded bg-gray-light"></div>
            <div class="h-4 w-1/2 rounded bg-gray-light"></div>

            <div class="mt-3 flex justify-between">
                <div class="h-3 w-10 rounded bg-gray-light"></div>
                <div class="h-3 w-20 rounded bg-gray-light"></div>
            </div>
        </div>
    </article>
  `;
}

export function renderHomeSkeleton() {
  const hero = document.getElementById("hero");
  const popularStays = document.getElementById("popular-stays");
  const venueList = document.getElementById("venue-list");

  hero.innerHTML = `
    <div class="animate-pulse">
        ${createHeroSkeleton()}
    </div>
  `;

  popularStays.innerHTML = `
        <div class="min-h-95 animate-pulse py-8 px-4 md:px-8 lg:px-12"
        aria-hidden="true"
        >
              <div class="mb-5 h-7 w-40 rounded bg-gray-light"></div>
              
              <div class="flex gap-4 overflow-hidden">
                    ${Array.from({ length: 5 })
                      .map(() => createFeaturedSkeleton())
                      .join("")}
              </div>
        </div>
    `;

  venueList.innerHTML = `
        <div class="px-4 md:px-8 lg:px-12">
           <div class="mx-auto max-w-7xl">
              
              <div class="grid grid-cols-2 gap-4 animate-pulse
                          md:grid-cols-3 md:px-8 
                          lg:grid-cols-4">
                    ${Array.from({ length: 8 })
                      .map(() => createSkeletonCard())
                      .join("")}
              </div>
           </div>
        </div>
    `;
}
