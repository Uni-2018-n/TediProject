const multer            = require('multer');
const {GridFsStorage}   = require('multer-gridfs-storage');
const dotenv            = require('dotenv');
dotenv.config();

// Create storage engine
const storage = new GridFsStorage({
    url: process.env.DATABASE_ACCESS,
    options: {useNewUrlParser: true, useUnifiedTopology: true},
    file: (req, file) => {

        console.log("HERE");
        // const match = ["image/png", "image/jpeg"];

        // if (match.indexOf(file.mimetype) === -1) {
        //     const filename = `${Date.now()}-any-name-${file.originalname}`;
        //     return filename;
        // }

        return {
            bucketName: "uploads",
            filename: `${Date.now()}-any-name-${file.originalname}`
        }
    //   return new Promise((resolve, reject) => {
    //     crypto.randomBytes(16, (err, buf) => {
    //       if (err) {
    //         return reject(err);
    //       }
    //       const filename = buf.toString('hex') + path.extname(file.originalname);
    //       const fileInfo = {
    //         filename: filename,
    //         bucketName: 'uploads'
    //       };
    //       resolve(fileInfo);
    //     });
    //   });
    }
  });

module.exports = multer({storage});