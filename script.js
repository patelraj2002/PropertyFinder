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
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbySPAQAeYMV5NbHY7MMYsHy8fS8vUc7opjtJSYBmMvZPf2vs-WIonoomLlGRxjLzSJv/exec';

document.getElementById('subscribeBtn').addEventListener('click', async function() {
    const emailInput = document.getElementById('emailInput');
    const messageDiv = document.getElementById('subscriptionMessage');
    const subscribeBtn = this;

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
        messageDiv.innerHTML = 'Please enter a valid email address';
        messageDiv.className = 'subscription-message error';
        return;
    }

    // Show loading state
    subscribeBtn.disabled = true;
    subscribeBtn.innerHTML = 'Subscribing...';
    messageDiv.innerHTML = '';

    try {
        await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors', // Important for CORS policy
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: emailInput.value,
                timestamp: new Date().toISOString()
            })
        });

        // Show success message
        messageDiv.innerHTML = 'Thank you for subscribing! We\'ll keep you updated.';
        messageDiv.className = 'subscription-message success';
        emailInput.value = '';

    } catch (error) {
        // Show error message
        messageDiv.innerHTML = 'Something went wrong. Please try again later.';
        messageDiv.className = 'subscription-message error';
        console.error('Error:', error);
    }

    // Reset button state
    subscribeBtn.disabled = false;
    subscribeBtn.innerHTML = 'Notify Me';
});