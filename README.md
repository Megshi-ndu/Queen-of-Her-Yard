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

### Example API Usage
```javascript
// User Registration
const response = await fetch('/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
        name: 'Jane Doe',
        email: 'jane@business.co.ke',
        password: 'securepassword',
        businessName: 'Jane\'s Fashion House',
        businessType: 'fashion',
        phone: '254700000000',
        location: 'Nairobi'
    })
});
```

## 🔒 Security Features

- Password hashing with bcryptjs
- JWT token-based authentication
- CORS protection
- Input validation and sanitization
- Secure M-Pesa API integration
- Environment variable protection

## 🗃️ Database Schema

### Users Collection
```javascript
{
    name: String,
    email: String (unique),
    password: String (hashed),
    businessName: String,
    businessType: String,
    phone: String,
    location: String,
    subscription: {
        plan: String,
        expiresAt: Date,
        isActive: Boolean
    },
    createdAt: Date
}
```

### Products Collection
```javascript
{
    name: String,
    description: String,
    price: Number,
    category: String,
    images: [String],
    business: ObjectId (ref: User),
    createdAt: Date
}
```

## 🎨 Customization

### Brand Colors
The application uses a purple theme. Modify CSS variables in `frontend/css/style.css`:

```css
:root {
    --primary-color: #8a2be2;      /* Main purple */
    --primary-dark: #7b1fa2;       /* Dark purple */
    --secondary-color: #ff4081;    /* Pink accent */
    --accent-color: #4caf50;       /* Green for success */
}
```

### Adding New Business Categories
Update the category options in `frontend/index.html`:

```html
<option value="new-category">New Category</option>
```

## 🚀 Deployment

### Backend Deployment (Heroku Example)
```bash
# Login to Heroku
heroku login

# Create Heroku app
heroku create queen-of-her-yard-backend

# Set environment variables
heroku config:set JWT_SECRET=your-secret-key
heroku config:set MONGODB_URI=your-mongodb-uri

# Deploy
git push heroku main
```

### Frontend Deployment (Netlify Example)
1. Build the frontend (if using a build process)
2. Drag and drop the `frontend` folder to Netlify
3. Configure redirects for SPA routing

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines
- Follow existing code style
- Write meaningful commit messages
- Test thoroughly before submitting
- Update documentation as needed

## 🐛 Troubleshooting

### Common Issues

**M-Pesa Integration Failing**
- Verify API credentials in `.env`
- Check network connectivity
- Ensure phone number format: 2547XXXXXXXX

**Database Connection Issues**
- Verify MongoDB is running
- Check `MONGODB_URI` in environment variables
- Ensure network access for cloud databases

**Frontend Not Loading**
- Check if backend server is running
- Verify CORS settings
- Check browser console for errors

### Debug Mode
Enable detailed logging by adding to `.env`:
```env
DEBUG=true
NODE_ENV=development
```

## 📞 Support

For support and questions:
- 📧 Email: support@queenofheryard.co.ke
- 📱 Phone: +254 700 000 000
- 🐛 Issues: [GitHub Issues](https://github.com/your-username/queen-of-her-yard/issues)

## 🙏 Acknowledgments

- **Safaricom M-Pesa** for payment integration
- **Women Entrepreneurs** in Kenya for inspiration
- **Open Source Community** for amazing tools and libraries

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
