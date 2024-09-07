let countdown;
let timeLeft = 20 * 60;
let isPaused = true;
let mode = 'personal';
let currentMode = 'pomodoro';

const timerDisplay = document.getElementById('time');
const startPauseButton = document.getElementById('start-pause');
const resetButton = document.getElementById('reset');
const settingsButton = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const saveSettingsButton = document.getElementById('save-settings');
const modeSelector = document.getElementById('mode');

startPauseButton.addEventListener('click', () => {
    if (isPaused) {
        startTimer();
    } else {
        pauseTimer();
    }
});

resetButton.addEventListener('click', resetTimer);

settingsButton.addEventListener('click', () => {
    settings.style.display = settings.style.display === 'block' ? 'none' : 'block';
});

saveSettingsButton.addEventListener('click', saveSettings);

modeSelector.addEventListener('change', (e) => {
    mode = e.target.value;
});

document.getElementById('pomodoro').addEventListener('click', () => switchMode('pomodoro'));
document.getElementById('short-break').addEventListener('click', () => switchMode('short-break'));
document.getElementById('long-break').addEventListener('click', () => switchMode('long-break'));

function startTimer() {
    isPaused = false;
    startPauseButton.textContent = 'Pause';
    countdown = setInterval(() => {
        timeLeft--;
        displayTimeLeft();
        if (timeLeft <= 0) {
            clearInterval(countdown);
            alert('Time is up!');
            if (document.getElementById('timer-sound').value) {
                let sound = new Audio(`sounds/${document.getElementById('timer-sound').value}.mp3`);
                sound.play();
            }
        }
    }, 1000);
}

function pauseTimer() {
    isPaused = true;
    clearInterval(countdown);
    startPauseButton.textContent = 'Start';
}

function resetTimer() {
    pauseTimer();
    timeLeft = document.getElementById(`${currentMode}-time`).value * 60;
    displayTimeLeft();
}

function displayTimeLeft() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function switchMode(mode) {
    currentMode = mode;
    document.querySelectorAll('.tab-selector button').forEach(button => button.classList.remove('active'));
    document.getElementById(mode).classList.add('active');
    resetTimer();
}

function saveSettings() {
    resetTimer();
    settings.style.display = 'none';
}
