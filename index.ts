import express from "express";
import type { Request, Response } from "express";
import mongoose, { ConnectOptions } from "mongoose";
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swaggerConfig'; 
import dotenv from "dotenv";
import userRoutes from "./routes/user.route";

const PORT = process.env.PORT || 3002;
const app = express();

dotenv.config();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.json());
app.use("/users", userRoutes);


app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.get("/anita", (req: Request, res: Response) => {
    res.send("Hello Anita!")
});


// Conexion a la BD

const mongoOptions: ConnectOptions = {};

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




















/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               charge:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID of the newly created user
 *       400:
 *         description: Bad request
 */





  // app.post('/user', async (req, res) => {
  //   const { name, email, charge, password } = req.body;
  
  //   try {
  //     // Crear el nuevo usuario usando el modelo 'User'
  //     const newUser: Document = new user({ name, email, charge, password });
  
  //     // Guardar el usuario en la base de datos
  //     const savedUser = await newUser.save();
  
  //     // Retornar los detalles del usuario creado
  //     res.status(201).json({
  //       message: "User created successfully",
  //       user: {
  //         id: savedUser._id,
  //         name: savedUser.name,
  //         email: savedUser.email,
  //         charge: savedUser.charge,
  //       }
  //     });
  //   } catch (err) {
  //     res.status(400).json({ message: err.message });
  //   }
  // });