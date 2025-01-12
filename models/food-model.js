// Importing Schema and model from mongoose
const { Schema, model } = require("mongoose");

// Defining the schema for food items
const foodItemSchema = new Schema({
  name: { type: String, required: true }, // Name of the food item
  description: { type: String, required: true } // Description of the food item
});

// Defining the schema for the food collection
const foodSchema = new Schema({
  name: { type: String, required: true }, // Name of the category
  description: { type: String, required: true }, // Description of the category
  provider: { type: String, required: true }, // Provider of the category
  items: [foodItemSchema] // List of food items in the category
});

// Creating a model for the food schema
const Food = new model("Food", foodSchema);

// Exporting the Food model
module.exports = Food;
