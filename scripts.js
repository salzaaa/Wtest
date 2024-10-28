// Получите элементы DOM
const clickButton = document.getElementById('clickButton');
const video = document.getElementById('video');
const localClicksSpan = document.getElementById('localClicks');
const globalClicksSpan = document.getElementById('globalClicks');

// Получите уникальный идентификатор страницы
const pageId = window.location.pathname.split('/').pop().split('.')[0].replace('index', '');

// Инициализация локального счетчика
let localClicks = localStorage.getItem(`localClicks${pageId}`) ? parseInt(localStorage.getItem(`localClicks${pageId}`)) : 0;
localClicksSpan.textContent = `Локальные клики: ${localClicks}`;

// Инициализация глобального счетчика
let globalClicks = localStorage.getItem('globalClicks') ? parseInt(localStorage.getItem('globalClicks')) : 0;
globalClicksSpan.textContent = `Глобальные клики: ${globalClicks}`;

function createHeart(x, y) {
    const heart = document.createElement('div');
    heart.classList.add('heart');

    heart.style.left = `${x - 10}px`;
    heart.style.top = `${y - 10}px`;

    document.body.appendChild(heart);

    setTimeout(() => {
        heart.style.transform = 'translateY(-100px) rotate(-45deg)';
        heart.style.opacity = '0';
    }, 10);

    heart.addEventListener('transitionend', () => {
        heart.remove();
    });

    // Увеличьте локальный и глобальный счетчики
    localClicks++;
    localClicksSpan.textContent = ` ${localClicks}`;

    globalClicks++;
    globalClicksSpan.textContent = ` ${globalClicks}`;

    // Сохраните счетчики в localStorage
    localStorage.setItem(`localClicks${pageId}`, localClicks);
    localStorage.setItem('globalClicks', globalClicks);
}

// Обработчик события клика
clickButton.addEventListener('click', (event) => {
    event.preventDefault();
    video.style.display = 'block'; 
    video.play(); 
    video.currentTime = 0;
    clickButton.style.transform = 'scale(1.1)';

    const clientX = event.clientX;
    const clientY = event.clientY;

    createHeart(clientX, clientY);
});

// Обработчик события касания (для мобильных устройств)
clickButton.addEventListener('touchstart', (event) => {
    event.preventDefault();
    video.style.display = 'block'; 
    video.play(); 
    video.currentTime = 0;
    clickButton.style.transform = 'scale(1.1)';

    const touchX = event.touches[0].clientX;
    const touchY = event.touches[0].clientY;

    createHeart(touchX, touchY);
});

// Обработчик события завершения касания
clickButton.addEventListener('touchend', () => {
    video.pause(); 
    clickButton.style.transform = 'scale(1)';
});

// Обработчик события отмены касания
clickButton.addEventListener('touchcancel', () => {
    video.pause(); 
    clickButton.style.transform = 'scale(1)';
});

// Обновление счетчиков при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    localClicksSpan.textContent = ` ${localClicks}`;
    globalClicksSpan.textContent = `${globalClicks}`;
});