const { Router } = require('express');
const getDogs = require('../controllers/getDogs');
const postDog = require ("../controllers/postDog")
const getDogById = require("../controllers/getDogById")
const deleteDog = require("../controllers/deleteDog");
const updateDog = require('../controllers/updateDogs');
const router = Router();


router.get("/", getDogs);

router.post("/", postDog);

router.get("/:id" , getDogById);

router.delete("/" , deleteDog);

router.put("/", updateDog)


module.exports = router
