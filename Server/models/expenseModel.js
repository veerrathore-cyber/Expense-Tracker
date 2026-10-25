import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    amount: { 
        type: Number,
        required: true 
    },
    category: { 
        type: String, 
        required: true 
    },
    paymentMethod: { 
        type: String, 
        required: true 
    },
    date: { 
        type: String,
        required: true 
    },
    description: { 
        type: String 
    },

    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    }
});

export default mongoose.model("Expense", expenseSchema);