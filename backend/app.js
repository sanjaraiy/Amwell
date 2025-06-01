import express from 'express';
import cors from 'cors';


import adminRoutes from './routes/adminRoute.js';
import doctorRoutes from './routes/doctorRoute.js';


//app config
const app = express();


//middleware
app.use(cors());
app.use(express.json());

//api routes
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/doctor', doctorRoutes);




app.get('/', (req, res) => {
    res.status(200).send('API Working');
});

export default app;