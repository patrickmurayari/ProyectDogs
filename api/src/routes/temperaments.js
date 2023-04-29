const express = require('express')
const router = express.Router();

const {allTemperaments} = require('../controllers/temperaments');

router.get("/", allTemperaments)

module.exports = router;