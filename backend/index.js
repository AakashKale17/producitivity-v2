import express from "express";
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/posts.js"
import postRoutes from "./routes/posts.js"
import cors from "cors"
import cookieParser from "cookie-parser";
import cookies from "cookie-parser";

const app = express()

app.use(express.json());
const corsConfig = {
    credentials: true,
    origin: true,
};
app.use(cors(corsConfig));
app.use(cookieParser());
app.use(cookies());

app.use("/backend/auth", authRoutes)
app.use("/backend/user", userRoutes)
app.use("/backend/posts", postRoutes)

app.listen(8800, () => {
    console.log('Connected'); 
});