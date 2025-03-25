import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import adminRoutes from './routes/adminRoute.js';

//app config
const app = express();
const port = process.env.PORT || 9000;
connectDB();
connectCloudinary();


//middleware
app.use(cors());
app.use(express.json());

//api routes
app.use('/api/v1/admin', adminRoutes);




app.get('/', (req, res) => {
    res.status(200).send('API Working');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})