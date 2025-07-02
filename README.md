# 📚 PTUK Educational Platform - Backend

This repository contains the **backend** code for the PTUK Educational Platform graduation project, developed by Computer Systems Engineering students at Palestine Technical University – Kadoorie.

---

## 🚀 Project Description

The backend is a RESTful API built with **Node.js** and **Express.js**, responsible for powering a web-based academic platform. It handles:

- User authentication (students, admins, super admin)
- File upload & download (summaries, books, slides, etc.)
- Course and department management
- AI chatbot integration (Arabic/English)
- Notes, favorites, archive, and admin approvals

---

## 🧰 Technologies Used

- **Node.js** – JavaScript runtime
- **Express.js** – Web framework
- **MySQL** – Relational database
- **Axios** – HTTP client (internal & AI integration)
- **CORS** – Cross-Origin Resource Sharing
- **Pug** – View engine for error display
- **JWT** – Authentication (assumed)
- **Python** – AI assistant using MiniLM + LLaMA via Groq API

---

## 🗂️ Project Structure
root/  
├── app.js                # Main application entry point  
├── .env                  # Environment variables  
├── routes/               # All route definitions  
│   ├── student.router.js  
│   ├── admin.router.js  
│   ├── auth.routes.js  
│   ├── upload.routes.js  
│   └── course.router.js  
├── modules/              # Feature modules  
│   ├── uploads/  
│   ├── departments/  
│   ├── chatboot/  
│   ├── assignments/  
│   └── favorites/  
└── public/               # Static assets  
└── uploads/          # User-uploaded files

---

## 🌐 Main API Routes

| Route Path           | Description                          |
|----------------------|--------------------------------------|
| `/students`          | Student management                   |
| `/admin`             | Admin management                     |
| `/auth`              | Login / Register                     |
| `/courses`           | Courses and filtering                |
| `/uploads`           | File upload/download logic           |
| `/departments`       | Department operations                |
| `/favorites`         | Add/remove favorite files            |
| `/notes`             | Save notes on PDFs                   |
| `/chatboot`          | AI chatbot Q&A (Arabic/English)      |
| `/archive`           | Archived files                       |
| `/assignments`       | Upload or review assignments         |
| `/download`          | Track file downloads                 |
| `/books`, `/slides`, `/summaries`, `/exams`, `/videos` | Filtered academic content |

> All static files served from `public/` and `/uploads`.

---

## 🧠 AI Chatbot Integration

The platform integrates an AI assistant through:

- **MiniLM**: Semantic search (embedding-based)
- **LLaMA (via Groq)**: Answer generation
- Dataset: 15K+ QA pairs (Arabic & English) across 5 subjects

Backend calls Python-based Flask API → Groq API → returns intelligent response.

---

## 👥 User Roles & Permissions

| Role          | Capabilities                                                                 |
|---------------|------------------------------------------------------------------------------|
| Guest         | Browse and download materials                                                |
| Student       | Upload files, save favorites, use chatbot, add notes                        |
| Admin         | All student features + approve uploads from own department                  |
| Super Admin   | Full system control (users, admins, departments, uploads, courses, archive) |

---

## 🔐 Security Features

- JWT token-based authentication
- File validation and approval system
- Access control per role (RBAC)
- Input sanitation and error handling

---

## ⚙️ How to Run (Development)

1. **Install dependencies**
   ```bash
   npm install
    ```
2.  **Create a .env file and configure:**


```
 PORT=yourPort
 DB_HOST=yourHost
 DB_USER=....
 DB_PASSWORD=yourpassword
 DB_NAME=...
 JWT_SECRET=your_jwt_secret
```

3. **Start the server:**
    ```bash
    npm start
    ```
--- 

 ## 🧪 Testing & Deployment

-  Localhost testing (Node.js + MySQL)
- Frontend consumes API using Axios
- Flask-based AI chatbot runs in parallel
--- 

## 📜 Contributors
- Ahmad Wadee Tomeh(FrontEnd)
- Yazan Mohammed Hussein (Backend & AI)
- Yaseen Saji Ashqar(Frontend & AI)
- Yousef Taiser Jaber(Frontend & Backend)

- Supervisor: Dr. Nagham Hamad
---
## 📝 License
This project is intended for academic use only and was developed as part of the 2025 graduation requirements at PTUK.

