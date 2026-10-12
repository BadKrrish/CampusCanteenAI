# 🎓 CampusAI Smart Canteen System

A modern, fast, and capacity-aware smart canteen pre-ordering web application built with **React 18**, **TypeScript**, **Tailwind CSS**, and **Vite**.

Designed to eliminate long queues during college break times by letting students pre-order food, pick capacity-aware pickup slots, pay seamlessly via **Stripe UPI (Collect & QR)**, and cancel within a 90-second grace window with instant refunds. Features dedicated portals for **Students**, **Kitchen Staff**, **Canteen Owners**, and a live **Developer Terminal Audit CLI**.

---

## 🚀 Key Features

### 👤 Student Portal
* **Authentic Vegetarian Menu**: Handpicked high-definition images for authentic dishes (Chole Bhature, Samosa Chaat, Roasted Makhana, Masala Dosa, Paneer Kathi Roll, Pav Bhaji, Thali, Gulab Jamun, Chai, etc.).
* **Capacity-Aware Pickup Slots**: Dynamic workload management ensures students only book slots the kitchen can handle.
* **Special Cooking Instructions**: Dietary checkboxes (Make Spicy 🌶️, Jain / No Onion-Garlic 🧅, Extra Cheese 🧀) and custom chef notes.
* **Stripe UPI Payment Gateway**:
  * Real UPI ID / VPA Collect (`username@okhdfcbank`, `9876543210@paytm`).
  * Verified Google Pay QR code for instant scan-to-pay.
  * Verified API endpoints powered by Stripe Payments API.
* **⏱️ 90-Second Cancellation Window**:
  * Real-time ticking countdown clock on newly placed orders.
  * Students can cancel with one click within 90s for an instant 100% refund before cooking starts.

### 🍳 Kitchen Staff Portal
* **Live Order Queue**: Track orders through workflow stages (`Confirmed` ➔ `Preparing` ➔ `Ready for Pickup`).
* **Smart Batch Preparation Checklist**: Automatically aggregates active demand across orders (e.g. prepares 12x Chole Bhature simultaneously).
* **Audio Alerts & Controls**: Toggle order bell chime, pause online orders during rush hour, or take walk-in orders.

### 🏪 Canteen Owner & Analytics Portal
* **Revenue & Sales Analytics**: Real-time sales metrics, popular item analysis, and peak hour rush breakdown.
* **Inventory Stock Alerts**: Low ingredient warnings with one-click supplier reordering.
* **Export Reports**: One-click CSV audit log export.

### 💻 Developer Live Database & Audit CLI
* File-backed JSON store in `database/dev-db.json`.
* Single terminal command (`npm run db`) to view:
  * Registered users with login credentials and authentication providers.
  * Real-time activity audit stream (`USER_LOGGED_IN`, `ITEM_ADDED_TO_CART`, `ORDER_PLACED`, `ORDER_CANCELLED`, `KITCHEN_STATUS_UPDATE`, etc.).

---

## 🛠️ Tech Stack

* **Frontend**: React 18, TypeScript, Tailwind CSS, Lucide React
* **Routing**: React Router v7 (SPA)
* **Build Tool**: Vite 5
* **Payment Integration**: Stripe API (`@stripe/stripe-js`) & UPI India Gateway
* **Database & Auditing**: Vite Dev Server Database Plugin (`dev-db.json`) + Node.js CLI Inspector
* **Deployment**: Netlify Ready (`netlify.toml` + `public/_redirects`)

---

## 📦 Getting Started Locally

### 1. Prerequisites
* [Node.js](https://nodejs.org/) (version 18 or higher recommended)
* npm (bundled with Node.js)

### 2. Installation
Clone the repository and install dependencies:

```bash
git clone https://github.com/your-username/campus-canteen.git
cd campus-canteen
npm install
```

### 3. Run the Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

### 4. Inspect the Developer Database
Open another terminal tab and run:
```bash
npm run db
```

---

## 🌐 Deploy to Netlify

This project is pre-configured for **1-click Netlify deployment** using `netlify.toml` and `public/_redirects` to handle client-side routing.

### Method 1: Deploy with Netlify Git Integration (Recommended)
1. Push this repository to **GitHub**.
2. Log in to [Netlify](https://app.netlify.com/).
3. Click **"Add new site"** ➔ **"Import an existing project"**.
4. Select **GitHub** and choose your `campus-canteen` repository.
5. Netlify will automatically detect the settings:
   * **Build command**: `npm run build`
   * **Publish directory**: `dist`
6. Click **Deploy campus-canteen**.

### Method 2: Deploy using Netlify CLI
```bash
npm install -g netlify-cli
npm run build
netlify deploy --prod --dir=dist
```

---

## 📁 Project Structure

```
campus-canteen/
├── public/                  # Static assets & QR codes
│   ├── upi-qr.jpg           # Deepjyoti Saha UPI QR Code
│   └── _redirects           # Netlify SPA redirect fallback
├── database/
│   └── dev-db.json          # Developer audit database
├── scripts/
│   └── inspect-db.cjs       # Terminal audit tool (npm run db)
├── src/
│   ├── components/          # Reusable UI components & layouts
│   ├── context/             # React context (Cart, Auth, etc.)
│   ├── data/                # Mock data (Menu items, slots, orders)
│   ├── pages/               # Views (Student, Kitchen, Owner, Auth)
│   │   ├── student/         # Menu, Cart, Checkout, Dashboard
│   │   ├── kitchen/         # Operations queue & batch checklist
│   │   ├── owner/           # Analytics, inventory, CSV export
│   │   ├── Login.tsx        # Credential & OAuth login
│   │   └── Register.tsx     # Student/Staff registration
│   ├── services/            # Stripe API & Dev database logger
│   └── types/               # TypeScript interfaces & definitions
├── netlify.toml             # Netlify deployment configuration
├── vite.config.ts           # Vite configuration & dev database plugin
└── package.json
```

---

## 🔑 Demo Credentials

| Role | Email / Username | Password |
| :--- | :--- | :--- |
| **Student** | `student@campus.edu` | `campus@2026` |
| **Kitchen Staff** | `kitchen@campus.edu` | `demoPass123` |
| **Canteen Owner** | `admin@campus.edu` | `demoPass123` |

*(You can also use one-click "Demo Login" buttons directly on the Login page).*

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
