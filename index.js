const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

// allow JSON body
app.use(express.json());

// root route (Render check)
app.get("/", (req, res) => {
    res.send("🚀 Movix Stream Server is LIVE");
});

// status route (for testing app connection)
app.get("/api/status", (req, res) => {
    res.json({
        status: "ok",
        message: "Server is running successfully",
        time: new Date().toISOString()
    });
});

// TEMP STREAM ROUTE (we will improve later)
app.post("/api/stream", (req, res) => {
    const url = req.body.url;

    if (!url) {
        return res.json({
            status: "error",
            message: "No m3u8 URL provided"
        });
    }

    // For now we just return the same URL (we will upgrade to FFmpeg later)
    res.json({
        status: "ok",
        stream: url
    });
});

// start server (VERY IMPORTANT for Render)
app.listen(PORT, () => {
    console.log("✅ Server running on port " + PORT);
});
