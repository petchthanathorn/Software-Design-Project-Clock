let timer;
let isRunning = false;
let currentMode = 'pomodoro';
let timeLeft = 1200; // Default Pomodoro time in seconds
let appMode = 'Personal'; // Default mode
let roundCount = 0; // Track Pomodoro rounds
let pomodoroRounds = 0; // Count completed Pomodoro rounds

function startPauseTimer() {
    if (isRunning) {
        clearInterval(timer);
        document.getElementById('start-pause-button').textContent = 'Start';
    } else {
        document.getElementById('start-pause-button').textContent = 'Pause';
        timer = setInterval(countdown, 1000);
    }
    isRunning = !isRunning;
}

// function countdown() {
//     if (timeLeft <= 0) {
//         clearInterval(timer);
//         playSound();
//         if (document.getElementById('auto-transition').checked) {
//             switchMode();
//         }
//         isRunning = false;
//         document.getElementById('start-pause-button').textContent = 'Start';
//     } else {
//         timeLeft--;
//         updateDisplay();
//     }
// }

function countdown() {
    if (timeLeft <= 0) {
        clearInterval(timer);
        handleRoundCompletion();
        isRunning = false;
        document.getElementById('start-pause-button').textContent = 'Start';
    } else {
        timeLeft--;
        updateDisplay();
    }
}


function handleRoundCompletion() {
    if (currentMode === 'pomodoro') {
        let roundCount = 0;
        for (let i = 0; i < 4; i++) {
            setTimerMode('pomodoro');
            startPauseTimer();
            if (roundCount < 4) {
                setTimerMode('shortBreak');
                // addRoundSymbol();
                startPauseTimer();
            } else {
                setTimerMode('longBreak');
                startPauseTimer();
                roundCount = 0;
            }
            roundCount++;
            addRoundSymbol();
        }
    } else {
        setTimerMode('pomodoro');
    }
}

function addRoundSymbol() {
    const pomodoroRoundsElem = document.getElementById('pomodoro-rounds');
    const span = document.createElement('span');
    span.textContent = '●';
    span.classList.add('completed');
    pomodoroRoundsElem.appendChild(span);
}

function updateDisplay() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    document.getElementById('time-display').textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    document.getElementById('start-pause-button').textContent = 'Start';
    setTimeByMode();
    updateDisplay();
}

function setTimerMode(mode) {
    currentMode = mode;
    document.querySelectorAll('.timer-mode').forEach(button => button.classList.remove('active'));
    document.querySelector(`.timer-mode[onclick="setTimerMode('${mode}')"]`).classList.add('active');
    updateDisplay();
    setTimeByMode();
    //เพิ่มเอง
    startPauseTimer()
    resetTimer()
}

function setTimeByMode() {
    const pomodoroTime = document.getElementById('pomodoro-time').value * 60;
    const shortBreakTime = document.getElementById('short-break-time').value * 60;
    const longBreakTime = document.getElementById('long-break-time').value * 60;

    switch (currentMode) {
        case 'pomodoro':
            timeLeft = pomodoroTime;
            break;
        case 'shortBreak':
            timeLeft = shortBreakTime;
            break;
        case 'longBreak':
            timeLeft = longBreakTime;
            break;
    }
}

function toggleSettings() {
    const settings = document.getElementById('timer-settings');
    settings.style.display = settings.style.display === 'none' || !settings.style.display ? 'flex' : 'none';
    //เพิ่มเอง
    // startPauseTimer()
}

function minimizeTimer() {
    document.getElementById('timer-container').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}

function showTimer() {
    document.getElementById('timer-container').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
    //เพิ่มเอง
    // setTimeByMode();
    // updateDisplay();
}

function hideTimer() {
    document.getElementById('timer-container').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}

function updateTimeSettings() {
    setTimeByMode(); // Update the timer mode based on the new settings
    updateDisplay(); // Immediately update the time display
    //เพิ่มเอง
    document.getElementById('start-pause-button').textContent = 'Start';
}

function saveSettings() {
    toggleSettings();  // Close the settings
    setTimeByMode();   // Apply the new time settings
    resetTimer()
}

function playSound() {
    const sound = document.getElementById('timer-sound').value;
    const audio = new Audio(`sounds/${sound}.mp3`);
    audio.volume = document.getElementById('volume-control').value / 100;
    audio.play();
}