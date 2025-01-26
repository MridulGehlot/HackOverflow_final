document.addEventListener('DOMContentLoaded', () => {
    const openModalBtn = document.getElementById('openBookingModal');
    const bookingModal = document.getElementById('bookingModal');
    const overlay = document.getElementById('overlay');
    const closeModalBtn = document.getElementById('closeModal');
    const bookingForm = document.getElementById('bookingForm');
    const dateInput = document.getElementById('bookingDate');
    const timeSlots = document.getElementById('timeSlots');
    let selectedSlot = null;

    // Open Modal
    openModalBtn.addEventListener('click', () => {
        bookingModal.style.display = 'block';
        overlay.style.display = 'block';
    });

    // Close Modal
    closeModalBtn.addEventListener('click', () => {
        bookingModal.style.display = 'none';
        overlay.style.display = 'none';
    });

    // Set min date to today
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);

    // Time slot selection
    timeSlots.addEventListener('click', (e) => {
        if (e.target.classList.contains('slot-btn')) {
            if (selectedSlot) {
                selectedSlot.classList.remove('selected');
            }
            e.target.classList.add('selected');
            selectedSlot = e.target;
        }
    });

    // Form Submission
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const selectedDate = dateInput.value;
        const selectedTime = selectedSlot ? selectedSlot.dataset.time : null;

        if (selectedDate && selectedTime) {
            // Booking successful
            openModalBtn.textContent = 'Booked';
            openModalBtn.classList.add('booked');
            openModalBtn.disabled = true;

            // Close modal
            bookingModal.style.display = 'none';
            overlay.style.display = 'none';

            // Optional: Send booking data to server
            console.log(`Booked for ${selectedDate} at ${selectedTime}`);
        } else {
            alert('Please select both date and time slot');
        }

const abcd=document.getElementById("bookingList");
abcd.innerHTML = "Booked Services : Plumber<br>Date : 27/01/2025 <br>Time : 6-7 pm"

    });
});





document.addEventListener('DOMContentLoaded', function() {
    // Mock data (replace with actual API calls in production)
    let services = [
        { id: 1, name: 'Haircut', category: 'haircut', price: 30, rating: 4.5, image: '/placeholder.svg?height=150&width=250' },
        { id: 2, name: 'Plumbing Repair', category: 'plumbing', price: 80, rating: 4.2, image: '/placeholder.svg?height=150&width=250' },
        { id: 3, name: 'House Cleaning', category: 'cleaning', price: 50, rating: 4.8, image: '/placeholder.svg?height=150&width=250' },
        { id: 4, name: 'Electrical Wiring', category: 'electrician', price: 100, rating: 4.6, image: '/placeholder.svg?height=150&width=250' }
    ];

    let bookings = [];
    let reviews = [];

    // Profile form submission
    document.getElementById('profileForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(this);
        const profileData = Object.fromEntries(formData.entries());
        console.log('Profile updated:', profileData);
        alert('Profile updated successfully!');
    });

    // Service discovery
    const serviceList = document.getElementById('serviceList');
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const priceFilter = document.getElementById('priceFilter');
    const ratingFilter = document.getElementById('ratingFilter');

    function renderServices(filteredServices) {
        serviceList.innerHTML = '';
        filteredServices.forEach(service => {
            const serviceCard = document.createElement('div');
            serviceCard.classList.add('service-card');
            serviceCard.innerHTML = `
                <img src="${service.image}" alt="${service.name}">
                <h3>${service.name}</h3>
                <p>Price: $${service.price}</p>
                <p class="rating">Rating: ${service.rating} ⭐</p>
                <button onclick="openBookingModal(${service.id})">Book Now</button>
            `;
            serviceList.appendChild(serviceCard);
        });
    }

    function filterServices() {
        let filteredServices = services;

        const searchTerm = searchInput.value.toLowerCase();
        const category = categoryFilter.value;
        const price = priceFilter.value;
        const rating = ratingFilter.value;

        filteredServices = filteredServices.filter(service => 
            service.name.toLowerCase().includes(searchTerm) &&
            (category === '' || service.category === category) &&
            (rating === '' || service.rating >= parseFloat(rating))
        );

        if (price === 'low') {
            filteredServices.sort((a, b) => a.price - b.price);
        } else if (price === 'high') {
            filteredServices.sort((a, b) => b.price - a.price);
        }

        renderServices(filteredServices);
    }

    searchInput.addEventListener('input', filterServices);
    categoryFilter.addEventListener('change', filterServices);
    priceFilter.addEventListener('change', filterServices);
    ratingFilter.addEventListener('change', filterServices);

    // Initial render
    renderServices(services);

    // Booking modal
    const bookingModal = document.getElementById('bookingModal');
    const bookingForm = document.getElementById('bookingForm');
    const closeBookingModal = bookingModal.querySelector('.close');

    window.openBookingModal = function(serviceId) {
        bookingModal.style.display = 'block';
        bookingForm.dataset.serviceId = serviceId;
    }

    closeBookingModal.onclick = function() {
        bookingModal.style.display = 'none';
    }

    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const serviceId = this.dataset.serviceId;
        const formData = new FormData(this);
        const bookingData = Object.fromEntries(formData.entries());
        bookingData.serviceId = serviceId;
        bookings.push(bookingData);
        console.log('New booking:', bookingData);
        alert('Service booked successfully!');
        bookingModal.style.display = 'none';
        renderBookings();
    });

    // Render bookings
    function renderBookings() {
        const bookingList = document.getElementById('bookingList');
        bookingList.innerHTML = '';
        //bookings.forEach((bookings, 'indexI ll continue the text stream from the cut-off point: bookingList'));
        bookingList.innerHTML = '';
        bookings.forEach((booking, index) => {
            const bookingCard = document.createElement('div');
            bookingCard.classList.add('booking-card');
            bookingCard.innerHTML = `
                <h3>Booking #${index + 1}</h3>
                <p>Service: ${services.find(s => s.id == booking.serviceId).name}</p>
                <p>Date: ${booking.serviceDate}</p>
                <p>Time: ${booking.serviceTime}</p>
                <p>Notes: ${booking.serviceNotes}</p>
                <button onclick="openReviewModal(${index})">Leave Review</button>
            `;
            bookingList.appendChild(bookingCard);
        });
    }

    // Review modal
    const reviewModal = document.getElementById('reviewModal');
    const reviewForm = document.getElementById('reviewForm');
    const closeReviewModal = reviewModal.querySelector('.close');

    window.openReviewModal = function(bookingIndex) {
        reviewModal.style.display = 'block';
        reviewForm.dataset.bookingIndex = bookingIndex;
    }

    closeReviewModal.onclick = function() {
        reviewModal.style.display = 'none';
    }

    reviewForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const bookingIndex = this.dataset.bookingIndex;
        const formData = new FormData(this);
        const reviewData = Object.fromEntries(formData.entries());
        reviewData.bookingIndex = bookingIndex;
        reviews.push(reviewData);
        console.log('New review:', reviewData);
        alert('Review submitted successfully!');
        reviewModal.style.display = 'none';
        renderReviews();
    });

    // Render reviews
    function renderReviews() {
        const reviewList = document.getElementById('reviewList');
        reviewList.innerHTML = '';
        reviews.forEach((review, index) => {
            const reviewCard = document.createElement('div');
            reviewCard.classList.add('review-card');
            const booking = bookings[review.bookingIndex];
            const service = services.find(s => s.id == booking.serviceId);
            reviewCard.innerHTML = `
                <h3>Review for ${service.name}</h3>
                <p>Rating: ${'⭐'.repeat(review.rating)}</p>
                <p>${review.reviewText}</p>
            `;
            reviewList.appendChild(reviewCard);
        });
    }

    // Close modals when clicking outside
    window.onclick = function(event) {
        if (event.target == bookingModal) {
            bookingModal.style.display = 'none';
        }
        if (event.target == reviewModal) {
            reviewModal.style.display = 'none';
        }
    }

    // Initial render of bookings and reviews
    renderBookings();
    renderReviews();
});

