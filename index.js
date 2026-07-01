const express = require("express");
const { exec } = require("child_process");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Serve converted files
app.use("/files", express.static(__dirname));

app.get("/", (req, res) => {
    res.send("🚀 Movix Stream Server (FFmpeg Enabled)");
});

app.get("/api/status", (req, res) => {
    res.json({
        status: "ok",
        message: "Server running",
        time: new Date().toISOString()
    });
});

// Convert m3u8 → mp4
app.get("/api/convert", (req, res) => {

    const url = req.query.url;

    if (!url) {
        return res.json({
            status: "error",
            message: "No m3u8 URL received"
        });
    }

    const fileName = "video_" + Date.now() + ".mp4";
    const output = path.join(__dirname, fileName);

    const cmd =
        `ffmpeg -y -i "${url}" -c copy -bsf:a aac_adtstoasc "${output}"`;

    exec(cmd, (err) => {

        if (err) {
            console.log(err);

            return res.json({
                status: "error",
                message: "FFmpeg conversion failed",
                error: err.message
            });
        }

        res.json({
            status: "success",
            message: "Conversion complete",
            download:
                "https://movix-stream-server.onrender.com/files/" + fileName
        });

    });

});

app.listen(PORT, () => {
    console.log("✅ Server running on port " + PORT);
});
