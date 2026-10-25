import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {

    const token = req.headers["authorization"];
    
    if (!token) {
        return res.status(403).json({ 
            message: "Access Denied! Token is missing.", 
            success: false 
        });
    }

    try {
        const actualToken = token.split(" ")[1];
        
        const decoded = jwt.verify(actualToken, "expense_secret_key");
        req.userId = decoded.id; 
        next();
    } catch (error) {
        res.status(401).json({ 
            message: "Invalid Token!", 
            success: false 
        });
    }
};