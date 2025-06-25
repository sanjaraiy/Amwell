import validator from "validator";
import bcrypt from "bcrypt";
import {v2 as cloudinary} from 'cloudinary';
import Doctor from "../models/doctorModel.js";
import jwt from 'jsonwebtoken';
import Appointment from '../models/appointmentModel.js';
import User from "../models/userModel.js";


//API for adding a doctor
const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
    } = req.body;

    const imageFile = req.file;
    
   
    

    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !fees ||
      !address
    ) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    if(!validator.isEmail(email)){
        return res.status(400).json({
            message: 'Invalid email'
        })
    }


    if(password.length < 8){
        return res.json({
            success: false,
            message: 'Password must be atleast 8 characters long'
        })
    }

     const salt = await bcrypt.genSalt(10);
     const hashedPassword = await bcrypt.hash(password, salt);
     
    


    // upload to connectCloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type: "image"});
    const imageUrl = imageUpload.secure_url;

    
    const doctorData = {
      name,
      email,
      image: imageUrl,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: JSON.parse(address),
      date: Date.now()
    }
    
   

    const newDoctor = new Doctor(doctorData);

  const addedDoctor = await newDoctor.save();
   
  

   res.json({
    success: true, 
    message: "Doctor is successfully added",
    addedDoctor
   })


  } catch (error) {
      console.log(error)
      res.json({success:false, message: error.message})
  }
};

//API for admin Login
const loginAdmin = async (req, res) => {
   try {
        
    const {email, password} = req.body;
    
    

    if(!email || !password){
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        })
    }
    
   

    if(email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD){
       return res.status(400).json({
          success: false,
          message: "Invalid credentials"
        })
    }

    const token = jwt.sign(email+password, process.env.JWT_SECRET_KEY);

   return res.json({
      success: true,
      message: 'Admin Successfully Login',
      token
    })
    
     
    
   } catch (error) {
      console.log(error)
      res.status(500).json({
        success:false,
        message: error.message
      })
   }
}

// Get all doctors
const allDoctors = async (req, res) => {
   try {
      const doctors = await Doctor.find({}).select("-password");
      
      res.status(200).json({
        success: true,
        doctors
      })

   } catch (error) {
       console.log(error);
       res.status(500).json({
        success: false,
        message: error.message
       })
   }
}

//API to get all appointment list
const appointmentsAdmin = async (req, res) => {
   try {
    const appointments = await Appointment.find({});

    res.status(200).json({
      success: true,
      appointments
   })
   } catch (error) {
     console.log(error);
       res.status(500).json({
        success: false,
        message: error.message
       })
   }
}

//API to cancel appointment
const appointmentCancel = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const appointmentData = await Appointment.findById(appointmentId);

    if (appointmentData.userId !== userId) {
      return res.json({
        success: false,
        message: "Unauthorized action",
      });
    }

    await Appointment.findByIdAndUpdate(appointmentId, { cancelled: true });

    const { docId, slotDate, slotTime } = appointmentData;

    const doctorData = await Doctor.findById(docId);

    let slots_booked = doctorData.slots_booked;

    slots_booked[slotDate] = slots_booked[slotDate].filter(
      (e) => e !== slotTime
    );

    await Doctor.findByIdAndUpdate(docId, { slots_booked });

    res.status(400).json({
      success: true,
      message: "Appointment Cancelled",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


//API to get dashboard data for admin panel
const adminDashboard = async (req, res) => {
   try {
      
     const doctors = await Doctor.find({});
     const users  = await User.find();
     const appointments = await Appointment.find({})

     const dashData = {
      doctors: doctors.length,
      appointments: appointments.length,
      patients: users.length,
      latestAppointments: appointments.reverse().slice(0, 5)
     }
    
     res.json({
      success: true,
      dashData
     })

   } catch (error) {
     console.log(error);
       res.status(500).json({
        success: false,
        message: error.message
       })
   }
}
export { addDoctor, loginAdmin , allDoctors, appointmentsAdmin, appointmentCancel, adminDashboard};
