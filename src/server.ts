import express from 'express';
import dotenv from 'dotenv'
dotenv.config()

import cors from 'cors';
import { corsOptions } from './config/cors';

import { connectDB } from './config/db';
import projectRoutes from './routes/ProjectRoutes';
import { setupSwagger } from './docs/swagger';


connectDB();
const app = express();

app.use(cors(corsOptions))
app.use(express.json());


setupSwagger(app)

// Routes
app.use('/api/projects', projectRoutes);

export default app;