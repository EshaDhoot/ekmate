import express from 'express';
import { PORT } from './config/server-config.js'
import { connectToDB } from './config/db-config.js';
// import { unverifiedUserCronJob } from './helpers/cronJob-helper.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import apiRoutes from './routes/index.js';

// Get directory name in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(express.json({ extended: true }));
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Serve static files from the public directory
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

app.use('/ekmate/api', apiRoutes);

const setupAndStartServer = () => {
    app.listen(PORT, async () => {
        console.log(`Server started at PORT: ${PORT}`);
        await connectToDB();
        // unverifiedUserCronJob();
    })
}

setupAndStartServer();