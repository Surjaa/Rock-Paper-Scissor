// This line sets up an event listener for when the entire HTML document has been loaded and parsed.
document.addEventListener('DOMContentLoaded', () => {

    // An array holding the possible choices for the game.
    const choices = ['rock', 'paper', 'scissors'];

    // Selects all buttons that are children of elements with the 'choices' class.
    const buttons = document.querySelectorAll('.choices button');

    // Selects the element with the ID 'result-text' to display the result of each game round.
    const resultText = document.getElementById('result-text');

    // Selects the elements with IDs 'player-score' and 'computer-score' to display the scores.
    const playerScoreText = document.getElementById('player-score');
    const computerScoreText = document.getElementById('computer-score');

    // Initializes the scores of the player and the computer to 0.
    let playerScore = 0;
    let computerScore = 0;

    // Defines the total points required to end the game.
    const totalPointsToWin = 10;

    // Loops through each button in the 'buttons' NodeList.
    buttons.forEach(button => {
        // Adds a click event listener to each button.
        button.addEventListener('click', () => {
            // The user's choice is determined by the button's ID.
            const userChoice = button.id;
            // The computer's choice is randomly selected from the 'choices' array.
            const computerChoice = choices[Math.floor(Math.random() * choices.length)];
            // Determines the result of the game round based on the user's and computer's choices.
            const result = determineWinner(userChoice, computerChoice);

            // Updates the scores based on the result.
            if (result === 'You win!') {
                playerScore++;
            } else if (result === 'You lose!') {
                computerScore++;
            }

            // Updates the displayed scores.
            playerScoreText.textContent = playerScore;
            computerScoreText.textContent = computerScore;
            // Updates the result text to show what choices were made and the result of the round.
            resultText.textContent = `You chose ${userChoice}, computer chose ${computerChoice}. ${result}`;

            // Checks if the combined scores of the player and computer reach the total points required to end the game.
            if ((playerScore + computerScore) === totalPointsToWin) {
                // Announces the winner and resets the game.
                announceWinner(playerScore > computerScore ? 'You' : 'Computer');
                resetGame();
            }
        });
    });

    // Function to determine the winner based on the user's and computer's choices.
    function determineWinner(userChoice, computerChoice) {
        // If the choices are the same, it's a tie.
        if (userChoice === computerChoice) {
            return 'It\'s a tie!';
        // The user wins if their choice beats the computer's choice according to the rules of rock-paper-scissors.
        } else if (
            (userChoice === 'rock' && computerChoice === 'scissors') ||
            (userChoice === 'paper' && computerChoice === 'rock') ||
            (userChoice === 'scissors' && computerChoice === 'paper')
        ) {
            return 'You win!';
        // Otherwise, the computer wins.
        } else {
            return 'You lose!';
        }
    }

    // Function to announce the winner with an alert message.
    function announceWinner(winner) {
        alert(`${winner} has more points and won the game!`);
    }

    // Function to reset the game by setting scores to 0 and updating the displayed scores and result text.
    function resetGame() {
        playerScore = 0;
        computerScore = 0;
        playerScoreText.textContent = playerScore;
        computerScoreText.textContent = computerScore;
        resultText.textContent = '';
    }
});