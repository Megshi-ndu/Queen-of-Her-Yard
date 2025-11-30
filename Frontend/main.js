import './css/style.css';
// main.js - Queen of Her Yard
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    initializeTheme();
    initializeNavigation();
    initializeHeaderTyping();
    initializeSmoothScroll();
    initializeBusinessFilters();
    initializeFAQAccordion();
    initializeAuthSystem();
    initializeContactForm();
    initializeChatBot();
    initializeLoader();
    
    console.log('Queen of Her Yard - App initialized successfully!');
}

// Theme System
function initializeTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Set initial theme
    document.body.setAttribute('data-theme', currentTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
}

function toggleTheme() {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    showNotification(`Switched to ${newTheme} mode`, 'success');
}

// Navigation
function initializeNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });
    }
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    // Enhanced header scroll effect with backdrop blur
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
            header.style.backdropFilter = 'blur(10px)';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.classList.remove('scrolled');
            header.style.backdropFilter = '';
            header.style.boxShadow = '';
        }
    });
}

// Header Typing Animation
function initializeHeaderTyping() {
    const headerTypingElement = document.getElementById('header-typing-text');
    if (!headerTypingElement) return;
    
    const texts = [
        'Empowering Women',
        'Growing Businesses', 
        'Building Communities',
        'Creating Success'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function typeText() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            headerTypingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            headerTypingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typingSpeed = 500;
        }
        
        setTimeout(typeText, typingSpeed);
    }
    
    // Start typing animation after a short delay
    setTimeout(typeText, 1000);
}

// Smooth Scroll
function initializeSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Business Filters
function initializeBusinessFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('search-input');
    const businessCards = document.querySelectorAll('.business-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            filterBusinesses(filter);
        });
    });
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            filterBusinesses('all', searchTerm);
        });
    }
}

function filterBusinesses(category, searchTerm = '') {
    const businessCards = document.querySelectorAll('.business-card');
    
    businessCards.forEach(card => {
        const businessCategory = card.getAttribute('data-category');
        const businessName = card.querySelector('h3').textContent.toLowerCase();
        const businessDescription = card.querySelector('p').textContent.toLowerCase();
        
        const matchesCategory = category === 'all' || businessCategory === category;
        const matchesSearch = !searchTerm || 
                            businessName.includes(searchTerm) || 
                            businessDescription.includes(searchTerm);
        
        if (matchesCategory && matchesSearch) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// FAQ Accordion
function initializeFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    const faqCategoryButtons = document.querySelectorAll('.faq-category-btn');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            item.classList.toggle('active');
        });
    });
    
    faqCategoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            faqCategoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            showFAQCategory(category);
        });
    });
}

function showFAQCategory(category) {
    const faqCategories = document.querySelectorAll('.faq-category');
    
    faqCategories.forEach(faqCategory => {
        if (faqCategory.getAttribute('data-category') === category) {
            faqCategory.classList.add('active');
        } else {
            faqCategory.classList.remove('active');
        }
    });
}

// Auth System
function initializeAuthSystem() {
    const authLink = document.getElementById('auth-link');
    const authModal = document.getElementById('auth-modal');
    const closeModal = document.getElementById('close-modal');
    
    if (authLink) {
        authLink.addEventListener('click', function(e) {
            e.preventDefault();
            showAuthModal('login');
        });
    }
    
    if (closeModal) {
        closeModal.addEventListener('click', hideAuthModal);
    }
    
    if (authModal) {
        authModal.addEventListener('click', function(e) {
            if (e.target === authModal) {
                hideAuthModal();
            }
        });
    }
    
    initializeAuthFormSwitching();
    initializeAuthFormSubmissions();
}

function showAuthModal(formType = 'login') {
    const authModal = document.getElementById('auth-modal');
    if (!authModal) return;
    
    switchAuthForm(formType);
    authModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function hideAuthModal() {
    const authModal = document.getElementById('auth-modal');
    if (!authModal) return;
    
    authModal.classList.remove('active');
    document.body.style.overflow = '';
    resetAuthForms();
}

function switchAuthForm(formType) {
    const forms = ['login-form', 'signup-form', 'forgot-password-form'];
    
    forms.forEach(formId => {
        const form = document.getElementById(formId);
        if (form) {
            form.classList.remove('active');
        }
    });
    
    const targetForm = document.getElementById(`${formType}-form`);
    if (targetForm) {
        targetForm.classList.add('active');
    }
}

function initializeAuthFormSwitching() {
    const showSignup = document.getElementById('show-signup');
    const showLogin = document.getElementById('show-login');
    const showLoginFromForgot = document.getElementById('show-login-from-forgot');
    const forgotPasswordLink = document.getElementById('forgot-password-link');
    
    if (showSignup) {
        showSignup.addEventListener('click', function(e) {
            e.preventDefault();
            switchAuthForm('signup');
        });
    }
    
    if (showLogin) {
        showLogin.addEventListener('click', function(e) {
            e.preventDefault();
            switchAuthForm('login');
        });
    }
    
    if (showLoginFromForgot) {
        showLoginFromForgot.addEventListener('click', function(e) {
            e.preventDefault();
            switchAuthForm('login');
        });
    }
    
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', function(e) {
            e.preventDefault();
            switchAuthForm('forgot-password');
        });
    }
}

function initializeAuthFormSubmissions() {
    const loginForm = document.getElementById('login-form-element');
    const signupForm = document.getElementById('signup-form-element');
    const forgotPasswordForm = document.getElementById('forgot-password-form-element');
    
    initializePasswordToggles();
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }
    
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', handleForgotPassword);
    }
}

function initializePasswordToggles() {
    const passwordToggles = document.querySelectorAll('.password-toggle');
    
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            const icon = this.querySelector('i');
            
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.replace('fa-eye', 'fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.replace('fa-eye-slash', 'fa-eye');
            }
        });
    });
}

function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    if (!email || !password) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    // Simulate API call
    setTimeout(() => {
        const user = {
            name: 'Jane Doe',
            email: email,
            businessName: 'Zawadi Designs'
        };
        
        loginUser(user);
        hideAuthModal();
        showNotification('Welcome back! Successfully logged in.', 'success');
    }, 1000);
}

function handleSignup(e) {
    e.preventDefault();
    
    const formData = {
        fullName: document.getElementById('signup-fullname').value,
        email: document.getElementById('signup-email').value,
        businessName: document.getElementById('signup-businessname').value,
        businessType: document.getElementById('signup-businesstype').value,
        phone: document.getElementById('signup-phone').value,
        password: document.getElementById('signup-password').value,
        confirmPassword: document.getElementById('signup-confirmpassword').value
    };
    
    if (!formData.fullName || !formData.email || !formData.businessName) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    if (formData.password !== formData.confirmPassword) {
        showNotification('Passwords do not match', 'error');
        return;
    }
    
    // Simulate API call
    setTimeout(() => {
        const user = {
            name: formData.fullName,
            email: formData.email,
            businessName: formData.businessName
        };
        
        loginUser(user);
        hideAuthModal();
        showNotification('Welcome to Queen of Her Yard! Account created successfully.', 'success');
    }, 1000);
}

function handleForgotPassword(e) {
    e.preventDefault();
    
    const email = document.getElementById('reset-email').value;
    
    if (!email) {
        showNotification('Please enter your email address', 'error');
        return;
    }
    
    // Simulate API call
    setTimeout(() => {
        showNotification('Password reset instructions sent to your email.', 'success');
        switchAuthForm('login');
    }, 1000);
}

function loginUser(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    updateUIForAuthState();
}

function logoutUser() {
    localStorage.removeItem('currentUser');
    updateUIForAuthState();
    showNotification('Successfully logged out', 'success');
}

function updateUIForAuthState() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const authLink = document.getElementById('auth-link');
    const authRequired = document.getElementById('auth-required');
    const dashboardContent = document.getElementById('dashboard-content');
    
    if (user) {
        if (authLink) {
            authLink.innerHTML = '<i class="fas fa-user"></i> Dashboard';
            authLink.href = '#dashboard';
        }
        
        if (authRequired && dashboardContent) {
            authRequired.classList.add('hidden');
            dashboardContent.classList.remove('hidden');
            
            // Update user info
            const userName = document.getElementById('user-name');
            if (userName) {
                userName.textContent = user.name.split(' ')[0];
            }
        }
    } else {
        if (authLink) {
            authLink.innerHTML = '<i class="fas fa-sign-in-alt"></i> Login';
            authLink.href = '#';
        }
        
        if (authRequired && dashboardContent) {
            authRequired.classList.remove('hidden');
            dashboardContent.classList.add('hidden');
        }
    }
}

// Contact Form
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmit);
    }
}

function handleContactFormSubmit(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };
    
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    // Simulate form submission
    setTimeout(() => {
        showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
        document.getElementById('contactForm').reset();
    }, 1000);
}

// Chat Bot
function initializeChatBot() {
    const chatToggle = document.getElementById('chat-toggle');
    const chatWidget = document.getElementById('chat-bot-widget');
    const chatClose = document.getElementById('chat-close');
    const sendMessageBtn = document.getElementById('send-message');
    const chatInput = document.getElementById('chat-input');
    const quickQuestions = document.querySelectorAll('.quick-question');
    
    if (chatToggle && chatWidget) {
        chatToggle.addEventListener('click', function() {
            chatWidget.classList.toggle('active');
        });
    }
    
    if (chatClose) {
        chatClose.addEventListener('click', function() {
            chatWidget.classList.remove('active');
        });
    }
    
    if (sendMessageBtn && chatInput) {
        sendMessageBtn.addEventListener('click', sendChatMessage);
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendChatMessage();
            }
        });
    }
    
    quickQuestions.forEach(button => {
        button.addEventListener('click', function() {
            const question = this.getAttribute('data-question');
            chatInput.value = question;
            sendChatMessage();
        });
    });
}

function sendChatMessage() {
    const chatInput = document.getElementById('chat-input');
    const message = chatInput.value.trim();
    
    if (!message) return;
    
    addChatMessage(message, 'user');
    chatInput.value = '';
    
    setTimeout(() => {
        const response = generateBotResponse(message);
        addChatMessage(response, 'bot');
    }, 1000);
}

function addChatMessage(message, sender) {
    const chatMessages = document.getElementById('chat-messages');
    const messageElement = document.createElement('div');
    messageElement.className = `message ${sender}-message`;
    
    const avatar = sender === 'user' ? 
        '<i class="fas fa-user"></i>' : 
        '<i class="fas fa-crown"></i>';
    
    messageElement.innerHTML = `
        <div class="message-avatar">${avatar}</div>
        <div class="message-content">${message}</div>
    `;
    
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function generateBotResponse(message) {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('join') || lowerMessage.includes('business')) {
        return "To join as a business owner, click the 'Join Our Community' button and fill out the registration form. You'll need to provide your business details and choose a subscription plan.";
    }
    
    if (lowerMessage.includes('subscription') || lowerMessage.includes('plan')) {
        return "We offer three plans: Basic (Free), Premium (KSh 500/month), and Enterprise (KSh 1,200/month). Each offers different features for your business growth.";
    }
    
    if (lowerMessage.includes('fashion')) {
        return "We have amazing fashion businesses! Zawadi Designs offers beautiful African print clothing. Browse all fashion businesses in the Businesses section.";
    }
    
    return "I can help you with information about joining our platform, subscription plans, or finding businesses. What would you like to know?";
}

// Loader
function initializeLoader() {
    const loader = document.getElementById('loader');
    
    window.addEventListener('load', function() {
        setTimeout(() => {
            if (loader) {
                loader.classList.add('hidden');
            }
        }, 1000);
    });
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.getElementById('notification');
    if (!notification) return;
    
    const notificationText = document.getElementById('notification-text');
    const notificationIcon = notification.querySelector('i');
    
    notificationText.textContent = message;
    
    let iconClass = 'fas fa-info-circle';
    switch(type) {
        case 'success':
            iconClass = 'fas fa-check-circle';
            break;
        case 'error':
            iconClass = 'fas fa-exclamation-circle';
            break;
        case 'warning':
            iconClass = 'fas fa-exclamation-triangle';
            break;
    }
    
    notificationIcon.className = iconClass;
    notification.className = `notification ${type}`;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 5000);
}

// Utility Functions
function resetAuthForms() {
    const forms = document.querySelectorAll('.auth-form form');
    forms.forEach(form => form.reset());
    
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(error => error.classList.remove('show'));
}

// Initialize auth state on load
updateUIForAuthState();

// Hero section button handlers
document.addEventListener('DOMContentLoaded', function() {
    const exploreBtn = document.getElementById('explore-btn');
    const joinCommunityBtn = document.getElementById('join-community-btn');
    const chatWithUsBtn = document.getElementById('chat-with-us-btn');
    const contactSupportBtn = document.getElementById('contact-support-btn');
    const logoutBtn = document.getElementById('logout-btn');
    
    if (exploreBtn) {
        exploreBtn.addEventListener('click', function() {
            document.querySelector('#businesses').scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    if (joinCommunityBtn) {
        joinCommunityBtn.addEventListener('click', function() {
            showAuthModal('signup');
        });
    }
    
    if (chatWithUsBtn) {
        chatWithUsBtn.addEventListener('click', function() {
            const chatWidget = document.getElementById('chat-bot-widget');
            if (chatWidget) {
                chatWidget.classList.add('active');
            }
        });
    }
    
    if (contactSupportBtn) {
        contactSupportBtn.addEventListener('click', function() {
            document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logoutUser);
    }
});