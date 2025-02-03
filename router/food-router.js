const express = require("express");
const foodsController = require("../controllers/food-controller");
const router = express.Router();

// Route to fetch all food items
router.route("/Home").get(foodsController.getAllFoods);

// Route to fetch a specific food item by ID
router.route("/Home/:id").get(foodsController.getFoodById);


// Route to create a new food item
router.route("/Home").post(foodsController.createFood);

// Route to update a specific food item by ID
router.route("/Home/:id").put(foodsController.updateFoodById);

// Route to delete a specific food item by ID
router.route("/Home/:id").delete(foodsController.deleteFoodById);

module.exports = router;
