import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import api from "../services/api";
import "./dashboard.css";


function Dashboard() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [editingTodo, setEditingTodo] = useState(null);
  const [savingEdit, setSavingEdit] = useState(false);

  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "dark"
  );

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    dueDate: "",
  });

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const authConfig = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.replace("/");
  };

  const handleUnauthorized = (error) => {
    if (error.response?.status === 401) {
      logout();
      return true;
    }

    return false;
  };

  const fetchTodos = async () => {
    try {
      setLoading(true);
      setMessage("");

      const response = await api.get("/api/todos", authConfig);
      setTodos(response.data);
    } catch (error) {
      if (handleUnauthorized(error)) {
        return;
      }

      setMessage(
        error.response?.data?.message || "Could not load your tasks."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const createTodo = async (event) => {
    event.preventDefault();

    if (!formData.title.trim()) {
      setMessage("Please enter a task title.");
      return;
    }

    try {
      setMessage("");

      const response = await api.post(
        "/api/todos",
        {
          ...formData,
          title: formData.title.trim(),
          description: formData.description.trim(),
          dueDate: formData.dueDate || undefined,
        },
        authConfig
      );

      setTodos((currentTodos) => [
        response.data,
        ...currentTodos,
      ]);

      setFormData({
        title: "",
        description: "",
        priority: "medium",
        dueDate: "",
      });
    } catch (error) {
      if (handleUnauthorized(error)) {
        return;
      }

      setMessage(
        error.response?.data?.message || "Could not create the task."
      );
    }
  };

  const updateTodoStatus = async (todoId, status) => {
    try {
      setMessage("");

      const response = await api.put(
        `/api/todos/${todoId}`,
        { status },
        authConfig
      );

      setTodos((currentTodos) =>
        currentTodos.map((todo) =>
          todo._id === todoId ? response.data : todo
        )
      );
    } catch (error) {
      if (handleUnauthorized(error)) {
        return;
      }

      setMessage(
        error.response?.data?.message || "Could not update the task."
      );
    }
  };

  const deleteTodo = async (todoId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setMessage("");

      await api.delete(`/api/todos/${todoId}`, authConfig);

      setTodos((currentTodos) =>
        currentTodos.filter((todo) => todo._id !== todoId)
      );
    } catch (error) {
      if (handleUnauthorized(error)) {
        return;
      }

      setMessage(
        error.response?.data?.message || "Could not delete the task."
      );
    }
  };

  const openEditModal = (todo) => {
    setEditingTodo({
      _id: todo._id,
      title: todo.title,
      description: todo.description || "",
      priority: todo.priority,
      status: todo.status,
      dueDate: todo.dueDate
        ? new Date(todo.dueDate).toISOString().split("T")[0]
        : "",
    });

    setMessage("");
  };

  const closeEditModal = () => {
    if (!savingEdit) {
      setEditingTodo(null);
    }
  };

  const handleEditChange = (event) => {
    const { name, value } = event.target;

    setEditingTodo((currentTodo) => ({
      ...currentTodo,
      [name]: value,
    }));
  };

  const saveEditedTodo = async (event) => {
    event.preventDefault();

    if (!editingTodo.title.trim()) {
      setMessage("Task title cannot be empty.");
      return;
    }

    try {
      setSavingEdit(true);
      setMessage("");

      const response = await api.put(
        `/api/todos/${editingTodo._id}`,
        {
          title: editingTodo.title.trim(),
          description: editingTodo.description.trim(),
          priority: editingTodo.priority,
          status: editingTodo.status,
          dueDate: editingTodo.dueDate || undefined,
        },
        authConfig
      );

      setTodos((currentTodos) =>
        currentTodos.map((todo) =>
          todo._id === editingTodo._id ? response.data : todo
        )
      );

      setEditingTodo(null);
    } catch (error) {
      if (handleUnauthorized(error)) {
        return;
      }

      setMessage(
        error.response?.data?.message || "Could not save the task."
      );
    } finally {
      setSavingEdit(false);
    }
  };

  const filteredTodos = useMemo(() => {
    if (filter === "all") {
      return todos;
    }

    return todos.filter((todo) => todo.status === filter);
  }, [todos, filter]);

  const completedCount = todos.filter(
    (todo) => todo.status === "completed"
  ).length;

  const progressCount = todos.filter(
    (todo) => todo.status === "in-progress"
  ).length;

  return (
    <main className="dashboard-page">
      <nav className="dashboard-nav">
        <div className="container dashboard-nav-inner">
          <div className="dashboard-brand">
            <img
              src="/taskit-logo.png"
              alt="TaskIt Logo"
              className="dashboard-logo-image"
            />
            <span>TaskIt</span>
          </div>
          <div className="dashboard-nav-actions">
            <button
              type="button"
              className="theme-button"
              onClick={() =>
                setTheme((currentTheme) =>
                  currentTheme === "dark" ? "light" : "dark"
                )
              }
              aria-label="Change theme"
            >
              {theme === "dark" ? "☀️" : "🌙"}
            </button>

            <button
              type="button"
              className="logout-button"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <section className="container dashboard-content">
        <header className="dashboard-header">
          <div>
            <p className="dashboard-eyebrow">
              YOUR PRODUCTIVITY SPACE
            </p>

            <h1>Hello, {user.username || "there"}.</h1>

            <p>
              Keep things simple, focus on one task at a time.
            </p>
          </div>

          <div className="dashboard-date">
            {new Date().toLocaleDateString("en-IN", {
              weekday: "long",
              day: "numeric",
              month: "long",
            })}
          </div>
        </header>

        <section className="stats-grid">
          <article className="stat-card">
            <span className="stat-label">Total tasks</span>
            <strong>{todos.length}</strong>
            <span className="stat-description">
              Everything on your list
            </span>
          </article>

          <article className="stat-card">
            <span className="stat-label">In progress</span>
            <strong>{progressCount}</strong>
            <span className="stat-description">
              Tasks you are working on
            </span>
          </article>

          <article className="stat-card">
            <span className="stat-label">Completed</span>
            <strong>{completedCount}</strong>
            <span className="stat-description">
              Small wins add up
            </span>
          </article>
        </section>

        <section className="spotify-card">
          <div className="section-heading">
            <p>FOCUS MODE</p>
            <h2>Music for your productivity</h2>
            <span>
              Open Spotify and create your perfect workspace.
            </span>
          </div>

          <a
            href="https://open.spotify.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="spotify-button"
          >
            🎵 Continue to Spotify
          </a>
        </section>

        <section className="dashboard-grid">
          <aside className="task-form-card">
            <div className="section-heading">
              <p>NEW TASK</p>
              <h2>Add something to your list</h2>
            </div>

            <form onSubmit={createTodo}>
              <div className="mb-3">
                <label
                  htmlFor="title"
                  className="dashboard-label"
                >
                  Task title
                </label>

                <input
                  id="title"
                  name="title"
                  type="text"
                  className="form-control dashboard-input"
                  placeholder="What needs to be done?"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label
                  htmlFor="description"
                  className="dashboard-label"
                >
                  Description
                </label>

                <textarea
                  id="description"
                  name="description"
                  className="form-control dashboard-input dashboard-textarea"
                  placeholder="Add a few details..."
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>

              <div className="row g-3 mb-4">
                <div className="col-sm-6">
                  <label
                    htmlFor="priority"
                    className="dashboard-label"
                  >
                    Priority
                  </label>

                  <select
                    id="priority"
                    name="priority"
                    className="form-select dashboard-input"
                    value={formData.priority}
                    onChange={handleChange}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div className="col-sm-6">
                  <label
                    htmlFor="dueDate"
                    className="dashboard-label"
                  >
                    Due date
                  </label>

                  <input
                    id="dueDate"
                    name="dueDate"
                    type="date"
                    className="form-control dashboard-input"
                    value={formData.dueDate}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="add-task-button"
              >
                Add task
              </button>
            </form>
          </aside>

          <section className="tasks-section">
            <div className="tasks-topbar">
              <div className="section-heading">
                <p>MY TASKS</p>
                <h2>Today’s focus</h2>
              </div>

              <div className="task-filters">
                {[
                  "all",
                  "pending",
                  "in-progress",
                  "completed",
                ].map((status) => (
                  <button
                    type="button"
                    key={status}
                    className={
                      filter === status
                        ? "filter-button active"
                        : "filter-button"
                    }
                    onClick={() => setFilter(status)}
                  >
                    {status === "in-progress"
                      ? "In progress"
                      : status.charAt(0).toUpperCase() +
                      status.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {message && (
              <div className="alert alert-danger">
                {message}
              </div>
            )}

            {loading ? (
              <div className="dashboard-state">
                <div
                  className="spinner-border"
                  role="status"
                ></div>
                <p>Loading your tasks...</p>
              </div>
            ) : filteredTodos.length === 0 ? (
              <div className="dashboard-state empty-state">
                <span>✓</span>
                <h3>No tasks here</h3>

                <p>
                  {filter === "all"
                    ? "Create your first task to get started."
                    : `You have no ${filter.replace(
                      "-",
                      " "
                    )} tasks.`}
                </p>
              </div>
            ) : (
              <div className="todo-list">
                {filteredTodos.map((todo) => (
                  <motion.article
                    className={`todo-card todo-${todo.priority}`}
                    key={todo._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="todo-main">
                      <div className="todo-heading">
                        <div>
                          <span
                            className={`priority-badge priority-${todo.priority}`}
                          >
                            {todo.priority}
                          </span>

                          <h3
                            className={
                              todo.status === "completed"
                                ? "completed-title"
                                : ""
                            }
                          >
                            {todo.title}
                          </h3>
                        </div>

                        <div className="todo-actions">
                          <button
                            type="button"
                            className="edit-task-button"
                            onClick={() => openEditModal(todo)}
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            className="delete-task-button"
                            onClick={() => deleteTodo(todo._id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>

                      {todo.description && (
                        <p className="todo-description">
                          {todo.description}
                        </p>
                      )}

                      <div className="todo-footer">
                        <select
                          className={`status-select status-${todo.status}`}
                          value={todo.status}
                          onChange={(event) =>
                            updateTodoStatus(
                              todo._id,
                              event.target.value
                            )
                          }
                        >
                          <option value="pending">
                            Pending
                          </option>

                          <option value="in-progress">
                            In progress
                          </option>

                          <option value="completed">
                            Completed
                          </option>
                        </select>

                        {todo.dueDate && (
                          <span className="todo-date">
                            Due{" "}
                            {new Date(
                              todo.dueDate
                            ).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                            })}
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            )}
          </section>
        </section>
      </section>

      {editingTodo && (
        <div
          className="edit-modal-backdrop"
          onMouseDown={closeEditModal}
        >
          <section
            className="edit-modal-card"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="edit-modal-header">
              <div>
                <p className="dashboard-eyebrow">EDIT TASK</p>
                <h2>Update your task</h2>
              </div>

              <button
                type="button"
                className="edit-modal-close"
                onClick={closeEditModal}
                disabled={savingEdit}
                aria-label="Close edit form"
              >
                ×
              </button>
            </div>

            <form onSubmit={saveEditedTodo}>
              <div className="mb-3">
                <label
                  htmlFor="editTitle"
                  className="dashboard-label"
                >
                  Task title
                </label>

                <input
                  id="editTitle"
                  name="title"
                  type="text"
                  className="form-control dashboard-input"
                  value={editingTodo.title}
                  onChange={handleEditChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label
                  htmlFor="editDescription"
                  className="dashboard-label"
                >
                  Description
                </label>

                <textarea
                  id="editDescription"
                  name="description"
                  className="form-control dashboard-input dashboard-textarea"
                  value={editingTodo.description}
                  onChange={handleEditChange}
                />
              </div>

              <div className="row g-3 mb-3">
                <div className="col-sm-6">
                  <label
                    htmlFor="editPriority"
                    className="dashboard-label"
                  >
                    Priority
                  </label>

                  <select
                    id="editPriority"
                    name="priority"
                    className="form-select dashboard-input"
                    value={editingTodo.priority}
                    onChange={handleEditChange}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div className="col-sm-6">
                  <label
                    htmlFor="editStatus"
                    className="dashboard-label"
                  >
                    Status
                  </label>

                  <select
                    id="editStatus"
                    name="status"
                    className="form-select dashboard-input"
                    value={editingTodo.status}
                    onChange={handleEditChange}
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">
                      In progress
                    </option>
                    <option value="completed">
                      Completed
                    </option>
                  </select>
                </div>
              </div>

              <div className="mb-4">
                <label
                  htmlFor="editDueDate"
                  className="dashboard-label"
                >
                  Due date
                </label>

                <input
                  id="editDueDate"
                  name="dueDate"
                  type="date"
                  className="form-control dashboard-input"
                  value={editingTodo.dueDate}
                  onChange={handleEditChange}
                />
              </div>

              <div className="edit-modal-actions">
                <button
                  type="button"
                  className="edit-cancel-button"
                  onClick={closeEditModal}
                  disabled={savingEdit}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="edit-save-button"
                  disabled={savingEdit}
                >
                  {savingEdit ? "Saving..." : "Save changes"}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </main>
  );
}

export default Dashboard;