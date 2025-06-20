import express from 'express';
import { addDoctor, allDoctors, loginAdmin } from '../controllers/adminController.js';
import upload from '../middlewares/multer.js';
import authAdmin from '../middlewares/authAdmin.js';
import { changeAvailablity } from '../controllers/doctorController.js';

const router = express.Router();

router.post('/add-doctor', authAdmin, upload.single('image'), addDoctor);
router.post('/login', loginAdmin);
router.get('/all-doctors', authAdmin, allDoctors);
router.post('/change-availability', authAdmin, changeAvailablity);

export default router;
