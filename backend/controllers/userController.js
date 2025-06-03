import validator from 'validator';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import {v2 as cloudinary} from 'cloudinary';




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
export {registerUser, loginUser, getProfile, updateProfile}