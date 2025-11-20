// backend/server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import custom error middleware
const { notFound, errorHandler } = require('../middleware/errorMiddleware');
const authRoutes = require('./routes/authRoutes'); // For user authentication
const productRoutes = require('../routes/productRoutes'); // For products

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Allow cross-origin requests from your frontend
app.use(express.json()); // To parse JSON bodies

// --- Connect to MongoDB ---
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Successfully connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// --- API Routes ---
app.use('/api/auth', authRoutes); // Handles routes like /api/auth/login
app.use('/api/products', productRoutes); // Handles routes like /api/products

// --- Error Handling Middleware ---
// This should be after all your routes
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
