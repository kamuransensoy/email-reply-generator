# AI-Powered Email Assistant – Gmail Extension

This is a full-stack AI-powered email assistant built as a **Chrome Extension** to generate intelligent email replies and summarize Gmail threads using natural language processing.  
It was developed as a learning project to explore **Spring Boot** and gain real-world **full-stack development experience**.

---

## Project Purpose

The primary goal of this project was to:
- Learn how **Spring Boot** works for building scalable and RESTful backend services.
- Understand how to connect a **React frontend** to a **Java backend** via APIs.
- Gain hands-on experience with **Chrome Extension** development.
- Work on a real-world project involving **AI**.

---

## Features

**Gmail Integration** via Chrome Extension  
**AI Reply Generation** with different tones (Professional, Friendly, Polite, etc.)  
**Thread Summarization** – summarizes long Gmail threads in one click  
**Tone Selector** – easily change the tone of your AI reply  
**"Generate Another Reply"** button for alternate suggestions  
Fully working frontend built with **React + Material UI**  
Backend powered by **Spring Boot** and **OpenAI API**

---

## Tech Stack

### Backend
- **Java + Spring Boot**
- **Maven**
- **Spring Web (REST APIs)**
- **CORS Configuration**
- **OpenAI API** for NLP generation & summarization

### Frontend
- **React**
- **Vite**
- **Material UI (MUI)**
- **Axios** for API calls

### Chrome Extension
- **Manifest V3**
- **Content Scripts** for DOM injection
- **Fetch API** to connect to local backend
- **Gmail UI detection and enhancement**

---

## How to Run Locally

### Backend (Spring Boot)
1. Clone the repo
2. Navigate to `/email-writer-backend`
3. Add your OpenAI API key to `application.properties`
4. Run:
   ```bash
   mvn spring-boot:run
   ```

### Frontend (React)
1. Navigate to `/email-writer-react`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```

### Chrome Extension
1. Navigate to `email-writer-extension/`
2. Load the extension in Chrome:
   - Go to `chrome://extensions`
   - Enable "Developer Mode"
   - Click "Load unpacked"
   - Select the extension folder

---

## What I Learned

- Building RESTful APIs using **Spring Boot**
- Handling **CORS** and API communication with React
- Writing a **custom Chrome extension** to interact with Gmail
- Creating dynamic, AI-assisted features using **OpenAI APIs**
- Designing responsive and modern UIs with **Material UI**
- Managing async flows between frontend, backend, and Gmail content scripts

---

## 📄 License

This project is for learning and portfolio purposes. Feel free to fork and explore!

---
