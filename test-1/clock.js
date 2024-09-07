let timer;
let timeLeft;
let isPaused = false;
let selectedMode = "pomodoro";

const pomodoroInput = document.getElementById('pomodoro');
const shortBreakInput = document.getElementById('shortBreak');
const longBreakInput = document.getElementById('longBreak');

const timerDisplay = document.getElementById('timerDisplay');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const alarmSoundSelect = document.getElementById('alarmSound');

document.getElementById('pomodoroMode').addEventListener('click', () => setMode('pomodoro'));
document.getElementById('shortBreakMode').addEventListener('click', () => setMode('shortBreak'));
document.getElementById('longBreakMode').addEventListener('click', () => setMode('longBreak'));

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

function setMode(mode) {
    selectedMode = mode;
    resetTimer();
}

function startTimer() {
    if (isPaused) {
        isPaused = false;
        startBtn.disabled = true;
        pauseBtn.disabled = false;
        runTimer();
    } else {
        let minutes;
        if (selectedMode === 'pomodoro') {
            minutes = parseInt(pomodoroInput.value);
        } else if (selectedMode === 'shortBreak') {
            minutes = parseInt(shortBreakInput.value);
        } else if (selectedMode === 'longBreak') {
            minutes = parseInt(longBreakInput.value);
        }

        timeLeft = minutes * 60;
        startBtn.disabled = true;
        pauseBtn.disabled = false;
        runTimer();
    }
}

function runTimer() {
    timer = setInterval(() => {
        if (!isPaused) {
            timeLeft--;
            updateDisplay();
            if (timeLeft <= 0) {
                clearInterval(timer);
                playAlarm();
                resetTimer();
            }
        }
    }, 1000);
}

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function pauseTimer() {
    isPaused = true;
    startBtn.disabled = false;
    pauseBtn.disabled = true;
}

function resetTimer() {
    clearInterval(timer);
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    if (selectedMode === 'pomodoro') {
        timeLeft = parseInt(pomodoroInput.value) * 60;
    } else if (selectedMode === 'shortBreak') {
        timeLeft = parseInt(shortBreakInput.value) * 60;
    } else if (selectedMode === 'longBreak') {
        timeLeft = parseInt(longBreakInput.value) * 60;
    }
    updateDisplay();
}

function playAlarm() {
    const alarmSound = new Audio(alarmSoundSelect.value);
    alarmSound.play();
}

// Initialize display
resetTimer();
