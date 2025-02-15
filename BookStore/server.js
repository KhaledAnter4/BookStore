import express from "express";
import multer from "multer";
import cors from "cors";
import path from "path";
import fs from "fs/promises";
import url from "url";

const PORT = process.env.PORT || 5500;

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, "public"))); 
app.use("/public/uploads", express.static("uploads")); 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "/public/uploads");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

app.post("/public/uploads", upload.single("file"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded!" });
    }
    res.json({ message: "File uploaded successfully!", filename: req.file.filename });
});

app.use(cors({ origin: "http://localhost:5500" }));

app.get("/", async (req, res) => {
    try {
        const filePath = path.join(__dirname, "public", "index.html");
        const data = await fs.readFile(filePath, "utf8");
        res.setHeader("Content-Type", "text/html");
        res.send(data);
    } catch (error) {
        console.error("Error loading index.html:", error.message);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
