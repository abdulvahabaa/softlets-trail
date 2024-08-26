import express from "express"
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet"
import userRoutes from "./routes/users.mjs";
import authRoutes from "./routes/auth.mjs";
import bodyParser from "body-parser";

dotenv.config();

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "PATCH", "OPTIONS"],
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cors(corsOptions));

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use("/auth", authRoutes);
app.use("/user", userRoutes);


app.get("/", (req,res) => {
    res.send("Hello world")
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})