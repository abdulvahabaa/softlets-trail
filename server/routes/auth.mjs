import express from "express";

const authRoutes = express.Router({ mergeParams: true });

authRoutes.get("/", async (req, res) => {
    
});

export default authRoutes;
