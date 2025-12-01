# Queen-of-Her-Yard

# Queen of Her Yard - Empowering Women Entrepreneurs Platform

![Queen of Her Yard](https://img.shields.io/badge/Queen%20of%20Her%20Yard-Empowering%20Women%20Entrepreneurs-purple)
![Node.js](https://img.shields.io/badge/Node.js-18.x-green)
![React](https://img.shields.io/badge/React-18.x-blue)
![Vite](https://img.shields.io/badge/Vite-Latest-yellow)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.x-cyan)
![Express](https://img.shields.io/badge/Express-4.x-lightgrey)
![MongoDB](https://img.shields.io/badge/MongoDB-5.x-green)
![M-Pesa](https://img.shields.io/badge/M--Pesa-Integration-orange)

A comprehensive e-commerce platform designed to empower women entrepreneurs in Kenya by providing them with tools to advertise and grow their businesses through online presence, M-Pesa payment integration, and business networking.

## 🌟 Overview

Queen of Her Yard is a full-stack web application built with modern technologies that enables women entrepreneurs in Kenya to:
- Create professional business profiles with enhanced visuals
- Showcase products and services with responsive design
- Accept payments via M-Pesa integration
- Manage subscriptions for premium features
- Connect with customers and other entrepreneurs
- Benefit from improved user experience and accessibility

## 🚀 Recent Updates & Improvements

### 🎨 **Enhanced Visual Representation**
- Updated images to feature authentic photos of Black women entrepreneurs
- Improved About section with professional business meeting imagery
- Enhanced Success Stories with representative entrepreneur photos
- Better visual storytelling for authentic representation

### 🛠️ **Technical Improvements**
- **CSS Refactoring**: Fixed invalid Tailwind CSS classes (`border-r-0.5`, `border-b-0.5`, `max-w-4/5`)
- **Modern Frontend Stack**: Migrated to Vite + React for better performance
- **Tailwind CSS Integration**: Enhanced styling with custom utilities and responsive design
- **Hot Reload**: Improved development experience with instant updates

### 🔧 **Bug Fixes & Optimizations**
- Resolved PostCSS compilation errors
- Improved CSS class structure and validity
- Enhanced mobile responsiveness
- Optimized image loading and display

## 🚀 Features

### Frontend Features
- **Modern React Architecture**: Built with Vite for fast development
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Enhanced UI/UX**: Beautiful, intuitive interface with accessibility improvements
- **Business Listings**: Showcase businesses with filtering by category
- **Authentication System**: Secure signup and login with form validation
- **Subscription Management**: Tiered pricing plans with M-Pesa integration
- **Interactive Components**: Smooth animations and transitions
- **Accessibility**: Improved alt text and semantic HTML

### Backend Features
- **RESTful API**: Complete CRUD operations
- **User Authentication**: JWT-based secure authentication
- **M-Pesa Integration**: Seamless payment processing with STK Push
- **MongoDB Database**: Scalable data storage with Mongoose ODM
- **File Uploads**: Support for business images and product photos
- **Subscription Management**: Automated plan tracking and expiration
- **Real-time Features**: Socket.io integration for live chat

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
- **React 18** - Modern UI library with hooks and functional components
- **Vite** - Fast build tool and development server
- **Tailwind CSS 3.x** - Utility-first CSS framework
- **HTML5** - Semantic markup with accessibility features
- **JavaScript ES6+** - Modern JavaScript with async/await
- **Font Awesome** - Comprehensive icon library
- **Google Fonts** - Professional typography (Inter, Playfair Display)

### Backend
- **Node.js 18+** - Runtime environment
- **Express.js 4.x** - Web application framework
- **MongoDB 5.x** - NoSQL database
- **Mongoose** - Elegant MongoDB object modeling
- **JWT** - Secure authentication tokens
- **bcryptjs** - Password hashing and security
- **Axios** - HTTP client for M-Pesa API integration
- **Socket.io** - Real-time bidirectional communication

### Payment Integration
- **M-Pesa Daraja API** - Kenyan mobile payment system
- **STK Push** - Direct payment prompts to mobile phones
- **M-Pesa Express** - Seamless payment processing

### Development Tools
- **PostCSS** - CSS transformation and optimization
- **ESLint** - Code linting and quality assurance
- **Vite HMR** - Hot Module Replacement for instant updates

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
cd ../Frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will be available at `http://localhost:5173` (Vite default port)

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
- Frontend: `http://localhost:5175` (Vite development server)
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
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Businesses & Products
- `GET /api/businesses` - Get all businesses
- `POST /api/businesses` - Create new business
- `GET /api/businesses/:id` - Get specific business
- `PUT /api/businesses/:id` - Update business
- `POST /api/products` - Add new product
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get specific product

### Payments
- `POST /api/mpesa/stkpush` - Initiate M-Pesa payment
- `POST /api/mpesa/callback` - M-Pesa payment callback
- `GET /api/payments/history` - Payment history

### Real-time Features
- WebSocket connection for live chat and notifications
- Real-time business updates and activity feeds


## 📞 Support & Contact

For support and questions:
- 📧 **Email**: info@queenofheryard.co.ke
- 📱 **Phone**: +254 729 846 929, +254 738 160 386
- 🏢 **Office**: Java Plaza, 4th Floor, Mama Ngina Street, Embu, Kenya
- 🐛 **Issues**: [GitHub Issues](https://github.com/your-username/queen-of-her-yard/issues)

## 🙏 Acknowledgments

- **Safaricom M-Pesa** for payment integration capabilities
- **Women Entrepreneurs** in Kenya for inspiration and feedback
- **Open Source Community** for amazing tools and libraries
- **React & Vite Teams** for excellent development tools
- **Tailwind CSS** for beautiful, utility-first styling

### 📊 Project Links
- **PowerPoint Presentation**: [Canva Design](https://www.canva.com/design/DAG0TtQR6DE/TDDkfFH--ZXfLKXPOdKxww/edit)
- **Live Deployment**: [Vercel](https://vercel.com/margaret-ndungus-projects/queen-of-her-yard-1/2ZwdtPuvNZMriBKbGigW3ihb8dZu)
## 📁 Project Structure

```
queen-of-her-yard/
├── Backend/
│   ├── middleware/         # Authentication & validation middleware
│   ├── routes/            # API route handlers
│   ├── models/            # MongoDB models
│   ├── controllers/       # Business logic controllers
│   ├── config/            # Database and app configuration
│   └── server.js          # Main server file
├── Frontend/
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── assets/        # Images, fonts, icons
│   │   └── main.jsx       # React app entry point
│   ├── css/
│   │   └── style.css      # Global styles and Tailwind customizations
│   ├── public/            # Static assets
│   └── index.html         # HTML template
└── README.md              # This file
```

Published on github pages: https://megshi-ndu.github.io/Queen-of-Her-Yard/


## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌍 Impact & Goals

Queen of Her Yard aims to:
- 💪 **Empower 10,000+ women entrepreneurs** in Kenya by 2025
- 💰 **Generate over KSh 100M** in business revenue through the platform
- 🌱 **Create a supportive community** for women in business
- 📈 **Increase digital literacy** among women entrepreneurs
- 🤝 **Foster networking** between entrepreneurs and customers
- 🎯 **Provide accessible tools** for business growth and success

## 🚀 Future Roadmap

- **Mobile App**: Native iOS and Android applications
- **AI Recommendations**: Smart product and business matching
- **Video Integration**: Video calls and virtual business meetings
- **Multi-language Support**: Swahili and other local languages
- **Advanced Analytics**: Business insights and performance tracking
- **Partnership Integration**: Connect with suppliers and distributors

---

**Built with ❤️ for Women Entrepreneurs in Kenya**

*"When you empower a woman, you empower a community."*

**Current Version**: 2.0.0 - Enhanced with React, Vite, and Improved Visual Representation
