
import express from "express"
import controller from "../controller/authController.js";
import userExist from "../middleware/existingUser.js";
import {userValidations,validateUser} from "../middleware/userValidation.js"

const router = express.Router()


router.post("/signup",userExist,userValidations,validateUser,controller.signup)
router.get("/users", controller.getAllUser)
router.get("/users/:id",controller.getUser)  
router.patch("/users/:id",controller.patch)  
router.delete("/users/:id", controller.deleteUser);


export default router;