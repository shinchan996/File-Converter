const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'processed')));

// Database (mock)
const users = require('./db/users.json');

// File storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// --- API Endpoints ---

// Auth
app.post('/api/auth/signup', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  if (users.find((u) => u.email === email)) {
    return res.status(400).json({ message: 'User already exists' });
  }
  const newUser = { id: users.length + 1, name, email, password, isPremium: false };
  users.push(newUser);
  fs.writeFileSync('./db/users.json', JSON.stringify(users, null, 2));
  res.status(201).json({ message: 'User created successfully' });
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  res.json({ user });
});

// User
app.post('/api/user/premium', (req, res) => {
    const { email } = req.body;
    const user = users.find((u) => u.email === email);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    user.isPremium = true;
    fs.writeFileSync('./db/users.json', JSON.stringify(users, null, 2));
    res.json({ user });
});

// File processing
app.post('/api/upload', upload.single('file'), (req, res) => {
  const { operation, password } = req.body;
  const { path: inputPath, originalname } = req.file;
  const outputPath = `processed/${Date.now()}-${operation}-${originalname}`;

  const command = `./cpp_backend/main ${operation} ${inputPath} ${outputPath} ${password || ''}`;
  
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return res.status(500).send('File processing failed');
    }
    res.json({ downloadPath: outputPath });
  });
});

app.get('/api/download', (req, res) => {
  const { path } = req.query;
  const absolutePath = `${__dirname}/${path}`;
  res.download(absolutePath);
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
