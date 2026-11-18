import { StatusCodes } from "http-status-codes"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

function VerifyAcessToken(passRole){
    return async(req,res,next)=>{
       try {
          const token = req.headers.authorization
        if(!token){
            return res.status(StatusCodes.UNAUTHORIZED).json({
                success:false,
                massage:"Missing token"
            })
       
       
        }

        const decoded = jwt.verify(token,process.env.SCRET_KEY)
        console.log(decoded)  
       } catch (error) {
        console.log(error)
       }
    }


}

export default VerifyAcessToken