import { sql } from "../config/db.js";
export async function getTransactionByUserId(req, res) {

    try {
        const { userId } = req.params
        const transactions = await sql`SELECT * FROM transactions WHERE user_id = ${userId} ORDER BY created_at DESC`
        res.status(200).json(transactions)

    } catch (error) {
        console.log("Error getting the transaction", error);
        res.status(500).send({ message: "Internal error" })

    }

}
export async function createTransaction(req, res) {

    try {
        const { title, amount, category, user_id } = req.body
        if (!title || amount === undefined || !category || !user_id) {
            return res.status(400).json({ message: "All fileds are required " })

        }
        const transaction = await sql`INSERT INTO transactions(user_id,title,amount,category)
                VALUES(${user_id},${title},${amount},${category})
                RETURNING *`
        console.log(transaction);

        res.status(201).json(transaction[0]) // this gets the first object in the array
    } catch (error) {
        console.log("Error creating the transaction", error);
        res.status(500).send({ message: "Internal error" })

    }

}

export async function deleteTransactionById(req, res) {

    try {
        const { id } = req.params;
        if (isNaN(parseInt(id))) {
            return res.status(400).json({ message: "Invalid Id" })
        }
        const result = await sql`DELETE FROM transactions WHERE id = ${id} RETURNING*`

        if (result.length === 0) {
            console.log("not found");
            return res.status(404).send({ message: "Not found" })

        }
        res.status(200).send({ message: "Trasaction deleted successfully" })

    } catch (error) {
        console.log("Error deleting the transaction", error);
        res.status(500).send({ message: "Internal error" })

    }

}

export async function getSummaryById(req, res) {

    try {
        const { userId } = req.params;
        // here the SUM is 0 if it is undefined
        const balanceResult = await sql`SELECT COALESCE(SUM(amount),0) as balance FROM transactions WHERE user_id = ${userId}`
        const incomeResult = await sql`SELECT COALESCE(SUM(amount),0) as income FROM transactions WHERE user_id = ${userId} AND amount > 0`
        const expensesResult = await sql`SELECT COALESCE(SUM(amount),0) as expenses FROM transactions WHERE user_id = ${userId} AND amount < 0`

        res.status(200).json({
            balance: balanceResult[0].balance,
            income: incomeResult[0].income,
            expense: expensesResult[0].expenses,

        })
    } catch (error) {
        console.log("Error getting the transaction summary", error);
        res.status(500).send({ message: "Internal error" })

    }

}