const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const userRoutes=require("./routes/User");
const categoryRoutes=require("./routes/Category");
const productRoutes=require("./routes/Product");
const orderRoutes=require("./routes/Order");

// Initialize the app
const server = express();

// Connect to MongoDB
connectDB();

// Middleware
server.use([
    cors(),
    express.json(),
    express.urlencoded({ extended: true }),
    userRoutes,
    categoryRoutes,
    productRoutes,
    orderRoutes
])

// Routes
server.get("/api/test",async(req,res)=>{
    return res.json({msg:"server is running."});
})

// Start the server
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
