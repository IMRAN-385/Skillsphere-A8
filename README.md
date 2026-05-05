# 🎓 SkillSphere – Online Learning Platform

SkillSphere is a modern, high-performance online learning platform built with Next.js 15. It allows users to explore expert-led courses, manage their profiles, and join a community of learners. This project was developed as part of a Web Development assignment (Category-A8-Orange).

## 🚀 Live Demo
**Live URL:** [https://skillspheree.vercel.app](https://skillspheree.vercel.app)

---

## ✨ Key Features
- **Modern UI/UX**: A sleek, premium design with dark mode aesthetics and smooth animations.
- **Dynamic Course Listings**: Explore a variety of courses fetched from a remote JSON API.
- **Authentication System**: Secure login and registration powered by **BetterAuth**, including Google Social Login.
- **Protected Routes**: Course details are only accessible to logged-in users.
- **Course Search**: Real-time search functionality on the courses page to find specific topics quickly.
- **User Dashboard**: A dedicated profile page where users can view their information.
- **Profile Management**: Feature-rich profile update system to change name and profile image.
- **Responsive Design**: Fully optimized for Desktop, Tablet, and Mobile devices.
- **Animations**: Integrated with `Animate.css` for a dynamic and engaging user experience.

---

## 🛠️ Technology Stack
- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) & [DaisyUI](https://daisyui.com/)
- **Authentication**: [BetterAuth](https://www.better-auth.com/)
- **Database**: [MongoDB](https://www.mongodb.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Notifications**: [React Hot Toast](https://react-hot-toast.com/) & [React Toastify](https://fkhadra.github.io/react-toastify/)
- **Animations**: [Animate.css](https://animate.style/) & [Swiper.js](https://swiperjs.com/)

---

## 📦 NPM Packages Used
- `next`
- `react`
- `better-auth`
- `@better-auth/mongo-adapter`
- `mongodb`
- `tailwindcss`
- `daisyui`
- `lucide-react`
- `animate.css`
- `react-hot-toast`
- `react-toastify`
- `swiper`

---

## ⚙️ Environment Variables
To run this project locally, create a `.env` file in the root directory and add the following:

```env
BETTER_AUTH_SECRET=your_secret_here
BETTER_AUTH_URL=http://localhost:3000
MONGODB_URI=your_mongodb_connection_string
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

---

## 🏃 Getting Started
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```


---

## 👨‍💻 Author
**SkillSphere Team**  
