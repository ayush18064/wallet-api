import express from "express"
import { sql } from "../config/db.js"
import { createTransaction, deleteTransactionById, getSummaryById, getTransactionByUserId } from "../controllers/transactionControllers.js"
const router = express.Router()

router.get("/:userId", getTransactionByUserId);
router.post("/", createTransaction)
router.delete("/:id", deleteTransactionById)
router.get("/summary/:userId",getSummaryById )
export default router