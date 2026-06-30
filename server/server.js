require('dotenv').config();

const connectDB = require('./config/dB');

const express = require('express');
const app = express();

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

const errorMiddleware = require("./middlewares/errorMiddleware");

app.use(errorMiddleware);
// app.get('/',(req,res)=>{
//     res.send("express is working")
// })



const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try{
        await connectDB();

        app.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`);
        });
    }
    catch(error){
        console.error("Failed to start server:", error);
        process.exit(1);
    }
}

startServer();
