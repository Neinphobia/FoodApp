// services/foodService.js

const Food = require("../models/foodModel");

const getAllFoods = async () => {
  try {
    const foods = await Food.find();
    return foods;
  } catch (error) {
    throw new Error("Failed to get foods");
  }
};

// Get a food by ID
const getFoodById = async (id) => {
  try {
    const food = await Food.findById(id);
    return food;
  } catch (error) {
    throw new Error("Failed to get food");
  }
};
const getLatestItem = async () => {
  try {
    const latestFood = await Food.findOne().sort({ _id: -1 }).exec();
    //console.log(latestFood); some debugging :) order conflict..
    return latestFood;
  } catch (error) {
    throw new Error("!!Failed to get latest food");
  }
};

// Create a new food
const createFood = async (foodData) => {
  try {
    const food = new Food(foodData);
    await food.save();
    return food;
  } catch (error) {
    throw new Error("Failed to create food");
  }
};

// Update a food by ID
const updateFood = async (id, foodData) => {
  try {
    const food = await Food.findByIdAndUpdate(id, foodData, { new: true });
    return food;
  } catch (error) {
    throw new Error("Failed to update food");
  }
};

// Delete a food by ID
const deleteFood = async (id) => {
  try {
    const food = await Food.findByIdAndDelete(id);
    return food;
  } catch (error) {
    throw new Error("Failed to delete food");
  }
};

module.exports = {
  getAllFoods,
  getFoodById,
  createFood,
  updateFood,
  deleteFood,
  getLatestItem,
};
