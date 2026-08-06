import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import Home from "./pages/index";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";

function App() {

  const [token, setToken] = useState(
    localStorage.getItem("token")
  );

  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={
            token ? <Navigate to="/dashboard" /> : <Home />
          }
        />

        <Route
          path="/login"
          element={
            token ? <Navigate to="/dashboard" /> : <Login />
          }
        />

        <Route
          path="/register"
          element={
            token ? <Navigate to="/dashboard" /> : <Register />
          }
        />

        <Route
          path="/dashboard"
          element={
            token ? <Dashboard /> : <Navigate to="/login" />
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;