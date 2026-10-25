import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:3000/api/users/register", form);
            if (response.data.success) {
                alert("Registration Successful! Please login.");
                navigate("/login");
            }
        } catch (error) {
            alert(error.response?.data?.message || "Error in registration!");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2>Create Account</h2>
                <p>Start tracking your expenses today!</p>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" name="name" placeholder="Enter Name" onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" name="email" placeholder="Enter Email" onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" name="password" placeholder="Enter Password" onChange={handleChange} required />
                    </div>
                    <button type="submit" className="auth-btn">Register</button>
                    <div className="auth-link">
                        Already have an account? <Link to="/login">Login here</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;