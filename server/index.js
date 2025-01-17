import express from 'express';
import Connection from './database/db.js';
import dotenv from 'dotenv';
import router from './routes/route.js';
import cors from 'cors';

dotenv.config();

const app = express();

// Middleware
app.use(express.json()); // Parse incoming JSON request bodies
app.use(cors());         // Enable CORS

// Routes
app.use('/', router);

const PORT = 8000;

// Start the server
app.listen(PORT, () => console.log(`Server is successfully running on port ${PORT}`));

// Database connection
const USERNAME = process.env.VITE_DB_USERNAME;
const PASSWORD = process.env.VITE_DB_PASSWORD;

Connection(USERNAME, PASSWORD);
