import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import connectDB from "./utils/db.js";
import userRoutes from "./routes/user.routes.js"
import postRoutes from "./routes/post.routes.js"
import messageRoutes from "./routes/message.routes.js"
dotenv.config({});

const PORT = process.env.PORT || 8000;
const app = express();

// app.get('/', (req,res)=>{
//     return res.status(200).json({
//         message: "i m backend",
//         success: true,
//     })
// })

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));


const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
}
app.use(cors(corsOptions));

app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/message', messageRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log(`Server listen at port ${PORT}`);
});