let timer;
let isRunning = false;
let currentMode = 'pomodoro';
let timeLeft = 1200; // Default Pomodoro time in seconds

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

function countdown() {
    if (timeLeft <= 0) {
        clearInterval(timer);
        playSound();
        if (document.getElementById('auto-transition').checked) {
            switchMode();
        }
        isRunning = false;
        document.getElementById('start-pause-button').textContent = 'Start';
    } else {
        timeLeft--;
        updateDisplay();
    }
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
    setTimeByMode();
    updateDisplay();
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

function playSound() {
    const sound = document.getElementById('timer-sound').value;
    const audio = new Audio(`sounds/${sound}.mp3`);
    audio.volume = document.getElementById('volume-control').value / 100;
    audio.play();
}

function toggleSettings() {
    const settings = document.getElementById('timer-settings');
    settings.style.display = settings.style.display === 'none' || !settings.style.display ? 'flex' : 'none';
}
