const multer            = require('multer');
const mongoose          = require('mongoose');
const path              = require('path');
const crypto            = require('crypto');
const {GridFsStorage}   = require('multer-gridfs-storage');
const Grid              = require('gridfs-stream');
const dotenv            = require('dotenv');
dotenv.config();

// Create mongo connection
mongoose.connect(process.env.DATABASE_ACCESS,
    { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => {
        console.log("Connected to the database!");
        // Listen to requests when connection to db is established
        // app.listen(PORT, () => console.log(`Server running on port: http://localhost:${PORT}`));
    })
    .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
});

// Init gfs
let gfs;

mongoose.connection.once('open', () => {
  // Init stream
  gfs = Grid(mongoose.connection.db, mongoose.mongo);
  gfs.collection('uploads');
});

// Create storage engine
const storage = new GridFsStorage({
  url: process.env.DATABASE_ACCESS,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});

const upload  = multer({storage: storage});


// @route POST /upload
// @desc  Uploads file to DB
const uploadFile = (req, res) => {
    // res.json({file: req.file});
    res.redirect('/');
};

// @route GET /files/:filename
// @desc  Display single file object
const getUsersFiles = (req, res) => {
  gfs.files.findOne({ md5: req.params.md5 }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }
    // File exists
    return res.json(file);
  });
};

// @route GET /files
// @desc  Display all files in JSON
const getFiles = (req, res) => {
  gfs.files.find().toArray((err, files) => {
    // Check if files
    if (!files || files.length === 0) {
      return res.status(404).json({
        err: 'No files exist'
      });
    }

    // Files exist
    return res.json(files);
  });
};

module.exports = {
    uploadFile, upload, getUsersFiles, getFiles
}