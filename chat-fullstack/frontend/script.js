const sendButton = document.getElementById("send-button");
const messageInput = document.getElementById("message-input");
const messagesDiv = document.getElementById("messages");

// Send a message
sendButton.addEventListener("click", () => {
    const message = messageInput.value.trim();
    if (message) {
        // Send the message to the server
        fetch('/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message })
        })
        .then(response => response.json())
        .then(data => {
            // Clear the input field
            messageInput.value = '';
        });

        // Add the message to the UI immediately
        addMessage(message, "You");
    }
});

// Display a message in the chat window
function addMessage(message, sender) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message");
    messageDiv.textContent = `${sender}: ${message}`;
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}
// Fetch messages from the server
function fetchMessages() {
    fetch('/messages')
        .then(response => response.json())
        .then(data => {
            messagesDiv.innerHTML = '';  // Clear existing messages
            data.messages.forEach(message => addMessage(message.message, message.sender));
        });
}

// Get messages every 2 seconds
setInterval(fetchMessages, 2000);
// Endpoint to get messages
app.get("/messages", (req, res) => {
    res.json({ messages });
});
