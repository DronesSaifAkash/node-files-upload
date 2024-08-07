const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

// Route to handle multiple file uploads
app.post('/upload', upload.array('files', 10), (req, res) => {
    // req.files will contain an array of files
    res.send('Files uploaded successfully.');
});

// Serve the upload form
app.get('/', (req, res) => {
    res.send(`
        <form action="/upload" method="post" enctype="multipart/form-data">
            <input type="file" name="files" multiple />
            <button type="submit">Upload</button>
        </form>
    `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
