import express from 'express';
import { addDoctor, loginAdmin } from '../controllers/adminController.js';
import upload from '../middlewares/multer.js';
import authAdmin from '../middlewares/authAdmin.js';

const router = express.Router();

router.post('/add-doctor', authAdmin, upload.single('image'), addDoctor);
router.post('/login', loginAdmin);


export default router;
