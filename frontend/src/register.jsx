import React, { useState } from "react";
import { api } from "./api";

function Register({ setShowRegister }) {
  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    role: "tenant",
    phone: ""
  });

  const [message, setMessage] = useState("");

  const register = async (e) => {
    e.preventDefault();

    try {
      await api.post("/register", form);
      setMessage("Registration successful. Please login.");
    } catch (err) {
      setMessage("Registration failed. Email may already exist.");
    }
  };

  return (
    <div className="auth-container">
      <h1>UrbanNest Registration</h1>

      <form onSubmit={register} className="auth-form">
        <input
          placeholder="Full Name"
          value={form.full_name}
          onChange={(e) => setForm({ ...form, full_name: e.target.value })}
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <select
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="tenant">Tenant</option>
          <option value="admin">Property Admin</option>
        </select>

        <input
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />

        <button type="submit">Register</button>
      </form>

      {message && <p>{message}</p>}

      <button className="link-btn" onClick={() => setShowRegister(false)}>
        Back to Login
      </button>
    </div>
  );
}

export default Register;