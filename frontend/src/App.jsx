import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/index";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";

function App() {

  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>

      <Routes>

        {/* Home */}
        <Route
          path="/"
          element={
            token ? <Navigate to="/dashboard" /> : <Home />
          }
        />

        {/* Login */}
        <Route
          path="/login"
          element={
            token ? <Navigate to="/dashboard" /> : <Login />
          }
        />

        {/* Register */}
        <Route
          path="/register"
          element={
            token ? <Navigate to="/dashboard" /> : <Register />
          }
        />

        {/* Dashboard */}
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