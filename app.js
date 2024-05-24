import express from 'express';
import { userRouter } from './routes/user.js';
import { taskRouter } from './routes/task.js';
import { config } from 'dotenv';
import cookieParser from 'cookie-parser';
import { errorMiddleware } from './middlewares/error.js';
import cors from "cors";
export const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin : process.env.FRONTEND_URL,
    methods : ["get","post","put","delete"],
    credentials : true
}))
app.use("/api/v1/user", userRouter);
app.use("/api/v1/task",taskRouter);

app.use(errorMiddleware)

config({
    path: './data/config.env'
});