import express from "express";
import pool from "../connection.mjs";

const userRoutes = express.Router({ mergeParams: true });

userRoutes.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM cars");
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

userRoutes.post("/create", async (req, res) => {
  try {
    const { brand, model, year } = req.body;

    // Check if all required fields are present
    if (!brand || !model || !year) {
      return res
        .status(400)
        .send("All fields (brand, model, year) are required");
    }

    // Insert the new car into the database
    const result = await pool.query(
      "INSERT INTO cars (brand, model, year) VALUES ($1, $2, $3) RETURNING *",
      [brand, model, year]
    );

    // Return the inserted car data
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

export default userRoutes;
