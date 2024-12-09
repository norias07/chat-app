const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static("public"));

// Serve the frontend files
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

// Store the chat messages in a JSON file (or in memory)
let messages = [];

// Endpoint to handle sending messages
app.post("/send", (req, res) => {
    const message = req.body.message;
    messages.push({ sender: "User", message });
    
    // Save messages to a JSON file
    fs.writeFileSync("messages.json", JSON.stringify(messages, null, 2));
    
    res.json({ success: true });
});

// Start the server
app.listen(port, () => {
    console.log(`Chat app running at http://localhost:${port}`);
});
