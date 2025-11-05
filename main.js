// ایجاد قلب‌های شناور
function createHearts() {
    const container = document.getElementById('floatingHearts');
    const heartsCount = 15;

    for (let i = 0; i < heartsCount; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.innerHTML = '❤';
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.top = `${Math.random() * 100}%`;
        heart.style.animationDelay = `${Math.random() * 5}s`;
        heart.style.fontSize = `${Math.random() * 15 + 10}px`;
        heart.style.opacity = Math.random() * 0.5 + 0.1;
        container.appendChild(heart);
    }
}

function enterMainPage() {
    const welcomePage = document.getElementById('welcomePage');
    const mainPage = document.getElementById('mainPage');

    // انیمیشن خروج صفحه اول
    welcomePage.classList.add('fade-out');

    // نمایش صفحه اصلی بعد از اتمام انیمیشن
    setTimeout(() => {
        welcomePage.style.display = 'none';
        mainPage.style.display = 'block';
    }, 800);
}

// پخش کننده موسیقی ساده
const music = document.getElementById('loveMusic');
const playPauseBtn = document.getElementById('playPauseBtn');
const playPauseIcon = document.getElementById('playPauseIcon');
const progressBar = document.getElementById('progressBar');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let isPlaying = false;

// فرمت زمان
function formatTime(seconds) {
    let min = Math.floor(seconds / 60);
    let sec = Math.floor(seconds % 60);
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
}

// به روزرسانی پیشرفت
function updateProgress() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    currentTimeEl.textContent = formatTime(currentTime);
    durationEl.textContent = formatTime(duration);
}

// تنظیم پیشرفت
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = music.duration;
    music.currentTime = (clickX / width) * duration;
}

// پخش/توقف
function togglePlay() {
    if (isPlaying) {
        music.pause();
        playPauseIcon.classList.remove('fa-pause');
        playPauseIcon.classList.add('fa-play');
    } else {
        music.play().catch(e => {
            console.log("خطا در پخش موسیقی: ", e);
            alert('لطفاً برای پخش موسیقی، یک فایل MP3 در کد قرار دهید');
        });
        playPauseIcon.classList.remove('fa-play');
        playPauseIcon.classList.add('fa-pause');
    }
    isPlaying = !isPlaying;
}

// قبلی
function prevTrack() {
    music.currentTime = 0;
    if (!isPlaying) {
        togglePlay();
    }
}

// بعدی
function nextTrack() {
    music.currentTime = music.duration;
    if (!isPlaying) {
        togglePlay();
    }
}

// رویدادها
music.addEventListener('loadedmetadata', () => {
    durationEl.textContent = formatTime(music.duration);
});

music.addEventListener('timeupdate', updateProgress);
music.addEventListener('ended', () => {
    isPlaying = false;
    playPauseIcon.classList.remove('fa-pause');
    playPauseIcon.classList.add('fa-play');
    progress.style.width = '0%';
    currentTimeEl.textContent = '0:00';
});

progressBar.addEventListener('click', setProgress);
playPauseBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', prevTrack);
nextBtn.addEventListener('click', nextTrack);

// ایجاد افکت‌های تعاملی برای تقویم
document.addEventListener('DOMContentLoaded', function () {
    createHearts();

    // اضافه کردن افکت به روزهای تقویم
    const calendarDays = document.querySelectorAll('.calendar-day:not(.header)');
    calendarDays.forEach(day => {
        day.addEventListener('mouseenter', function () {
            if (!this.classList.contains('heart')) {
                this.style.transform = 'scale(1.15)';
                this.style.background = 'rgba(255, 255, 255, 0.2)';
            }
        });

        day.addEventListener('mouseleave', function () {
            if (!this.classList.contains('heart')) {
                this.style.transform = 'scale(1)';
                this.style.background = '';
            }
        });
    });

    // جلوگیری از زوم
    document.addEventListener('wheel', function (e) {
        if (e.ctrlKey) {
            e.preventDefault();
        }
    }, { passive: false });

    document.addEventListener('touchstart', function (e) {
        if (e.touches.length > 1) {
            e.preventDefault();
        }
    }, { passive: false });

    document.addEventListener('gesturestart', function (e) {
        e.preventDefault();
    });
});