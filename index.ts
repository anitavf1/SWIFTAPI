import express from "express";
import type { Request, Response } from "express";
import mongoose, { ConnectOptions } from "mongoose";
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swaggerConfig'; 
import dotenv from "dotenv";
import userRoutes from "./routes/user.route";
import songRoutes from "./routes/song.route";
import { createClient } from 'redis';


const PORT = process.env.PORT || 3002;
const app = express();
dotenv.config();




const redisClient = createClient({
    url: 'redis://host.docker.internal:6379' 
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));

const connectRedis = async () => {
    await redisClient.connect();
};

export { redisClient, connectRedis };



app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/users", userRoutes);
app.use("/song", songRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.get("/anita", (req: Request, res: Response) => {
    res.send("Hello Anita!")
});

// Conexion a la BD

const mongoOptions: ConnectOptions = {};

console.log(process.env.DATABASE_URL)

mongoose
.connect(process.env.DATABASE_URL!, mongoOptions)
.then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Connection error", error.message);
  });




















