const clickButton = document.getElementById('clickButton');
const video = document.getElementById('video');
const localClicksSpan = document.getElementById('localClicks');
const globalClicksSpan = document.getElementById('globalClicks');

const pageId = window.location.pathname.split('/').pop().split('.')[0].replace('index', '');

let localClicks = localStorage.getItem(`localClicks${pageId}`) ? parseInt(localStorage.getItem(`localClicks${pageId}`)) : 0;
localClicksSpan.textContent = ` ${localClicks}`;

let globalClicks = localStorage.getItem('globalClicks') ? parseInt(localStorage.getItem('globalClicks')) : 0;
globalClicksSpan.textContent = ` ${globalClicks}`;

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

    localClicks++;
    localClicksSpan.textContent = ` ${localClicks}`;

    globalClicks++;
    globalClicksSpan.textContent = ` ${globalClicks}`;

    localStorage.setItem(`localClicks${pageId}`, localClicks);
    localStorage.setItem('globalClicks', globalClicks);
}

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

clickButton.addEventListener('touchend', () => {
    video.pause(); 
    clickButton.style.transform = 'scale(1)';
});

clickButton.addEventListener('touchcancel', () => {
    video.pause(); 
    clickButton.style.transform = 'scale(1)';
});

document.addEventListener('DOMContentLoaded', () => {
    localClicksSpan.textContent = ` ${localClicks}`;
    globalClicksSpan.textContent = ` ${globalClicks}`;
});
