import express from "express"
import authRouter from "./authRouter.js"
import categoryRouter from "./categoryRouter.js"

const router = express.Router()

router.use("/auth",authRouter)
router.use("/category",categoryRouter)
export default router