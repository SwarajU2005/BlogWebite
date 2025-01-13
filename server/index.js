import express from 'express';
import Connection from './database/db.js';
import dotenv from 'dotenv'
import router from './routes/route.js';

dotenv.config();

const app = express();

app.use('/',router)

const PORT = 8000;

app.listen(PORT, ()=> console.log(`server is successfully running on port ${PORT}`));

const USERNAME = process.env.VITE_DB_USERNAME;
const PASSWORD= process.env.VITE_DB_PASSWORD ;

Connection(USERNAME,PASSWORD);