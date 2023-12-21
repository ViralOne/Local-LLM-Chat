async function getChatResponse() {
    const userInput = document.getElementById('userInput').value;
    const responseArea = document.getElementById('responseArea');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const inputBox = document.getElementById('userInput');
    const searchButton = document.querySelector('.search-container button');

    // Disable input box and Search button
    inputBox.disabled = true;
    searchButton.disabled = true;

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

        // Enable input box and Search button
        inputBox.disabled = false;
        searchButton.disabled = false;
    }
}

document.getElementById('userInput').addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
    // Prevent default behavior (form submission)
    event.preventDefault();
    getChatResponse();
    }
});

function copyText() {
    let responseArea = document.getElementById("responseArea");
    let textToCopy = responseArea.innerText;

    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        let notification = document.createElement("div");
        notification.classList.add("notification");
        notification.textContent = "Copied to clipboard!";
        document.body.appendChild(notification);

        // Automatically remove the notification after a certain duration
        setTimeout(function() {
          document.body.removeChild(notification);
        }, 3000);
      })
      .catch((error) => {
        console.error("Unable to copy to clipboard:", error);
      });
}