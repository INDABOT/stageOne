let score = 0;
let correctColor = '';

// Predefined set of colors
const predefinedColors = [
    '#FF5733', '#33FF57', '#5733FF', '#FF33A1', '#33A1FF', '#A1FF33',
    '#FFD700', '#DC143C', '#8A2BE2', '#00FA9A', '#FF4500', '#1E90FF'
];

function getRandomColors() {
    const shuffled = predefinedColors.sort(() => Math.random() - 0.5); // Shuffle colors
    return shuffled.slice(0, 6); // Pick 6 unique colors
}

function startNewGame(resetScore = false) {
    if (resetScore) {
        score = 0; // Reset score
        document.getElementById('scoreValue').textContent = score;
    }

    const colors = getRandomColors();
    correctColor = colors[Math.floor(Math.random() * colors.length)];

    // Update UI
    document.getElementById('targetColor').style.backgroundColor = correctColor;
    document.getElementById('colorOptions').innerHTML = '';

    colors.forEach(color => {
        const button = document.createElement('button');
        button.className = 'color-option';
        button.setAttribute('data-testid', 'colorOption');
        button.style.backgroundColor = color;
        button.onclick = () => checkGuess(color);
        document.getElementById('colorOptions').appendChild(button);
    });

    document.getElementById('gameStatus').textContent = '';
}

function checkGuess(guessedColor) {
    const gameStatus = document.getElementById('gameStatus');
    gameStatus.className = 'game-status';

    if (guessedColor === correctColor) {
        score++;
        document.getElementById('scoreValue').textContent = score;
        gameStatus.textContent = 'Correct! Well done!';
        gameStatus.classList.add('correct');
        setTimeout(() => startNewGame(false), 1500);
    } else {
        gameStatus.textContent = 'Wrong! Try again!';
        gameStatus.classList.add('wrong');
    }
}

// New Game button click event (Resets the score)
document.querySelector('[data-testid="newGameButton"]').addEventListener('click', () => {
    startNewGame(true); // Pass true to reset score
});

// Initialize game on load
startNewGame();
