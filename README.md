# SleekBoard

## Overview
This project consists of a **Node.js backend** and a **React frontend**, both located in their respective subdirectories.

## Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (22.21.0 version only)
- [npm](https://www.npmjs.com/) (10.9.4 version only)

## Project Structure
```
project-root/
│-- backend/   # Node.js backend
│-- frontend/  # React frontend
│-- README.md  # This file
```

---

## Backend Setup

### Navigate to the backend directory
```sh
cd backend
```

### Install dependencies
```sh
npm install
```

### Configure Environment Variables
Create a `.env` file in the `backend/` directory and add necessary environment variables.
```
PORT=5050
MONGO_URI=mongodb+srv://sleekBoard_View:Pz9KYNKRUaBEw0Cs@cluster0.egyquin.mongodb.net/?appName=Cluster0
```

### Run the backend server
```sh
npm run start
```

### Running in Development Mode
```sh
npm run dev
```

By default, the backend runs on `http://localhost:5000/` (or the port specified in `.env`).

---

## Frontend Setup

### Navigate to the frontend directory
```sh
cd ../frontend
```

### Install dependencies
```sh
npm install
```

### Build the frontend server
```sh
npm run build
```

### Configure Environment Variables
Create a `.env` file in the `backend/` directory and add necessary environment variables.
```
VITE_BACKEND_URL = http://localhost:5050
```

### Run the frontend server in Development mode
```sh
npm run dev
```

By default, the frontend runs on `http://localhost:3000/`.

---


## Additional Notes
- Ensure the backend is running before accessing the frontend.
- Update `.env` files with appropriate values for production environments.
---
