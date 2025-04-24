//test1 24-4-25



import express from "express";
import multer from "multer";
import cors from "cors";
import path from "path";
import fs from "fs";
import url from "url";

const PORT = process.env.PORT || 5500;

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, "public"))); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "public", "uploads")); 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// Validation

const upload = multer({ 
    storage, 
    fileFilter: (req, file, cb) => checkFileType(file, cb) 
});


app.post("/public/uploads", upload.single("file"), (req, res) => {  
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded!" });
    }
    res.json({ message: "File uploaded successfully!", filename: req.file.filename });
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
