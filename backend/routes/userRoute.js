import express from 'express';

import {loginUser, registerUser, updateProfile, bookAppointment, listAppointment, cancelAppointment} from '../controllers/userController.js';
import authUser from '../middlewares/authUser.js';
import upload from '../middlewares/multer.js';
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/get-profile', authUser, getProfile);
router.put('/update-profile', authUser, upload.single('image'), updateProfile);

router.post('/book-appointment', authUser, bookAppointment);
router.get('/appointments',authUser, listAppointment);
router.post('/cancel-appointment', authUser, cancelAppointment);



export default router;