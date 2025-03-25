import express from 'express';
import { addDoctor } from '../controllers/adminController.js';
import upload from '../middlewares/multer.js';

const router = express.Router();

router.post('/add-doctor', upload.single('image'), addDoctor);

export default router;
