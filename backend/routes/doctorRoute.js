import express from 'express';
import { doctorsList , loginDoctor, appointmentsDoctor, appointmentComplete, appointmentCancel, doctorDashboard, doctorProfile, updateDoctorProfile} from '../controllers/doctorController.js';
import authDoctor from '../middlewares/authDoctor.js';

const router = express.Router();

router.get('/doctor-list', doctorsList);
router.post('/login', loginDoctor);
router.get('/doctor-appointments', authDoctor, appointmentsDoctor);
router.post('/complete-appointment', authDoctor, appointmentComplete);
router.post('/cancel-appointment', authDoctor, appointmentCancel);
router.get('/dashboard', authDoctor, doctorDashboard);
router.get('/profile', authDoctor, doctorProfile);
router.post('/update-profile', authDoctor, updateDoctorProfile);



export default router