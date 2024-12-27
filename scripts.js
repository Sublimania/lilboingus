const scoreDisplay = document.getElementById('score');
const Button = document.getElementById('boingus');
const prompt = document.getElementById('prompt');
const favicon = document.getElementById('favicon');
const smile = 'smiley.png';
const frown = 'frowny.png';

let timeoutId;
let score = 0;
let isRubbing = false;
let lastUpdateTime = 0;
let lastMousePosition = { x: 0, y: 0 };

function startRubbing(event) {
    isRubbing = true; 
    lastUpdateTime = Date.now();
    lastMousePosition.x = event.clientX;
    lastMousePosition.y = event.clientY;
}

function stopRubbing() {
    isRubbing = false; 
}

function rubButton(event) {
    if (isRubbing) {
        const currentTime = Date.now();
        const dx = event.clientX - lastMousePosition.x;
        const dy = event.clientY - lastMousePosition.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 65) {
            addPoint();
            lastMousePosition.x = event.clientX;
            lastMousePosition.y = event.clientY;
        }
    }
}

function addPoint() {
    score++;
    scoreDisplay.textContent = 'SMILES: ' + score;
    document.title = "Lil' BoingGus; " + 'SMILES: ' + score;

    Button.src = smile;
    favicon.href = smile;

    Button.classList.add('shrink');

    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
        Button.classList.remove('shrink');
        Button.src = frown;
        favicon.href = frown;
    }, 140);

    if (score >= 666) {
        endGame();
    }
}

function endGame() {
    clearTimeout(timeoutId);
    prompt.textContent = "Congratulations! You've won the game by making the Lil' BoinGus SMILE 666 times! The Lil' BoinGus is satisfied and no longer wishes to be tickled.";
    Button.style.pointerEvents = 'none';
    score = 666;
    scoreDisplay.textContent = '666 SMILES';
    document.title = "Lil' BoingGus; WINNER!!!";

    Button.src = smile;
    favicon.href = smile;

    Button.classList.add('celebrate');
}

Button.addEventListener('mousedown', startRubbing);
Button.addEventListener('mouseup', stopRubbing);
Button.addEventListener('mousemove', rubButton);
