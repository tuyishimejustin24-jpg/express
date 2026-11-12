 import User from "../models/userModel.js";
 
 async function userExist (req,res,next){
        const existingUser=await User.findOne({email:req.body.email});
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"User already exist"

            })
        }
      return next()  
}

export default userExist