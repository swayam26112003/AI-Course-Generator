🎓 AI Course Generator

An AI-powered full-stack web application that generates structured learning courses with chapters, descriptions, and optional videos using Google Gemini AI.

🚀 Live Demo

Frontend (Vercel): https://ai-course-generator-flame.vercel.app

Backend (Render): https://ai-course-generator-m9bh.onrender.com

🛠 Tech Stack
Frontend

React (Vite)

Tailwind CSS

Shadcn UI

React Router

Deployed on Vercel

Backend

Node.js

Express.js

MongoDB Atlas

Google Gemini AI

Deployed on Render

📁 Project Structure
AI-Course-Generator/
│
├── backend/
│   ├── Controllers/
│   ├── Models/
│   ├── Routes/
│   ├── Middlewares/
│   ├── index.js
│   ├── package.json
│   └── .env (ignored)
│
├── frontend/
│   ├── src/
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── .env (ignored)
│
└── README.md

🔐 Environment Variables
Backend (Render)

Set these in Render → Environment Variables:

PORT=8080
MONGO_URI=your_mongodb_atlas_connection_string
NODE_GEMINI_API_KEY=your_gemini_api_key
NODE_GEMINI_API_KEY_2=your_secondary_gemini_key


⚠️ .env is gitignored and should never be committed.

Frontend (Vercel)

Set this in Vercel → Project → Environment Variables:

VITE_API_BASE_URL=https://ai-course-generator-m9bh.onrender.com


Frontend API calls use:

import.meta.env.VITE_API_BASE_URL

🚀 Deployment Guide
Backend Deployment (Render)

Create a Web Service on Render

Connect GitHub repository

Configuration:

Root Directory: backend

Build Command:

npm install


Start Command:

npm start


Add environment variables

Deploy 🎉

Frontend Deployment (Vercel)

Import GitHub repository into Vercel

Configuration:

Framework: Vite

Root Directory: frontend

Build Command:

npm run build


Output Directory:

dist


Add VITE_API_BASE_URL env variable

Deploy 🚀

✨ Features

🔐 Authentication (Signup / Login)

🧠 AI-generated course structure

📚 Chapter-wise content generation

🎥 Optional video integration

🗂 Course saving & editing

☁️ Fully cloud deployed

⚠️ Notes

Gemini API has rate limits — some requests may fail temporarily.

Backend includes retry logic to handle AI failures.

MongoDB Atlas IP access is configured for cloud access.
