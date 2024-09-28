import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const PORT = process.env.PORT || 8000;
const app = express();

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));


server.listen(PORT, () => {
    // connectDB();
    console.log(`Server listen at port ${PORT}`);
});