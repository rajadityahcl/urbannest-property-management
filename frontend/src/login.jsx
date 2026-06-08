import React, { useState } from "react";
import { api } from "./api";

function Login({ setIsLoggedIn, setShowRegister }) {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const login = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/login", form);

      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("user_id", res.data.user_id);
      localStorage.setItem("full_name", res.data.full_name);

      setIsLoggedIn(true);
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="auth-container">
      <h1>UrbanNest Login</h1>

      <form onSubmit={login} className="auth-form">
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

        <button type="submit">Login</button>

        {error && <p className="error">{error}</p>}
      </form>

      <p>
        New user?{" "}
        <button className="link-btn" onClick={() => setShowRegister(true)}>
          Register here
        </button>
      </p>
    </div>
  );
}

export default Login;