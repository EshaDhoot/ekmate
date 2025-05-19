import express from 'express';
import { PORT } from './config/server-config.js'
import { connectToDB } from './config/db-config.js';
// import { unverifiedUserCronJob } from './helpers/cronJob-helper.js';
import cors from 'cors';
import apiRoutes from './routes/index.js';

const app = express();

app.use(express.json());
app.use(express.json({ extended: true }));
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use('/ekmate/api', apiRoutes);

const setupAndStartServer = () => {
    app.listen(PORT, async () => {
        console.log(`Server started at PORT: ${PORT}`);
        await connectToDB();
        // unverifiedUserCronJob();
    })
}

setupAndStartServer();