// A middleware to handle requests for routes that don't exist.
const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error); // Pass the error to the next middleware (our error handler)
};

// A centralized middleware to handle all errors.
// By having four arguments (err, req, res, next), Express recognizes this as an error handling middleware.
const errorHandler = (err, req, res, next) => {
    // Sometimes an error might come in with a 200 status code, so we default to 500.
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;

    // Mongoose specific error for bad ObjectIDs
    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        statusCode = 404;
        message = 'Resource not found';
    }

    res.status(statusCode).json({
        message: message,
        // In production, you might not want to expose the stack trace.
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};

module.exports = { notFound, errorHandler };