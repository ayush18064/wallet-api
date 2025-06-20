import express from "express"
import dotenv from "dotenv"
import { initDB, sql } from "./config/db.js"
import rateLimiter from "./middleware/rateLimiter.js"
import trasactionRoutes from "./routes/transactionRoutes.js"
import job from "./config/cron.js"
const app = express()
if (process.env.NODE_ENV === 'production') job.start()
dotenv.config()
const PORT = process.env.PORT
// middleware
app.use(rateLimiter)
app.use(express.json())
app.use("/api/transactions", trasactionRoutes)
app.get("/api/health",(req,res)=>{
    res.status(200).json({status:"okay"})
})
console.log("my port", process.env.PORT);

initDB().then(() => {

    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT} `);

    })
})