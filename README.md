# 🎬 Movie Explorer App

A modern, responsive movie discovery application built with React, TypeScript, and Tailwind CSS. Explore movies, create your favorites list, and dive into detailed movie information with a beautiful, cinematic interface.

![Movie Explorer](https://img.shields.io/badge/React-18.3.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-Latest-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-blue)
![Vite](https://img.shields.io/badge/Vite-Latest-purple)

## ✨ Features

### 🔐 Authentication System
- **User Registration & Login** - Secure authentication with form validation
- **Protected Routes** - Access control for authenticated users only
- **Persistent Sessions** - User state maintained across browser sessions
- **Local Storage Integration** - Secure credential management

### 🎥 Movie Discovery
- **Browse Popular Movies** - Curated selection of trending films
- **Top Rated Collection** - Highest-rated movies from TMDB
- **Now Playing** - Current theatrical releases
- **Upcoming Releases** - Preview upcoming movies
- **Advanced Search** - Real-time movie search with instant results
- **Infinite Scrolling** - Seamless content loading experience

### 📱 User Experience
- **Responsive Design** - Optimized for desktop, tablet, and mobile
- **Dark/Light Theme** - Automatic theme switching with system preference
- **Smooth Animations** - Elegant transitions and hover effects
- **Loading States** - Professional skeleton loading indicators
- **Toast Notifications** - User-friendly feedback system

### ❤️ Personal Features
- **Favorites Management** - Save and organize your favorite movies
- **Detailed Movie Pages** - Comprehensive movie information
- **Rating Display** - TMDB ratings and popularity indicators
- **Release Information** - Dates, genres, and production details

## 🛠️ Tech Stack

### Frontend Framework
- **React 18.3** - Modern React with hooks and context
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool and dev server

### Styling & UI
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/UI** - High-quality, accessible component library
- **Lucide Icons** - Beautiful, customizable icons
- **Custom Design System** - Consistent theming and animations

### Authentication & State Management
- **NextAuth.js** - Complete authentication solution
- **TanStack Query** - Powerful data fetching and caching
- **React Context** - Authentication state management
- **Local Storage** - Client-side data persistence

### API & External Services
- **TMDB API** - The Movie Database for comprehensive movie data
- **Next.js Image Optimization** - Automatic image optimization and lazy loading
- **Axios** - HTTP client for API requests

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd movie-explorer-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   # Copy the environment template
   cp .env.example .env
   
   # Edit .env and add your TMDB API key
   VITE_TMDB_API_KEY=your_api_key_here
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:8080`

### Building for Production

```bash
# Create production build
npm run build

# Preview production build locally
npm run preview
```

## 🔑 API Configuration

### TMDB API Setup
1. Visit [The Movie Database (TMDB)](https://www.themoviedb.org/)
2. Create a free account
3. Navigate to Settings → API
4. Request an API key
5. Add your API key to the `.env` file

### Environment Variables
```env
VITE_TMDB_API_KEY=your_tmdb_api_key_here
```

## 📂 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Shadcn/UI components
│   ├── Layout.tsx      # App layout wrapper
│   ├── MovieCard.tsx   # Movie display card
│   ├── MovieGrid.tsx   # Movie grid layout
│   └── SearchBar.tsx   # Search functionality
├── contexts/           # React context providers
│   └── AuthContext.tsx # Authentication context
├── hooks/              # Custom React hooks
├── lib/                # Utility libraries
│   ├── auth.ts         # Authentication logic
│   ├── favorites.ts    # Favorites management
│   ├── tmdb.ts         # TMDB API integration
│   └── utils.ts        # General utilities
├── pages/              # Application pages
│   ├── Dashboard.tsx   # Main movie browsing
│   ├── Favorites.tsx   # User's favorite movies
│   ├── Login.tsx       # Authentication
│   ├── MovieDetail.tsx # Individual movie details
│   └── Register.tsx    # User registration
└── App.tsx             # Main application component
```

## 🎨 Design System

### Color Palette
- **Primary**: Cinematic gold (#FFB800)
- **Secondary**: Deep purple gradients
- **Background**: Dynamic dark/light themes
- **Accents**: Warm cinematic tones

### Typography
- **Headers**: Bold, cinematic styling
- **Body**: Clean, readable fonts
- **Interactive**: Subtle hover animations

### Components
- **Cards**: Elevated with subtle shadows
- **Buttons**: Multiple variants with smooth transitions
- **Forms**: Clean, accessible input styling
- **Navigation**: Intuitive, responsive layout

## 🔒 Authentication Flow

1. **Registration**: New users create accounts with email/password
2. **Login**: Existing users authenticate with credentials
3. **Session Management**: JWT-style tokens stored securely
4. **Route Protection**: Automatic redirection for unauthorized access
5. **Logout**: Clean session termination

## 📱 Responsive Design

- **Mobile First**: Optimized for small screens
- **Tablet Friendly**: Perfect medium-screen experience
- **Desktop Enhanced**: Full-featured large-screen interface
- **Touch Optimized**: Smooth mobile interactions

## 🚀 Performance Features

- **Code Splitting**: Automatic route-based splitting
- **Image Optimization**: Lazy loading and responsive images
- **Caching**: Smart API response caching
- **Bundle Optimization**: Minimized production builds

## 🧪 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 🌟 Key Features Showcase

### Movie Discovery
- Browse by categories (Popular, Top Rated, Now Playing, Upcoming)
- Real-time search with instant results
- Infinite scroll for seamless browsing
- Detailed movie information pages

### User Management
- Secure authentication system
- Personalized favorites collection
- Persistent user preferences
- Protected route access

### Modern UI/UX
- Smooth animations and transitions
- Responsive grid layouts
- Interactive hover effects
- Professional loading states

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [The Movie Database (TMDB)](https://www.themoviedb.org/) for the comprehensive movie API
- [Shadcn/UI](https://ui.shadcn.com/) for the beautiful component library
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Lucide](https://lucide.dev/) for the elegant icon set

## 📞 Support

If you encounter any issues or have questions, please feel free to:
- Open an issue on GitHub
- Contact the development team
- Check the documentation

---

**Built with ❤️ for movie enthusiasts everywhere**