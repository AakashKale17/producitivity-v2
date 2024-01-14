import express from "express";
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/posts.js"
import postRoutes from "./routes/posts.js"
import cors from "cors"

const app = express()

app.use(express.json())
app.use(cors())

app.use("/backend/auth", authRoutes)
app.use("/backend/user", userRoutes)
app.use("/backend/posts", postRoutes)

app.listen(8800, () => {
    console.log('Connected'); 
});