import express from "express"
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/userData.mjs";
import authRoutes from "./routes/auth.mjs";

dotenv.config();

const app = express();

const corsOptions = {
  origin: "http://localhost:9000",
  methods: ["GET", "POST", "PUT", "PATCH", "OPTIONS"],
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/user", userRoutes);




app.get("/", (req,res) => {
    res.send("Hello world")
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})