document.addEventListener("DOMContentLoaded", () => {
    // Mock data (replace with actual API calls in production)
    const services = []
    const appointments = []
    const reviews = []
  
    // Profile form submission
    document.getElementById("profileForm").addEventListener("submit", (e) => {
      e.preventDefault()
      const businessName = document.getElementById("businessName").value
      const contactInfo = document.getElementById("contactInfo").value
      const description = document.getElementById("description").value
  
      // Here you would typically send this data to your server
      console.log("Profile updated:", { businessName, contactInfo, description })
      alert("Profile updated successfully!")
    })
  
    // Service management
    const serviceModal = document.getElementById("serviceModal")
    const addServiceBtn = document.getElementById("addServiceBtn")
    const closeBtn = document.getElementsByClassName("close")[0]
    const serviceForm = document.getElementById("serviceForm")
    const serviceList = document.getElementById("serviceList")
  
    addServiceBtn.onclick = () => {
      serviceModal.style.display = "block"
    }
  
    closeBtn.onclick = () => {
      serviceModal.style.display = "none"
    }
  
    window.onclick = (event) => {
      if (event.target == serviceModal) {
        serviceModal.style.display = "none"
      }
    }
  
    serviceForm.addEventListener("submit", (e) => {
      e.preventDefault()
      const serviceName = document.getElementById("serviceName").value
      const serviceDescription = document.getElementById("serviceDescription").value
      const servicePrice = document.getElementById("servicePrice").value
      const serviceImage = document.getElementById("serviceImage").value
  
      const newService = { serviceName, serviceDescription, servicePrice, serviceImage }
      services.push(newService)
      renderServices()
      serviceModal.style.display = "none"
      serviceForm.reset()
    })
  
    function renderServices() {
      serviceList.innerHTML = ""
      services.forEach((service, index) => {
        const serviceCard = document.createElement("div")
        serviceCard.classList.add("service-card")
        serviceCard.innerHTML = `
                  <h3>${service.serviceName}</h3>
                  <p>${service.serviceDescription}</p>
                  <p>Price: $${service.servicePrice}</p>
                  <img src="${service.serviceImage}" alt="${service.serviceName}" style="max-width: 100%;">
                  <button onclick="editService(${index})">Edit</button>
                  <button onclick="deleteService(${index})">Delete</button>
              `
        serviceList.appendChild(serviceCard)
      })
    }
  
    window.editService = (index) => {
      const service = services[index]
      document.getElementById("serviceName").value = service.serviceName
      document.getElementById("serviceDescription").value = service.serviceDescription
      document.getElementById("servicePrice").value = service.servicePrice
      document.getElementById("serviceImage").value = service.serviceImage
      serviceModal.style.display = "block"
      // Remove the old service and add the updated one on form submission
      services.splice(index, 1)
    }
  
    window.deleteService = (index) => {
      services.splice(index, 1)
      renderServices()
    }
  
    // Appointment management
    function renderAppointments() {
      const appointmentList = document.getElementById("appointmentList")
      appointmentList.innerHTML = ""
      appointments.forEach((appointment, index) => {
        const appointmentCard = document.createElement("div")
        appointmentCard.classList.add("appointment-card")
        appointmentCard.innerHTML = `
                  <h3>${appointment.serviceName}</h3>
                  <p>Date: ${appointment.date}</p>
                  <p>Status: ${appointment.status}</p>
                  <button onclick="updateAppointmentStatus(${index}, 'accepted')">Accept</button>
                  <button onclick="updateAppointmentStatus(${index}, 'declined')">Decline</button>
              `
        appointmentList.appendChild(appointmentCard)
      })
    }
  
    window.updateAppointmentStatus = (index, status) => {
      appointments[index].status = status
      renderAppointments()
    }
  
    // Payment management
    document.getElementById("paymentForm").addEventListener("submit", (e) => {
      e.preventDefault()
      const paymentMethod = document.getElementById("paymentMethod").value
      const paymentTiming = document.getElementById("paymentTiming").value
  
      // Here you would typically send this data to your server
      console.log("Payment settings updated:", { paymentMethod, paymentTiming })
      alert("Payment settings updated successfully!")
    })
  
    // Reviews
    function renderReviews() {
      const reviewList = document.getElementById("reviewList")
      reviewList.innerHTML = ""
      reviews.forEach((review) => {
        const reviewCard = document.createElement("div")
        reviewCard.classList.add("review-card")
        reviewCard.innerHTML = `
                  <h3>${review.serviceName}</h3>
                  <p>Rating: ${review.rating}/5</p>
                  <p>${review.comment}</p>
              `
        reviewList.appendChild(reviewCard)
      })
    }
  
    // Initial render
    renderServices()
    renderAppointments()
    renderReviews()
  })
  
  