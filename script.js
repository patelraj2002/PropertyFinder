// Set the launch date (example: 30 days from now)
const launchDate = new Date('2025-03-14T17:00:00').getTime();

// Update the countdown every second
const countdown = setInterval(function() {
    const now = new Date().getTime();
    const distance = launchDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerHTML = days.toString().padStart(2, '0');
    document.getElementById("hours").innerHTML = hours.toString().padStart(2, '0');
    document.getElementById("minutes").innerHTML = minutes.toString().padStart(2, '0');
    document.getElementById("seconds").innerHTML = seconds.toString().padStart(2, '0');

    if (distance < 0) {
        clearInterval(countdown);
        document.getElementById("timer").innerHTML = "LAUNCHED!";
    }
}, 1000);

// Optional: Add email subscription functionality
document.querySelector('button').addEventListener('click', function() {
    const email = document.querySelector('input[type="email"]').value;
    if (email) {
        // Add your email subscription logic here
        alert('Thank you for subscribing! We will notify you when we launch.');
    } else {
        alert('Please enter a valid email address.');
    }
});
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzZcpCH0wIuobasI_KCtzsnRfpR7Xr6AUf0SKdf8fAS6U_w7cYUEJN54qeser7rzRjH/exec';

document.getElementById('subscribeBtn').addEventListener('click', async function() {
    const nameInput = document.getElementById('nameInput');
    const emailInput = document.getElementById('emailInput');
    const whatsappInput = document.getElementById('whatsappInput');
    const messageDiv = document.getElementById('subscriptionMessage');
    const subscribeBtn = this;

    // Validation
    if (!nameInput.value.trim()) {
        messageDiv.innerHTML = 'Please enter your name';
        messageDiv.className = 'subscription-message error';
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
        messageDiv.innerHTML = 'Please enter a valid email address';
        messageDiv.className = 'subscription-message error';
        return;
    }

    const whatsappRegex = /^\d{10}$/;
    if (!whatsappRegex.test(whatsappInput.value)) {
        messageDiv.innerHTML = 'Please enter a valid 10-digit WhatsApp number';
        messageDiv.className = 'subscription-message error';
        return;
    }

    // Show loading state
    subscribeBtn.disabled = true;
    subscribeBtn.innerHTML = 'Subscribing...';
    messageDiv.innerHTML = '';

    // Create URL parameters
    const formData = new URLSearchParams({
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        whatsapp: whatsappInput.value.trim()
    });

    try {
        console.log('Sending data to:', GOOGLE_SCRIPT_URL);
        console.log('Data:', formData.toString());

        // Use fetch with URLSearchParams
        const response = await fetch(`${GOOGLE_SCRIPT_URL}?${formData.toString()}`, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        console.log('Response received');
        
        // Show success message
        messageDiv.innerHTML = 'Thank you for subscribing! We\'ll keep you updated.';
        messageDiv.className = 'subscription-message success';
        
        // Clear inputs
        nameInput.value = '';
        emailInput.value = '';
        whatsappInput.value = '';

    } catch (error) {
        console.error('Error:', error);
        messageDiv.innerHTML = 'Something went wrong. Please try again later.';
        messageDiv.className = 'subscription-message error';
    }

    // Reset button state
    subscribeBtn.disabled = false;
    subscribeBtn.innerHTML = 'Notify Me';
});