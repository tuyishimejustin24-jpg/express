import User from "../models/userModel.js";
import hashpassword from "../utils/passwordUtils.js"

class controller{
  static signup = async(req,res)=>{
    const{fullName,email,phone,password}=req.body
    try{
        const encryptedPassword = await hashpassword(password)

        console.log("creating user")

    
        const user = await User.create({fullName,email,phone,password:encryptedPassword}
            
        )
        if(!user){
            return res.status(400).json({status:"error",message:"failed to create account"})
        }else{
            return res.status(201).json({status: "OK",message:"user succesful connected",user})

        }

    }catch(error){
        
        console.log(`error is ${error}`)

        return res.status(500).json({status:"error",message:`error is ${error}`})
    }
}


static  getAllUser= async(req,res)=>{
     try {
        const users = await User.find();
        if (!users.length) {
            return res.status(400).json({ success: false, message: "no users found" });
        }
        return res.status(200).json({ success: true, message: "users found successfully", data: users });
    } catch (error) {
        return res.status(500).json({ success: false, message:"failed to get users", error: error.message });
    }
}

static getUser= async(req,res)=>{
     try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(400).json({ success: false, message: "user not found" });
        }
        return res.status(200).json({ success: true, message: "user found successfully", data: user });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "failed to get user", error: error.message });
    }
}
    
static patch=async(req,res)=>{
     try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        
        if (!user) {
            return res.status(404).json({ success: false, message: "user not found" });
        }

        return res.status(200).json({ success: true, message: "user updated successfully", data: user });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "failed to update user", error: error.message });
    }
}


    static deleteUser= async(req,res)=>{
         try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ success: false, message: "user not found" });
        }
        return res.status(200).json({ success: true, message: "user deleted successfully", data: user });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ 
            success: false, 
            message: "Login Failed to delete user",
             error: error.message });
    }
}
static login = async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          success: false,
          message: "Invalid email or password"
        });
      } else {
        const verfiedPassword = comparePassword(req.body.password);
        if (!verfiedPassword) {
          return res.status(StatusCodes.UNAUTHORIZED).json({
            success: false,
            message: "Invalid email or password"
          });
        } else {
          const userInfo = {
            id: user._id,
            role: user.role
          };

          const token = jwt.sign(userInfo, process.env.SCRET_KEY, { expiresIn: "1d" });
          return res.status(StatusCodes.OK).json({
            success: true,
            message: token
          });
        }
      }
    } catch (error) {
      console.log(error);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Failed to create user",
        error: error.message
      });
    }
  };
}

export default controller;


