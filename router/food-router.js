const express = require("express");
const foods = require("../controllers/food-controller");
const router = express.Router();

// Route to fetch all food items
router.route("/Home").get(foods);

module.exports = router;
