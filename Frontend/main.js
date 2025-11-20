// DOM Elements (common)
let navMenu, hamburger, themeToggle, authLink, authModal, closeModal, showSignup, showLogin,
    loginForm, signupForm, forgotPasswordForm, forgotPasswordLink, showLoginFromForgot,
    loginFormElement, signupFormElement, notification, chatBotWidget, chatToggle, chatClose,
    chatMessages, chatInput, sendMessage, quickQuestions, toggleLoginPassword,
    toggleSignupPassword, toggleSignupConfirmPassword, loader;

// DOM Elements (index.html specific)
let exploreBtn, joinCommunityBtn, viewDetailsBtns, filterBtns, businessCards,
    searchInput, faqCategoryBtns, faqCategories, faqItems, signupFromDashboard, loginFromDashboard,
    dashboardContent, authRequired, logoutBtn, chatWithUsBtn, contactSupportBtn;

// Session timeout variables
let sessionTimeout;
const SESSION_DURATION = 2 * 60 * 60 * 1000; // 2 hours in milliseconds

// Dummy business data for demonstration
const businessesData = {
    'zawadi-designs': {
        name: 'Zawadi Designs',
        category: 'Fashion',
        image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
        description: 'Beautiful handmade African print clothing and accessories for modern women. We blend traditional Kenyan artistry with contemporary fashion trends to create unique and vibrant pieces. Each item is crafted with care and tells a story of heritage and empowerment.',
        rating: 4.5,
        reviews: 128,
        contact: {
            email: 'info@zawadidesigns.co.ke',
            phone: '+254 712 345 678',
            website: 'www.zawadidesigns.co.ke'
        },
        location: 'Nairobi, Kenya',
        products: [
            { name: 'African Print Dress', price: 'KSh 3,500' },
            { name: 'Handmade Earrings', price: 'KSh 800' },
            { name: 'Custom Ankara Skirt', price: 'KSh 2,800' }
        ]
    },
    'mama-shiko-kitchen': {
        name: "Mama Shiko's Kitchen",
        category: 'Food',
        image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
        description: 'Authentic Kenyan dishes with a modern twist, prepared with love and traditional recipes. We use fresh, locally sourced ingredients to bring you the true taste of Kenya. From hearty stews to delicious snacks, every meal is a celebration.',
        rating: 5.0,
        reviews: 89,
        contact: {
            email: 'order@mamashikos.co.ke',
            phone: '+254 723 456 789',
            website: 'www.mamashikos.co.ke'
        },
        location: 'Mombasa, Kenya',
        products: [
            { name: 'Ugali & Sukuma Wiki', price: 'KSh 450' },
            { name: 'Pilau with Chicken', price: 'KSh 700' },
            { name: 'Samosas (pack of 5)', price: 'KSh 250' }
        ]
    },
    'nia-beauty-lounge': {
        name: 'Nia Beauty Lounge',
        category: 'Beauty',
        image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=M3wxMjA3fDBMHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80',
        description: 'Premium beauty services including skincare, makeup, and natural hair care treatments. We believe in enhancing natural beauty using high-quality, ethically sourced products. Our experienced beauticians provide personalized care for every client.',
        rating: 4.7,
        reviews: 203,
        contact: {
            email: 'bookings@niabeauty.co.ke',
            phone: '+254 701 234 567',
            website: 'www.niabeauty.co.ke'
        },
        location: 'Kisumu, Kenya',
        products: [
            { name: 'Natural Hair Treatment', price: 'KSh 2,000' },
            { name: 'Facial & Spa Package', price: 'KSh 4,500' },
            { name: 'Bridal Makeup', price: 'KSh 8,000' }
        ]
    }
};

// Initialize the page based on body ID
document.addEventListener('DOMContentLoaded', function() {
    // Assign common DOM elements
    navMenu = document.getElementById('nav-menu');
    hamburger = document.getElementById('hamburger');
    themeToggle = document.getElementById('theme-toggle');
    authLink = document.getElementById('auth-link');
    authModal = document.getElementById('auth-modal');
    closeModal = document.getElementById('close-modal');
    showSignup = document.getElementById('show-signup');
    showLogin = document.getElementById('show-login');
    loginForm = document.getElementById('login-form');
    signupForm = document.getElementById('signup-form');
    forgotPasswordForm = document.getElementById('forgot-password-form');
    forgotPasswordLink = document.getElementById('forgot-password-link');
    showLoginFromForgot = document.getElementById('show-login-from-forgot');
    loginFormElement = document.getElementById('login-form-element');
    signupFormElement = document.getElementById('signup-form-element');
    notification = document.getElementById('notification');
    chatBotWidget = document.getElementById('chat-bot-widget');
    chatToggle = document.getElementById('chat-toggle');
    chatClose = document.getElementById('chat-close');
    chatMessages = document.getElementById('chat-messages');
    chatInput = document.getElementById('chat-input');
    sendMessage = document.getElementById('send-message');
    quickQuestions = document.querySelectorAll('.quick-question');
    toggleLoginPassword = document.getElementById('toggle-login-password');
    toggleSignupPassword = document.getElementById('toggle-signup-password');
    toggleSignupConfirmPassword = document.getElementById('toggle-signup-confirmpassword');
    loader = document.getElementById('loader');

    applySavedTheme(); // Apply theme early
    setupGeneralEventListeners(); // Setup common event listeners
    checkAuthStatus(); // Check auth status on every page load

    // Initialize Socket.IO connection
    initializeSocket(showNotification, addChatMessage);

    if (document.body.id === 'index-page' || !document.body.id) { // Default to index-page if no ID
        setupIndexPageEventListeners();
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
        initStatsCounter();
    } else if (document.body.id === 'business-details-page') {
        initializeBusinessDetailsPage();
    }
});

// Setup general event listeners (common to all pages)
function setupGeneralEventListeners() {
    // Navigation
    if (hamburger) hamburger.addEventListener('click', toggleMobileMenu);
    
    // Theme toggle
    if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
    
    // Auth links
    if (authLink) authLink.addEventListener('click', function(e) {
        e.preventDefault();
        openAuthModal('login');
    });
    
    // Modal controls
    if (closeModal) closeModal.addEventListener('click', closeAuthModal);
    if (showSignup) showSignup.addEventListener('click', function(e) {
        e.preventDefault();
        showAuthForm('signup');
    });
    if (showLogin) showLogin.addEventListener('click', function(e) {
        e.preventDefault();
        showAuthForm('login');
    });
    if (forgotPasswordLink) forgotPasswordLink.addEventListener('click', function(e) {
        e.preventDefault();
        showAuthForm('forgot-password');
    });
    if (showLoginFromForgot) showLoginFromForgot.addEventListener('click', function(e) {
        e.preventDefault();
        showAuthForm('login');
    });
    
    // Form submissions
    if (loginFormElement) loginFormElement.addEventListener('submit', handleLogin);
    if (signupFormElement) signupFormElement.addEventListener('submit', handleSignup);
    
    // Chat bot
    if (chatToggle) chatToggle.addEventListener('click', toggleChatBot);
    if (chatClose) chatClose.addEventListener('click', closeChatBot);
    if (sendMessage) sendMessage.addEventListener('click', sendChatMessage);
    if (chatInput) chatInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendChatMessage();
        }
    });
    
    // Quick questions in chat
    if (quickQuestions) quickQuestions.forEach(btn => {
        btn.addEventListener('click', function() {
            const question = this.getAttribute('data-question');
            chatInput.value = question;
            sendChatMessage();
        });
    });
    
    // Password toggles
    if (toggleLoginPassword) toggleLoginPassword.addEventListener('click', function() {
        togglePasswordVisibility('login-password', this);
    });
    
    if (toggleSignupPassword) toggleSignupPassword.addEventListener('click', function() {
        togglePasswordVisibility('signup-password', this);
    });
    
    if (toggleSignupConfirmPassword) toggleSignupConfirmPassword.addEventListener('click', function() {
        togglePasswordVisibility('signup-confirmpassword', this);
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === authModal) {
            closeAuthModal();
        }
    });
}

// Setup index.html specific event listeners
function setupIndexPageEventListeners() {
    exploreBtn = document.getElementById('explore-btn');
    joinCommunityBtn = document.getElementById('join-community-btn');
    viewDetailsBtns = document.querySelectorAll('.view-details-btn');
    filterBtns = document.querySelectorAll('.filter-btn');
    searchInput = document.getElementById('search-input');
    businessCards = document.querySelectorAll('.business-card');
    faqCategoryBtns = document.querySelectorAll('.faq-category-btn');
    faqCategories = document.querySelectorAll('.faq-category');
    faqItems = document.querySelectorAll('.faq-item');
    signupFromDashboard = document.getElementById('signup-from-dashboard');
    loginFromDashboard = document.getElementById('login-from-dashboard');
    dashboardContent = document.getElementById('dashboard-content');
    authRequired = document.getElementById('auth-required');
    logoutBtn = document.getElementById('logout-btn');
    chatWithUsBtn = document.getElementById('chat-with-us-btn');
    contactSupportBtn = document.getElementById('contact-support-btn');

    // Hero buttons
    if (exploreBtn) exploreBtn.addEventListener('click', function() {
        document.getElementById('businesses').scrollIntoView({ behavior: 'smooth' });
    });
    
    if (joinCommunityBtn) joinCommunityBtn.addEventListener('click', function() {
        openAuthModal('signup');
    });

    // Business filters
    if (filterBtns) filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active filter button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            performSearchAndFilter();
        });
    });
    
    // Search input
    if (searchInput) searchInput.addEventListener('input', performSearchAndFilter);

    // View business details
    if (viewDetailsBtns) viewDetailsBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const business = this.getAttribute('data-business');
            showBusinessDetails(business);
        });
    });
    
    // FAQ categories
    if (faqCategoryBtns) faqCategoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            showFaqCategory(category);
            
            // Update active category button
            faqCategoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // FAQ items
    if (faqItems) faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', function() {
            item.classList.toggle('active');
        });
    });
    
    // Dashboard auth buttons
    if (signupFromDashboard) signupFromDashboard.addEventListener('click', function() {
        closeDashboard();
        openAuthModal('signup');
    });
    
    if (loginFromDashboard) loginFromDashboard.addEventListener('click', function() {
        closeDashboard();
        openAuthModal('login');
    });
    
    // Logout button
    if (logoutBtn) logoutBtn.addEventListener('click', handleLogout);
    
    // Contact buttons
    if (chatWithUsBtn) chatWithUsBtn.addEventListener('click', function() {
        openChatBot();
    });
    
    if (contactSupportBtn) contactSupportBtn.addEventListener('click', function() {
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
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
        displayError('Please fill in all fields', showNotification);
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
            }, '1500));'.'try again later,'.' showNotification(error => {
                logError(error, 'LoginSimulation');
                displayError('An unexpected error occurred during login.', showNotification);
            });
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
        displayError('Please fill in all fields', showNotification);
        return;
    }
    
    if (password !== confirmPassword) {
        displayError('Passwords do not match', showNotification);
        return;
    }
    
    if (!termsAccepted) {
        displayError('Please accept the terms and conditions', showNotification);
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
            }, 2000)).catch(error => {
                logError(error, 'SignupSimulation');
                displayError('An unexpected error occurred during signup.', showNotification);
            });
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
        if (authLink) {
            authLink.textContent = 'Dashboard';
            authLink.href = 'index.html#dashboard'; // Ensure it links back to index.html
        }
        if (document.body.id === 'index-page' || !document.body.id) {
            showDashboard();
        }
        resetSessionTimeout();
    } else {
        // User is not logged in
        if (authLink) {
            authLink.textContent = 'Login';
            authLink.href = '#';
        }
        if (document.body.id === 'index-page' || !document.body.id) {
            hideDashboard();
        }
    }
}

// Show dashboard (index.html specific)
function showDashboard() {
    if (!dashboardContent || !authRequired) return;
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    document.getElementById('user-name').textContent = user.name || 'Queen';
    
    authRequired.classList.add('hidden');
    dashboardContent.classList.remove('hidden');
    
    // Scroll to dashboard if on dashboard page
    if (window.location.hash === '#dashboard') {
        document.getElementById('dashboard').scrollIntoView({ behavior: 'smooth' });
    }
}

// Hide dashboard (index.html specific)
function hideDashboard() {
    if (!dashboardContent || !authRequired) return;
    authRequired.classList.remove('hidden');
    dashboardContent.classList.add('hidden');
}

// Close dashboard (index.html specific)
function closeDashboard() {
    if (document.getElementById('dashboard')) {
        document.getElementById('dashboard').classList.add('hidden');
    }
}

// Reset session timeout
function resetSessionTimeout() {
    clearTimeout(sessionTimeout);
    sessionTimeout = setTimeout(() => {
        showNotification('Your session has expired. Please log in again.', 'info');
        if (typeof handleLogout === 'function') handleLogout();
    }, SESSION_DURATION);
}

// Search and Filter businesses (index.html specific)
function performSearchAndFilter() {
    if (!businessCards || !searchInput || !filterBtns) return;

    const searchTerm = searchInput.value.toLowerCase();
    const activeFilter = document.querySelector('.filter-btn.active').getAttribute('data-filter');

    businessCards.forEach(card => {
        const category = card.getAttribute('data-category');
        const cardTitle = card.querySelector('h3').textContent.toLowerCase();
        const cardDescription = card.querySelector('p').textContent.toLowerCase();

        const categoryMatch = (activeFilter === 'all' || category === activeFilter);
        const searchMatch = (
            cardTitle.includes(searchTerm) ||
            cardDescription.includes(searchTerm) ||
            category.includes(searchTerm)
        );

        if (categoryMatch && searchMatch) {
            card.style.display = 'block'; // Show card
        } else {
            card.style.display = 'none'; // Hide card
        }
    });
}

// Navigate to business details page
function showBusinessDetails(businessId) {
    showLoader();
    // Redirect to the new business details page with the business ID
    window.location.href = `business-details.html?id=${businessId}`;
}

// Initialize business details page
function initializeBusinessDetailsPage() {
    const urlParams = new URLSearchParams(window.location.search);
    const businessId = urlParams.get('id');
    const businessDetailsContent = document.getElementById('business-details-content');

    if (businessId && businessesData[businessId]) {
        showLoader();
        setTimeout(() => {
            hideLoader();
            const business = businessesData[businessId];
            let starsHtml = '';
            for (let i = 0; i < Math.floor(business.rating); i++) {
                starsHtml += '<i class="fas fa-star"></i>';
            }
            if (business.rating % 1 !== 0) {
                starsHtml += '<i class="fas fa-star-half-alt"></i>';
            }

            let productsHtml = '';
            if (business.products && business.products.length > 0) {
                productsHtml = '<h3>Products/Services:</h3><ul>';
                business.products.forEach(product => {
                    productsHtml += `<li>${product.name} - ${product.price}</li>`;
                });
                productsHtml += '</ul>';
            }

            businessDetailsContent.innerHTML = `
                <div class="business-details-header">
                    <img src="${business.image}" alt="${business.name}" class="business-details-image">
                    <div class="business-details-info">
                        <span class="business-category">${business.category}</span>
                        <h2 class="section-title">${business.name}</h2>
                        <p class="business-description">${business.description}</p>
                        <div class="business-rating">
                            <div class="stars">${starsHtml}</div>
                            <span>${business.rating} (${business.reviews} reviews)</span>
                        </div>
                    </div>
                </div>
                <div class="business-details-contact">
                    <h3>Contact ${business.name}</h3>
                    <p><i class="fas fa-envelope"></i> Email: <a href="mailto:${business.contact.email}">${business.contact.email}</a></p>
                    <p><i class="fas fa-phone"></i> Phone: <a href="tel:${business.contact.phone}">${business.contact.phone}</a></p>
                    <p><i class="fas fa-globe"></i> Website: <a href="http://${business.contact.website}" target="_blank">${business.contact.website}</a></p>
                    <p><i class="fas fa-map-marker-alt"></i> Location: ${business.location}</p>
                </div>
                <div class="business-details-products">
                    ${productsHtml}
                </div>
                <div class="business-details-actions">
                    <a href="index.html#businesses" class="btn btn-secondary"><i class="fas fa-arrow-left"></i> Back to Businesses</a>
                    <button class="btn btn-primary"><i class="fas fa-shopping-cart"></i> Visit Store</button>
                </div>
            `;
            document.title = `${business.name} - Queen of Her Yard`;
        }, 1500); // Simulate network delay
    } else {
        businessDetailsContent.innerHTML = `
            <h2 class="section-title">Business Not Found</h2>
            <p class="section-subtitle">The business you are looking for does not exist or the link is incorrect.</p>
            <a href="index.html#businesses" class="btn btn-primary"><i class="fas fa-arrow-left"></i> Back to Businesses</a>
        `;
        document.title = `Business Not Found - Queen of Her Yard`;
    }
}

// Show loader
function showLoader() {
    if (loader) loader.classList.add('show');
}

// Hide loader
function hideLoader() {
    if (loader) loader.classList.remove('show');
}

// Show FAQ category (index.html specific)
function showFaqCategory(category) {
    if (!faqCategories) return;
    faqCategories.forEach(cat => {
        if (cat.getAttribute('data-category') === category) {
            cat.classList.add('active');
        } else {
            cat.classList.remove('active');
        }
    });
}

// Initialize stats counter (index.html specific)
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    if (!statNumbers) return;
    
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
    if (chatBotWidget) chatBotWidget.classList.toggle('active');
}

// Open chat bot
function openChatBot() {
    if (chatBotWidget) chatBotWidget.classList.add('active');
}

// Close chat bot
function closeChatBot() {
    if (chatBotWidget) chatBotWidget.classList.remove('active');
}

// Send chat message
function sendChatMessage() {
    if (!chatInput || !chatMessages) return;
    const socket = getSocket();
    const message = chatInput.value.trim();
    if (!message) return;

    if (!socket || !socket.connected) {
        displayError('Cannot send message. Not connected to the chat server.', showNotification);
        return;
    }
    
    // Add user message
    addChatMessage(message, 'user');
    socket.emit('chat_message', { text: message }); // Send message to the server
    chatInput.value = '';
}

// Add chat message
function addChatMessage(message, sender) {
    if (!chatMessages) return;
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
    if (!notification) return;
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