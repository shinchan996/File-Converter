# Online File Compressor and Converter

This is a full-stack web application that allows users to upload files, compress them using Run-Length Encoding, and encrypt them with a password. It features a React frontend, a Node.js backend, and a C++ core for file processing.

## Project Structure

```
.
├── backend
│   ├── cpp_backend     # C++ executable
│   ├── db
│   │   └── users.json  # File-based database for users
│   ├── index.js        # Node.js server
│   ├── package.json
│   ├── processed       # Directory for processed files
│   └── uploads         # Directory for uploaded files
├── cpp
│   └── main.cpp        # C++ source code
├── frontend
│   ├── public
│   ├── src
│   │   ├── components  # React components
│   │   ├── pages       # Page components
│   │   └── services    # API services and AuthContext
│   └── package.json
└── README.md
```

## Tech Stack

*   **Frontend:** React, React Router, Bootstrap, Axios
*   **Backend:** Node.js, Express.js
*   **C++ Core:** Standard C++ for file operations
*   **Database:** JSON file (for simplicity)

## Features

*   **File Compression:** Run-Length Encoding for lossless compression.
*   **File Encryption:** Simple XOR-based encryption with a user-provided password.
*   **User Authentication:** Signup and login functionality.
*   **Tiered System:** Free and Premium user tiers with different file size limits.
*   **Ad Integration:** Mock Google AdSense ads for free users.
*   **Payment Gateway:** Mock Razorpay integration for upgrading to a premium plan.

## Backend API Design

The backend is a Node.js server using Express.js. It exposes a REST API to communicate with the frontend.

### API Endpoints

*   `POST /api/auth/signup`: Create a new user account.
    *   **Request Body:** `{ "name": "Test User", "email": "test@example.com", "password": "password123" }`
    *   **Response:** `{ "message": "User created successfully" }`
*   `POST /api/auth/login`: Log in a user.
    *   **Request Body:** `{ "email": "test@example.com", "password": "password123" }`
    *   **Response:** `{ "message": "Logged in successfully", "user": { ... } }`
*   `POST /api/user/premium`: Upgrade a user to premium.
    *   **Request Body:** `{ "email": "test@example.com" }`
    *   **Response:** `{ "message": "User upgraded to premium", "user": { ... } }`
*   `POST /api/upload`: Upload a file for processing.
    *   **Request Body:** `multipart/form-data` with fields `file`, `operation`, and `password` (optional).
    *   **Response:** `{ "message": "File processed successfully", "downloadPath": "..." }`
*   `GET /api/download?path=<file_path>`: Download a processed file.

### C++ Backend Integration

The Node.js backend uses the `child_process` module to execute the compiled C++ program (`cpp_backend`). The C++ program handles the core file processing tasks (compression, encryption, etc.).

**Command-line arguments for the C++ program:**

`./cpp_backend <operation> <input_file> <output_file> [password]`

*   `<operation>`: `compress`, `decompress`, `encrypt`, or `decrypt`
*   `<input_file>`: Path to the input file.
*   `<output_file>`: Path to the output file.
*   `[password]`: Optional password for encryption/decryption.

## Payment & Ads Flow

*   **Razorpay:** The pricing page includes a "Get started" button for the premium plan. When clicked, it simulates a Razorpay payment. On "successful payment," the frontend calls the `/api/user/premium` endpoint to upgrade the user's account.
*   **Google AdSense:** Placeholder ad components are displayed on the `UploadPage` and `DashboardPage` for users who are not premium.

## How to Run the Project

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/shinchan996/File-Converter
    cd file-compressor
    ```

2.  **Install backend dependencies:**
    ```bash
    cd backend
    npm install
    cd ..
    ```

3.  **Install frontend dependencies:**
    ```bash
    cd frontend
    npm install
    cd ..
    ```

4.  **Compile the C++ code:**
    You need a C++ compiler like `g++`.
    ```bash
    g++ cpp/main.cpp -o backend/cpp_backend
    ```

5.  **Start the backend server:**
    ```bash
    cd backend
    node index.js
    ```
    The backend will be running at `http://localhost:3001`.

6.  **Start the frontend development server:**
    In a new terminal:
    ```bash
    cd frontend
    npm start
    ```
    The frontend will be running at `http://localhost:3000`.

## Deployment Suggestions

*   **Backend:** The Node.js backend can be deployed to platforms like Heroku, AWS Elastic Beanstalk, or a virtual private server (VPS).
*   **Frontend:** The React frontend can be built into static files (`npm run build`) and served by a static file server like Nginx, or hosted on platforms like Netlify or Vercel.
*   **C++ Backend:** When deploying, ensure the C++ code is compiled on the target server environment, or use a Docker container to package the entire application (Node.js backend + C++ executable).
*   ---

## 👤 Author

- **Name:** shinachn996  
- **Email:** dekusunita996@gmail.com  
- **GitHub:** https://github.com/shinchan996  
- **Project:** Online File Compressor and Converter  
- **Year:** 2026

