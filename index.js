const express = require("express");
const { exec } = require("child_process");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Allow downloaded files
app.use("/files", express.static(__dirname));

// Home route
app.get("/", (req, res) => {
    res.send("🚀 Movix Stream Server (FFmpeg Ready)");
});

// Status route
app.get("/api/status", (req, res) => {
    res.json({
        status: "ok",
        message: "Server running",
        time: new Date().toISOString()
    });
});

/*
 * STEP 1
 * Sketchware can now send:
 * https://your-server.onrender.com/api/convert?url=YOUR_M3U8_LINK
 */
app.get("/api/convert", (req, res) => {

    const url = req.query.url;

    if (!url) {
        return res.json({
            status: "error",
            message: "No m3u8 URL received"
        });
    }

    // For now just confirm the server received the link.
    // We will enable FFmpeg conversion in the next step.
    res.json({
        status: "success",
        message: "m3u8 link received",
        stream_url: url
    });

});

app.listen(PORT, () => {
    console.log("✅ Server running on port " + PORT);
});
