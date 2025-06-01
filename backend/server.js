import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';



const port = process.env.PORT || 8000;

connectDB();
connectCloudinary();




app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})