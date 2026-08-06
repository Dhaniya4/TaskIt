# 🚀 TaskIt - Task Management Web Application

TaskIt is a full-stack task management web application designed to help users organize, track, and manage their daily tasks efficiently. It provides a clean, responsive interface with secure authentication and personalized task management.

## 🌐 Links

🔗 Live Demo: https://taskitweb.onrender.com/

💻 GitHub Repository: https://github.com/Dhaniya4/TaskIt

## 📌 Features

* 🔐 Secure user authentication using JWT
* 👤 Personalized task management for each user
* ➕ Create, update, and delete tasks
* 📋 Track tasks using status and priority
* 🎨 Light/Dark theme support
* 📅 Due date management
* 📱 Fully responsive design for desktop, tablet, and mobile devices
* 🧩 Bootstrap-based card UI for an adaptive and clean layout
* 🔒 Password encryption using bcrypt

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* Bootstrap
* React-Bootstrap
* JavaScript

### Backend

* Node.js
* Express.js
* REST API

### Database

* MongoDB
* Mongoose

### Authentication

* JSON Web Token (JWT)
* bcrypt.js

### Deployment

* Render ( frontend + backend )

## 📂 Project Structure

```
TaskIt/
│
├── frontend/        # React + Vite frontend
│
├── backend/         # Express.js backend
│
├── screenshots/     # Application screenshots
│
├── LICENSE
│
└── README.md
```

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/Dhaniya4/TaskIt.git
```

### 2. Install dependencies

For frontend:

```bash
cd frontend
npm install
```

For backend:

```bash
cd backend
npm install
```

### 3. Environment Variables

Create a `.env` file in the backend folder and add:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Create a `.env` file in the frontend folder:

```
VITE_BACKEND_URL=your_backend_url
```

### 4. Run the application

Start backend:

```bash
npm run dev
```

Start frontend:

```bash
npm run dev
```


## 🎯 Learning Outcomes

Building TaskIt helped me improve my skills in:

* Full-stack web application development
* Designing and consuming REST APIs
* Database modeling with MongoDB and Mongoose
* Authentication and authorization workflows
* React component design and state handling
* Deploying applications using cloud platforms

## 👩‍💻 Author

**Dhaniya Sri**

GitHub: https://github.com/Dhaniya4

---

⭐ If you find this project useful, consider giving it a star!

## 📄 License

This project is licensed under the MIT License.
