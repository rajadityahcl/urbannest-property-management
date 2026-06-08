import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [showRegister, setShowRegister] = useState(false);

  const logout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
  };

  if (isLoggedIn) {
    return <Dashboard logout={logout} />;
  }

  return (
    <div>
      {showRegister ? (
        <Register setShowRegister={setShowRegister} />
      ) : (
        <Login setIsLoggedIn={setIsLoggedIn} setShowRegister={setShowRegister} />
      )}
    </div>
  );
}

export default App;