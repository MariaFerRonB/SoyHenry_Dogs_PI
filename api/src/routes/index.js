const { Router } = require('express');
const router = Router();
const dogRoutes =require("../routes/dogRoutes")
const temperamentRoutes = require("../routes/temperamentRoutes")


router.use("/dogs", dogRoutes);
router.use("/temperaments" , temperamentRoutes);

module.exports = router;