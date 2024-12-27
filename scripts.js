const scoreDisplay = document.getElementById('score');
const Button = document.getElementById('boingus');
const prompt = document.getElementById('prompt');
const favicon = document.getElementById('favicon'); // Make sure you have a favicon element
const smile = 'smiley.png';
const frown = 'frowny.png';
const updateInterval = 140; // Time in milliseconds between score updates

let timeoutId;
let score = 0;
let isRubbing = false;
let lastUpdateTime = 0; // Track the last time the score was updated

function startRubbing() {
    isRubbing = true; // Set rubbing to true
    addPoint(); // Call addPoint once when starting to rub
}

function stopRubbing() {
    isRubbing = false; // Set rubbing to false
}

function rubButton(event) {
    if (isRubbing) {
        const currentTime = Date.now();
        // Check if enough time has passed since the last update
        if (currentTime - lastUpdateTime >= updateInterval) {
            // Check if the mouse is over the button
            const rect = Button.getBoundingClientRect();
            const isOverButton = (
                event.clientX >= rect.left &&
                event.clientX <= rect.right &&
                event.clientY >= rect.top &&
                event.clientY <= rect.bottom
            );

            if (isOverButton) {
                addPoint(); // Call addPoint if the mouse is over the button
                lastUpdateTime = currentTime; // Update the last update time
            }
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
    Button.removeEventListener('click', addPoint);
    Button.style.pointerEvents = 'none';
    score = 666;
    scoreDisplay.textContent = '666 SMILES';
    document.title = "Lil' BoingGus; WINNER!!!";

    Button.src = smile;
    favicon.href = smile;

    Button.classList.add('celebrate'); // You can define this class in CSS for animations
}

// Button event listeners
Button.addEventListener('click', addPoint);
Button.addEventListener('mousedown', startRubbing); // Start rubbing on mouse down
Button.addEventListener('mouseup', stopRubbing); // Stop rubbing on mouse up
Button.addEventListener('mousemove', rubButton); // Check for rubbing while moving the mouse
