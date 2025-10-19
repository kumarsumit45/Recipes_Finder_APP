# Recipe Finder App 🍳

A modern full-stack mobile application that helps users discover delicious recipes based on ingredients they have at home, dietary preferences, and cooking time constraints. Built with React Native, Express.js, and PostgreSQL.

[![React Native](https://img.shields.io/badge/React%20Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)](https://expo.dev/)
[![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)

---

## 📱 Features

### 🔐 Authentication & Security
- **Secure Signup & Login** with Clerk authentication
- **6-Digit Email Verification** for account security
- **Session Management** for seamless user experience

### 🍳 Recipe Discovery
- **Ingredient-Based Search** - Find recipes using ingredients you already have
- **Smart Filters** - Filter by dietary restrictions (vegetarian, vegan, gluten-free, etc.)
- **Category Browsing** - Explore recipes by cuisine, meal type, and more
- **Cook Time Options** - Search recipes based on available cooking time
- **Featured Recipes** - Curated selections of popular and trending recipes

### 📖 Recipe Details
- **Detailed Cooking Instructions** - Step-by-step guides for each recipe
- **YouTube Video Tutorials** - Watch cooking demonstrations
- **Nutritional Information** - View detailed nutritional facts
- **Ingredient Lists** - Complete ingredient breakdown with measurements
- **Community Ratings** - User-driven ratings and reviews

### ❤️ Personalization
- **Favorites System** - Save your favorite recipes for quick access
- **Shopping List Generator** - Create shopping lists from recipe ingredients
- **8 Color Themes** - Customize your app appearance

### 📱 Mobile Experience
- **Fully Responsive Design** - Seamless experience across all devices
- **Optimized Performance** - Fast loading and smooth navigation
- **Offline Support** - Access saved recipes without internet

---

## 🛠️ Tech Stack

### Frontend (Mobile)
- **React Native** - Cross-platform mobile framework
- **Expo** - Development and deployment platform
- **Clerk** - Authentication and user management
- **React Navigation** - Routing and navigation

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **PostgreSQL** - Relational database
- **Drizzle ORM** - Type-safe database toolkit
- **Neon** - Serverless PostgreSQL

### Tools & Services
- **100% Free Tools** - No paid services required
- **Git** - Version control
- **npm** - Package management

---

## 📂 Project Structure

```
receipe_App/
├── backend/                 # Express.js backend server
│   ├── src/
│   │   ├── config/         # Configuration files
│   │   │   ├── cron.js     # Scheduled tasks
│   │   │   ├── db.js       # Database connection
│   │   │   └── env.js      # Environment variables
│   │   ├── db/
│   │   │   ├── migrations/ # Database migrations
│   │   │   └── schema.js   # Database schema
│   │   └── server.js       # Main server file
│   ├── drizzle.config.js   # Drizzle ORM configuration
│   ├── package.json
│   └── .env
│
├── mobile/                  # React Native mobile app
│   ├── app/
│   │   ├── (auth)/         # Authentication screens
│   │   │   ├── sign-in.jsx
│   │   │   ├── sign-up.jsx
│   │   │   └── verify-email.jsx
│   │   ├── (tabs)/         # Tab navigation screens
│   │   │   └── index.jsx
│   │   └── _layout.tsx     # Root layout
│   ├── assets/
│   │   ├── images/         # App images and icons
│   │   └── styles/         # Global styles
│   ├── components/         # Reusable components
│   │   └── Devloper_Info.jsx
│   ├── app.json            # Expo configuration
│   ├── eas.json            # EAS Build configuration
│   └── package.json
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** - Package manager
- **Expo CLI** - `npm install -g expo-cli`
- **PostgreSQL** or **Neon account** - For database

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/kumarsumit45/Recipes_Finder_APP.git
   cd receipe_App
   ```

2. **Set up Backend**
   ```bash
   cd backend
   npm install
   ```

3. **Set up Mobile App**
   ```bash
   cd mobile
   npm install
   ```

---

## ⚙️ Environment Configuration

### Backend Environment Variables (`backend/.env`)

Create a `.env` file in the `backend` directory:

```bash
# Server Configuration
PORT=5001
NODE_ENV=development

# Database Configuration
DATABASE_URL=your_neon_postgresql_connection_string

# Example Neon DB URL format:
# DATABASE_URL=postgresql://username:password@host/database?sslmode=require
```

**Getting Neon Database URL:**
1. Sign up at [Neon.tech](https://neon.tech)
2. Create a new project
3. Copy the connection string from the dashboard
4. Paste it in your `.env` file

### Mobile App Environment Variables (`mobile/.env`)

Create a `.env` file in the `mobile` directory:

```bash
# Clerk Authentication
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key

# Backend API URL (update with your backend URL)
EXPO_PUBLIC_API_URL=http://localhost:5001
```

**Getting Clerk Publishable Key:**
1. Sign up at [Clerk.com](https://clerk.com)
2. Create a new application
3. Go to API Keys section
4. Copy the Publishable Key
5. Paste it in your `.env` file

---

## 🏃 Running the Application

### 1. Start the Backend Server

```bash
cd backend
npm run dev
```

The backend server will start on `http://localhost:5001`

### 2. Run Database Migrations (First time setup)

```bash
cd backend
npm run db:push
```

### 3. Start the Mobile App

```bash
cd mobile
npx expo start
```

This will open the Expo developer tools. You can:
- Press `a` to open on Android emulator
- Press `i` to open on iOS simulator
- Scan QR code with Expo Go app on your physical device

---

## 📱 Building for Production

### Android Build

```bash
cd mobile
eas build --platform android
```

### iOS Build

```bash
cd mobile
eas build --platform ios
```

---

## 🎨 Available Color Themes

The app includes 8 beautiful color themes:
1. Default Blue
2. Sunset Orange
3. Forest Green
4. Royal Purple
5. Cherry Red
6. Ocean Teal
7. Warm Brown
8. Elegant Black

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🐛 Known Issues

- None at the moment

---

## 📧 Contact

**Developer:** Sumit Kumar

**Project Link:** [https://github.com/kumarsumit45/Recipes_Finder_APP](https://github.com/kumarsumit45/Recipes_Finder_APP)

---

## 🙏 Acknowledgments

- Recipe data powered by community contributions
- Icons and images from [Unsplash](https://unsplash.com)
- Authentication by [Clerk](https://clerk.com)
- Database hosting by [Neon](https://neon.tech)

---

## ⭐ Show your support

Give a ⭐️ if this project helped you!

---

**Made with ❤️ using React Native and Express.js**
