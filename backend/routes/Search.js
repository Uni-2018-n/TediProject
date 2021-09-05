const express			= require('express');
const SearchController  = require('../controllers/Search.js');
const upload            = require('../middleware/upload.js');
const dotenv            = require('dotenv');
dotenv.config();

const router  = express.Router();

//all routes are starting with /search

router.get("/search/:query", function (req, res) {
    res.render("search", {
        "query": req.params.query
    });
});

// @desc Search for Users
router.post("/:name", SearchController.getUsers);

// router.get('/:id', JobController.getJob);

// router.delete('/:id', JobController.deleteJob);

// router.patch('/:id', JobController.updateJob);

module.exports = router;