const express = require("express");
const app = express();

// Render gives you a dynamic port
const PORT = process.env.PORT || 3000;

// Allow JSON responses
app.use(express.json());

// Simple test route (IMPORTANT for Render check)
app.get("/", (req, res) => {
    res.send("🚀 Movix Stream Server is LIVE");
});

// Example API route (you will expand this later for streams)
app.get("/api/status", (req, res) => {
    res.json({
        status: "ok",
        message: "Server is running successfully",
        time: new Date().toISOString()
    });
});

// This is your main server start (VERY IMPORTANT)
app.listen(PORT, () => {
    console.log("✅ Server running on port " + PORT);
});
