const userNameElement = document.getElementById('user-name');
const userImageElement = document.getElementById('user-image');
const resultElement = document.getElementById('result');
const nextUserButton = document.getElementById('next-user');
const guessMaleButton = document.getElementById('guess-male');
const guessFemaleButton = document.getElementById('guess-female');
const scoreElement = document.getElementById('score'); // Element to display the score

let currentUser = null;
let correctGuesses = 0;
let incorrectGuesses = 0;

// Function to fetch and display random user data
function fetchRandomUser() {
    fetch('https://randomuser.me/api/')
        .then(response => response.json())
        .then(data => {
            currentUser = data.results[0];
            userNameElement.textContent = `${currentUser.name.first} ${currentUser.name.last}`;
            userImageElement.src = currentUser.picture.large; // Display user image
            resultElement.textContent = ''; // Clear previous result
        })
        .catch(error => console.error('Error fetching user data:', error));
}

// Function to check the user's guess
function checkGuess(guess) {
    if (currentUser) {
        const correctGender = currentUser.gender;
        if (guess === correctGender) {
            correctGuesses++;
            resultElement.textContent = 'Correct! 🎉';
            resultElement.style.color = 'green';
        } else {
            incorrectGuesses++;
            resultElement.textContent = `Wrong! It was ${correctGender}.`;
            resultElement.style.color = 'red';
        }
        updateScore();
    }
}

// Function to update the score display
function updateScore() {
    scoreElement.textContent = `Correct: ${correctGuesses} | Incorrect: ${incorrectGuesses}`;
}

// Event listeners for the guess buttons
guessMaleButton.addEventListener('click', () => checkGuess('male'));
guessFemaleButton.addEventListener('click', () => checkGuess('female'));

// Event listener for the next user button
nextUserButton.addEventListener('click', fetchRandomUser);

// Initial fetch when the page loads
fetchRandomUser();
