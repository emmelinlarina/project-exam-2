export function venueForm() {
  return /*html*/ `
        <form 
            id="venueForm"
            class="rounded-3xl border border-accent-brown bg-white p-6 mb-6"
        >
        <div class="grid gap-5">

            <div>
                <label for="venueName" class="text-sm font-semibold">
                    Venue Name
                </label>

                <input 
                    type="text" 
                    id="venueName" 
                    name="name" 
                    required
                    placeholder="Enter venue name"
                    class="mt-2 w-full rounded-2xl border-2 border-gray-light px-4 py-3 outline-none focus:border-accent-brown focus:ring focus:ring-accent-brown focus:ring-opacity-50"
                />
            </div>

            

            <div> 
                <label for="venueDescription" class="text-sm font-semibold">
                    Description
                </label>

                <textarea 
                    id="venueDescription" 
                    name="description" 
                    required
                    rows="5"
                    placeholder="Describe your venue"
                    class="mt-2 w-full rounded-2xl border-2 border-gray-light px-4 py-3 outline-none focus:border-accent-brown focus:ring focus:ring-accent-brown focus:ring-opacity-50"
                ></textarea>
            </div>

            <div class="grid gap-5 sm:grid-cols-2">
                <div>
                <label for="venuePrice" class="text-sm font-semibold">
                    Price per night
                </label>

                <input 
                    type="number" 
                    id="venuePrice" 
                    name="price" 
                    min="0"
                    required
                    class="mt-2 w-full rounded-2xl border-2 border-gray-light px-4 py-3 outline-none focus:border-accent-brown focus:ring focus:ring-accent-brown focus:ring-opacity-50"
                />
            </div>

            <div>
                <label for="venueGuests" class="text-sm font-semibold">
                    Max Guests
                </label>

                <input 
                    type="number" 
                    id="venueGuests" 
                    name="maxGuests" 
                    min="1"
                    required
                    class="mt-2 w-full rounded-2xl border-2 border-gray-light px-4 py-3 outline-none focus:border-accent-brown focus:ring focus:ring-accent-brown focus:ring-opacity-50"
                />
            </div>
        </div>

            <div>
                <label for="venueMedia" class="text-sm font-semibold">
                    Venue Media
                </label>

                <input 
                    type="url" 
                    id="venueMedia" 
                    name="media" 
                    placeholder="Enter venue media URL"
                    class="mt-2 w-full rounded-2xl border-2 border-gray-light px-4 py-3 outline-none focus:border-accent-brown focus:ring focus:ring-accent-brown focus:ring-opacity-50"
                />
            </div>

            <div>
                <h2 class="mb-3 text-sm font-semibold">
                    Amenities
                </h2>

                <div class="flex flex-wrap gap-4">
                    <label class="flex items-center space-x-2 gap-1 cursor-pointer">
                        <input type="checkbox" name="wifi" class="h-4 w-4 accent-gray cursor-pointer" />
                        WiFi
                    </label>
                    <label class="flex items-center space-x-2 gap-1 cursor-pointer">
                        <input type="checkbox" name="parking" class="h-4 w-4 accent-gray cursor-pointer" />
                        Parking
                    </label>
                    <label class="flex items-center space-x-2 gap-1 cursor-pointer">
                        <input type="checkbox" name="breakfast" class="h-4 w-4 accent-gray cursor-pointer" />
                        Breakfast
                    </label>
                    <label class="flex items-center space-x-2 gap-1 cursor-pointer">
                        <input type="checkbox" name="pets" class="h-4 w-4 accent-gray cursor-pointer" />
                        Pets
                    </label>
                </div>
            </div>

            <div>
                <h2 class="mb-3 text-sm font-semibold">Location</h2>

                <div class="grid gap-5 sm:grid-cols-2"> 
                    <div>
                        <label for="venueAddress" class="text-sm font-semibold">
                            Address
                        </label>

                        <input 
                            id="venueAddress" 
                            name="address" 
                            type="text" 
                            placeholder="Enter venue address"
                            required
                            class="mt-2 w-full rounded-2xl border-2 border-gray-light px-4 py-3 outline-none focus:border-accent-brown focus:ring focus:ring-accent-brown focus:ring-opacity-50"
                        />
                    </div>

                    <div>
                        <label for="venueCity" class="text-sm">
                            City
                        </label>

                        <input 
                            id="venueCity" 
                            name="city" 
                            type="text" 
                            placeholder="Enter venue city"
                            required
                            class="mt-2 w-full rounded-2xl border-2 border-gray-light px-4 py-3 outline-none focus:border-accent-brown focus:ring focus:ring-accent-brown focus:ring-opacity-50"
                        />
                    </div>

                    <div>
                        <label for="venueZip" class="text-sm">
                            Zip Code
                        </label>

                        <input 
                            id="venueZip" 
                            name="zip" 
                            type="text" 
                            placeholder="Enter venue zip code"
                            required
                            class="mt-2 w-full rounded-2xl border-2 border-gray-light px-4 py-3 outline-none focus:border-accent-brown focus:ring focus:ring-accent-brown focus:ring-opacity-50"
                        />
                    </div>

                    <div>
                        <label for="venueCountry" class="text-sm">
                            Country
                        </label>

                        <input 
                            id="venueCountry" 
                            name="country" 
                            type="text" 
                            placeholder="Enter venue country"
                            required
                            class="mt-2 w-full rounded-2xl border-2 border-gray-light px-4 py-3 outline-none focus:border-accent-brown focus:ring focus:ring-accent-brown focus:ring-opacity-50"
                        />
                    </div>
                </div>

                <p
                    id="venueFormMessage"
                    class="text-sm"
                    role="status"
                    aria-live="polite"
                ></p>

                <div class="flex justify-center mt-6">
                    <button
                        type="submit"
                        class="rounded-full bg-accent-blue px-6 py-3 text-base font-semibold text-white focus:outline-none focus:ring focus:ring-accent-brown focus:ring-opacity-50"
                    >
                        Create Venue
                    </button>
                </div>
        </form>
    `;
}
