import express, { json } from "express"; // require -> commonJS
import { connectDB } from "./db/db.js";
import userRouter from "./routes/user.router.js";

const app = express();
app.use(json());
app.disable("x-powered-by");

connectDB();

app.use("/users", userRouter);

const PORT = process.env.PORT ?? 8080;

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`);
});
