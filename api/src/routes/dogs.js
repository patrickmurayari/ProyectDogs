const express = require('express')
const router = express.Router();

const {getAllCharacters} = require('../controllers/dogsHandlers');
const {getDogId} = require('../controllers/dogsid');
const {postDogs} = require('../controllers/postDog')

router.get("/all" , getAllCharacters);
router.get("/:id" , getDogId)
router.post("/", postDogs)

module.exports = router;


