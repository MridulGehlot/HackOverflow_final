document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm")
    const registerForm = document.getElementById("registerForm")
  
    if (loginForm) {
      loginForm.addEventListener("submit", (e) => {
        e.preventDefault()
        const email = document.getElementById("email").value
        const password = document.getElementById("password").value
        const userType = document.getElementById("userType").value
  
        // Here you would typically send this data to your server for authentication
        console.log("Login attempt:", { email, password, userType })
  
        // For demonstration purposes, we'll just log the user in
        alert(`Welcome back, ${email}! You are logged in as a ${userType}.`)
        // Redirect to home page or dashboard
        if(userType==="user") window.location.href = "user-dashboard.html"
        else window.location.href = "provider-dashboard.html"
      })
    }
  
    if (registerForm) {
      registerForm.addEventListener("submit", (e) => {
        e.preventDefault()
        const name = document.getElementById("name").value
        const email = document.getElementById("email").value
        const password = document.getElementById("password").value
        const confirmPassword = document.getElementById("confirmPassword").value
        const userType = document.getElementById("userType").value
  
        if (password !== confirmPassword) {
          alert("Passwords don't match!")
          return
        }
  
        // Here you would typically send this data to your server to create a new account
        console.log("Registration attempt:", { name, email, password, userType })
  
        // For demonstration purposes, we'll just log the user in
        alert(`Thank you for registering, ${name}! You are now logged in as a ${userType}.`)
        // Redirect to home page or dashboard
        if(userType==="user") window.location.href = "user-dashboard.html"
        else window.location.href = "provider-dashboard.html"
      })
    }
  })