import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function App() {

  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Home />}
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