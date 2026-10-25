import Expense from "../models/expenseModel.js";

export const addExpense = async (req, res) => {
    try {
        const { title, amount, category, paymentMethod, date, description } = req.body;
        const newExpense = new Expense({
            title, 
            amount, 
            category, 
            paymentMethod, 
            date, 
            description,
            user: req.userId
        });

        await newExpense.save();
        res.status(201).json({ 
            message: "Expense added successfully", 
            success: true 
        });
    } catch (error) {
        res.status(500).json({ 
            message: "Error adding expense", 
            success: false, 
            error: error.message 
        });
    }
};


export const getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find({ user: req.userId });
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ 
            message: "Error fetching expenses", 
            success: false 
        });
    }
};

export const getSingleExpense = async (req, res) => {
    try {
        const expense = await Expense.findById(req.params.id);
        res.status(200).json(expense);
    } catch (error) {
        res.status(500).json({ 
            message: "Error fetching expense", 
            success: false 
        });
    }
};

export const updateExpense = async (req, res) => {
    try {
        const updatedExpense = await Expense.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(200).json({ 
            message: "Expense updated", 
            success: true, updatedExpense 
        });
    } catch (error) {
        res.status(500).json({ 
            message: "Error updating expense", 
            success: false 
        });
    }
};

export const deleteExpense = async (req, res) => {
    try {
        await Expense.findByIdAndDelete(req.params.id);
        res.status(200).json({ 
            message: "Expense deleted successfully", 
            success: true 
        });
    } catch (error) {
        res.status(500).json({ 
            message: "Error deleting expense", 
            success: false 
        });
    }
};