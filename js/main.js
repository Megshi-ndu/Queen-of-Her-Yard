// DOM Elements
        const navMenu = document.getElementById('nav-menu');
        const hamburger = document.getElementById('hamburger');
        const themeToggle = document.getElementById('theme-toggle');
        const authLink = document.getElementById('auth-link');
        const exploreBtn = document.getElementById('explore-btn');
        const joinCommunityBtn = document.getElementById('join-community-btn');
        const authModal = document.getElementById('auth-modal');
        const closeModal = document.getElementById('close-modal');
        const showSignup = document.getElementById('show-signup');
        const showLogin = document.getElementById('show-login');
        const loginForm = document.getElementById('login-form');
        const signupForm = document.getElementById('signup-form');
        const forgotPasswordForm = document.getElementById('forgot-password-form');
        const forgotPasswordLink = document.getElementById('forgot-password-link');
        const showLoginFromForgot = document.getElementById('show-login-from-forgot');
        const loginFormElement = document.getElementById('login-form-element');
        const signupFormElement = document.getElementById('signup-form-element');
        const notification = document.getElementById('notification');
        const chatBotWidget = document.getElementById('chat-bot-widget');
        const chatToggle = document.getElementById('chat-toggle');
        const chatClose = document.getElementById('chat-close');
        const chatMessages = document.getElementById('chat-messages');
        const chatInput = document.getElementById('chat-input');
        const sendMessage = document.getElementById('send-message');
        const quickQuestions = document.querySelectorAll('.quick-question');
        const viewDetailsBtns = document.querySelectorAll('.view-details-btn');
        const filterBtns = document.querySelectorAll('.filter-btn');
        const businessCards = document.querySelectorAll('.business-card');
        const faqCategoryBtns = document.querySelectorAll('.faq-category-btn');
        const faqCategories = document.querySelectorAll('.faq-category');
        const faqItems = document.querySelectorAll('.faq-item');
        const signupFromDashboard = document.getElementById('signup-from-dashboard');
        const loginFromDashboard = document.getElementById('login-from-dashboard');
        const dashboardContent = document.getElementById('dashboard-content');
        const authRequired = document.getElementById('auth-required');
        const logoutBtn = document.getElementById('logout-btn');
        const chatWithUsBtn = document.getElementById('chat-with-us-btn');
        const contactSupportBtn = document.getElementById('contact-support-btn');
        const toggleLoginPassword = document.getElementById('toggle-login-password');
        const toggleSignupPassword = document.getElementById('toggle-signup-password');
        const toggleSignupConfirmPassword = document.getElementById('toggle-signup-confirmpassword');

        // Session timeout variables
        let sessionTimeout;
        const SESSION_DURATION = 2 * 60 * 60 * 1000; // 2 hours in milliseconds

        // Initialize the page
        document.addEventListener('DOMContentLoaded', function() {
            // Check if user is logged in
            checkAuthStatus();
            
            // Initialize Typed.js for hero section
            if (document.getElementById('typing-text')) {
                new Typed('#typing-text', {
                    strings: [
                        'Empowering Women Entrepreneurs',
                        'Building Business Communities',
                        'Connecting Customers',
                        'Growing Together'
                    ],
                    typeSpeed: 50,
                    backSpeed: 30,
                    backDelay: 2000,
                    loop: true
                });
            }

            // Initialize stats counter
            initStatsCounter();

            // Set up event listeners
            setupEventListeners();
        });

        // Setup all event listeners
        function setupEventListeners() {
            // Navigation
            hamburger.addEventListener('click', toggleMobileMenu);
            
            // Theme toggle
            themeToggle.addEventListener('click', toggleTheme);
            
            // Auth links
            authLink.addEventListener('click', function(e) {
                e.preventDefault();
                openAuthModal('login');
            });
            
            // Hero buttons
            exploreBtn.addEventListener('click', function() {
                document.getElementById('businesses').scrollIntoView({ behavior: 'smooth' });
            });
            
            joinCommunityBtn.addEventListener('click', function() {
                openAuthModal('signup');
            });
            
            // Modal controls
            closeModal.addEventListener('click', closeAuthModal);
            showSignup.addEventListener('click', function(e) {
                e.preventDefault();
                showAuthForm('signup');
            });
            showLogin.addEventListener('click', function(e) {
                e.preventDefault();
                showAuthForm('login');
            });
            forgotPasswordLink.addEventListener('click', function(e) {
                e.preventDefault();
                showAuthForm('forgot-password');
            });
            showLoginFromForgot.addEventListener('click', function(e) {
                e.preventDefault();
                showAuthForm('login');
            });
            
            // Form submissions
            loginFormElement.addEventListener('submit', handleLogin);
            signupFormElement.addEventListener('submit', handleSignup);
            
            // Chat bot
            chatToggle.addEventListener('click', toggleChatBot);
            chatClose.addEventListener('click', closeChatBot);
            sendMessage.addEventListener('click', sendChatMessage);
            chatInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    sendChatMessage();
                }
            });
            
            // Quick questions in chat
            quickQuestions.forEach(btn => {
                btn.addEventListener('click', function() {
                    const question = this.getAttribute('data-question');
                    chatInput.value = question;
                    sendChatMessage();
                });
            });
            
            // Business filters
            filterBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    const filter = this.getAttribute('data-filter');
                    filterBusinesses(filter);
                    
                    // Update active filter button
                    filterBtns.forEach(b => b.classList.remove('active'));
                    this.classList.add('active');
                });
            });
            
            // View business details
            viewDetailsBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    const business = this.getAttribute('data-business');
                    showBusinessDetails(business);
                });
            });
            
            // FAQ categories
            faqCategoryBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    const category = this.getAttribute('data-category');
                    showFaqCategory(category);
                    
                    // Update active category button
                    faqCategoryBtns.forEach(b => b.classList.remove('active'));
                    this.classList.add('active');
                });
            });
            
            // FAQ items
            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question');
                question.addEventListener('click', function() {
                    item.classList.toggle('active');
                });
            });
            
            // Dashboard auth buttons
            signupFromDashboard.addEventListener('click', function() {
                closeDashboard();
                openAuthModal('signup');
            });
            
            loginFromDashboard.addEventListener('click', function() {
                closeDashboard();
                openAuthModal('login');
            });
            
            // Logout button
            logoutBtn.addEventListener('click', handleLogout);
            
            // Contact buttons
            chatWithUsBtn.addEventListener('click', function() {
                openChatBot();
            });
            
            contactSupportBtn.addEventListener('click', function() {
                document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
            });
            
            // Password toggles
            toggleLoginPassword.addEventListener('click', function() {
                togglePasswordVisibility('login-password', this);
            });
            
            toggleSignupPassword.addEventListener('click', function() {
                togglePasswordVisibility('signup-password', this);
            });
            
            toggleSignupConfirmPassword.addEventListener('click', function() {
                togglePasswordVisibility('signup-confirmpassword', this);
            });
            
            // Close modal when clicking outside
            window.addEventListener('click', function(e) {
                if (e.target === authModal) {
                    closeAuthModal();
                }
            });
        }

        // Toggle mobile menu
        function toggleMobileMenu() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        }

        // Toggle theme
        function toggleTheme() {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
        }

        // Check and apply saved theme
        function applySavedTheme() {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme === 'dark') {
                document.body.classList.add('dark-mode');
            }
        }

        // Open auth modal
        function openAuthModal(formType) {
            authModal.classList.add('active');
            showAuthForm(formType);
        }

        // Close auth modal
        function closeAuthModal() {
            authModal.classList.remove('active');
        }

        // Show specific auth form
        function showAuthForm(formType) {
            // Hide all forms
            loginForm.classList.remove('active');
            signupForm.classList.remove('active');
            forgotPasswordForm.classList.remove('active');
            
            // Show the requested form
            if (formType === 'login') {
                loginForm.classList.add('active');
            } else if (formType === 'signup') {
                signupForm.classList.add('active');
            } else if (formType === 'forgot-password') {
                forgotPasswordForm.classList.add('active');
            }
        }

        // Handle login
        function handleLogin(e) {
            e.preventDefault();
            
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            const rememberMe = document.getElementById('remember-me').checked;
            
            // Simple validation
            if (!email || !password) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            // Simulate login process
            showNotification('Logging in...', 'info');
            
            setTimeout(() => {
                // For demo purposes, always succeed
                const user = {
                    name: 'Queen',
                    email: email,
                    business: 'Sample Business'
                };
                
                // Save user data
                localStorage.setItem('user', JSON.stringify(user));
                if (rememberMe) {
                    localStorage.setItem('rememberMe', 'true');
                }
                
                showNotification('Login successful!', 'success');
                closeAuthModal();
                checkAuthStatus();
                resetSessionTimeout();
            }, 1500);
        }

        // Handle signup
        function handleSignup(e) {
            e.preventDefault();
            
            const fullName = document.getElementById('signup-fullname').value;
            const email = document.getElementById('signup-email').value;
            const businessName = document.getElementById('signup-businessname').value;
            const businessType = document.getElementById('signup-businesstype').value;
            const phone = document.getElementById('signup-phone').value;
            const password = document.getElementById('signup-password').value;
            const confirmPassword = document.getElementById('signup-confirmpassword').value;
            const termsAccepted = document.getElementById('terms-conditions').checked;
            
            // Simple validation
            if (!fullName || !email || !businessName || !businessType || !phone || !password || !confirmPassword) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            if (password !== confirmPassword) {
                showNotification('Passwords do not match', 'error');
                return;
            }
            
            if (!termsAccepted) {
                showNotification('Please accept the terms and conditions', 'error');
                return;
            }
            
            // Simulate signup process
            showNotification('Creating your account...', 'info');
            
            setTimeout(() => {
                // For demo purposes, always succeed
                const user = {
                    name: fullName,
                    email: email,
                    business: businessName,
                    type: businessType,
                    phone: phone
                };
                
                // Save user data
                localStorage.setItem('user', JSON.stringify(user));
                
                showNotification('Account created successfully!', 'success');
                closeAuthModal();
                checkAuthStatus();
                resetSessionTimeout();
            }, 2000);
        }

        // Handle logout
        function handleLogout() {
            localStorage.removeItem('user');
            showNotification('Logged out successfully', 'success');
            checkAuthStatus();
            clearTimeout(sessionTimeout);
        }

        // Check authentication status
        function checkAuthStatus() {
            const user = JSON.parse(localStorage.getItem('user') || 'null');
            
            if (user) {
                // User is logged in
                authLink.textContent = 'Dashboard';
                authLink.href = '#dashboard';
                showDashboard();
                resetSessionTimeout();
            } else {
                // User is not logged in
                authLink.textContent = 'Login';
                authLink.href = '#';
                hideDashboard();
            }
        }

        // Show dashboard
        function showDashboard() {
            const user = JSON.parse(localStorage.getItem('user') || '{}');
            document.getElementById('user-name').textContent = user.name || 'Queen';
            
            authRequired.classList.add('hidden');
            dashboardContent.classList.remove('hidden');
            
            // Scroll to dashboard if on dashboard page
            if (window.location.hash === '#dashboard') {
                document.getElementById('dashboard').scrollIntoView({ behavior: 'smooth' });
            }
        }

        // Hide dashboard
        function hideDashboard() {
            authRequired.classList.remove('hidden');
            dashboardContent.classList.add('hidden');
        }

        // Close dashboard
        function closeDashboard() {
            document.getElementById('dashboard').classList.add('hidden');
        }

        // Reset session timeout
        function resetSessionTimeout() {
            clearTimeout(sessionTimeout);
            sessionTimeout = setTimeout(() => {
                showNotification('Your session has expired. Please log in again.', 'info');
                handleLogout();
            }, SESSION_DURATION);
        }

        // Filter businesses
        function filterBusinesses(filter) {
            businessCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        }

        // Show business details
        function showBusinessDetails(business) {
            // In a real application, this would show a modal or navigate to a details page
            showNotification(`Loading details for ${business.replace(/-/g, ' ')}...`, 'info');
            
            // Simulate loading business details
            setTimeout(() => {
                showNotification(`Now viewing ${business.replace(/-/g, ' ')}`, 'success');
            }, 1000);
        }

        // Show FAQ category
        function showFaqCategory(category) {
            faqCategories.forEach(cat => {
                if (cat.getAttribute('data-category') === category) {
                    cat.classList.add('active');
                } else {
                    cat.classList.remove('active');
                }
            });
        }

        // Initialize stats counter
        function initStatsCounter() {
            const statNumbers = document.querySelectorAll('.stat-number');
            
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-count'));
                const duration = 2000; // 2 seconds
                const step = target / (duration / 16); // 60fps
                let current = 0;
                
                const timer = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    stat.textContent = Math.floor(current);
                }, 16);
            });
        }

        // Toggle chat bot
        function toggleChatBot() {
            chatBotWidget.classList.toggle('active');
        }

        // Open chat bot
        function openChatBot() {
            chatBotWidget.classList.add('active');
        }

        // Close chat bot
        function closeChatBot() {
            chatBotWidget.classList.remove('active');
        }

        // Send chat message
        function sendChatMessage() {
            const message = chatInput.value.trim();
            if (!message) return;
            
            // Add user message
            addChatMessage(message, 'user');
            chatInput.value = '';
            
            // Simulate bot response
            setTimeout(() => {
                const response = generateBotResponse(message);
                addChatMessage(response, 'bot');
            }, 1000);
        }

        // Add chat message
        function addChatMessage(message, sender) {
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${sender}-message`;
            
            const avatarDiv = document.createElement('div');
            avatarDiv.className = 'message-avatar';
            
            const contentDiv = document.createElement('div');
            contentDiv.className = 'message-content';
            
            if (sender === 'user') {
                avatarDiv.innerHTML = '<i class="fas fa-user"></i>';
                contentDiv.innerHTML = `<p>${message}</p>`;
            } else {
                avatarDiv.innerHTML = '<i class="fas fa-crown"></i>';
                contentDiv.innerHTML = `<p>${message}</p>`;
            }
            
            messageDiv.appendChild(avatarDiv);
            messageDiv.appendChild(contentDiv);
            chatMessages.appendChild(messageDiv);
            
            // Scroll to bottom
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        // Generate bot response
        function generateBotResponse(message) {
            const lowerMessage = message.toLowerCase();
            
            if (lowerMessage.includes('join') || lowerMessage.includes('business')) {
                return "To join as a business owner, click on the 'Join Our Community' button and fill out the registration form. You'll need to provide your business details, contact information, and choose a subscription plan.";
            } else if (lowerMessage.includes('subscription') || lowerMessage.includes('plan')) {
                return "We offer three subscription plans: Basic (free), Premium (KSh 500/month), and Enterprise (KSh 1,200/month). Each plan offers different features to help grow your business. You can view all plans in the Subscription section.";
            } else if (lowerMessage.includes('fashion') || lowerMessage.includes('clothing')) {
                return "We have several fashion businesses in our community! Zawadi Designs offers beautiful handmade African print clothing and accessories. You can browse all fashion businesses by selecting the 'Fashion' filter in the Businesses section.";
            } else if (lowerMessage.includes('contact') || lowerMessage.includes('support')) {
                return "You can contact our support team by email at support@queenofheryard.co.ke or call +254 729 846 929. Our business hours are Monday-Friday 8:00 AM - 6:00 PM and Saturday 9:00 AM - 12:00 PM.";
            } else {
                return "I'm here to help! You can ask me about joining as a business owner, subscription plans, finding specific businesses, or getting support. How can I assist you today?";
            }
        }

        // Show notification
        function showNotification(message, type = 'info') {
            const notificationText = document.getElementById('notification-text');
            notificationText.textContent = message;
            
            // Set color based on type
            if (type === 'error') {
                notification.style.backgroundColor = '#f44336';
            } else if (type === 'success') {
                notification.style.backgroundColor = '#4CAF50';
            } else {
                notification.style.backgroundColor = '#2196F3';
            }
            
            notification.classList.add('show');
            
            // Auto hide after 3 seconds
            setTimeout(() => {
                notification.classList.remove('show');
            }, 3000);
        }

        // Toggle password visibility
        function togglePasswordVisibility(inputId, button) {
            const input = document.getElementById(inputId);
            const icon = button.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        }

        // Apply saved theme on page load
        applySavedTheme();