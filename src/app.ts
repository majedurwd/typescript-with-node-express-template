import express from "express";
import winston from "winston";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";

// Create express app
const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));
app.use(express.json());

// Routes
app.get("/", (req, res) => {
    res.send("Hello World!");    
});

app.use((err, _req, res, _next) => {
    winston.error(err.message, err);
    res.status(500).send("Something failed.");
})

export default app;