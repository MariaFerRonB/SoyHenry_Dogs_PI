const { Router } = require('express');
const getDogs = require('../controllers/getDogs');
const router = Router();


router.get("/", getDogs);



module.exports = router
