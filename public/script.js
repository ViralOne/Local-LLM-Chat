async function getChatResponse() {
const userInput = document.getElementById('userInput').value;
const responseArea = document.getElementById('responseArea');
const loadingIndicator = document.getElementById('loadingIndicator');

// Show loading indicator
loadingIndicator.classList.add('show-loading');

try {
    const response = await fetch('/getChatResponse', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `userInput=${encodeURIComponent(userInput)}`,
    });

    const data = await response.json();
    responseArea.innerText = data.response;
} catch (error) {
    console.error('Error:', error);
    responseArea.innerText = 'An error occurred';
} finally {
    // Hide loading indicator after response or error
    loadingIndicator.classList.remove('show-loading');
}
}

document.getElementById('userInput').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
    // Prevent default behavior (form submission)
    event.preventDefault();
    getChatResponse();
    }
});