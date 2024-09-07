let timer;
let isRunning = false;
let currentMode = 'pomodoro';
let timeLeft = 0; // Default time in seconds
let pomodoroRounds = 0; // Count completed Pomodoro rounds

// เริ่มหรือหยุดการนับถอยหลัง
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

// นับถอยหลัง
function countdown() {
    if (timeLeft <= 0) {
        clearInterval(timer);
        playSound(); // เล่นเสียงเมื่อหมดเวลา
        handleRoundCompletion();
    } else {
        timeLeft--;
        updateDisplay();
    }
}

// จัดการเมื่อครบ Pomodoro หรือ Break รอบหนึ่ง
function handleRoundCompletion() {
    if (currentMode === 'pomodoro') {
        addRoundSymbol(); // แสดงสัญลักษณ์แสดงรอบที่เสร็จสิ้น
        pomodoroRounds++; // เพิ่มจำนวนรอบ Pomodoro

        // ถ้ารอบไม่ใช่รอบที่ 4 ให้เปลี่ยนเป็น shortBreak
        if (pomodoroRounds % 4 !== 0) {
            setTimerMode('shortBreak');
        } else {
            // ถ้าครบรอบที่ 4 ให้เปลี่ยนเป็น longBreak
            setTimerMode('longBreak');
        }

    } else if (currentMode === 'shortBreak' || currentMode === 'longBreak') {
        // ถ้าจบ Break ให้กลับไปเริ่ม Pomodoro ใหม่
        setTimerMode('pomodoro');
    }

    startPauseTimer(); // เริ่มนับถอยหลังต่อเนื่อง
}

// เปลี่ยนโหมดการนับถอยหลัง (pomodoro, shortBreak, longBreak)
function setTimerMode(mode) {
    currentMode = mode;
    document.querySelectorAll('.timer-mode').forEach(button => button.classList.remove('active'));
    document.querySelector(`.timer-mode[onclick="setTimerMode('${mode}')"]`).classList.add('active');

    setTimeByMode(); // ตั้งค่าเวลาตามโหมดที่เลือก
    updateDisplay(); // อัปเดตการแสดงผลเวลา
}

// ตั้งค่าเวลาโดยดูจากโหมดปัจจุบัน
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

// อัปเดตการแสดงผลเวลา
function updateDisplay() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    document.getElementById('time-display').textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// รีเซ็ตตัวจับเวลา
function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    pomodoroRounds = 0; // รีเซ็ตจำนวนรอบ Pomodoro
    document.getElementById('start-pause-button').textContent = 'Start';
    setTimeByMode();
    updateDisplay();
}

// แสดงสัญลักษณ์รอบ Pomodoro ที่เสร็จสิ้น
function addRoundSymbol() {
    const pomodoroRoundsElem = document.getElementById('pomodoro-rounds');
    const span = document.createElement('span');
    span.textContent = '●';
    span.classList.add('completed');
    pomodoroRoundsElem.appendChild(span);
}

// เล่นเสียงแจ้งเตือนเมื่อหมดเวลา
function playSound() {
    const sound = document.getElementById('timer-sound').value;
    const audio = new Audio(`sounds/${sound}.mp3`);
    audio.volume = document.getElementById('volume-control').value / 100;
    // audio.play();
}

// ปุ่มย่อหรือแสดงการตั้งค่า
function toggleSettings() {
    const settings = document.getElementById('timer-settings');
    settings.style.display = settings.style.display === 'none' || !settings.style.display ? 'flex' : 'none';
    //เพิ่มเอง
    // startPauseTimer()
}

// ปุ่มย่อหน้าต่างเวลา
function minimizeTimer() {
    document.getElementById('timer-container').style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}

// ปุ่มแสดงตหน้าต่างเวลา
function showTimer() {
    document.getElementById('timer-container').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
    //เพิ่มเอง
    // setTimeByMode();
    // updateDisplay();
}

// อัพเดทการตั้งค่าเวลา
function updateTimeSettings() {
    setTimeByMode(); // Update the timer mode based on the new settings
    updateDisplay(); // Immediately update the time display
    //เพิ่มเอง
    document.getElementById('start-pause-button').textContent = 'Start';
}

// บันทึกการตั้งค่า
function saveSettings() {
    toggleSettings();  // Close the settings
    setTimeByMode();   // Apply the new time settings
    resetTimer();      // Reset the timer
}