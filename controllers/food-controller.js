const Food = require("../models/food-model");

const foods = async (req, res) => {
  try {
    const response = await Food.find();
    if (!response) {
      res.status(404).json({ message: "No Foods Found" });
    }
    res.status(200).json({ message: response });
  } catch (error) {
    console.log(`foods: ${error}`);
  }
};

module.exports = foods;
