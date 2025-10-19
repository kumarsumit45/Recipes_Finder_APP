Recipe Finder App 🍳
A modern web application that helps users discover delicious recipes based on ingredients they have at home, dietary preferences, and cooking time constraints.
Features ✨

**Ingredient-Based Search: Find recipes using ingredients you already have
Smart Filters: Filter by dietary restrictions (vegetarian, vegan, gluten-free, etc.)
Cook Time Options: Search recipes based on available cooking time
Favorite Recipes: Save your favorite recipes for quick access
Shopping List: Generate shopping lists from recipe ingredients
Nutritional Information: View detailed nutritional facts for each recipe
Recipe Ratings: Community-driven ratings and reviews
Mobile Responsive: Seamless experience across all devices**





Highlights:

- 🔐 Signup, Login, and 6-Digit Email Verification with **Clerk**
- 🍳 Browse Featured Recipes & Filter by Categories
- 🔍 Search Recipes and View Detailed Cooking Instructions
- 🎥 Recipe Pages Include YouTube Video Tutorials
- ❤️ Add Recipes to Favorites and Access Them from Favorites Tab
- ⚡ Tech Stack: React Native + Express + PostgreSQL + Expo
- 🌈 Includes 8 Color Themes
- 🆓 100% Free Tools — No Paid Services Required

---

## 🧪 .env Setup

### Backend (`/backend`)

```bash
PORT=5001
DATABASE_URL=your_neon_db_url
NODE_ENV=development
```

### Mobile App (`/mobile`)

```bash
EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

---

## 🔧 Run the Backend

```bash
cd backend
npm install
npm run dev
```

## 📱 Run the Mobile App

```bash
cd mobile
npm install
npx expo start
```