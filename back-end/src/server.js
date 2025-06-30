import express from 'express';
import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js";
import dotenv from "dotenv"
import rateLimiter from './middleware/rate-limiter.js';
import cors from "cors"
import path from "path"

dotenv.config();


const app = express()

const PORT =process.env.PORT|| 5001

const __dirname=path.resolve()

if(process.env.NODE_ENV ==="production"){
app.use(
    cors({
        origin:"http://localhost:5173"
}))
}
app.use(express.json()); 
app.use(rateLimiter)


app.use("/api/notes", notesRoutes);

/*app.use(express.static(path.join(__dirname,"../front-end/dist")))

app.get("*",(req, res) => {
    res.sendFile(path.join(__dirname, "../front-end","dist","index.html"))
})*/

if(process.env.NODE_ENV ==="production"){
    app.use(express.static(path.join(__dirname,"../front-end/dist")))

    app.get("*",(req, res) => {
    res.sendFile(path.join(__dirname, "../front-end","dist","index.html"))
});

}

connectDB().then(() => {
    
app.listen(5001, () => {
    console.log("server started at PORT:", PORT);
})
})




//mongodb+srv://northrdc:G8qpkIbwkOdqSybE@cluster0.4l2ipiu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0