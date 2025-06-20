import express from "express"
import dotenv from "dotenv"
import { initDB, sql } from "./config/db.js"
import rateLimiter from "./middleware/rateLimiter.js"
import trasactionRoutes from "./routes/transactionRoutes.js"
const app = express()
dotenv.config()
const PORT = process.env.PORT
// middleware
app.use(rateLimiter)
app.use(express.json())
app.use("/api/transactions", trasactionRoutes)

console.log("my port", process.env.PORT);

initDB().then(() => {

    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT} `);

    })
})