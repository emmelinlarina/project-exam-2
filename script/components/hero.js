export function renderHero(venues) {
  const hero = document.getElementById("hero");

  const heroImages = [...venues]
    .filter((venue) => venue.media?.[0]?.url)
    .sort((a, b) => b.rating - a.rating)
    .slice(1, 7)
    .map((venue) => ({
      url: venue.media[0].url,
      alt: venue.media[0].alt || venue.name || "Hero image",
    }));

  hero.innerHTML = /*html*/ `
      <div 
        class="relative min-h-90 overflow-hidden
             bg-gray-light md:min-h-120 lg:min-h-135"
      > 
        ${heroImages
          .map(
            (image, index) => `
              <img
                src="${image.url}"
                alt="${image.alt}"
                class="hero-image absolute inset-0 h-full w-full
                       scale-105
                       object-cover transition-opacity duration-1000
                       ${index === 0 ? "opacity-100" : "opacity-0"}"
              />
            `,
          )
          .join("")}

        <div class="absolute inset-0 bg-linear-to-t from-black/70 via-black/15 to-black/5"
             aria-hidden="true">
        </div>

          <div 
            class="absolute inset-0 flex items-end
                   px-6 pb-8 md:pb-10 lg:px-12 lg:pb-12" 
            >
              <div class="max-w-xl text-white">

              <p 
                class="mb-2 text-xs font-semibold uppercase
                       tracking-widest md:text-base"
                    >
                  Discover your next stay
              </p>

            <h1 class="font-body font-semibold text-xl leading-tight
                    md:text-4xl lg:text-5xl">
              Go somewhere. <br>
              Stay awhile.
            </h1>
          </div>
        </div>

        <div 
          class="absolute bottom-5 right-6 flex gap-2
                 md:bottom-6 md:right-8"
        aria-hidden="true"
        >
          ${heroImages
            .map(
              (_, index) => `
            <span
              class="hero-dot h-1.5 rounded-full transition-all duration-300
                     ${index === 0 ? "w-6 bg-white" : "w-2 bg-white/60"}"
            ></span>
          `,
            )
            .join("")}
        </div> 
      </div>
`;

  const images = hero.querySelectorAll(".hero-image");
  const dots = hero.querySelectorAll(".hero-dot");

  if (images.length <= 1) return;

  let currentImage = 0;

  setInterval(() => {
    images[currentImage].classList.remove("opacity-100");
    images[currentImage].classList.add("opacity-0");

    dots[currentImage].classList.remove("w-6", "bg-white");
    dots[currentImage].classList.add("w-2", "bg-white/60");

    currentImage = (currentImage + 1) % images.length;

    images[currentImage].classList.remove("opacity-0");
    images[currentImage].classList.add("opacity-100");
    dots[currentImage].classList.remove("w-2", "bg-white/60");
    dots[currentImage].classList.add("w-6", "bg-white");
  }, 5000);
}
