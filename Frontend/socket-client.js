/**
 * Socket.IO Client Management
 */

// Assuming the error handler and its functions are globally available
// or you are using a module system. For this project, we'll assume
// they are available on the window scope from main.js.

let socket;

function initializeSocket(showNotification, addChatMessage) {
    // Connect to the Socket.IO server
    // Replace with your actual server URL
    socket = io('http://localhost:3000', {
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
    });

    // --- Connection Event Handlers ---
    socket.on('connect', () => {
        console.log('Successfully connected to WebSocket server.');
        showNotification('Real-time connection established!', 'success');
    });

    socket.on('disconnect', (reason) => {
        console.log(`Disconnected from WebSocket server: ${reason}`);
        showNotification('Real-time connection lost. Reconnecting...', 'info');
    });

    socket.on('connect_error', (error) => {
        console.error('WebSocket connection error:', error);
        logError(error, 'SocketIO Connect Error');
        displayError('Could not connect to real-time server.', showNotification);
    });

    // --- Custom Event Handlers ---

    // Listen for incoming chat messages from the server (bot responses)
    socket.on('chat_response', (message) => {
        if (typeof addChatMessage === 'function') {
            addChatMessage(message, 'bot');
        }
    });

    // Example of another real-time event
    socket.on('live_stats_update', ({ totalUsers, businessesOnline }) => {
        console.log('Live stats received:', { totalUsers, businessesOnline });
        // Here you could update a UI element with the new stats
        showNotification(`Live Stats: ${totalUsers} users online!`, 'info');
    });
}

function getSocket() {
    return socket;
}