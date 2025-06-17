import mongoose from "mongoose";
import configs from "../configs/configs.js";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = async () => {
  try {
    const mongo_uri = `mongodb+srv://${process.env.MONGO_USER_DB}:${process.env.MONGO_PASSWORD_DB}@${process.env.MONGO_HOST_DB}/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;
    console.log("🔗 URI DE MONGO:", mongo_uri);
    await mongoose.connect(mongo_uri);
    console.log("✅ Conectado a MongoDB Atlas");

    mongoose.connection.on("error", (err) => {
      console.error("MongoDB connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("MongoDB disconnected");
    });
  } catch (error) {
    console.error("❌ Error al conectar la base de datos", error);
  }
};
