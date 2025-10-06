// NTNUExpress JavaScript functionality

// Weekly meal rotation
const weeklyMeals = {
    0: { // Sunday
        name: "Baktpotet",
        description: "Kremet baktpotet med smør og rømme"
    },
    1: { // Monday
        name: "Hash browns",
        description: "Crispy poteter"
    },
    2: { // Tuesday
        name: "Stektris",
        description: "Ris og kylling"
    },
    3: { // Wednesday
        name: "Baktpotet",
        description: "Kremet baktpotet med smør og rømme"
    },
    4: { // Thursday
        name: "Hash browns",
        description: ""
    },
    5: { // Friday
        name: "Stektris",
        description: "Krydret curry med ris og naanbrød"
    },
    6: { // Saturday
        name: "",
        description: ""
    }
};

// Order times
const orderTimes = ['10:15', '12:15', '14:15'];

// DOM elements
const mealNameEl = document.getElementById('meal-name');
const mealDescriptionEl = document.getElementById('meal-description');
const timeButtons = document.querySelectorAll('#order-times .time-btn');
const tomorrowButtons = document.querySelectorAll('#tomorrow-orders .time-btn');
const confirmationSection = document.getElementById('order-confirmation');
const selectedTimeEl = document.getElementById('selected-time');
const selectedMealEl = document.getElementById('selected-meal');
// Removed next-time and next-order-text elements
const vippsBtn = document.getElementById('vipps-btn');
const vippsModal = document.getElementById('vipps-modal');
const closeModalBtn = document.getElementById('close-modal');
const tomorrowMealNameEl = document.getElementById('tomorrow-meal-name');
const tomorrowMealDescriptionEl = document.getElementById('tomorrow-meal-description');

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    loadTodaysMeal();
    loadTomorrowsMeal();
    updateTomorrowButtons();
    updateButtonStates(); // Add this to disable past times
    setupEventListeners();
    addFadeInEffect();
    
    // Update buttons every minute
    setInterval(updateTomorrowButtons, 60000);
    setInterval(updateButtonStates, 60000); // Add this to keep updating
});

// Load today's meal based on day of week
function loadTodaysMeal() {
    const today = new Date().getDay();
    const todaysMeal = weeklyMeals[today];
    
    if (todaysMeal) {
        if (mealNameEl) mealNameEl.textContent = todaysMeal.name;
        if (mealDescriptionEl) mealDescriptionEl.textContent = todaysMeal.description;
    } else {
        if (mealNameEl) mealNameEl.textContent = "Dagens spesial";
        if (mealDescriptionEl) mealDescriptionEl.textContent = "En overraskende og deilig rett";
    }
}

// Load tomorrow's meal based on day of week
function loadTomorrowsMeal() {
    const today = new Date().getDay();
    const tomorrow = (today + 1) % 7;
    const tomorrowsMeal = weeklyMeals[tomorrow];
    
    if (tomorrowsMeal && tomorrowsMeal.name) {
        if (tomorrowMealNameEl) tomorrowMealNameEl.textContent = tomorrowsMeal.name;
        if (tomorrowMealDescriptionEl) tomorrowMealDescriptionEl.textContent = tomorrowsMeal.description || "En deilig og mettende rett";
    } else {
        if (tomorrowMealNameEl) tomorrowMealNameEl.textContent = "Morgendagens spesial";
        if (tomorrowMealDescriptionEl) tomorrowMealDescriptionEl.textContent = "En overraskende og deilig rett";
    }
}

// Update button states (available/unavailable)
function updateButtonStates() {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    
    timeButtons.forEach(button => {
        const time = button.dataset.time;
        const [hours, minutes] = time.split(':').map(Number);
        const timeInMinutes = hours * 60 + minutes;
        
        // Check if this time slot is still available today
        const isAvailable = timeInMinutes > currentTime;
        
        if (isAvailable) {
            button.disabled = false;
            button.classList.remove('disabled');
            button.style.opacity = '1';
        } else {
            button.disabled = true;
            button.classList.add('disabled');
            button.style.opacity = '0.6';
        }
    });
}

// Update tomorrow's buttons - always keep them available
function updateTomorrowButtons() {
    tomorrowButtons.forEach(button => {
        // Tomorrow's orders are always available
        button.disabled = false;
        button.classList.remove('disabled');
        button.style.opacity = '1';
    });
}

// Setup event listeners
function setupEventListeners() {
    // Today's time button clicks
    timeButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (!button.disabled) {
                selectOrderTime(button.dataset.time, 'today');
            }
        });
    });
    
    // Tomorrow's time button clicks
    tomorrowButtons.forEach(button => {
        button.addEventListener('click', function() {
            if (!button.disabled) {
                selectOrderTime(button.dataset.time, 'tomorrow');
            }
        });
    });
    
    // Vipps payment button - use event delegation since it might not exist yet
    document.addEventListener('click', function(e) {
        if (e.target && e.target.id === 'vipps-btn') {
            showVippsModal();
        }
    });
    
    // Close modal - use event delegation
    document.addEventListener('click', function(e) {
        if (e.target && e.target.id === 'close-modal') {
            hideVippsModal();
        }
    });
    
    // Close modal when clicking outside
    if (vippsModal) {
        vippsModal.addEventListener('click', function(e) {
            if (e.target === vippsModal) {
                hideVippsModal();
            }
        });
    }
}

// Handle order time selection
function selectOrderTime(time, day = 'today') {
    const now = new Date();
    
    // Get the correct meal (today's or tomorrow's)
    let mealDay = now.getDay();
    if (day === 'tomorrow') {
        mealDay = (mealDay + 1) % 7; // Next day
    }
    
    const meal = weeklyMeals[mealDay];
    const mealName = meal ? meal.name : "Dagens spesial";
    
    // Format the time display with date
    const timeDisplay = day === 'tomorrow' ? `${time} (i morgen)` : time;
    if (selectedTimeEl) selectedTimeEl.textContent = timeDisplay;
    if (selectedMealEl) selectedMealEl.textContent = mealName;
    
    // Show confirmation section with animation
    if (confirmationSection) {
        confirmationSection.classList.remove('hidden');
        confirmationSection.classList.add('fade-in');
        confirmationSection.style.display = 'block'; // Force display
        
        // Scroll to confirmation
        confirmationSection.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
        
        // Add some visual feedback
        setTimeout(() => {
            confirmationSection.style.transform = 'scale(1.02)';
            setTimeout(() => {
                confirmationSection.style.transform = 'scale(1)';
            }, 200);
        }, 100);
    }
}

// Show Vipps payment modal
function showVippsModal() {
    vippsModal.classList.remove('hidden');
    vippsModal.classList.add('fade-in');
    
    // Add some excitement
    setTimeout(() => {
        vippsBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            vippsBtn.style.transform = 'scale(1)';
        }, 150);
    }, 100);
    
    // Start Vipps payment process
    initiateVippsPayment();
}

// Hide Vipps payment modal
function hideVippsModal() {
    vippsModal.classList.add('hidden');
    vippsModal.classList.remove('fade-in');
}

// Simulate Vipps payment process
function initiateVippsPayment() {
    const modalContent = document.querySelector('.modal-content');
    const selectedTime = selectedTimeEl.textContent;
    const selectedMeal = selectedMealEl.textContent;
    
    // Update modal content to show payment process
    modalContent.innerHTML = `
        <div class="vipps-loading">
            <div class="vipps-logo-large">💳</div>
            <h3>Vipps-betaling</h3>
            <div class="payment-details">
                <p><strong>Vare:</strong> ${selectedMeal}</p>
                <p><strong>Tid:</strong> ${selectedTime}</p>
                <p><strong>Beløp:</strong> 49 kr</p>
            </div>
            <div class="payment-status">
                <div class="spinner"></div>
                <p>Kobler til Vipps...</p>
            </div>
            <button id="open-vipps-app" class="btn vipps-btn" style="margin-top: 1rem;">
                Åpne Vipps-app
            </button>
            <button id="close-modal" class="btn" style="margin-top: 0.5rem; background: #666;">
                Avbryt
            </button>
        </div>
    `;
    
    // Add event listeners for new buttons
    document.getElementById('open-vipps-app').addEventListener('click', function() {
        simulateVippsApp();
    });
    
    document.getElementById('close-modal').addEventListener('click', function() {
        hideVippsModal();
    });
    
    // Simulate connection delay
    setTimeout(() => {
        const statusEl = document.querySelector('.payment-status p');
        statusEl.textContent = 'Vipps-app klar for betaling!';
        document.querySelector('.spinner').style.display = 'none';
    }, 2000);
}

// Simulate opening Vipps app
function simulateVippsApp() {
    const modalContent = document.querySelector('.modal-content');
    
    modalContent.innerHTML = `
        <div class="vipps-success">
            <div class="success-icon">✅</div>
            <h3>Betaling fullført!</h3>
            <div class="success-details">
                <p><strong>Bestilling bekreftet</strong></p>
                <p>Du vil motta SMS-bekreftelse</p>
                <p class="order-number">Bestillingsnummer: #${generateOrderNumber()}</p>
            </div>
            <div class="next-steps">
                <h4>Neste steg:</h4>
                <ul>
                    <li>Møt opp på valgt tidspunkt</li>
                    <li>Vis bestillingsnummer</li>
                    <li>Nyt din ${selectedMealEl.textContent.toLowerCase()}!</li>
                </ul>
            </div>
            <button id="close-modal" class="btn vipps-btn">
                Lukk
            </button>
        </div>
    `;
    
    document.getElementById('close-modal').addEventListener('click', function() {
        hideVippsModal();
        // Reset the order process
        setTimeout(() => {
            confirmationSection.classList.add('hidden');
            confirmationSection.classList.remove('fade-in');
        }, 500);
    });
}

// Generate random order number
function generateOrderNumber() {
    return Math.floor(100000 + Math.random() * 900000);
}

// Add fade-in effect to page elements
function addFadeInEffect() {
    const elements = document.querySelectorAll('.card, header, footer');
    
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 150);
    });
}

// Add some interactive animations
function addInteractiveAnimations() {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click animations to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'scale(1)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// Initialize interactive animations
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(addInteractiveAnimations, 1000);
});

// Add some dynamic content updates
function addDynamicContent() {
    // Update greeting based on time of day
    const hour = new Date().getHours();
    let greeting = "";
    
    if (hour < 10) {
        greeting = "God morgen! ";
    } else if (hour < 14) {
        greeting = "God dag! ";
    } else {
        greeting = "God ettermiddag! ";
    }
    
    // Add greeting to meal section
    const mealSection = document.querySelector('#today-meal h2');
    if (mealSection && !mealSection.textContent.includes('God')) {
        mealSection.textContent = greeting + mealSection.textContent;
    }
}

// Initialize dynamic content
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(addDynamicContent, 500);
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && !vippsModal.classList.contains('hidden')) {
        hideVippsModal();
    }
});

// Add touch support for mobile
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
    
    // Add touch-specific styles
    const style = document.createElement('style');
    style.textContent = `
        .touch-device .btn:hover {
            transform: none;
        }
        .touch-device .card:hover {
            transform: none;
        }
    `;
    document.head.appendChild(style);
}
