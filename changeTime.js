var FifteenButton = document.getElementById("15-button");
var twentyfivemintimer = document.getElementById("25-min");
var thirtybutton = document.getElementById("30-button");
var fourtyfivebutton = document.getElementById("45-button");
var sixtybutton = document.getElementById("60-button");
var start_button = document.getElementById("start");
var reset_button = document.getElementById("Reset");

let selectedTime = 25 * 60; // Default to 25 minutes in seconds
let timerInterval;
pausemode = true;
// Function to format time as MM:SS
function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}
let timeRemaining = selectedTime;
// Function to start the timer
function startTimer() {
    pausemode = !pausemode;
    if(pausemode){
        clearInterval(timerInterval);
        twentyfivemintimer.textContent = formatTime(timeRemaining);
    }
    else{
         // Clear any existing timer        
        // Update display initially
        twentyfivemintimer.textContent = formatTime(timeRemaining);
        
        timerInterval = setInterval(() => {
            if(!pausemode){
                timeRemaining--;
    
                twentyfivemintimer.textContent = formatTime(timeRemaining);
        
                if (timeRemaining <= 0) {
                    timeRemaining = selectedTime;
                    clearInterval(timerInterval);
                    twentyfivemintimer.textContent = "Time's up!";
                }
            }

        }, 1000);
    }

}
function pauseTimer(){
    pausemode = true;
    clearInterval(timerInterval);
    timeRemaining = selectedTime;
    twentyfivemintimer.textContent = formatTime(selectedTime);
}

// Event listener for the start button
start_button.addEventListener('click', startTimer);
reset_button.addEventListener('click',pauseTimer)

// Event listeners for time selection buttons
FifteenButton.addEventListener('click', () => {
    selectedTime = 10 * 60;
    twentyfivemintimer.textContent = formatTime(selectedTime);
});

thirtybutton.addEventListener('click', () => {
    selectedTime = 15 * 60;
    twentyfivemintimer.textContent = formatTime(selectedTime);
});

fourtyfivebutton.addEventListener('click', () => {
    selectedTime = 20 * 60;
    twentyfivemintimer.textContent = formatTime(selectedTime);
});

sixtybutton.addEventListener('click', () => {
    selectedTime = 30 * 60;
    twentyfivemintimer.textContent = formatTime(selectedTime);
});

// Send timestamp of button click to the server
start_button.addEventListener('click', () => {
    let dateTime = new Date().toISOString();

    fetch('http://localhost:3000/click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clickedAt: dateTime })
    })
    .then(response => response.json())
    .then(data => console.log('Server response:', data))
    .catch(error => console.error('Error:', error));
});
