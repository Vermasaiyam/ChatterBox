import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import connectDB from "./utils/db.js";
import userRoutes from "./routes/user.routes.js"
import postRoutes from "./routes/post.routes.js"
import messageRoutes from "./routes/message.routes.js"
import { app, server } from "./socket/socket.js";
import path from "path";
 
dotenv.config({});

const PORT = process.env.PORT || 8000;


//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));


const corsOptions = {
    origin: process.env.URL || 'http://localhost:5173',
    credentials: true,
}
app.use(cors(corsOptions));

app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);
app.use('/api/message', messageRoutes);


// ----------------- DEPLOYMENT---------------------------------------

const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.get("*", (req,res)=>{
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
});


// ----------------- DEPLOYMENT---------------------------------------

server.listen(PORT, () => {
    connectDB();
    console.log(`Server listen at port ${PORT}`);
});