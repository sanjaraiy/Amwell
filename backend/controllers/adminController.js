import validator from "validator";
import bcrypt from "bcrypt";
import {v2 as cloudinary} from 'cloudinary';
import Doctor from "../models/doctorModel.js";
import jwt from 'jsonwebtoken';


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
    
    console.log({
        name,
        email,
        password,
        speciality,
        degree,
        experience,
        about,
        fees,
        address,
      });
    

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
    
    console.log(doctorData);

    const newDoctor = new Doctor(doctorData);

  const addedDoctor = await newDoctor.save();
   
  
  console.log(addedDoctor)

   res.json({
    success: true, 
    message: "Doctor is successfulyy added",
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

export { addDoctor, loginAdmin };
