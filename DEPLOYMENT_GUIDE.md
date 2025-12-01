# Deployment Guide: Render & Vercel

This guide provides step-by-step instructions for deploying your Queen of Her Yard application on **Render** (Backend) and **Vercel** (Frontend).

## 📋 Prerequisites

- GitHub repository with your code
- Accounts on [Render](https://render.com) and [Vercel](https://vercel.com)
- MongoDB database (Atlas or self-hosted)
- MPESA API credentials (for production)

---

## 🚀 Backend Deployment on Render

### Step 1: Prepare Your Backend for Deployment

#### 1.1 Update package.json
Ensure your `Backend/package.json` has the correct start script:

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

#### 1.2 Update server.js for Production
Modify your `Backend/server.js` to handle production environment:

```javascript
// Add this to the top of your server.js
const corsOptions = {
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ["http://localhost:5173"],
  credentials: true,
};

app.use(cors(corsOptions));
```

#### 1.3 Create Environment Configuration
Update your `Backend/.env` for production:

```env
NODE_ENV=production
PORT=5000
MONGO_URI=your_production_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret
BASE_URL=https://your-render-app.onrender.com
ALLOWED_ORIGINS=https://your-vercel-app.vercel.app,http://localhost:5173

# MPESA Configuration
MPESA_CONSUMER_KEY=your_mpesa_consumer_key
MPESA_CONSUMER_SECRET=your_mpesa_consumer_secret
MPESA_SHORTCODE=your_mpesa_shortcode
MPESA_PASSKEY=your_mpesa_passkey
```

### Step 2: Deploy Backend on Render

1. **Create Render Account**
   - Go to [render.com](https://render.com)
   - Sign up with GitHub

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the repository containing your backend code

3. **Configure Build Settings**
   - **Name**: `queen-of-her-yard-backend` (or your preferred name)
   - **Region**: Choose closest to your users
   - **Branch**: `main` (or your deployment branch)
   - **Root Directory**: `Backend` (since your backend is in Backend folder)
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

4. **Set Environment Variables**
   In Render dashboard, go to "Environment" tab and add:
   ```
   NODE_ENV=production
   PORT=5000
   MONGO_URI=your_production_mongodb_connection_string
   JWT_SECRET=your_secure_jwt_secret
   BASE_URL=https://your-render-app.onrender.com
   ALLOWED_ORIGINS=https://your-vercel-app.vercel.app,http://localhost:5173
   MPESA_CONSUMER_KEY=your_mpesa_consumer_key
   MPESA_CONSUMER_SECRET=your_mpesa_consumer_secret
   MPESA_SHORTCODE=your_mpesa_shortcode
   MPESA_PASSKEY=your_mpesa_passkey
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment to complete
   - Note your Render app URL (e.g., `https://queen-of-her-yard-backend.onrender.com`)

---

## 🌐 Frontend Deployment on Vercel

### Step 1: Prepare Your Frontend for Deployment

#### 1.1 Update Vite Configuration
Update `Frontend/vite.config.js`:

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: false,
  },
  build: {
    sourcemap: false, // Set to false for production
    outDir: 'dist',
    assetsDir: 'assets',
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
  },
});
```

#### 1.2 Update Environment Configuration
Create `Frontend/.env.production`:

```env
VITE_API_BASE_URL=https://your-render-app.onrender.com
VITE_NODE_ENV=production
```

Update `Frontend/src/api.js` or wherever you make API calls to use the environment variable:

```javascript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
```

#### 1.3 Update Package.json Scripts
Ensure your `Frontend/package.json` has build script:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

### Step 2: Deploy Frontend on Vercel

1. **Create Vercel Account**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub

2. **Import Project**
   - Click "New Project"
   - Import your GitHub repository
   - Select the frontend repository or set root directory to `Frontend`

3. **Configure Build Settings**
   - **Framework Preset**: `Vite`
   - **Root Directory**: `./` (or `Frontend` if repository root)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. **Set Environment Variables**
   In Vercel dashboard, go to "Environment Variables" tab and add:
   ```
   VITE_API_BASE_URL=https://your-render-app.onrender.com
   VITE_NODE_ENV=production
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Note your Vercel app URL (e.g., `https://queen-of-her-yard.vercel.app`)

---

## 🗄️ Database Setup

### MongoDB Atlas (Recommended)

1. **Create MongoDB Atlas Account**
   - Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
   - Create free account

2. **Create Cluster**
   - Choose free tier (M0)
   - Select region closest to your users
   - Create cluster

3. **Setup Database Access**
   - Go to "Database Access" → "Add New Database User"
   - Choose "Password" authentication
   - Create username and strong password
   - Assign "Atlas admin" role (for development)

4. **Setup Network Access**
   - Go to "Network Access" → "Add IP Address"
   - Choose "Allow access from anywhere" (0.0.0.0/0) for development
   - Add Render and Vercel IPs for production

5. **Get Connection String**
   - Go to "Clusters" → "Connect" → "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password

---

## 🔗 Connecting Frontend to Backend

### After Both Deployments

1. **Update Frontend Environment**
   In Vercel, update `VITE_API_BASE_URL` to your Render backend URL:
   ```
   VITE_API_BASE_URL=https://your-render-app.onrender.com
   ```

2. **Update Backend CORS**
   In Render, update `ALLOWED_ORIGINS` to include your Vercel URL:
   ```
   ALLOWED_ORIGINS=https://your-vercel-app.vercel.app,http://localhost:5173
   ```

3. **Update Base URL**
   Update backend environment:
   ```
   BASE_URL=https://your-render-app.onrender.com
   ```

---

## 🔄 CI/CD Pipeline

### Automatic Deployments

1. **Render Automatic Deploys**
   - Automatically deploys on every push to main branch
   - Configure in service settings

2. **Vercel Automatic Deploys**
   - Automatically deploys on every push to main branch
   - Configure in project settings

### Manual Deployment Triggers
- Push code to GitHub
- Both platforms will automatically detect changes and deploy

---

## 🛠️ Troubleshooting

### Backend Issues

#### Build Failures
- Check that all dependencies are in `package.json`
- Ensure `npm install` works locally
- Check build logs in Render dashboard

#### Runtime Errors
- Check application logs in Render dashboard
- Verify environment variables are set correctly
- Test API endpoints manually

#### CORS Issues
- Check `ALLOWED_ORIGINS` environment variable
- Ensure frontend URL is correctly configured
- Verify CORS configuration in `server.js`

### Frontend Issues

#### Build Failures
- Check that all dependencies are in `package.json`
- Ensure `npm run build` works locally
- Check build logs in Vercel dashboard

#### API Connection Issues
- Verify `VITE_API_BASE_URL` environment variable
- Check that backend is running and accessible
- Test API endpoints directly

#### Environment Variables Not Loading
- Ensure environment variables start with `VITE_`
- Redeploy after adding environment variables
- Check Vercel dashboard for environment variable status

---

## 📱 MPESA Integration

### Production MPESA Setup

1. **Get MPESA Credentials**
   - Register for MPESA Daraja API
   - Get consumer key and secret from Safaricom

2. **Update Environment Variables**
   ```env
   MPESA_CONSUMER_KEY=your_production_consumer_key
   MPESA_CONSUMER_SECRET=your_production_consumer_secret
   MPESA_SHORTCODE=your_production_shortcode
   MPESA_PASSKEY=your_production_passkey
   ```

3. **Test Integration**
   - Use sandbox environment first
   - Test with small amounts
   - Monitor logs for errors

---

## 🔒 Security Considerations

### Environment Variables
- Never commit `.env` files to GitHub
- Use secure, random values for JWT secrets
- Regularly rotate sensitive credentials

### CORS Configuration
- Only allow trusted origins in production
- Remove `http://localhost:5173` from production
- Use HTTPS for all external connections

### Database Security
- Use MongoDB Atlas for managed security
- Enable authentication and authorization
- Use IP whitelisting for production

---

## 📊 Monitoring and Logging

### Render Monitoring
- View logs in dashboard
- Set up health checks
- Monitor resource usage

### Vercel Analytics
- Enable Vercel Analytics
- Monitor performance metrics
- Track deployment frequency

### Application Monitoring
- Add error tracking (e.g., Sentry)
- Monitor API response times
- Set up uptime monitoring

---

## 🚀 Going Live Checklist

### Pre-Deployment
- [ ] Test locally with production environment variables
- [ ] Update all localhost URLs to production URLs
- [ ] Set up MongoDB Atlas database
- [ ] Configure MPESA sandbox credentials
- [ ] Test build process locally

### Deployment
- [ ] Deploy backend to Render
- [ ] Configure backend environment variables
- [ ] Deploy frontend to Vercel
- [ ] Configure frontend environment variables
- [ ] Update CORS settings on backend
- [ ] Test API endpoints
- [ ] Test frontend integration

### Post-Deployment
- [ ] Update DNS if using custom domain
- [ ] Set up SSL certificates
- [ ] Configure monitoring and logging
- [ ] Test payment integration
- [ ] Perform end-to-end testing
- [ ] Set up backup strategies

---

## 📞 Support Resources

- [Render Documentation](https://render.com/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [MPESA Daraja API Documentation](https://developer.safaricom.co.ke/)

---

## 🎯 Next Steps

1. Deploy backend to Render
2. Deploy frontend to Vercel
3. Configure database
4. Set up custom domain (optional)
5. Enable monitoring
6. Set up CI/CD pipeline

Good luck with your deployment! 🚀