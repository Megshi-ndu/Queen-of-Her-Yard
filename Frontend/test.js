// Simple Auth System for Testing
class SimpleAuthSystem {
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
        const loginForm = document.getElementById('login-form-element');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                console.log('Login form submitted');
                this.handleLogin();
            });
        }

        // Signup form
        const signupForm = document.getElementById('signup-form-element');
        if (signupForm) {
            signupForm.addEventListener('submit', (e) => {
                e.preventDefault();
                console.log('Signup form submitted');
                this.handleSignup();
            });
        }

        // Form switching
        document.getElementById('show-signup')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.showForm('signup');
        });

        document.getElementById('show-login')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.showForm('login');
        });

        // Modal close
        document.getElementById('close-modal')?.addEventListener('click', () => {
            this.closeAuthModal();
        });

        // Auth link in navigation
        document.getElementById('auth-link')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.openAuthModal('login');
        });

        // Logout
        document.getElementById('logout-btn')?.addEventListener('click', () => {
            this.handleLogout();
        });

        console.log('Auth events bound successfully');
    }

    handleLogin() {
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        console.log('Login attempt:', email);

        // Simple validation
        if (!email || !password) {
            alert('Please fill in all fields');
            return;
        }

        // Find user
        const user = this.users.find(u => u.email === email && u.password === password);
        
        if (user) {
            this.currentUser = user;
            this.createSession(user);
            alert('Login successful!');
            this.closeAuthModal();
            this.updateUI();
        } else {
            alert('Invalid email or password');
        }
    }

    handleSignup() {
        const formData = {
            name: document.getElementById('signup-name').value,
            email: document.getElementById('signup-email').value,
            businessName: document.getElementById('business-name').value,
            businessType: document.getElementById('business-type').value,
            phone: document.getElementById('phone').value,
            password: document.getElementById('signup-password').value,
            confirmPassword: document.getElementById('confirm-password').value
        };

        console.log('Signup attempt:', formData.email);

        // Simple validation
        if (!formData.name || !formData.email || !formData.password) {
            alert('Please fill in all required fields');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        // Check if user exists
        if (this.users.find(u => u.email === formData.email)) {
            alert('Email already registered');
            return;
        }

        // Create user
        const newUser = {
            id: Date.now().toString(),
            ...formData,
            joinDate: new Date().toISOString(),
            tier: 'basic',
            stats: { referrals: 0, earnings: 0, profileViews: 0, productsListed: 0 },
            referralCode: 'QUEEN' + Math.random().toString(36).substr(2, 8).toUpperCase()
        };

        this.users.push(newUser);
        this.saveUsers();

        this.currentUser = newUser;
        this.createSession(newUser);
        alert('Account created successfully!');
        this.closeAuthModal();
        this.updateUI();
    }

    handleLogout() {
        this.currentUser = null;
        localStorage.removeItem('queenofheryard_current_user');
        alert('Logged out successfully');
        this.updateUI();
    }

    createSession(user) {
        localStorage.setItem('queenofheryard_current_user', JSON.stringify(user));
    }

    checkExistingSession() {
        const savedUser = localStorage.getItem('queenofheryard_current_user');
        if (savedUser) {
            this.currentUser = JSON.parse(savedUser);
        }
    }

    updateUI() {
        const authRequired = document.getElementById('auth-required');
        const dashboardContent = document.getElementById('dashboard-content');
        const authLink = document.getElementById('auth-link');

        if (this.currentUser) {
            // User is logged in
            authRequired.classList.add('hidden');
            dashboardContent.classList.remove('hidden');
            authLink.textContent = 'Dashboard';
            
            // Update user data
            document.getElementById('user-name').textContent = this.currentUser.name;
        } else {
            // User is not logged in
            authRequired.classList.remove('hidden');
            dashboardContent.classList.add('hidden');
            authLink.textContent = 'Login';
        }
    }

    showForm(formName) {
        // Hide all forms
        document.querySelectorAll('.auth-form').forEach(form => {
            form.classList.remove('active');
        });

        // Show selected form
        document.getElementById(`${formName}-form`).classList.add('active');
    }

    openAuthModal(formType = 'login') {
        console.log('Opening auth modal');
        const modal = document.getElementById('auth-modal');
        modal.style.display = 'block';
        this.showForm(formType);
    }

    closeAuthModal() {
        const modal = document.getElementById('auth-modal');
        modal.style.display = 'none';
        
        // Reset forms
        document.getElementById('login-form-element').reset();
        document.getElementById('signup-form-element').reset();
        
        // Show login form by default
        this.showForm('login');
    }

    saveUsers() {
        localStorage.setItem('queenofheryard_users', JSON.stringify(this.users));
    }
}

// Global functions
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const toggle = input.parentElement.querySelector('.password-toggle i');
    
    if (input.type === 'password') {
        input.type = 'text';
        toggle.className = 'fas fa-eye-slash';
    } else {
        input.type = 'password';
        toggle.className = 'fas fa-eye';
    }
}

function openAuthModal(formType = 'login') {
    if (window.authSystem) {
        window.authSystem.openAuthModal(formType);
    }
}

function openChatBot() {
    alert('Chat bot would open here');
}

function scrollToContact() {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    window.authSystem = new SimpleAuthSystem();
    console.log('Auth system initialized');
});