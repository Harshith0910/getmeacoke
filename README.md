<h1 align="center">GetMeACoke</h1>

<p align="center">
  <strong>Fuel your favorite creators, one Coke at a time.</strong><br>
  A frictionless micro-crowdfunding platform for direct fan support.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-Black?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Razorpay-02042B?style=for-the-badge&logo=razorpay&logoColor=3395FF" alt="Razorpay" />
</p>

---

## 🌟 The Vision

Inspired by platforms like Patreon and Buy Me a Coffee, **GetMeACoke** strips away complex monthly subscription tiers in favor of quick, frictionless micro-donations. Instead of a generic "donate" button, we use the relatable premise of buying a creator a Coke—making financial appreciation personal, fun, and easy. 

Our mission is to empower artists, musicians, podcasters, and content creators to build sustainable income through direct fan support. 

## ✨ Why Choose Us?

*   **💳 Frictionless Micro-Donations:** No complex tiers. Just a quick, secure checkout to send appreciation and a personal message.
*   **🤝 Creator-Friendly & Transparent:** Clear pricing with reliable payouts so you keep what you earn.
*   **🔒 Secure Ecosystem:** Authenticated via NextAuth (GitHub) and payments securely routed through the Razorpay API.
*   **🎁 Member Perks:** Easy subscription management for supporters to access exclusive member-only content.

## 🛠️ Tech Stack

Built with a modern, materialistic design philosophy and a highly scalable architecture:

*   **Framework:** Next.js (App Router)
*   **Frontend:** React, Tailwind CSS
*   **Database & ORM:** MongoDB Atlas with Mongoose
*   **Authentication:** NextAuth.js (GitHub Provider)
*   **Payment Gateway:** Razorpay API
*   **Deployment:** Vercel

## 📂 Project Structure

```text
getmeacoke/
├── actions/          # Server actions for handling form submissions and DB mutations
├── app/              # Next.js App Router pages and layout
├── components/       # Reusable UI components (Tailwind styled)
├── db/               # Database connection logic
├── models/           # Mongoose schemas for Users, Payments, etc.
├── public/           # Static assets
└── package.json      # Dependencies and scripts
```

## 🚀 Getting Started

Ready to run this locally? Follow these steps to get your development environment set up.

### Prerequisites
*   Node.js installed
*   MongoDB Atlas cluster URI
*   Razorpay API Keys
*   GitHub OAuth App credentials (for NextAuth)

### 1. Clone the repository
```bash
git clone https://github.com/Harshith0910/getmeacoke.git
cd getmeacoke
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env.local` file in the root directory and configure your keys:
```env
MONGODB_URI=your_mongodb_uri
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
GITHUB_ID=your_github_client_id
GITHUB_SECRET=your_github_client_secret
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

### 4. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to see the application in action.

---
**Author:** Chittapur Harshith 
