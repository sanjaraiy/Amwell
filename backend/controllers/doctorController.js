import Doctor from "../models/doctorModel.js";
import bcrypt from 'bcrypt';
import jwt  from 'jsonwebtoken';
import Appointment from '../models/appointmentModel.js';


const changeAvailablity = async (req, res) => {
    try {
        const {docId} = req.body;
      
        const docData = await Doctor.findById(docId);
        await Doctor.findByIdAndUpdate(docId, {available: !docData.available});

        res.status(200).json({
            success: true,
            message: 'Availability Changed'
        })

    } catch (error) {
         console.log(error);
         res.json({success: false, message: error.message});
    }
}

const doctorsList = async (req, res) => {
     try {
        const doctors = await Doctor.find({}).select(['-password', '-email']);

        res.status(200).json({
            success: true,
            doctors,
        })
     } catch (error) {
        console.log(error.message);
        res.status(500).json({
            success: false,
            message: error.message
        })
     }
}

//API for doctor Login
const loginDoctor = async (req, res) => {
     try {

        const {email, password} = req.body;
        
        const doctor = await Doctor.findOne({email});

        if(!doctor){
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            })
        }
        
        const isMatch = await bcrypt.compare(password, doctor.password);

        if(isMatch){

            const token = await jwt.sign({id: doctor._id}, process.env.JWT_SECRET_KEY);

            res.json({success: true, token})
        }else{
             res.json({
                success: false, 
                message: 'Invalid credentials'
             })
        }
     } catch (error) {
         console.log(error.message);
        res.status(500).json({
            success: false,
            message: error.message
        })
     }
     
}


//API to get doctor appointments for doctor panel
const appointmentsDoctor = async (req, res) => {
    try {
        const {docId} = req.body;
        const appointments = await Appointment.find({docId});

        res.json({
            success: true,
            appointments
        }
        )
    } catch (error) {
          console.log(error.message);
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//API to mark appointment completed for doctor panel
const appointmentComplete = async (req, res) => {
    try {
        const {docId, appointmentId} = req.body;
        const appointmentData = await Appointment.findById(appointmentId);

        if(appointmentData && appointmentData.docId === docId){
            await Appointment.findByIdAndUpdate(appointmentId, {isCompleted: true})

            return res.status(200).json({
                success: true,
                message: 'Appointment Completed'
            })


        }else{
            return res.status(400).json({
                success: false,
                message: 'Mark Failed'
            })
        }
    } catch (error) {
         console.log(error)
         res.status(500).json({
            success: false,
            message: error.message
         })
    }

}

//API to cancel appointment completed for doctor panel
const appointmentCancel = async (req, res) => {
    try {
        const {docId, appointmentId} = req.body;
        const appointmentData = await Appointment.findById(appointmentId);

        if(appointmentData && appointmentData.docId === docId){
            await Appointment.findByIdAndUpdate(appointmentId, {cancelled: true})

            return res.status(200).json({
                success: true,
                message: 'Appointment Cancelled'
            })


        }else{
            return res.status(400).json({
                success: false,
                message: 'Cancelled Failed'
            })
        }
    } catch (error) {
         console.log(error)
         res.status(500).json({
            success: false,
            message: error.message
         })
    }
    
}

//API to get dashboard data for doctor panel
const doctorDashboard = async (req, res) => {
    try {
        const {docId} = req.body;

        const appointments = await Appointment.find({docId});

        let earnings = 0;

        appointments.map((item) => {
            if(item.isCompleted || item.payment){
                earnings += item.amount;
            }
        })
        
        let patients = []

        appointments.map((item) => {
            if(!patients.includes(item.userId)){
              patients.push(item.userId);
            }
        })

        const dashData = {
            earnings,
            appointments: appointments.length,
            patients: patients.length,
            latestAppointments: appointments.reverse().slice(0,5)
        }
        
        res.status(400).json({
            success: true,
            dashData
        })

    } catch (error) {
         console.log(error)
         res.status(500).json({
            success: false,
            message: error.message
         })
    }
}

//API to get doctor profile for Doctor Panel
const doctorProfile = async (req, res) => {
    try {
        const {docId} = req.body;
        const profileData = await Doctor.findById(docId).select("-password");

        res.status(200).json({
            success: true,
            profileData
        })
    } catch (error) {
         console.log(error)
         res.status(500).json({
            success: false,
            message: error.message
         })
    }
}

//API to update doctor profile data from Doctor Panel
const updateDoctorProfile = async (req, res) => {
    try {
        const {docId, fees, address, available} = req.body;

        await Doctor.findByIdAndUpdate(docId, {fees, address, available})

        res.status(200).json({
            success: true,
            message: 'Profile Updated'
        })

    } catch (error) {
        console.log(error)
         res.status(500).json({
            success: false,
            message: error.message
         })
    }
}

export {
    changeAvailablity,
    doctorsList,
    loginDoctor,
    appointmentsDoctor,
    appointmentCancel,
    appointmentComplete,
    doctorDashboard,
    updateDoctorProfile,
    doctorProfile,
}