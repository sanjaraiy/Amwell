import jwt from 'jsonwebtoken';


// user authentication middleware
const authUser= async (req, res, next) => {
    try {
        const {token} = req.headers;

       
        
        if(!token){
            return res.status(400).json({
                sucess: false,
                message: 'Not Authorized Login Again'
            })
        }    
            
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
            
            req.body.userId = decodedToken.id

        next();
        
    } catch (error) {
         console.log(error)
         return res.status(500).json({
            sucess: false,
            message: error.message
         })
    }
}

export default authUser