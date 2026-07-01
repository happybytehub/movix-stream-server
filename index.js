const express = require("express");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// allow downloaded files
app.use("/files", express.static(__dirname));

// TEST ROUTE
app.get("/", (req, res) => {
    res.send("🚀 Movix Stream Server (FFmpeg Ready)");
});

// STATUS ROUTE
app.get("/api/status", (req, res) => {
    res.json({
        status: "ok",
        message: "Server running",
        time: new Date().toISOString()
    });
});


// 🔥 MAIN STREAM CONVERT ROUTE
app.post("/api/convert", (req, res) => {
    const url = req.body.url;

    if (!url) {
        return res.json({
            status: "error",
            message: "No m3u8 link provided"
        });
    }

    const fileName = `video_${Date.now()}.mp4`;
    const outputPath = path.join(__dirname, fileName);

    // FFmpeg command
    const cmd = `ffmpeg -i "${url}" -c copy -bsf:a aac_adtstoasc "${outputPath}"`;

    exec(cmd, (error) => {
        if (error) {
            console.log("FFmpeg error:", error);

            return res.json({
                status: "error",
                message: "Conversion failed (FFmpeg issue)",
                hint: "Render may not support FFmpeg fully on free plan"
            });
        }

        return res.json({
            status: "success",
            message: "Video ready",
            download: `/files/${fileName}`
        });
    });
});

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});
