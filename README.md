# ShopEZ - E-Commerce Application

A full-stack MERN (MongoDB, Express, React, Node.js) e-commerce web application.

## 🚀 How to Run This Project

### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [Git](https://git-scm.com/)

### Step 1: Clone the Repository
```bash
git clone https://github.com/ASK43445/E-commerce.git
cd E-commerce
```

### Step 2: Setup the Backend (Server)
```bash
cd server
npm install
```

Copy the environment file:
```bash
copy .env.example .env
```

Start the backend server:
```bash
node index.js
```

You should see:
```
MongoDB Connected: ...
Server running on port 8000
```

### Step 3: Setup the Frontend (Client)
Open a **new terminal**, then:
```bash
cd client
npm install
npm run dev
```

### Step 4: Open the App
Visit **http://localhost:5173** in your browser.

---

## 📁 Project Structure
```
E-commerce/
├── client/          # React frontend (Vite)
│   └── src/
│       ├── pages/   # Home, Products, ProductDetail, etc.
│       └── components/
└── server/          # Node.js + Express backend
    ├── models/      # MongoDB schemas
    ├── routes/      # API routes
    ├── controllers/ # Business logic
    └── index.js     # Entry point
```

## 🛠️ Tech Stack
- **Frontend:** React, React Router, Axios, Vite
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas
- **Authentication:** JWT (JSON Web Tokens)
