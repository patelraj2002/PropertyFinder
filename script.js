// Set the launch date to March 14, 2025, 17:00:00
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
        document.getElementById("days").innerHTML = "00";
        document.getElementById("hours").innerHTML = "00";
        document.getElementById("minutes").innerHTML = "00";
        document.getElementById("seconds").innerHTML = "00";
        document.querySelector('.coming-soon h1').innerHTML = "We Are Live!";
    }
}, 1000);

// Form submission handling
const scriptURL = 'https://script.google.com/macros/s/AKfycbx9f1yjsezIwXCbqzMizTdi1LrIpnjKzwworZ_hJ2JyYrNLEShwzpbNC0j4AxeigRky/exec';
const form = document.forms['submit-to-google-sheet'];
const msg = document.getElementById("subscriptionMessage");
const submitBtn = form.querySelector('.submit-btn');
const btnText = submitBtn.querySelector('.btn-text');
const btnIcon = submitBtn.querySelector('.btn-icon');

form.addEventListener('submit', e => {
    e.preventDefault();
    
    // Form validation
    const nameInput = form.querySelector('input[name="Name"]');
    const emailInput = form.querySelector('input[name="Email"]');
    const whatsappInput = form.querySelector('input[name="WhatsApp_number"]');

    // Basic validation
    if (!nameInput.value.trim()) {
        showMessage("Please enter your name", "error");
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
        showMessage("Please enter a valid email address", "error");
        return;
    }

    const whatsappRegex = /^\d{10}$/;
    if (!whatsappRegex.test(whatsappInput.value)) {
        showMessage("Please enter a valid 10-digit WhatsApp number", "error");
        return;
    }

    // Show loading state
    submitBtn.classList.add('loading');
    btnText.textContent = 'Subscribing...';
    btnIcon.textContent = '↻';
    msg.innerHTML = '';

    fetch(scriptURL, { 
        method: 'POST', 
        body: new FormData(form)
    })
    .then(response => {
        showMessage("Thank you for subscribing! We'll keep you updated.", "success");
        form.reset();
        
        // Auto hide message after 5 seconds
        setTimeout(() => {
            msg.style.opacity = '0';
            setTimeout(() => {
                msg.innerHTML = '';
                msg.style.opacity = '1';
            }, 300);
        }, 5000);
    })
    .catch(error => {
        showMessage("Something went wrong. Please try again later.", "error");
        console.error('Error!', error.message);
    })
    .finally(() => {
        submitBtn.classList.remove('loading');
        btnText.textContent = 'Notify Me';
        btnIcon.textContent = '→';
    });
});

// Helper function to show messages
function showMessage(text, type) {
    msg.innerHTML = text;
    msg.className = `subscription-message ${type}`;
    msg.style.opacity = '1';
}

// Input validation feedback
const inputs = form.querySelectorAll('input');
inputs.forEach(input => {
    // Show validation feedback when form submission is attempted
    input.addEventListener('invalid', (e) => {
        e.preventDefault();
        input.classList.add('error');
    });
    
    // Remove error class when user starts typing
    input.addEventListener('input', () => {
        input.classList.remove('error');
    });

    // Remove error class when input is focused
    input.addEventListener('focus', () => {
        input.classList.remove('error');
    });
});

// Optional: Smooth scroll to form when "Get Early Access" is clicked
document.querySelectorAll('a[href="#subscribe"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Optional: Add loading animation to the countdown
window.addEventListener('load', () => {
    document.querySelector('.timer').style.opacity = '1';
});