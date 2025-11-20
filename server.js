const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({ path: './backend.env' });

// Import routes
const authRoutes = require('./api/routes/auth');
const productRoutes = require('./api/routes/products');
const paymentRoutes = require('./api/routes/payments');

const app = express();
const server = http.createServer(app);

// Initialize Socket.IO
const io = new Server(server, {
    cors: {
        origin: "*", // In production, restrict this to your frontend's URL
        methods: ["GET", "POST"]
    }
});

// --- Middleware ---
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Serve uploaded files statically

// --- Database Connection ---
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Successfully connected to MongoDB.'))
    .catch(err => {
        console.error('Database connection error:', err);
        process.exit(1);
    });

// --- API Routes ---
app.get('/api', (req, res) => {
    res.json({ message: 'Welcome to the Queen of Her Yard API!' });
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/payments', paymentRoutes);

// --- Socket.IO Connection Handling ---
io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Handle chat messages
    socket.on('chat_message', (message) => {
        console.log(`Received message from ${socket.id}:`, message);

        // Simulate a bot response
        setTimeout(() => {
            const response = generateBotResponse(message.text);
            socket.emit('chat_response', { text: response });
        }, 500);
    });

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});

function generateBotResponse(message) {
    const lowerMessage = message.toLowerCase();
    if (lowerMessage.includes('join') || lowerMessage.includes('business')) {
        return "To join as a business owner, click on the 'Join Our Community' button and fill out the registration form.";
    } else if (lowerMessage.includes('subscription') || lowerMessage.includes('plan')) {
        return "We offer three subscription plans: Basic (free), Premium (KSh 500/month), and Enterprise (KSh 1,200/month).";
    } else if (lowerMessage.includes('fashion') || lowerMessage.includes('clothing')) {
        return "We have several fashion businesses in our community! You can browse them by selecting the 'Fashion' filter.";
    } else if (lowerMessage.includes('contact') || lowerMessage.includes('support')) {
        return "You can contact our support team by email at support@queenofheryard.co.ke or call +254 729 846 929.";
    } else {
        return "I'm here to help! You can ask me about joining, subscription plans, or finding businesses.";
    }
}

// --- Server Initialization ---
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});