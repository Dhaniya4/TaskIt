import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import "./login.css";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
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

  if (formData.password !== formData.confirmPassword) {
    setMessage("Passwords do not match");
    return;
  }

  setLoading(true);

  try {
    const response = await api.post("/api/auth/register", {
      username: formData.username,
      email: formData.email,
      password: formData.password,
    });

    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));

    navigate("/dashboard");

  } catch (error) {
    setMessage(
      error.response?.data?.message ||
      "Unable to create your account. Please try again."
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
                      <span className="auth-badge">
                        YOUR CALM PRODUCTIVITY SPACE
                      </span>

                      <h1 className="auth-hero-title">
                        Start small.
                        <br />
                        Stay consistent.
                      </h1>

                      <p className="auth-hero-text">
                        Create a space for your tasks, priorities and progress
                        without turning productivity into pressure.
                      </p>
                    </div>

                    <div className="auth-preview-card">
                      <div className="d-flex align-items-center justify-content-between mb-3">
                        <div>
                          <p className="auth-preview-label mb-1">THIS WEEK</p>
                          <h5 className="mb-0">Your journey begins</h5>
                        </div>

                        <div className="auth-progress-circle">0%</div>
                      </div>

                      <div className="auth-mini-task">
                        <span className="auth-task-dot"></span>
                        Set your priorities
                      </div>

                      <div className="auth-mini-task">
                        <span className="auth-task-dot"></span>
                        Build healthy habits
                      </div>

                      <div className="auth-mini-task">
                        <span className="auth-task-dot"></span>
                        Celebrate small victories
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
                      <p className="auth-eyebrow">GET STARTED</p>
                      <h2 className="auth-form-title">
                        Create your account
                      </h2>
                      <p className="auth-form-subtitle">
                        Set up your productivity space in a minute.
                      </p>
                    </div>

                    {message && (
                      <div className="alert alert-danger rounded-3" role="alert">
                        {message}
                      </div>
                    )}

                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label
                          htmlFor="username"
                          className="form-label auth-label"
                        >
                          Username
                        </label>

                        <input
                          type="text"
                          id="username"
                          name="username"
                          className="form-control auth-input"
                          value={formData.username}
                          onChange={handleChange}
                          placeholder="Enter your name"
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <label
                          htmlFor="email"
                          className="form-label auth-label"
                        >
                          Email address
                        </label>

                        <input
                          type="email"
                          id="email"
                          name="email"
                          className="form-control auth-input"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="you@example.com"
                          required
                        />
                      </div>

                      <div className="row g-3">
                        <div className="col-md-6">
                          <label
                            htmlFor="password"
                            className="form-label auth-label"
                          >
                            Password
                          </label>

                          <input
                            type="password"
                            id="password"
                            name="password"
                            className="form-control auth-input"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Create password"
                            required
                          />
                        </div>

                        <div className="col-md-6">
                          <label
                            htmlFor="confirmPassword"
                            className="form-label auth-label"
                          >
                            Confirm password
                          </label>

                          <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            className="form-control auth-input"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Repeat password"
                            required
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="btn auth-submit-button w-100 mt-4"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <span
                              className="spinner-border spinner-border-sm me-2"
                              aria-hidden="true"
                            ></span>
                            Creating account...
                          </>
                        ) : (
                          "Create account"
                        )}
                      </button>
                    </form>

                    <div className="auth-divider">
                      <span>Already have an account?</span>
                    </div>

                    <Link
                      to="/login"
                      className="btn auth-secondary-button w-100"
                    >
                      Sign in instead
                    </Link>

                    <p className="auth-footer-note">
                      Your tasks stay connected to your personal account.
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

export default Register;