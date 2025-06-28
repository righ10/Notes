import express from 'express';
import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js";
import dotenv from "dotenv"
import rateLimiter from './middleware/ratelimiter.js';
import cors from "cors"

dotenv.config();


const app = express()

const PORT =process.env.PORT|| 5001


app.use(cors({
    origin:"http://localhost:5173"
}))
app.use(express.json()); 
app.use(rateLimiter)


app.use("/api/notes", notesRoutes);
connectDB().then(() => {
    
app.listen(5001, () => {
    console.log("server started at PORT:", PORT);
})
})




//mongodb+srv://northrdc:G8qpkIbwkOdqSybE@cluster0.4l2ipiu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0