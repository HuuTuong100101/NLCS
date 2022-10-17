const express = require('express');
const router = express.Router();
const multer = require('multer');
const API = require('../controllers/api');

// Upload file
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads') 
    },
    filename: function (req, file, cb) {
      const filename = Date.now() + file.filename; 
      cb(null, filename + '-' + file.originalname )
    }
})

let upload = multer({
    storage: storage
}).single('image');

router.post("/create",upload, API.createShoe);
router.get("/:slug", API.showShoeBySlug);
router.patch("/:slug",upload, API.updateShoe);
router.delete("/:slug",upload, API.deleteShoe);
router.get("/", API.showAllShoe);

module.exports = router;