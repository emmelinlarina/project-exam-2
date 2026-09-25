import { createVenueCard } from "../render/venueCard.js";

export function renderPopularStays(venues) {
  const venueList = document.getElementById("popular-stays");
  const popularVenues = [...venues]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 10);

  venueList.innerHTML = /*html*/ `
  <div class="py-10">
    <div class="px-4 md:px-8 lg:px-12">
      <h2 class="mb-4 font-body text-lg font-semibold text-black">
        Popular Stays
      </h2>
  </div>

    <div class="relative">
      <button 
        id="popular-prev"
        type="button"
        aria-label="Previous popular stay"
        class="absolute left-10 top-1/2 z-10 flex h-15 w-15 -translate-y-1/2 
               items-center justify-center rounded-full bg-white shadow-md 
               transition hover:scale-105"
      >
        <i class="fa-solid fa-chevron-left" aria-hidden="true"></i>
      </button>

      <div 
        id="popular-carousel"
        class="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth
              px-[calc(50%-120px)] pb-4 [scrollbar-none] [&::-webkit-scrollbar]:hidden"
      >
        ${popularVenues
          .map((venue) => createVenueCard(venue, "featured"))
          .join("")}
      </div>

      <button 
        id="popular-next"
        type="button"
        aria-label="Next popular stay"
        class="absolute right-10 top-1/2 z-10 flex h-15 w-15 -translate-y-1/2 
               items-center justify-center rounded-full bg-white shadow-md 
               transition hover:scale-105"
      >
        <i class="fa-solid fa-chevron-right" aria-hidden="true"></i>
      </button>
    </div>
  </div>
`;

  const carousel = document.getElementById("popular-carousel");
  const cards = [...carousel.querySelectorAll("article")];

  const prevButton = document.getElementById("popular-prev");
  const nextButton = document.getElementById("popular-next");

  let activeIndex = Math.floor(cards.length / 2);
  let scrollTimeout;

  function updateActiveCard() {
    cards.forEach((card, index) => {
      const info = card.querySelector(".venue-info");
      const isActive = index === activeIndex;

      if (info) {
        info.classList.toggle("opacity-0", !isActive);
        info.classList.toggle("opacity-100", isActive);
      }
    });

    prevButton.disabled = activeIndex === 0;
    nextButton.disabled = activeIndex === cards.length - 1;
  }

  function scrollToActiveCard(behavior = "smooth") {
    const card = cards[activeIndex];
    if (!card) return;

    const scrollLeft =
      card.offsetLeft - carousel.clientWidth / 2 + card.clientWidth / 2;

    carousel.scrollTo({
      left: scrollLeft,
      behavior,
    });

    updateActiveCard();
  }

  function findCenteredCard() {
    const carouselRect = carousel.getBoundingClientRect();
    const carouselCenter = carouselRect.left + carouselRect.width / 2;

    let closestIndex = 0;
    let closestDistance = Infinity;

    cards.forEach((card, index) => {
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;
      const distance = Math.abs(carouselCenter - cardCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    activeIndex = closestIndex;
    updateActiveCard();
  }

  nextButton.addEventListener("click", () => {
    if (activeIndex < cards.length - 1) {
      activeIndex = Math.min(activeIndex + 1, cards.length - 1);
      scrollToActiveCard();
    }
  });

  prevButton.addEventListener("click", () => {
    if (activeIndex > 0) {
      activeIndex = Math.max(activeIndex - 1, 0);
      scrollToActiveCard();
    }
  });

  carousel.addEventListener("scroll", () => {
    clearTimeout(scrollTimeout);

    scrollTimeout = setTimeout(() => {
      findCenteredCard();
    }, 100);
  });

  scrollToActiveCard("auto");
}
