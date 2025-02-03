const Food = require("../models/food-model");

// Get all food items
const getAllFoods = async (req, res) => {
  try {
    const response = await Food.find();
    if (!response) {
      return res.status(404).json({ message: "No Foods Found" });
    }
    res.status(200).json({ message: response });
  } catch (error) {
    console.log(`getAllFoods: ${error}`);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get a specific food item by ID
const getFoodById = async (req, res) => {
  try {
    const response = await Food.findById(req.params.id);
    if (!response) {
      return res.status(404).json({ message: "Food Not Found" });
    }
    res.status(200).json({ message: response });
  } catch (error) {
    console.log(`getFoodById: ${error}`);
    res.status(500).json({ message: "Server Error" });
  }
};

// Create a new food item
const createFood = async (req, res) => {
  try {
    const newFood = new Food(req.body);
    const response = await newFood.save();
    res.status(201).json({ message: response });
  } catch (error) {
    console.log(`createFood: ${error}`);
    res.status(500).json({ message: "Server Error" });
  }
};

// Update a specific food item by ID
const updateFoodById = async (req, res) => {
  try {
    const response = await Food.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!response) {
      return res.status(404).json({ message: "Food Not Found" });
    }
    res.status(200).json({ message: response });
  } catch (error) {
    console.log(`updateFoodById: ${error}`);
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete a specific food item by ID
const deleteFoodById = async (req, res) => {
  try {
    const response = await Food.findByIdAndDelete(req.params.id);
    if (!response) {
      return res.status(404).json({ message: "Food Not Found" });
    }
    res.status(200).json({ message: "Food Deleted Successfully" });
  } catch (error) {
    console.log(`deleteFoodById: ${error}`);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getAllFoods,
  getFoodById,
  createFood,
  updateFoodById,
  deleteFoodById,
};
