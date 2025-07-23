# 🐝 Read Hive (Frontend Only)

A modern blogging platform where users can share their thoughts, quotes, or full-length articles — built with Angular and TypeScript.  
**Note:** This repository is for the frontend only. The backend is hosted in a separate repository (Node.js).

🌐 **Live Demo:** [https://read-hive-theta.vercel.app/global-feed](https://read-hive-theta.vercel.app/global-feed)

---

## ✨ Features

- 🔐 **Authentication (JWT)**
  - Sign Up with reactive username & email validation (unique)
  - Sign In
  - Update profile
- 📝 **Article Management (CRUD)**
  - Create, update, and delete articles using a WYSIWYG editor
  - Add tags and filter by tags
  - Like (Favorite) articles
  - View posts under "For You" and "Following" tabs
- 👤 **User Profiles**
  - Search and view profiles
  - Follow / Unfollow users
  - Change avatar
  - View user's articles and favorited articles
- 💬 **Comments**
  - Comment on articles
  - Edit or delete comments
  - Like or dislike comments
- 🔔 **Real-Time Notifications (WebSocket)**
  - Article reactions
  - New comments
  - New followers
  - Comment likes
- 📜 **Miscellaneous**
  - Tag list display
  - Infinite scroll for feeds
  - Mobile-responsive UI

---

## 🛠️ Tech Stack (Frontend)

- **Angular** v18.2.13  
- **TypeScript**  
- **TailwindCSS** – Utility-first CSS framework for custom styling  
- **NgZorro Ant Design** – Elegant and feature-rich UI components for Angular  
- **WebSocket** – Real-time notification system  
- **JWT** – Secure user authentication  
- **SCSS** – Additional custom styling  

> _Backend is built using Node.js (separate repository)._

---

## 📚 Use Case & Scope

This project reflects real-world development skills commonly required in freelance and client-based Angular projects.

It is applicable to:
- Single-Page Application (SPA) development  
- Dashboard and admin panel interfaces  
- CMS and blog platforms  
- Custom business frontends with real-time interactivity  
- Scalable, modular Angular applications with stateful behavior and API integration  

---

## 🚀 Installation (Optional for Devs)

```bash
git clone https://github.com/leipriets/readhive-fe.git
cd readhive-fe
npm install
ng serve
