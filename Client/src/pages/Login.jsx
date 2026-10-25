import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [form, setForm] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/api/users/login", form);
            if (response.data.success) {
                localStorage.setItem("userToken", response.data.token);
                navigate("/dashboard");
            }
        } catch (error) {
            alert(error.response?.data?.message || "Invalid Email or Password!");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2>Welcome Back</h2>
                <p>Login to manage your expenses</p>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" name="email" placeholder="Enter Email" onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" name="password" placeholder="Enter Password" onChange={handleChange} required />
                    </div>
                    <button type="submit" className="auth-btn">Login</button>
                    <div className="auth-link">
                        Don't have an account? <Link to="/register">Register here</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;