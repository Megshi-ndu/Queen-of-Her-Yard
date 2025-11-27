// server.js
const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const { Server } = require("socket.io");
const cors = require('cors');

require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000", // Adjust for your frontend URL
        methods: ["GET", "POST"]
    }
});

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Body parser for JSON

// --- Add Middleware for logging, validation, and security here ---

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected successfully.'))
    .catch(err => console.error('MongoDB connection error:', err));

// A simple root route to check if the server is running
app.get('/', (req, res) => {
    res.send('<h1>Welcome to the Queen of Her Yard API!</h1><p>The server is running correctly.</p>');
});

// --- API Routes ---
// app.use('/api/users', require('./src/routes/users'));
// app.use('/api/auth', require('./src/routes/auth'));

// Real-time functionality with Socket.io
io.on('connection', (socket) => {
    console.log('A user connected with socket id:', socket.id);

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});