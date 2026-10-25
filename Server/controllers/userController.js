import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        
        res.status(201).json({ 
            message: "User registered successfully", 
            success: true 
        });
    } catch (error) {
        res.status(500).json({ 
            message: "Error in registration", 
            success: false, 
            error: error.message 
        });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ 
                message: "Account not found. Please Register!", 
                success: false 
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ 
                message: "Invalid password!", 
                success: false 
            });
        }

        const token = jwt.sign({ id: user._id }, "expense_secret_key", { expiresIn: "1d" });
        
        res.status(200).json({ 
            message: "Login successful", 
            success: true, 
            token 
        });
    } catch (error) {
        res.status(500).json({ 
            message: "Error in login", 
            success: false 
        });
    }
};