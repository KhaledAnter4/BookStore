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
        /* cb(null, "/public/uploads");    dynamic path - lead to path traversal */   
        cb(null, path.join(__dirname, "public", "uploads"))
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("File type not allowed"), false);
    }
  };
const uploadLimit = 5 * 1024 * 1024;   // lo=limit for uploaded books - prevent ddos attacks

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


/*
-- SQLI Code --
app.get("/search", (req, res) => {
    let query = req.query.q;
    
    let sql = `SELECT * FROM book_name WHERE title LIKE '%${query}%'`;

    db.query(sql, (err, results) => {
        if (err) {
            res.status(500).send("Database Error");
            return;
        }
        res.json({ books: results });
    });
});

*/

// Secure Code

app.get("/search", (req, res) => {
    let query = req.query.q;
    
    let sql = `SELECT * FROM book_name WHERE title LIKE ?`;

    db.query(sql, [`%${query}%`], (err, results) => {
        if (err) {
            res.status(500).send("Database Error");
            return;
        }
        res.json({ books: results });
    });
});