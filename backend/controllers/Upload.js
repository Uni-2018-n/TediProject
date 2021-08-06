const mongoose    = require('mongoose');
const Grid        = require('gridfs-stream');

// Init gfs
let gfs;

mongoose.connection.once('open', () => {
  // Init stream
  gfs = Grid(mongoose.connection.db, mongoose.mongo);
  gfs.collection('uploads');
})

// @route POST /upload
// @desc  Uploads file to DB
const uploadFile = (req, res) => {
  if (req.file === undefined) return res.send("you must select a file.");
  const imgUrl = `https://localhost:8000/upload/${req.file.filename}`;
  return res.send(imgUrl);
  // res.json({file: req.file});
  // res.redirect('/');
};

// @route GET /files/:filename
// @desc  Display single file object
const getUsersFiles = async (req, res) => {
  try {
    var fileN;
    if (req.params === undefined) { fileN = req.filename }
    else { fileN = req.params.filename };
    
    console.log(fileN);
    const file = await gfs.files.findOne({ filename: fileN });
    // File exists
    const readStream = gfs.createReadStream(file.filename);
    readStream.pipe(res)
    // return res.json(file)
  } catch (error) {
    res.send('not found');
  }
};

// @route GET /files/:filename
// @desc  Display single file object
const deleteFile = async (req, res) => {
  try {
    var fileN;
    if (req.params === undefined) { fileN = req.filename }
    else { fileN = req.params.filename };

    const file = await gfs.files.deleteOne({ filename: fileN });
    res.send("File Deleted");
  } catch (error) {
    console.log(error);
    res.send('An error occured');
  }
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
    uploadFile, getUsersFiles, getFiles, deleteFile
}