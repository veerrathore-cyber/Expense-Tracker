import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import userRoutes from "./routes/userRoutes.js";
import expenseRoutes from "./routes/expenseRoutes.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/expenses", expenseRoutes);

mongoose.connect("mongodb://127.0.0.1:27017/VeerExpenseDB")
  .then(() => {
    console.log("MongoDB connected successfully!");
  })
  .catch((error) => {
    console.log("MongoDB connection failed:", error);
  });

app.get("/", (req, res) => {
    res.send("Veer's Expense Tracker Backend is Running!");
});

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});