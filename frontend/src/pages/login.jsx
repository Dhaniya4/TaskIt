import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import "./login.css";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const response = await api.post("/api/auth/login", formData);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      navigate("/dashboard");
      window.location.reload();
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Unable to login. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <div className="auth-background-shape auth-shape-one"></div>
      <div className="auth-background-shape auth-shape-two"></div>

      <section className="container position-relative">
        <div className="row min-vh-100 align-items-center justify-content-center py-5">
          <div className="col-12 col-lg-10">
            <div className="auth-shell">
              <div className="row g-0">
                <div className="col-lg-6 d-none d-lg-flex">
                  <div className="auth-hero">
                    <div>
                      <span className="auth-badge">PRODUCTIVITY, SIMPLIFIED</span>

                      <h1 className="auth-hero-title">
                        Plan calmly.
                        <br />
                        Finish beautifully.
                      </h1>

                      <p className="auth-hero-text">
                        Organise your tasks, track your progress and stay focused
                        without making productivity feel stressful.
                      </p>
                    </div>
                    <div className="auth-preview-card">
                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <div>
                          <p className="auth-preview-label mb-1">TODAY</p>
                          <h5 className="mb-0">A slower, better day</h5>
                        </div>

                        <div className="auth-progress-circle">72%</div>
                      </div>

                      <div className="auth-mini-task completed-task">
                        <span className="auth-task-dot"></span>
                        Water the plants
                      </div>

                      <div className="auth-mini-task">
                        <span className="auth-task-dot"></span>
                        Buy fresh flowers
                      </div>

                      <div className="auth-mini-task">
                        <span className="auth-task-dot"></span>
                        Watch the sunset
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="auth-form-section">
                    <div className="auth-mobile-brand d-lg-none">
                      <span className="brand-mark">T</span>
                      <span>TaskIt</span>
                    </div>

                    <div className="mb-4">
                      <p className="auth-eyebrow">WELCOME BACK</p>
                      <h2 className="auth-form-title">Sign in to your space</h2>
                      <p className="auth-form-subtitle">
                        Continue where you left off.
                      </p>
                    </div>

                    {message && (
                      <div className="alert alert-danger rounded-3" role="alert">
                        {message}
                      </div>
                    )}

                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label htmlFor="username" className="form-label auth-label">
                          Username
                        </label>

                        <input
                          type="text"
                          id="username"
                          name="username"
                          className="form-control auth-input"
                          value={formData.username}
                          onChange={handleChange}
                          placeholder="Enter your username"
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <div className="d-flex justify-content-between align-items-center">
                          <label
                            htmlFor="password"
                            className="form-label auth-label"
                          >
                            Password
                          </label>
                        </div>

                        <input
                          type="password"
                          id="password"
                          name="password"
                          className="form-control auth-input"
                          value={formData.password}
                          onChange={handleChange}
                          placeholder="Enter your password"
                          required
                        />
                      </div>

                      <div className="form-check mb-4">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="rememberMe"
                        />

                        <label
                          className="form-check-label auth-check-label"
                          htmlFor="rememberMe"
                        >
                          Keep me signed in
                        </label>
                      </div>

                      <button
                        type="submit"
                        className="btn auth-submit-button w-100"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <span
                              className="spinner-border spinner-border-sm me-2"
                              aria-hidden="true"
                            ></span>
                            Signing in...
                          </>
                        ) : (
                          "Sign in"
                        )}
                      </button>
                    </form>

                    <div className="auth-divider">
                      <span>New here?</span>
                    </div>

                    <Link
                      to="/register"
                      className="btn auth-secondary-button w-100"
                    >
                      Create an account
                    </Link>

                    <p className="auth-footer-note">
                      A calm space for all the things you need to get done.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Login;