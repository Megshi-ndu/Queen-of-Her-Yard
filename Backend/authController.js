const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
    try {
        const { name, email, password, businessName, businessType, phone, location } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'An account with this email already exists.' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            businessName,
            businessType,
            phone,
            location
        });

        const savedUser = await newUser.save();

        // Generate JWT token
        const token = jwt.sign({ userId: savedUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.status(201).json({
            token,
            user: { id: savedUser._id, name: savedUser.name, email: savedUser.email }
        });

    } catch (error) {
        console.error('Registration Error:', error);
        res.status(500).json({ error: 'Server error during registration.' });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials.' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials.' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.status(200).json({
            token,
            user: { id: user._id, name: user.name, email: user.email, subscription: user.subscription }
        });

    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ error: 'Server error during login.' });
    }
};

exports.getUserProfile = async (req, res) => {
    try {
        // req.user is attached by the authMiddleware
        const user = await User.findById(req.user.userId).select('-password');
        res.json(user);
    } catch (error) {
        console.error('Get Profile Error:', error);
        res.status(500).json({ error: 'Failed to fetch user profile.' });
    }
};
