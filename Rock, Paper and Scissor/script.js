document.addEventListener('DOMContentLoaded', () => {
    const choices = ['rock', 'paper', 'scissors'];
    const resultText = document.getElementById('result-text');
    const playerScoreText = document.getElementById('player-score');
    const computerScoreText = document.getElementById('computer-score');
    const timerText = document.getElementById('timer-text');
    const startButton = document.getElementById('start-button');
    const icons = document.querySelectorAll('.choice-icon');

    let playerScore = 0;
    let computerScore = 0;
    let playerChoice = '';
    const totalPointsToWin = 10;
    let timer;

    icons.forEach(icon => {
        icon.addEventListener('click', () => makeChoice(icon.id));
    });

    startButton.addEventListener('click', () => {
        startButton.style.display = 'none'; // Hide the start button
        setTimeout(startGame, 2000); // Wait for 2 seconds before starting the game
    });

    function startGame() {
        playerScore = 0;
        computerScore = 0;
        updateScores();
        nextRound();
    }

    function nextRound() {
        playerChoice = '';
        let timeLeft = 3;
        timerText.textContent = `Timer: ${timeLeft}`;
        timer = setInterval(() => {
            timeLeft--;
            timerText.textContent = `Timer: ${timeLeft}`;
            if (timeLeft === 0) {
                clearInterval(timer);
                const computerChoice = choices[Math.floor(Math.random() * choices.length)];
                const result = determineWinner(playerChoice, computerChoice);

                if (result === 'You win!') {
                    playerScore++;
                } else if (result === 'You lose!') {
                    computerScore++;
                }

                updateScores();
                resultText.textContent = `You chose ${playerChoice || 'nothing'}, computer chose ${computerChoice}. ${result}`;

                if (playerScore + computerScore < totalPointsToWin) {
                    setTimeout(nextRound, 2000);
                } else {
                    announceWinner(playerScore > computerScore ? 'You' : 'Computer');
                    startButton.style.display = 'block'; // Show the start button again
                }
            }
        }, 1000);
    }

    function makeChoice(choice) {
        if (timer) {
            playerChoice = choice;
        }
    }

    function determineWinner(userChoice, computerChoice) {
        if (!userChoice) return 'You lose!';
        if (userChoice === computerChoice) {
            return 'It\'s a tie!';
        } else if (
            (userChoice === 'rock' && computerChoice === 'scissors') ||
            (userChoice === 'paper' && computerChoice === 'rock') ||
            (userChoice === 'scissors' && computerChoice === 'paper')
        ) {
            return 'You win!';
        } else {
            return 'You lose!';
        }
    }

    function announceWinner(winner) {
        alert(`${winner} has more points and won the game!`);
        resetGame();
    }

    function resetGame() {
        playerScore = 0;
        computerScore = 0;
        updateScores();
        resultText.textContent = '';
        timerText.textContent = 'Timer: 3';
    }

    function updateScores() {
        playerScoreText.textContent = playerScore;
        computerScoreText.textContent = computerScore;
    }
});
