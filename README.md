# CARETAKERS - Compassionate Care Services

A full-stack web application providing professional home-nursing, adoption services, and companionship services.

## 🚀 Features

- **User Authentication**: Secure registration and login for both service users and providers
- **Home-Nursing Services**: Professional care for elderly, post-surgery, chronic illness, and disability support
- **Adoption Services**: Comprehensive adoption assistance with child matching
- **Companionship Services**: Call and message-based emotional support
- **Responsive Design**: Optimized for both mobile and desktop devices
- **Modern UI**: Clean, professional interface with smooth animations

## 🛠 Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Lucide React** for icons

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **CORS** for cross-origin requests

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or MongoDB Atlas)
- Git

### Clone the Repository
```bash
git clone https://github.com/yourusername/caretakers.git
cd caretakers
```

### Install Dependencies
```bash
npm install
```

### Environment Setup
Create a `.env` file in the root directory:
```env
# Database
MONGODB_URI=mongodb://localhost:27017/caretakers
# For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/caretakers

# JWT Secret (Change this to a secure random string in production)
JWT_SECRET=your-super-secure-jwt-secret-key-change-this-in-production

# Server Configuration
PORT=5000
NODE_ENV=development

# Frontend URL (for CORS)
CLIENT_URL=http://localhost:5173
```

## 🚀 Development

### Start Development Server (Full Stack)
```bash
npm run dev:full
```
This starts both the backend server (port 5000) and frontend dev server (port 5173).

### Start Frontend Only
```bash
npm run dev
```

### Start Backend Only
```bash
npm run server:dev
```

## 🏗 Building for Production

### Build Frontend
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

## 📁 Project Structure

```
caretakers/
├── src/                    # Frontend source code
│   ├── components/         # React components
│   ├── pages/             # Page components
│   ├── utils/             # Utility functions and API client
│   └── index.css          # Global styles
├── server/                # Backend source code
│   ├── config/            # Database configuration
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── middleware/        # Express middleware
│   └── server.js          # Express server setup
├── public/                # Static assets
└── package.json           # Dependencies and scripts
```

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update user profile
- `POST /api/auth/change-password` - Change password

### Services
- `GET /api/services` - Get all services (with filters)
- `POST /api/services` - Create new service (providers only)
- `GET /api/services/:id` - Get service details
- `PUT /api/services/:id` - Update service (owner only)
- `DELETE /api/services/:id` - Delete service (owner only)
- `POST /api/services/:id/book` - Book a service (users only)
- `POST /api/services/:id/review` - Add review (clients only)
- `GET /api/services/my/bookings` - Get user's bookings

### Users
- `GET /api/users/providers` - Get all service providers
- `GET /api/users/provider/:id` - Get provider details
- `PUT /api/users/provider-profile` - Update provider profile
- `GET /api/users/stats` - Get user statistics

## 🚀 Deployment

### Deploy to Heroku

1. **Install Heroku CLI**
```bash
npm install -g heroku
```

2. **Login to Heroku**
```bash
heroku login
```

3. **Create Heroku App**
```bash
heroku create your-app-name
```

4. **Set Environment Variables**
```bash
heroku config:set MONGODB_URI=your-mongodb-atlas-uri
heroku config:set JWT_SECRET=your-jwt-secret
heroku config:set NODE_ENV=production
heroku config:set CLIENT_URL=https://your-app-name.herokuapp.com
```

5. **Deploy**
```bash
git add .
git commit -m "Deploy to Heroku"
git push heroku main
```

### Deploy to Netlify (Frontend) + Railway (Backend)

#### Backend on Railway:
1. Connect your GitHub repo to Railway
2. Set environment variables in Railway dashboard
3. Deploy automatically on push

#### Frontend on Netlify:
1. Build the frontend: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Set environment variable: `VITE_API_URL=your-railway-backend-url`

### Deploy to Vercel

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Deploy**
```bash
vercel
```

3. **Set Environment Variables** in Vercel dashboard

## 🔧 Environment Variables

### Required Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/caretakers` |
| `JWT_SECRET` | Secret key for JWT tokens | `your-super-secure-secret-key` |
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment mode | `production` |
| `CLIENT_URL` | Frontend URL for CORS | `https://your-domain.com` |

### Frontend Environment Variables (Optional)

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `http://localhost:5000/api` |

## 🧪 Testing

### Run Tests
```bash
npm test
```

### API Testing
Use tools like Postman or Thunder Client to test API endpoints:
- Import the API collection from `docs/api-collection.json`
- Set base URL to `http://localhost:5000/api`

## 📝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -am 'Add new feature'`
4. Push to branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Support

For support, email support@caretakers.com or create an issue in the GitHub repository.

## 🔄 Version History

- **v1.0.0** - Initial release with core features
- **v1.1.0** - Added service booking and reviews
- **v1.2.0** - Enhanced user profiles and provider management

---

Made with ❤️ by the CARETAKERS team