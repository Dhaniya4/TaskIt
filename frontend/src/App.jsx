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

        <Route
          path="/"
          element={
            token ? <Navigate to="/dashboard" /> : <Home />
          }
        />

        <Route
          path="/dashboard"
          element={
            token ? <Dashboard /> : <Navigate to="/login" />
          }
        />

        <Route
          path="/login"
          element={
            !token ? <Login /> : <Navigate to="/dashboard" />
          }
        />

        <Route
          path="/register"
          element={
            !token ? <Register /> : <Navigate to="/dashboard" />
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;