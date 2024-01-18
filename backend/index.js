import express from "express";
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/posts.js"
import postRoutes from "./routes/posts.js"
import cors from "cors"
import cookieParser from "cookie-parser";
import multer from "multer";

const app = express()


app.use(express.json());
app.use(cookieParser());
const corsConfig = {
    credentials: true,
    origin: true,
};
app.use(cors(corsConfig));
app.use("/backend/upload",express.static('upload'))

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../backend/upload')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+file.originalname)
    }
  })
  
  const upload = multer({ storage })

  app.post('/backend/upload', upload.single('file'), async function (req, res) {
    const file = req.file;
    console.log(req.file.filename)
    res.status(200).json(file.filename);
  })

app.use("/backend/auth", authRoutes)
app.use("/backend/user", userRoutes)
app.use("/backend/posts", postRoutes)

app.listen(8800, () => {
    console.log('Connected'); 
});