import express from "express";
import { connectDB } from "./db/db.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import flatRouter from "./routes/flat.router.js";
import userRouter from "./routes/user.router.js";
import authRouter from "./routes/auth.router.js";
import favoriteFlatsRouter from "./routes/favoriteFlats.router.js";

console.log("MONGO_USER_DB:", process.env.MONGO_USER_DB);
console.log("MONGO_PASSWORD_DB:", process.env.MONGO_PASSWORD_DB);
console.log("MONGO_DB_NAME:", process.env.MONGO_DB_NAME);
console.log("MONGO_HOST_DB:", process.env.MONGO_HOST_DB);

// solo para probar

const app = express();
app.use(express.json());
app.use(cors());
app.disable("x-powered-by");

connectDB();

app.use("/flats", flatRouter);
app.use("/users", userRouter);
app.use("/auth", authRouter);
app.use("/favorite-flats", favoriteFlatsRouter);

const PORT = process.env.PORT ?? 8080;

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`);
});
