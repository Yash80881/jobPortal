require('dotenv').config();

const connectDB = require('./config/dB');

const express = require('express');
const app = express();

const authRoutes = require("./routes/authRoutes");

app.use(express.json());

app.use("/api/auth", authRoutes);

// app.get('/',(req,res)=>{
//     res.send("express is working")
// })

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    await connectDB();

    app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    });
}

startServer();
