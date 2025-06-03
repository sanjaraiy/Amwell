import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import {v2 as cloudinary} from 'cloudinary';
import Appointment from '../models/appointmentModel.js';
import Doctor from '../models/doctorModel.js';




// API to register user
const registerUser = async (req, res) => {
   try {
       const {name, email, password} = req.body;
    
       if(!name || !password || !email){
         return res.json({
            success: false, message: "Missing Details"
         })
       }

       if(!validator.isEmail(email)){
           return res.json({
            success: false, message: "enter a valid email"
         })


       }
       
       //validating strong password
       if(password.length < 8){
           return res.json({
            success: false, message: "enter a strong password"
         })
       }


       // Hashing user password
       const salt = await bcrypt.genSalt(10);
       const hashedPassword = await bcrypt.hash(password, salt);


       const userData = {
          name,
          email,
          password : hashedPassword
       }
      
      const newUser = new User(userData);
      const user = await newUser.save();

      const token = jwt.sign({id: user._id}, process.env.JWT_SECRET_KEY);

      res.json({
        success: true,
        token
      })

   } catch (error) {
      console.log(error.message);

      res.status(500).json({
        success: false,
        message: error.message
      })

   }
}

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
         console.log({email, password})
        if(!email || !password) {
            return res.status(400).json({
                success: false,
                message: "enter a email or password"
            })
        }


        const user = await User.findOne({email});
        
        if(!user){
           return res.json({success: false, message: 'User does not exist'});
        }

       const isMatch = await bcrypt.compare(password, user.password);

       if(isMatch){
        const token = jwt.sign({id : user._id}, process.env.JWT_SECRET_KEY);
        res.json({success: true, token});
       }else{
          res.json({
            success: false, 
            message: "Invalid credentials"
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

const getProfile = async (req, res) => {
    try {

      const {userId} = req.body;
      const userData = await User.findById(userId).select('-password');

      res.status(200).json({
          success:true,
          userData
      })
      
    } catch (error) {
         return res.status(500).json({
                success: false,
                message: error.message
            })
    }
}


const updateProfile = async (req, res) => {
   try {
        const {userId, name, phone, address, dob, gender} = req.body;
        const imageFile = req.file;

        if(!name || !phone || !dob || !gender){
           return res.status(400).json({
            success: false,
            message: "Data Missing"
           })

        }


        await User.findByIdAndUpdate(userId, {name, phone, address: JSON.parse(address), dob, gender})
         
        if(imageFile){
           const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type: 'image'});
           const imageURL = imageUpload.secure_url;

           await User.findByIdAndUpdate(userId, {image:imageURL})
        }

         res.status(200).json({
            success: true, 
            message: "Profile Updated"
         })


   } catch (error) {
       return res.status(500).json({
                success: false,
                message: error.message
            })
   }
}


const bookAppointment = async (req, res) => {
   try {
      const {userId, docId, slotDate, slotTime} = req.body;

      const docData = await Doctor.findById(docId).select('-password');

      if(!docData.available){
          return res.status(400).json({
            success: false,
            message: 'Doctor not available'
          })
      }

      let slots_booked = docData.slots_booked;

      if(slots_booked[slotDate]){
         if(slots_booked[slotDate].includes(slotTime)){
              return res.status(400).json({
            success: false,
            message: 'Slot not available'
          })
         }else{
            slots_booked[slotDate].push(slotTime)
         }
      }else{
          slots_booked[slotDate] = [];
          slots_booked[slotDate].push(slotTime);
      }
      
      const userData = await User.findById(userId).select('-password')

      delete docData.slots_booked

      const appointmentData = {
         userId,
         docId,
         userData,
         docData,
         amount: docData,fees,
         slotTime,
         slotDate,
         date: Date.now()
      }

      const newAppointment = new Appointment(appointmentData);
      await newAppointment.save();

      await Doctor.findByIdAndUpdate(docId, {slots_booked});
      
      res.status(201).json({
         success: true,
         message: 'Appointment Booked'
      })

   } catch (error) {
      res.status(500).json({
         success: false,
         message: error.message
      })
   }
}

const listAppointment = async (req, res) => {
    try {
      const {userId} = req.body;
      const appointments = await Appointment.find({userId});
  
      res.status(201).json({
         success: true,
         appointments
      })


    } catch (error) {
      res.status(500).json({
         success: false,
         message: error.message
      })
    }
}

const cancelAppointment = async (req, res) => {
   try {
      const {userId, appointmentId} = req.body;
      const appointmentData = await Appointment.findById(appointmentId);

      if(appointmentData.userId !== userId){
         return res.json({
            success: false,
            message: 'Unauthorized action'
         })
      }

      await Appointment.findByIdAndUpdate(appointmentId, {cancelled: true});

      const {docId, slotDate, slotTime} = appointmentData;

      const doctorData = await Doctor.findById(docId);

      let slots_booked = doctorData.slots_booked;

      slots_booked[slotDate] = slots_booked[slotDate].filter((e) => e !== slotTime)

      await Doctor.findByIdAndUpdate(docId, {slots_booked});

      res.status(400).json({
         success: true,
         message: 'Appointment Cancelled'
      })
   } catch (error) {
       res.status(500).json({
         success: false,
         message: error.message
      })
   }
}


export {registerUser, loginUser, getProfile, updateProfile, bookAppointment, listAppointment, cancelAppointment}