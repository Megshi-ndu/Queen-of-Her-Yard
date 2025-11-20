/**
 * Centralized Error Handling for Queen of Her Yard
 */

/**
 * Logs an error to the console and optionally sends it to a reporting service.
 * @param {Error} error - The error object.
 * @param {string} context - Additional context about where the error occurred.
 */
function logError(error, context = 'General') {
    console.error(`[${context}]`, error);
    // In a production environment, you would send this error to a logging service
    // like Sentry, LogRocket, etc.
    // Example: Sentry.captureException(error, { extra: { context } });
}

/**
 * Displays a user-friendly error notification.
 * @param {string} message - The message to display to the user.
 * @param {Function} showNotification - The function to call to show the notification.
 */
function displayError(message, showNotification) {
    if (typeof showNotification === 'function') {
        showNotification(message, 'error');
    } else {
        console.error('showNotification function is not available. Message:', message);
    }
}