import express from 'express';
import { doctorsList } from '../controllers/doctorController.js';

const router = express.Router();

router.get('/doctor-list', doctorsList);

export default router