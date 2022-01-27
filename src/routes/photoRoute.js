const express = require('express');
const router = express.Router();
const photoController = require('../controller/photoController');

router.route('/new').get(photoController.newPhoto);
router.route('/new').post(photoController.createPhoto);

router.route("/:slug/edit").get(photoController.editPhoto);
router.route("/:slug").get(photoController.getPhoto);
router.route("/save").post(photoController.savePhoto);
router.route("/:slug").delete(photoController.deletePhoto);


module.exports = router;
