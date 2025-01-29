import http from "http";
import app from "./app";

const  PORT = process.env.PORT || 3000;
const server = http.createServer(app);
const url = `http://localhost:${PORT}`;


// Start server
server.listen(PORT, () => {
    console.log(`✅ The server is running on ${url}`);
});