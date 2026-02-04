// ===================================
// 800m Athletics Blog - Main JavaScript
// ===================================

// Timer Variables
let timerInterval;
let startTime;
let elapsedTime = 0;
let isRunning = false;

// Progress Data
let progressData = JSON.parse(localStorage.getItem('800mProgress')) || [];

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
});

function initializePage() {
    // Set current date in date input
    const dateInput = document.getElementById('dateInput');
    if (dateInput) {
        dateInput.valueAsDate = new Date();
    }

    // Load progress data
    loadProgress();

    // Animate stat cards
    animateStats();

    // Animate record bars
    animateRecordBars();

    // Setup scroll to top button
    setupScrollToTop();

    // Setup dark mode toggle
    setupDarkMode();

    // Add intersection observer for animations
    setupIntersectionObserver();
}

// ===================================
// Timer Functions
// ===================================

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTimer, 10);
        
        document.getElementById('startBtn').disabled = true;
        document.getElementById('stopBtn').disabled = false;
    }
}

function stopTimer() {
    if (isRunning) {
        isRunning = false;
        clearInterval(timerInterval);
        
        document.getElementById('startBtn').disabled = false;
        document.getElementById('stopBtn').disabled = true;
    }
}

function resetTimer() {
    isRunning = false;
    clearInterval(timerInterval);
    elapsedTime = 0;
    updateTimerDisplay(0);
    
    document.getElementById('startBtn').disabled = false;
    document.getElementById('stopBtn').disabled = true;
    document.getElementById('lapTimes').innerHTML = '';
}

function updateTimer() {
    elapsedTime = Date.now() - startTime;
    updateTimerDisplay(elapsedTime);
}

function updateTimerDisplay(time) {
    const totalSeconds = Math.floor(time / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor((time % 1000) / 10);
    
    const display = `${padZero(minutes)}:${padZero(seconds)}.${padZero(milliseconds)}`;
    document.getElementById('timerDisplay').textContent = display;
}

function padZero(num) {
    return num.toString().padStart(2, '0');
}

function recordLap() {
    if (elapsedTime > 0) {
        const totalSeconds = Math.floor(elapsedTime / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        const milliseconds = Math.floor((elapsedTime % 1000) / 10);
        
        const timeString = `${minutes}:${padZero(seconds)}.${padZero(milliseconds)}`;
        
        const lapTimesDiv = document.getElementById('lapTimes');
        const lapElement = document.createElement('div');
        lapElement.style.cssText = 'background: rgba(255,255,255,0.2); padding: 1rem; margin-top: 0.5rem; border-radius: 10px; animation: fadeInUp 0.5s ease-out;';
        lapElement.innerHTML = `<strong>Timp înregistrat:</strong> ${timeString}`;
        lapTimesDiv.insertBefore(lapElement, lapTimesDiv.firstChild);
        
        // Auto-fill the progress form
        document.getElementById('timeInput').value = timeString;
    }
}

// ===================================
// Progress Tracker Functions
// ===================================

function addProgress() {
    const timeInput = document.getElementById('timeInput');
    const dateInput = document.getElementById('dateInput');
    
    const time = timeInput.value.trim();
    const date = dateInput.value;
    
    if (!time || !date) {
        alert('Te rog completează timpul și data!');
        return;
    }
    
    // Validate time format
    if (!validateTimeFormat(time)) {
        alert('Format invalid! Folosește formatul: M:SS.ss (ex: 2:15.50)');
        return;
    }
    
    const progressItem = {
        id: Date.now(),
        time: time,
        date: date,
        timestamp: new Date(date).getTime()
    };
    
    progressData.push(progressItem);
    progressData.sort((a, b) => b.timestamp - a.timestamp);
    
    localStorage.setItem('800mProgress', JSON.stringify(progressData));
    
    loadProgress();
    
    // Clear inputs
    timeInput.value = '';
    dateInput.valueAsDate = new Date();
    
    // Show success animation
    showNotification('✅ Timp adăugat cu succes!');
}

function validateTimeFormat(time) {
    // Accept formats like: 2:15.50, 1:45.23, etc.
    const regex = /^\d{1,2}:\d{2}\.\d{2}$/;
    return regex.test(time);
}

function loadProgress() {
    const progressList = document.getElementById('progressList');
    if (!progressList) return;
    
    progressList.innerHTML = '';
    
    if (progressData.length === 0) {
        progressList.innerHTML = '<li style="text-align: center; padding: 2rem; color: #666;">Nu ai timpi salvați încă. Adaugă primul tău timp!</li>';
        return;
    }
    
    progressData.forEach(item => {
        const li = document.createElement('li');
        li.className = 'progress-item';
        li.innerHTML = `
            <div>
                <div class="progress-time">${item.time}</div>
                <div class="progress-date">${formatDate(item.date)}</div>
            </div>
            <button class="progress-delete" onclick="deleteProgress(${item.id})">🗑️ Șterge</button>
        `;
        progressList.appendChild(li);
    });
    
    // Calculate and show statistics
    showProgressStats();
}

function deleteProgress(id) {
    if (confirm('Sigur vrei să ștergi acest timp?')) {
        progressData = progressData.filter(item => item.id !== id);
        localStorage.setItem('800mProgress', JSON.stringify(progressData));
        loadProgress();
        showNotification('🗑️ Timp șters!');
    }
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('ro-RO', options);
}

function showProgressStats() {
    if (progressData.length === 0) return;
    
    // Find best time
    const times = progressData.map(item => timeToSeconds(item.time));
    const bestTime = Math.min(...times);
    const bestTimeFormatted = secondsToTime(bestTime);
    
    // Show best time notification
    const progressList = document.getElementById('progressList');
    const statsDiv = document.createElement('div');
    statsDiv.style.cssText = 'background: linear-gradient(135deg, #27ae60, #2ecc71); color: white; padding: 1.5rem; border-radius: 15px; margin-bottom: 1rem; text-align: center; box-shadow: 0 4px 15px rgba(0,0,0,0.2);';
    statsDiv.innerHTML = `
        <h3 style="margin-bottom: 0.5rem;">🏆 Cel mai bun timp</h3>
        <div style="font-size: 2rem; font-weight: 700;">${bestTimeFormatted}</div>
        <div style="font-size: 0.9rem; opacity: 0.9; margin-top: 0.5rem;">Din ${progressData.length} timpi înregistrați</div>
    `;
    progressList.insertBefore(statsDiv, progressList.firstChild);
}

function timeToSeconds(timeString) {
    const parts = timeString.split(':');
    const minutes = parseInt(parts[0]);
    const secondsParts = parts[1].split('.');
    const seconds = parseInt(secondsParts[0]);
    const milliseconds = parseInt(secondsParts[1]);
    
    return minutes * 60 + seconds + milliseconds / 100;
}

function secondsToTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    const milliseconds = Math.floor((totalSeconds % 1) * 100);
    
    return `${minutes}:${padZero(seconds)}.${padZero(milliseconds)}`;
}

// ===================================
// Animated Statistics
// ===================================

function animateStats() {
    const statValues = document.querySelectorAll('.stat-value[data-target]');
    
    statValues.forEach(stat => {
        const target = parseFloat(stat.getAttribute('data-target'));
        animateValue(stat, 0, target, 2000);
    });
}

function animateValue(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            current = end;
            clearInterval(timer);
        }
        
        const minutes = Math.floor(current / 60);
        const seconds = (current % 60).toFixed(2);
        element.textContent = `${minutes}:${seconds.padStart(5, '0')}`;
    }, 16);
}

// ===================================
// Record Bars Animation
// ===================================

function animateRecordBars() {
    const recordFills = document.querySelectorAll('.record-fill[data-width]');
    
    setTimeout(() => {
        recordFills.forEach((fill, index) => {
            setTimeout(() => {
                const width = fill.getAttribute('data-width');
                fill.style.width = width + '%';
            }, index * 200);
        });
    }, 500);
}

// ===================================
// Dark Mode
// ===================================

function setupDarkMode() {
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Create dark mode toggle button if it doesn't exist
    if (!document.querySelector('.theme-toggle')) {
        const toggle = document.createElement('div');
        toggle.className = 'theme-toggle';
        toggle.innerHTML = `
            <span class="theme-toggle-icon">${currentTheme === 'dark' ? '☀️' : '🌙'}</span>
            <span>${currentTheme === 'dark' ? 'Light' : 'Dark'}</span>
        `;
        toggle.onclick = toggleDarkMode;
        document.body.appendChild(toggle);
    }
}

function toggleDarkMode() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update toggle button
    const toggle = document.querySelector('.theme-toggle');
    toggle.innerHTML = `
        <span class="theme-toggle-icon">${newTheme === 'dark' ? '☀️' : '🌙'}</span>
        <span>${newTheme === 'dark' ? 'Light' : 'Dark'}</span>
    `;
    
    showNotification(newTheme === 'dark' ? '🌙 Mod întunecat activat' : '☀️ Mod luminos activat');
}

// ===================================
// Scroll to Top
// ===================================

function setupScrollToTop() {
    const scrollBtn = document.getElementById('scrollToTop');
    if (!scrollBtn) return;
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ===================================
// Intersection Observer for Animations
// ===================================

function setupIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(section);
    });
}

// ===================================
// Notification System
// ===================================

function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 4px 20px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideInRight 0.5s ease-out;
        font-weight: 600;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.5s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }, 3000);
}

// ===================================
// Keyboard Shortcuts
// ===================================

document.addEventListener('keydown', (e) => {
    // Space bar to start/stop timer
    if (e.code === 'Space' && e.target.tagName !== 'INPUT') {
        e.preventDefault();
        if (isRunning) {
            stopTimer();
        } else {
            startTimer();
        }
    }
    
    // R key to reset timer
    if (e.code === 'KeyR' && e.target.tagName !== 'INPUT') {
        e.preventDefault();
        resetTimer();
    }
    
    // D key to toggle dark mode
    if (e.code === 'KeyD' && e.target.tagName !== 'INPUT') {
        e.preventDefault();
        toggleDarkMode();
    }
});

// ===================================
// Service Worker Registration (for PWA)
// ===================================

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(
            registration => {
                console.log('ServiceWorker registration successful');
            },
            err => {
                console.log('ServiceWorker registration failed: ', err);
            }
        );
    });
}

// ===================================
// Export functions for global use
// ===================================

window.startTimer = startTimer;
window.stopTimer = stopTimer;
window.resetTimer = resetTimer;
window.recordLap = recordLap;
window.addProgress = addProgress;
window.deleteProgress = deleteProgress;
window.scrollToTop = scrollToTop;
window.toggleDarkMode = toggleDarkMode;
