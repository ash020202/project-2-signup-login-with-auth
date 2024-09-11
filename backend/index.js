import express from "express";
import cron from 'node-cron';
import axios from 'axios';
import dotenv from "dotenv";
import connectDB from "./database/db.js";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";
const app = express();

dotenv.config();
const port = process.env.PORT;
app.use(cors());

app.use(express.json());

app.use("/api", userRoutes);

app.get('/health', (req, res) => {
    res.send('Server is up and running!');
});

const pingUrl = 'https://project-2-signup-login-with-auth-backend.onrender.com/health';

cron.schedule('*/15 * * * *', () => {
    console.log('Pinging server to keep it active...');

    axios.get(pingUrl)
        .then(response => {
            console.log('Ping successful:', response.status);
        })
        .catch(error => {
            console.error('Error pinging the server:', error);
        });
});

app.listen(port, () => {
  console.log("server is running on port", port);
  connectDB();
});
