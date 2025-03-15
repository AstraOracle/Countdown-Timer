const daysEl = document.getElementById('days');
const hoursEl = document.getElementById('hours');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');
const eventNameEl = document.getElementById('event-name');
const eventTitleEl = document.querySelector('h1');
const backgroundColorPicker = document.getElementById('background-color');
const timerColorPicker = document.getElementById('time-color');

// Set the default target date as New Year's Eve
let newYears = `1 Jan ${new Date().getFullYear() + 1}`;

// Function to start the countdown
function countdown() {
    const newYearsDate = new Date(newYears); // Convert the target date to Date object
    const currentDate = new Date(); // Get the current date and time

    const totalseconds = (newYearsDate - currentDate) / 1000; // Calculate the total seconds remaining

    if (totalseconds <= 0) {
        document.getElementById('time-up-message').style.display = 'block';
        clearInterval(interval);
        return;
    }

    const days = Math.floor(totalseconds / 3600 / 24); // Calculate the number of days
    const hours = Math.floor(totalseconds / 3600) % 24; // Calculate the number of hours
    const minutes = Math.floor(totalseconds / 60) % 60; // Calculate the number of minutes
    const seconds = Math.floor(totalseconds % 60); // Calculate the number of seconds

    // Update the countdown display
    daysEl.innerHTML = days;
    hoursEl.innerHTML = formatTime(hours);
    minutesEl.innerHTML = formatTime(minutes);
    secondsEl.innerHTML = formatTime(seconds);
}

// Function to format time (add leading zero for single-digit values)
function formatTime(time) {
    return time < 10 ? (`0${time}`) : time;
}

// Function to set the custom countdown
function setCustomDate() {
    const userDate = document.getElementById('event-date').value; // Get the user's input
    if (userDate) {
        newYears = userDate; // Update the target date with the user's date
        countdown(); // Update the countdown immediately
        setInterval(countdown, 1000); // Continue updating the countdown every second
    }
}

// Initial countdown
countdown();
setInterval(countdown, 1000); // Update the countdown every second

function showConfetti() {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    document.body.appendChild(confetti);

    setTimeout(() => {
        confetti.remove();
    }, 5000);
}

function updateEventName() {
    const eventName = eventNameEl.value.trim();

    if (eventName){
        eventTitleEl.textContent = eventName;
    }
}

function updateColors() {
    const backgroundColor = backgroundColorPicker.value;
    const timerColor = timerColorPicker.value;

    document.body.style.backgroundColor = backgroundColor;

    const countdownElements = document.querySelectorAll('.countdown-el,.big-text,#time-up-message h2');
    countdownElements.forEach(element => {
        element.style.color = timerColor;
    });
}

backgroundColorPicker.addEventListener('input',updateColors);
timerColorPicker.addEventListener('input',updateColors);