import jwt from 'jsonwebtoken';


// admin authentication middleware
const authDoctor = async (req, res, next) => {
    try {
        const {doctorToken} = req.headers;
        
        if(!doctorToken){
            return res.status(400).json({
                sucess: false,
                message: 'Not Authorized Login Again'
            })
        }    
            
            const decodedToken = jwt.verify(doctorToken, process.env.JWT_SECRET_KEY);
             
            req.body.docId = decodedToken.id;
     

          
        next();
        
    } catch (error) {
         console.log(error)
         return res.status(500).json({
            sucess: false,
            message: error.message
         })
    }
}

export default authDoctor