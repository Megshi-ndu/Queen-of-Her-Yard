// Mobile Menu Functionality - DEBUGGED
class MobileMenu {
    constructor() {
        this.hamburger = document.getElementById('hamburger');
        this.navMenu = document.getElementById('nav-menu');
        if (!this.hamburger || !this.navMenu) {
            console.error('Mobile menu elements not found');
            return;
        }
        this.init();
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        // Hamburger click
        this.hamburger.addEventListener('click', () => {
            this.toggleMenu();
        });

        // Close menu when clicking on links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                this.closeMenu();
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.navMenu.classList.contains('active') && 
                !this.navMenu.contains(e.target) && 
                !this.hamburger.contains(e.target)) {
                this.closeMenu();
            }
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.navMenu.classList.contains('active')) {
                this.closeMenu();
            }
        });
    }

    toggleMenu() {
        this.navMenu.classList.toggle('active');
        this.hamburger.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (this.navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }

    closeMenu() {
        this.navMenu.classList.remove('active');
        this.hamburger.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Dark Mode Functionality - DEBUGGED
class DarkMode {
    constructor() {
        this.theme = localStorage.getItem('queenofheryard_theme') || 'light';
        this.init();
    }

    init() {
        this.applyTheme();
        this.bindEvents();
    }

    bindEvents() {
        // Theme toggle button
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });

            // Keyboard accessibility
            themeToggle.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.toggleTheme();
                }
            });
        }

        // Listen for system theme changes
        if (window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            mediaQuery.addEventListener('change', (e) => {
                // Only auto-switch if user hasn't manually set a preference
                if (!localStorage.getItem('queenofheryard_theme')) {
                    this.theme = e.matches ? 'dark' : 'light';
                    this.applyTheme();
                }
            });
        }
    }

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        this.applyTheme();
        this.savePreference();
        this.animateToggle();
    }

    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.theme);
        
        // Update meta theme color for mobile browsers
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            metaThemeColor.setAttribute('content', this.theme === 'dark' ? '#0f172a' : '#8B4513');
        }
    }

    animateToggle() {
        const toggle = document.getElementById('theme-toggle');
        if (toggle) {
            toggle.style.transform = 'scale(0.95)';
            setTimeout(() => {
                toggle.style.transform = 'scale(1)';
            }, 150);
        }
    }

    savePreference() {
        localStorage.setItem('queenofheryard_theme', this.theme);
    }

    // Method to set theme programmatically
    setTheme(theme) {
        if (['light', 'dark'].includes(theme)) {
            this.theme = theme;
            this.applyTheme();
            this.savePreference();
        }
    }

    // Method to get current theme
    getTheme() {
        return this.theme;
    }

    // Method to check if dark mode is active
    isDark() {
        return this.theme === 'dark';
    }
}

// Authentication System - DEBUGGED VERSION
class AuthSystem {
    constructor() {
        this.currentUser = null;
        this.users = JSON.parse(localStorage.getItem('queenofheryard_users')) || [];
        this.init();
    }

    init() {
        this.bindAuthEvents();
        this.checkExistingSession();
        this.updateUI();
    }

    bindAuthEvents() {
        console.log('Binding auth events...');
        
        // Login form
        const loginForm = document.getElementById('login-form');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                console.log('Login form submitted');
                this.handleLogin();
            });
        } else {
            console.warn('Login form not found!');
        }

        // Signup form
        const signupForm = document.getElementById('signup-form');
        if (signupForm) {
            signupForm.addEventListener('submit', (e) => {
                e.preventDefault();
                console.log('Signup form submitted');
                this.handleSignup();
            });
        } else {
            console.warn('Signup form not found!');
        }

        // Forgot password form
        const forgotPasswordForm = document.getElementById('forgot-password-form');
        if (forgotPasswordForm) {
            forgotPasswordForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleForgotPassword();
            });
        }

        // Logout
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => {
                this.handleLogout();
            });
        }

        // Form switching
        const showSignup = document.getElementById('show-signup');
        if (showSignup) {
            showSignup.addEventListener('click', (e) => {
                e.preventDefault();
                this.showForm('signup');
            });
        }

        const showLogin = document.getElementById('show-login');
        if (showLogin) {
            showLogin.addEventListener('click', (e) => {
                e.preventDefault();
                this.showForm('login');
            });
        }

        console.log('Auth events bound successfully');
    }

    async handleLogin() {
        console.log('Handling login...');
        const email = document.getElementById('login-email')?.value;
        const password = document.getElementById('login-password')?.value;

        if (!email || !password) {
            this.showNotification('Please fill in all fields', 'error');
            return;
        }

        // Validate inputs
        if (!this.validateEmail(email)) {
            this.showNotification('Please enter a valid email', 'error');
            return;
        }

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            const user = this.users.find(u => u.email === email && u.password === password);
            
            if (user) {
                console.log('Login successful for user:', user.email);
                this.currentUser = user;
                this.createSession(user);
                this.showNotification('Login successful! Welcome back!', 'success');
                this.closeAuthModal();
                this.updateUI();
            } else {
                console.log('Login failed - user not found or wrong password');
                this.showNotification('Invalid email or password', 'error');
            }
        } catch (error) {
            console.error('Login error:', error);
            this.showNotification('Login failed. Please try again.', 'error');
        }
    }

    async handleSignup() {
        console.log('Handling signup...');
        const formData = {
            name: document.getElementById('signup-name')?.value,
            email: document.getElementById('signup-email')?.value,
            businessName: document.getElementById('business-name')?.value,
            businessType: document.getElementById('business-type')?.value,
            phone: document.getElementById('phone')?.value,
            password: document.getElementById('signup-password')?.value,
            confirmPassword: document.getElementById('confirm-password')?.value
        };

        // Validate all fields
        if (!this.validateAllSignupFields(formData)) {
            return;
        }

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Check if user already exists
            if (this.users.find(u => u.email === formData.email)) {
                this.showNotification('Email already registered', 'error');
                return;
            }

            // Create new user
            const newUser = {
                id: this.generateId(),
                name: formData.name,
                email: formData.email,
                businessName: formData.businessName,
                businessType: formData.businessType,
                phone: formData.phone,
                password: formData.password,
                joinDate: new Date().toISOString(),
                tier: 'basic'
            };

            console.log('Creating new user:', { ...newUser, password: '***' });

            this.users.push(newUser);
            this.saveUsers();

            this.currentUser = newUser;
            this.createSession(newUser);
            this.showNotification('Welcome to Queen of Her Yard! Your account has been created successfully.', 'success');
            this.closeAuthModal();
            this.updateUI();

        } catch (error) {
            console.error('Signup error:', error);
            this.showNotification('Signup failed. Please try again.', 'error');
        }
    }

    validateAllSignupFields(formData) {
        let isValid = true;

        if (!formData.name?.trim()) {
            this.showNotification('Full name is required', 'error');
            isValid = false;
        }

        if (!this.validateEmail(formData.email)) {
            isValid = false;
        }

        if (!formData.businessName?.trim()) {
            this.showNotification('Business name is required', 'error');
            isValid = false;
        }

        if (!formData.businessType) {
            this.showNotification('Please select a business type', 'error');
            isValid = false;
        }

        if (!formData.phone?.trim()) {
            this.showNotification('Phone number is required', 'error');
            isValid = false;
        }

        if (!formData.password || formData.password.length < 6) {
            this.showNotification('Password must be at least 6 characters', 'error');
            isValid = false;
        }

        if (formData.password !== formData.confirmPassword) {
            this.showNotification('Passwords do not match', 'error');
            isValid = false;
        }

        return isValid;
    }

    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    handleForgotPassword() {
        const email = document.getElementById('reset-email')?.value;
        
        if (this.validateEmail(email)) {
            this.showNotification('Password reset instructions have been sent to your email.', 'success');
            this.showForm('login');
        } else {
            this.showNotification('Please enter a valid email address', 'error');
        }
    }

    handleLogout() {
        this.currentUser = null;
        localStorage.removeItem('queenofheryard_current_user');
        this.showNotification('Logged out successfully', 'success');
        this.updateUI();
    }

    createSession(user) {
        localStorage.setItem('queenofheryard_current_user', JSON.stringify(user));
    }

    checkExistingSession() {
        const savedUser = localStorage.getItem('queenofheryard_current_user');
        if (savedUser) {
            try {
                this.currentUser = JSON.parse(savedUser);
                console.log('Found existing session for user:', this.currentUser.email);
            } catch (error) {
                console.error('Error parsing saved user:', error);
                localStorage.removeItem('queenofheryard_current_user');
            }
        }
    }

    updateUI() {
        const authLink = document.getElementById('auth-link');
        const userMenu = document.getElementById('user-menu');

        if (this.currentUser) {
            // User is logged in
            console.log('Updating UI: User is logged in');
            if (authLink) {
                authLink.textContent = 'Dashboard';
                authLink.href = '#dashboard';
            }
            if (userMenu) {
                userMenu.style.display = 'block';
            }
        } else {
            // User is not logged in
            console.log('Updating UI: User is not logged in');
            if (authLink) {
                authLink.textContent = 'Login';
                authLink.href = '#';
            }
            if (userMenu) {
                userMenu.style.display = 'none';
            }
        }
    }

    showForm(formName) {
        console.log('Showing form:', formName);
        
        // Hide all forms
        document.querySelectorAll('.auth-form').forEach(form => {
            form.classList.remove('active');
        });

        // Show selected form
        const targetForm = document.getElementById(`${formName}-form`);
        if (targetForm) {
            targetForm.classList.add('active');
        }
    }

    closeAuthModal() {
        console.log('Closing auth modal');
        const modal = document.getElementById('auth-modal');
        if (modal) {
            modal.style.display = 'none';
        }
        
        // Clear forms
        const loginForm = document.getElementById('login-form');
        const signupForm = document.getElementById('signup-form');
        const forgotPasswordForm = document.getElementById('forgot-password-form');
        
        if (loginForm) loginForm.reset();
        if (signupForm) signupForm.reset();
        if (forgotPasswordForm) forgotPasswordForm.reset();
        
        // Show login form by default
        this.showForm('login');
    }

    generateId() {
        return 'user_' + Math.random().toString(36).substr(2, 9);
    }

    saveUsers() {
        localStorage.setItem('queenofheryard_users', JSON.stringify(this.users));
        console.log('Users saved to localStorage. Total users:', this.users.length);
    }

    showNotification(message, type = 'info') {
        // Create notification element if it doesn't exist
        let notification = document.getElementById('global-notification');
        if (!notification) {
            notification = document.createElement('div');
            notification.id = 'global-notification';
            notification.className = 'notification';
            document.body.appendChild(notification);
        }

        notification.textContent = message;
        notification.className = `notification ${type} show`;
        
        // Auto hide after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
        }, 5000);
    }
}

// Chat Bot Functionality - DEBUGGED VERSION
class ChatBot {
    constructor() {
        this.isOpen = false;
        this.conversationHistory = [];
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadChatHistory();
        console.log('ChatBot initialized');
    }

    bindEvents() {
        console.log('Binding chat bot events...');

        // Toggle chat widget
        const chatToggle = document.getElementById('chat-toggle');
        if (chatToggle) {
            chatToggle.addEventListener('click', () => {
                this.toggleChat();
            });
        } else {
            console.warn('Chat toggle button not found!');
        }

        // Close chat
        const chatClose = document.getElementById('chat-close');
        if (chatClose) {
            chatClose.addEventListener('click', () => {
                this.closeChat();
            });
        }

        // Send message on button click
        const sendMessageBtn = document.getElementById('send-message');
        if (sendMessageBtn) {
            sendMessageBtn.addEventListener('click', () => {
                this.sendMessage();
            });
        }

        // Send message on Enter key
        const chatInput = document.getElementById('chat-input');
        if (chatInput) {
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendMessage();
                }
            });
        }

        console.log('Chat bot events bound successfully');
    }

    toggleChat() {
        const chatWidget = document.getElementById('chat-bot-widget');
        if (!chatWidget) {
            console.error('Chat widget not found!');
            return;
        }

        this.isOpen = !this.isOpen;
        
        if (this.isOpen) {
            chatWidget.classList.add('active');
            document.getElementById('chat-input')?.focus();
            console.log('Chat opened');
        } else {
            chatWidget.classList.remove('active');
            console.log('Chat closed');
        }
    }

    openChat() {
        const chatWidget = document.getElementById('chat-bot-widget');
        if (chatWidget) {
            this.isOpen = true;
            chatWidget.classList.add('active');
            document.getElementById('chat-input')?.focus();
            console.log('Chat opened programmatically');
        }
    }

    closeChat() {
        const chatWidget = document.getElementById('chat-bot-widget');
        if (chatWidget) {
            this.isOpen = false;
            chatWidget.classList.remove('active');
            console.log('Chat closed');
        }
    }

    sendMessage() {
        const input = document.getElementById('chat-input');
        if (!input) {
            console.error('Chat input not found!');
            return;
        }

        const message = input.value.trim();
        
        if (message === '') {
            console.log('Empty message, not sending');
            return;
        }

        console.log('Sending message:', message);

        // Add user message
        this.addMessage(message, 'user');
        input.value = '';

        // Show typing indicator
        this.showTypingIndicator();

        // Process message and generate response
        setTimeout(() => {
            this.hideTypingIndicator();
            const response = this.generateResponse(message);
            this.addMessage(response, 'bot');
            this.saveToHistory(message, response);
        }, 1000 + Math.random() * 1000);
    }

    addMessage(content, sender) {
        const messagesContainer = document.getElementById('chat-messages');
        if (!messagesContainer) {
            console.error('Chat messages container not found!');
            return;
        }

        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.textContent = content;
        
        messageDiv.appendChild(contentDiv);
        messagesContainer.appendChild(messageDiv);
        
        // Scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        console.log(`Message added (${sender}):`, content);
    }

    showTypingIndicator() {
        const messagesContainer = document.getElementById('chat-messages');
        if (!messagesContainer) return;

        const typingDiv = document.createElement('div');
        typingDiv.className = 'typing-indicator';
        typingDiv.id = 'typing-indicator';
        typingDiv.textContent = 'Queen Assistant is typing...';
        
        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        console.log('Typing indicator shown');
    }

    hideTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
            console.log('Typing indicator hidden');
        }
    }

    generateResponse(userMessage) {
        const message = userMessage.toLowerCase();
        
        // Store conversation
        this.conversationHistory.push({ role: 'user', content: userMessage, timestamp: new Date() });
        
        console.log('Generating response for:', userMessage);

        // Simple response logic
        if (message.includes('hello') || message.includes('hi')) {
            return "Hello! 👑 Welcome to Queen of Her Yard! How can I help you today?";
        }
        
        if (message.includes('business') || message.includes('join')) {
            return "To join as a business owner, click the 'Join Our Community' button and fill out the registration form. We offer free and paid plans!";
        }
        
        if (message.includes('subscription') || message.includes('price')) {
            return "We have three plans: Basic (Free), Premium (KSh 500/month), and Enterprise (KSh 1,200/month). Each offers different features for your business growth!";
        }
        
        // Default response
        return "I'm here to help you with Queen of Her Yard! You can ask me about business registration, subscription plans, or general support. How can I assist you today? 👑";
    }

    saveToHistory(userMessage, botResponse) {
        const chatHistory = {
            user: userMessage,
            bot: botResponse,
            timestamp: new Date().toISOString()
        };
        
        this.conversationHistory.push(chatHistory);
        
        // Keep only last 50 messages to prevent memory issues
        if (this.conversationHistory.length > 50) {
            this.conversationHistory = this.conversationHistory.slice(-50);
        }

        // Save to localStorage
        this.saveChatHistory();
        
        console.log('Chat history updated');
    }

    saveChatHistory() {
        try {
            localStorage.setItem('queenofheryard_chat_history', JSON.stringify(this.conversationHistory));
        } catch (error) {
            console.warn('Could not save chat history to localStorage:', error);
        }
    }

    loadChatHistory() {
        try {
            const savedHistory = localStorage.getItem('queenofheryard_chat_history');
            if (savedHistory) {
                this.conversationHistory = JSON.parse(savedHistory);
                console.log('Chat history loaded:', this.conversationHistory.length, 'messages');
            }
        } catch (error) {
            console.warn('Could not load chat history from localStorage:', error);
        }
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components with error handling
    try {
        window.mobileMenu = new MobileMenu();
        window.darkMode = new DarkMode();
        window.authSystem = new AuthSystem();
        window.chatBot = new ChatBot();
        
        console.log('Queen of Her Yard - Core systems initialized!');
    } catch (error) {
        console.error('Error initializing systems:', error);
    }
});

// Global functions
function openAuthModal(formType = 'login') {
    console.log('Opening auth modal with form:', formType);
    const modal = document.getElementById('auth-modal');
    if (modal) {
        modal.style.display = 'block';
        
        if (window.authSystem) {
            window.authSystem.showForm(formType);
        }
    } else {
        console.error('Auth modal not found!');
    }
}

function openChatBot() {
    if (window.chatBot) {
        window.chatBot.openChat();
    } else {
        console.error('Chat bot not initialized!');
    }
}

