import express from 'express';

import {loginUser, registerUser, updateProfile} from '../controllers/userController.js';
import authUser from '../middlewares/authUser.js';
import upload from '../middlewares/multer.js';
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/get-profile', authUser, getProfile);
router.put('/update-profile', authUser, upload.single('image'), updateProfile);






export default router;