import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import connectDB from "./utils/db.js";
import userRoutes from "./routes/user.routes.js"
dotenv.config({});

const PORT = process.env.PORT || 8000;
const app = express();

app.get('/', (req,res)=>{
    return res.status(200).json({
        message: "i m backend",
        success: true,
    })
})

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));

app.use('/api/user', userRoutes);

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
}
app.use(cors(corsOptions));


app.listen(PORT, () => {
    connectDB();
    console.log(`Server listen at port ${PORT}`);
});