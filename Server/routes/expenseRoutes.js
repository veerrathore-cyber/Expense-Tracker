import express from "express";
import { addExpense, getExpenses, getSingleExpense, updateExpense, deleteExpense } from "../controllers/expenseController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", verifyToken, addExpense);
router.get("/", verifyToken, getExpenses);
router.get("/:id", verifyToken, getSingleExpense);
router.put("/:id", verifyToken, updateExpense);
router.delete("/:id", verifyToken, deleteExpense);

export default router;