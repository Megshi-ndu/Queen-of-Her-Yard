// backend/routes/authRoutes.js
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const asyncHandler = require('express-async-handler');
const crypto = require('crypto');

const router = express.Router();

// Function to generate a token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d', // Token expires in 30 days
    });
};

// @desc    Register a new user
// @route   POST /api/auth/signup
// @access  Public
router.post('/signup', asyncHandler(async (req, res) => {
    const { fullName, email, businessName, businessType, phone, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await User.create({
        fullName,
        email,
        businessName,
        businessType,
        phone,
        password,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
}));

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
router.post('/login', asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
}));

// @desc    Forgot password - generate token
// @route   POST /api/auth/forgot-password
// @access  Public
router.post('/forgot-password', asyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        // For security, we don't reveal that the user was not found.
        // We send a success message to prevent user enumeration attacks.
        return res.json({ message: 'If an account with that email exists, a password reset link has been sent.' });
    }

    // 1. Generate a random reset token
    const resetToken = crypto.randomBytes(32).toString('hex');

    // 2. Hash the token and save it to the user document in the database
    user.passwordResetToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    // 3. Set an expiration time for the token (e.g., 10 minutes)
    user.passwordResetExpires = Date.now() + 10 * 60 * 1000;

    await user.save();

    // 4. Send the token back to the user (in a real app, this would be via email)
    // The email would contain a link like: `https://your-frontend.com/reset-password.html?token=${resetToken}`
    console.log('Password Reset Token (send this to user):', resetToken);
    // In a real application, you would integrate an email service like SendGrid or Nodemailer here.

    res.json({ message: 'If an account with that email exists, a password reset link has been sent.' });
}));

// @desc    Reset password with token
// @route   PUT /api/auth/reset-password/:token
// @access  Public
router.put('/reset-password/:token', asyncHandler(async (req, res) => {
    // 1. Get the token from the URL and hash it
    const hashedToken = crypto
        .createHash('sha256')
        .update(req.params.token)
        .digest('hex');

    // 2. Find the user by the hashed token and check if it has not expired
    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() }, // $gt means "greater than"
    });

    if (!user) {
        res.status(400);
        throw new Error('Token is invalid or has expired');
    }

    // 3. If the token is valid, set the new password
    user.password = req.body.password;
    // Clear the reset token fields so it can't be used again
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save(); // The 'pre-save' hook will automatically hash the new password

    res.json({ message: 'Password has been reset successfully.' });
}));

module.exports = router;
