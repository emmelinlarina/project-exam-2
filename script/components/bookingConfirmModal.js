export function bookingConfirmModal() {
  return /*html*/ `
    <div
        id="booking-confirm-modal"
        class="fixed inset-0 z-50 hidden items-center justify-center
               bg-black/40 px-4 backdrop-blur-sm"
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-confirm-title"
        aria-hidden="true"
        >
            <div class="w-full max-w-md rounded-3xl border-2 border-gray-light
                        bg-white p-6 shadow-xl"
            >
                <div class="flex items-start justify-between gap-4">
                    <div>
                        <h2 
                            id="booking-confirm-title" 
                            class="font-body text-xl font-semibold">
                            Confirm Booking
                        </h2>

                        <p class="mt-1 text-sm text-gray-500">
                            Please check your booking details.
                        </p>
                    </div>
                    
                    <button 
                        id="booking-confirm-close" 
                        type="button"
                        class="flex h-12 w-12 items-center justify-center
                               rounded-full bg-gray-light text-3xl"
                        aria-label="Close booking confirmation"
                        >
                        &times;
                    </button>
                </div>

                <div class="mt-6 rounded-2xl bg-gray-light p-4">
                    <div class="space-y-2 text-sm">

                        <div class="flex justify-between gap-4">
                            <span>Check in:</span>
                            <span id="confirm-checkin" class="font-semibold"></span>
                        </div>
                        
                        <div class="flex justify-between gap-4">
                            <span>Check out:</span>
                            <span id="confirm-checkout" class="font-semibold"></span>
                        </div>

                        <div class="flex justify-between gap-4">
                            <span>Guests:</span>
                            <span id="confirm-guests" class="font-semibold"></span>
                        </div>

                        <div class="flex justify-between gap-4">
                            <span>Total Price:</span>
                            <span id="confirm-total" class="font-semibold"></span>
                        </div>
                    </div>
                </div>

                <div class="mt-6 flex justify-end gap-2">
                    <button 
                        id="cancel-booking-confirm" 
                        type="button"
                        class="rounded-full border-2 border-gray-light
                                bg-white px-5 py-2.5 text-sm font-semibold"
                    >
                        Cancel
                    </button>

                    <button 
                        id="confirm-booking-button" 
                        type="button"
                        class="rounded-full bg-primary px-5 py-2.5 text-sm
                               font-semibold text-white"
                    >
                        Confirm booking
                    </button>
                </div>
            </div>
        </div>
    `;
}
