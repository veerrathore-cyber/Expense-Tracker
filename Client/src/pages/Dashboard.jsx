import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import "./Dashboard.css";
import axios from "axios";

function Dashboard() {
  const [form, setForm] = useState({
    title: "",
    amount: "",
    category: "",
    paymentMethod: "",
    date: "",
    description: "",
  });

  const [Data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();

  const API_URL = "http://localhost:3000/api";

  let total = 0;
  Data.forEach((expense) => {
    total += Number(expense.amount);
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));
  };

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("userToken");
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await axios.get(`${API_URL}/expenses`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const expenseData = {
        ...form,
        amount: Number(form.amount),
      };

      const token = localStorage.getItem("userToken");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      if (editingId) {
        await axios.put(`${API_URL}/expenses/${editingId}`, expenseData, config);
        alert("Expense updated!");
      } else {
        await axios.post(`${API_URL}/expenses`, expenseData, config);
        alert("Expense added!");
      }

      setForm({ 
        title: "", 
        amount: "", 
        category: "", 
        paymentMethod: "", 
        date: "", 
        description: "" 
      });

      setEditingId(null);
      setShowForm(false);
      await fetchData();
    
    } catch (error) {
      console.log("Error saving expense:", error);
      alert("Failed to save expense.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this expense?")) {
      return;
    }
    try {
      const token = localStorage.getItem("userToken");
      await axios.delete(`${API_URL}/expenses/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      await fetchData();
    } catch (error) {
      console.log("Error deleting expense:", error);
    }
  };

  const handleEdit = (expense) => {
    setForm({
      title: expense.title || "",
      amount: expense.amount || "",
      category: expense.category || "",
      paymentMethod: expense.paymentMethod || "",
      date: expense.date 
        ? new Date(expense.date).toISOString().slice(0, 10) 
        : "",
      description: expense.description || "",
    });

    setEditingId(expense._id);
    setShowForm(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    navigate("/login");
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      
      <aside className="sidebar">
        <h2>Expense Tracker</h2>
        <button className="sidebar-btn" onClick={() => setShowForm(false)}>
          Dashboard
        </button>
        <button className="sidebar-btn-outline" onClick={() => setShowForm(true)}>
          + Add Expense
        </button>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </aside>

      <main className="main-content">
        <header className="header">
          <div>
            <h1>Dashboard</h1>
            <p>Welcome to your expense tracker</p>
          </div>
          <button className="add-btn" onClick={() => setShowForm(!showForm)}>
            + Add New Expense
          </button>
        </header>

        <div className="cards">
          <div className="card">
            <h3>Total Expenses</h3>
            <h2>₹ {total.toLocaleString("en-IN")}</h2>
          </div>
          <div className="card">
            <h3>Total Records</h3>
            <h2>{Data.length}</h2>
          </div>
        </div>

        {showForm && (
          <div className="form-card">
            <h2>{editingId ? "Edit Expense" : "Add New Expense"}</h2>
            <form onSubmit={handleSubmit} className="expense-form">
              <label>Title</label>
              <input type="text" name="title" value={form.title} onChange={handleChange} required />
              
              <label>Amount</label>
              <input type="number" name="amount" value={form.amount} onChange={handleChange} required />
              
              <label>Category</label>
              <select name="category" value={form.category} onChange={handleChange} required>
                <option value="">Select Category</option>
                <option value="Food">Food</option>
                <option value="Transport">Transport</option>
                <option value="Shopping">Shopping</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Bill">Bill</option>
                <option value="Other">Other</option>
              </select>

              <label>Payment Method</label>
              <select name="paymentMethod" value={form.paymentMethod} onChange={handleChange} required>
                <option value="">Select Payment Method</option>
                <option value="Cash">Cash</option>
                <option value="UPI">UPI</option>
                <option value="Debit Card">Debit Card</option>
                <option value="Credit Card">Credit Card</option>
              </select>

              <label>Date</label>
              <input type="date" name="date" value={form.date} onChange={handleChange} required />

              <label>Description</label>
              <textarea name="description" value={form.description} onChange={handleChange} />
              
              <div className="form-actions">
                <button type="submit" className="save-btn">
                  {editingId ? "Update" : "Save"}
                </button>
                <button type="button" className="cancel-btn" onClick={() => setShowForm(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="table-card">
          <h2>Recent Expenses</h2>
          <table className="expense-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {Data.map((expense) => (
                <tr key={expense._id}>
                  <td>{expense.title}</td>
                  <td>{expense.category}</td>
                  <td>₹ {Number(expense.amount).toLocaleString("en-IN")}</td>
                  <td>
                    {expense.date ? new Date(expense.date).toLocaleDateString("en-IN") : ""}
                  </td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEdit(expense)}>
                        Edit
                        </button>
                    <button className="delete-btn" onClick={() => handleDelete(expense._id)}>
                        Delete
                        </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {Data.length === 0 && <p style={{ marginTop: '20px', textAlign: 'center' }}>No expenses found.</p>}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;