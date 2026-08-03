import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import authRoutes from "./routes/authRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";

const app = express()

app.use(cors());
app.use(express.json())
app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

const port = process.env.PORT || 5000
const mongouri = process.env.MONGO_URI

mongoose.connect(mongouri)
.then(() => {
    app.listen(port, () => {
        console.log("Mongoose connected successfully")
        console.log(`Listening on port:${port}`)
    })
})
.catch((err) => {
    console.log("MongoDB connection failed:", err)
})