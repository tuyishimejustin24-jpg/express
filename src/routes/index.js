import express from "express"
import authRouter from "./categoryRouter.js"
import categoryRouter from "./categoryRouter.js"
import Category from "../models/categoryModels.js"

const router = express.Router()

router.use("/auth",authRouter)
router.use("/category",categoryRouter)
export default router