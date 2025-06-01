import jwt from 'jsonwebtoken';


// admin authentication middleware
const authAdmin = async (req, res, next) => {
    try {
        const {admintoken} = req.headers;
        console.log(req.headers);
        console.log(admintoken)
        if(!admintoken){
            return res.status(400).json({
                sucess: false,
                message: 'Not Authorized Login Again'
            })
        }    
            console.log(process.env.JWT_SECRET_KEY)
            const decodedToken = jwt.verify(admintoken, process.env.JWT_SECRET_KEY);
            
            console.log(decodedToken);

            if(decodedToken !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
                return res.status(400).json({
                    success: false,
                    message: 'Not Authorized Login Again'
                })
            }

        next();
        
    } catch (error) {
         console.log(error)
         return res.status(500).json({
            sucess: false,
            message: error.message
         })
    }
}

export default authAdmin