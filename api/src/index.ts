import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/tasksRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use("/tasks", router);

app.listen(PORT, () => console.log(`Сервер запущен на порте ${PORT}`));
