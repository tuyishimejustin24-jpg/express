
import express from "express";
import dotenv from "dotenv";
import { connectdb } from "./src/database/db.js";
import { StatusCodes } from "http-status-codes";
import router from "./src/routes/index.js";




dotenv.config();


const app = express();

const db = process.env.DATABASE_URL;
const port = process.env.PORT || 3000;

app.use(express.json({ limit: '500mb' }));
app.use(express.urlencoded({ limit: '500mb', extended: true }));
app.use(express.json());
app.listen(port, () => {
    console.log(`Server running on ${port}`);
});

    connectdb();

app.use("/api/v1",router)


app.use((req,res)=>{
    res.status(StatusCodes.BAD_GATEWAY).json({
        success:false,
        message:"Router not found"
    }

    )
})
      



    





    






