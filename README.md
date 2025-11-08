# Queen-of-Her-Yard

# Queen of Her Yard - E-commerce Platform

![Queen of Her Yard](https://img.shields.io/badge/Queen%20of%20Her%20Yard-Empowering%20Women%20Entrepreneurs-purple)
![Node.js](https://img.shields.io/badge/Node.js-18.x-green)
![Express](https://img.shields.io/badge/Express-4.x-lightgrey)
![MongoDB](https://img.shields.io/badge/MongoDB-5.x-green)
![M-Pesa](https://img.shields.io/badge/M--Pesa-Integration-orange)

A comprehensive e-commerce platform designed to empower women entrepreneurs in Kenya by providing them with tools to advertise and grow their businesses through online presence, M-Pesa payment integration, and business networking.

## 🌟 Overview

Queen of Her Yard is a full-stack web application that enables women entrepreneurs in Kenya to:
- Create professional business profiles
- Showcase products and services
- Accept payments via M-Pesa
- Manage subscriptions for premium features
- Connect with customers and other entrepreneurs

## 🚀 Features

### Frontend Features
- **Responsive Design**: Mobile-first approach for all devices
- **Modern UI/UX**: Beautiful, intuitive interface with purple theme
- **Business Listings**: Showcase businesses with filtering by category
- **Authentication System**: Secure signup and login
- **Subscription Management**: Tiered pricing plans with M-Pesa integration
- **Interactive Modals**: Smooth user experience for forms and payments

### Backend Features
- **RESTful API**: Complete CRUD operations
- **User Authentication**: JWT-based secure authentication
- **M-Pesa Integration**: Seamless payment processing
- **MongoDB Database**: Scalable data storage
- **File Uploads**: Support for business images and product photos
- **Subscription Management**: Automated plan tracking and expiration

### Business Categories Supported
- 🛍️ Fashion & Design
- 🍕 Food & Catering
- 💄 Beauty & Cosmetics
- 🎨 Handicrafts
- 🌱 Agriculture
- 🔧 Services
- 📦 Other

## 🛠️ Technology Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Custom properties, Flexbox, Grid
- **JavaScript ES6+** - Modern JavaScript features
- **Font Awesome** - Icons
- **Google Fonts** - Typography (Poppins)

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Axios** - HTTP requests for M-Pesa API

### Payment Integration
- **M-Pesa Daraja API** - Kenyan mobile payment system
- **STK Push** - Direct payment prompts to phones

## 📋 Prerequisites

Before running this application, ensure you have:

- **Node.js** (v18 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **M-Pesa Developer Account** (for payment integration)
- **Modern web browser** (Chrome, Firefox, Safari, Edge)

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/queen-of-her-yard.git
cd queen-of-her-yard
```

### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment variables file
cp .env.example .env
```

### 3. Configure Environment Variables
Edit the `.env` file in the backend directory:

```env
# Server Configuration
PORT=5000
JWT_SECRET=your-super-secret-jwt-key
MONGODB_URI=mongodb://localhost:27017/queenofheryard

# M-Pesa Configuration (Sandbox)
MPESA_CONSUMER_KEY=your-mpesa-consumer-key
MPESA_CONSUMER_SECRET=your-mpesa-consumer-secret
MPESA_SHORTCODE=your-business-shortcode
MPESA_PASSKEY=your-mpesa-passkey
BASE_URL=http://localhost:5000

# For production
# MPESA_CONSUMER_KEY=your-live-consumer-key
# MPESA_CONSUMER_SECRET=your-live-consumer-secret
# MPESA_SHORTCODE=your-live-shortcode
# MPESA_PASSKEY=your-live-passkey
# BASE_URL=https://yourdomain.com
```

### 4. Frontend Setup
```bash
# Navigate to frontend directory
cd ../frontend

# The frontend is static HTML/CSS/JS
# No additional installation required for basic setup
```

### 5. Database Setup
Ensure MongoDB is running:
```bash
# If using local MongoDB
mongod

# Or if using MongoDB Atlas, update MONGODB_URI in .env
```

### 6. Start the Application
```bash
# Start backend server (from backend directory)
npm start

# Or for development with auto-restart
npm run dev
```

The application will be available at:
- Frontend: `http://localhost:3000` (serve using Live Server or similar)
- Backend API: `http://localhost:5000`

## 📱 Usage Guide

### For Entrepreneurs
1. **Sign Up**: Create an account with business details
2. **Complete Profile**: Add business information, logo, and description
3. **Add Products**: Showcase your products/services with images
4. **Choose Subscription**: Select a plan that fits your needs
5. **Pay with M-Pesa**: Complete subscription payment securely
6. **Manage Business**: Update products and track performance

### For Customers
1. **Browse Businesses**: Explore businesses by category
2. **Search Products**: Find specific products or services
3. **Contact Entrepreneurs**: Direct communication through the platform
4. **Support Local**: Empower women-owned businesses in Kenya

## 💳 Subscription Plans

| Plan | Price | Features |
|------|-------|----------|
| **Basic** | Free | Business profile, 5 products, community access |
| **Premium** | KSh 500/month | Unlimited products, featured listing, analytics |
| **Enterprise** | KSh 1,200/month | Custom page, priority listing, dedicated support |

## 🔌 API Endpoints

### Authentication
- `POST /api/register` - User registration
- `POST /api/login` - User login
- `GET /api/profile` - Get user profile

### Businesses & Products
- `POST /api/products` - Add new product
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get specific product

### Payments
- `POST /api/mpesa/stkpush` - Initiate M-Pesa payment
- `POST /api/mpesa/callback` - M-Pesa payment callback


## 📞 Support

For support and questions:
- 📧 Email: queenofheryard@gmail.com
- 📱 Phone: +254 729 846 929
- 🐛 Issues: [GitHub Issues](https://github.com/your-username/queen-of-her-yard/issues)

## 🙏 Acknowledgments

- **Safaricom M-Pesa** for payment integration
- **Women Entrepreneurs** in Kenya for inspiration
- **Open Source Community** for amazing tools and libraries

- Link to powerpoint presentation on Queen of her yard: https://www.canva.com/design/DAG0TtQR6DE/TDDkfFH--ZXfLKXPOdKxww/edit?utm_content=DAG0TtQR6DE&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌍 Impact

Queen of Her Yard aims to:
- 💪 Empower 10,000+ women entrepreneurs in Kenya by 2025
- 💰 Generate over KSh 100M in business revenue through the platform
- 🌱 Create a supportive community for women in business
- 📈 Increase digital literacy among women entrepreneurs

---

**Built with ❤️ for Women Entrepreneurs in Kenya**

*"When you empower a woman, you empower a community."*
