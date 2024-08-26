import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../connection/db.mjs";
import { v7 as uuidv7 } from "uuid";

export const signup = async (req, res) => {
  console.log("here>>>>> Reached");
  console.log(req.body);
  try {
    const { name, email, password } = req.body;

    // Generate salt and hash the password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const userid = uuidv7();

    // Insert the new user into the database
    const result = await pool.query(
      "INSERT INTO public.users (name, email, password, userid) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, email, passwordHash, userid]
    );

    // Return the inserted user data
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Query the user by email
    const result = await pool.query(
      "SELECT * FROM public.users WHERE email = $1",
      [email]
    );
    let user = result.rows[0];

    if (!user) {
      return res.status(400).json({ msg: "User does not exist." });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid Credentials..." });
    }

    // Create a JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "3h", // Set the expiry time for 3 hours
    });

    // Remove the password field from the user object before returning it
    delete user.password;

    res.status(200).json({ token, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const logout = async (req, res) => {
  console.log("<<<<<<<>Logout<<<<<>>>>>>");
  try {
    const token = req.headers.authorization.split(" ")[1];
    // Decode the token
    const decoded = jwt.decode(token);
    // Access the ID from the decoded payload
    const engineerId = decoded.id;
    console.log(engineerId);
    // Find the document with the engineerId
    let revokedTokenDoc = await JWT_Token.findOne({ engineerId: engineerId });
    if (!revokedTokenDoc) {
      // If document doesn't exist, create a new one
      revokedTokenDoc = await JWT_Token.create({
        engineerId: engineerId,
        revokedTokens: [token],
      });
    } else {
      // Update the existing document by pushing the token to the revokedTokens array
      revokedTokenDoc.revokedTokens.push(token);
      await revokedTokenDoc.save();
    }
    // console.log(revokedTokenDoc);
    res.status(200).json({ msg: "Logged out successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
};
