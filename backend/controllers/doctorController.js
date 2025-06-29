import Doctor from "../models/doctorModel.js";
import bcrypt from 'bcrypt';
import jwt  from 'jsonwebtoken';

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

export {
    changeAvailablity,
    doctorsList,
    loginDoctor
}