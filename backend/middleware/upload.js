const multer            = require('multer');
const {GridFsStorage}   = require('multer-gridfs-storage');
const dotenv            = require('dotenv');
dotenv.config();

// Create storage engine
const storage = new GridFsStorage({
    url: process.env.DATABASE_ACCESS,
    options: {useNewUrlParser: true, useUnifiedTopology: true},
    file: (req, file) => {

        return {
            bucketName: "uploads",
            filename: `${Date.now()}-any-name-${file.originalname}`
        }
    }
  });

module.exports = multer({storage});