import express from 'express';
import { doctorsList , loginDoctor} from '../controllers/doctorController.js';

const router = express.Router();

router.get('/doctor-list', doctorsList);
router.post('/login', loginDoctor);
export default router