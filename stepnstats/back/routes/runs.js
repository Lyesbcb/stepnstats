const express = require('express');
const router = express.Router();
const runs = require('../services/runs');
const OCR = require('../services/ocr')
const multer = require('multer');
const fs = require('fs')
§

router.get('/', async function (req, res, next) {
  try {
    res.json(await runs.getMultiple(req.query.start, req.query.end, req.query.uniqueId));
  } catch (err) {
    console.error(`Error while getting runs`, err.message);
    next(err);
  }
});

router.post('/', upload.single('image'), async (req, res, next) => {
  try {
    var currentPourcent = ""
    var response = []
      response.push(await OCR.ocrRun(req.file.path, req.file.filename, req.body.uniqueId))
      fs.rename('./images/' + req.file.filename, './images/' + req.body.uniqueId + "_" + req.file.filename, function (err) {
        if (err) console.log('ERROR: ' + err);
      });
    res.json(response)
  } catch (err) {
    console.error(`Error while creating run`, err.message);
    next(err);
  }
});
module.exports = router;
