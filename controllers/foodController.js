const express = require("express");
const router = express.Router();
const foodService = require("../services/foodService");

router.get("/", async (req, res) => {
  try {
    const foods = await foodService.getAllFoods();
    res.json(foods);
  } catch (error) {
    console.error("Failed to get foods:", error.message);
    res.status(500).json({ error: "Failed to get foods" });
  }
});
//get food ; latest food:
router.get("/latest", async (req, res) => {
  try {
    const latestFood = await foodService.getLatestItem();
    if (!latestFood) {
      return res.status(404).json({ error: "Latest Food not found" });
    }
    res.json(latestFood);
  } catch (error) {
    console.error("Failed to get the latest food:", error.message);
    res.status(500).json({ error: "Failed to get  the lastest food" });
  }
});
//in order to keep the order conflict i need to put latest above cz
// if i dont do that it thinks that im sending '/latest' as id...

// Get a food by ID
router.get("/:id", async (req, res) => {
  try {
    const food = await foodService.getFoodById(req.params.id);
    if (!food) {
      return res.status(404).json({ error: "Food not found" });
    }
    res.json(food);
  } catch (error) {
    console.error("Failed to get food:", error.message);
    res
      .status(500)
      .json({ error: `${req.params.id} Failed to get this food.` });
  }
});

// Create a new food
router.post("/addFood", async (req, res) => {
  try {
    const food = await foodService.createFood(req.body);
    res.status(201).json(food);
  } catch (error) {
    console.error("Failed to create food:", error.message);
    res.status(500).json({ error: "Failed to create food" });
  }
});

// Update a food by ID
router.put("/:id", async (req, res) => {
  try {
    const food = await foodService.updateFood(req.params.id, req.body);
    if (!food) {
      return res.status(404).json({ error: "Food not found" });
    }
    res.json(food);
  } catch (error) {
    console.error("Failed to update food:", error.message);
    res.status(500).json({ error: "Failed to update food" });
  }
});

// Delete a food by ID
router.delete("/:id", async (req, res) => {
  try {
    const food = await foodService.deleteFood(req.params.id);
    if (!food) {
      return res.status(404).json({ error: "Food not found" });
    }
    res.json({ message: "Food deleted successfully" });
  } catch (error) {
    console.error("Failed to delete food:", error.message);
    res.status(500).json({ error: "Failed to delete food" });
  }
});
// const sayHello = () => {
//   console.log("hi");
// };

module.exports = { router };
