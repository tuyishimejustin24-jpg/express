import express from "express"
import categoryExist from "../middleware/categoryExist.js"
import CategoryController from "../controller/categoryContoller.js"

const categoryRouter = express.Router()

categoryRouter.post("/create",categoryExist,CategoryController.createCategory)

export default categoryRouter