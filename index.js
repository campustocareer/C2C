import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// ✅ Enable CORS for frontend requests
app.use(cors({
  origin: ['http://localhost:3000', 'https://colleges2career.com'], // Allow these origins
  methods: ['GET', 'POST', 'OPTIONS'], // Allow necessary methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allow necessary headers
  credentials: true, // Allow cookies if needed
}));

// ✅ Handle Preflight Requests (Important for CORS!)
app.options('*', cors());

// ✅ Serve static frontend build
app.use(express.static(path.join(__dirname, 'frontend/dist')));

// ✅ Redirect all unknown routes to `index.html`
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/dist', 'index.html'));
});

// ✅ Sample API Route
app.post('/upload', (req, res) => {
  res.json({ message: 'Upload successful' });
});

// ✅ Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
