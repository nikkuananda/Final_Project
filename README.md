# 🌍 Final Project - Travel Lezia

**Bootcamp Dibimbing - Front End Web Development**

---

## 🎯 Objectives

- Membuat tampilan **Front End** menggunakan **HTML, CSS, JavaScript**
- Mengimplementasikan framework **Tailwind CSS**
- Mengelola proyek menggunakan **Git & GitHub**
- Menerapkan **React + Vite** dalam pengembangan website
- Integrasi dengan **API (CRUD)**
- Menggunakan **Redux Toolkit** untuk state management
- Mengimplementasikan **React Router DOM** untuk routing
- Deployment menggunakan **Vercel**

---

## 📌 Project Scenario

Website **Travel Lezia** dibangun dengan dua sisi: **User Side** dan **Admin Side**.

### ✨ User Side

- Registrasi & Login
- Lihat & cari **activities, categories, banners, promos**
- Tambah aktivitas ke **cart** dan lakukan **checkout**
- Lihat riwayat **transactions**
- Edit & update **profile**

### 🔧 Admin Side

- CRUD **Activities**
- CRUD **Categories**
- CRUD **Promos**
- CRUD **Banners**
- Kelola **Transactions**
- Kelola **Users**

**API yang digunakan:**  
👉 [Travel API Bootcamp](https://travel-journal-api-bootcamp.do.dibimbing.id)

---

## 🖥️ Tech Stack

- **Frontend**: React + Vite
- **Routing**: React Router DOM
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **HTTP Client**: Axios
- **Deployment**: Vercel

---

## 📂 Project Structure

````bash
src/
│   App.jsx
│   main.jsx
│   styles.css
│
├───assets/
├───components/
│   ├───activities/
│   ├───activityDetail/
│   ├───auth/
│   ├───cart/
│   ├───checkout/
│   ├───home/
│   ├───layout/
│   ├───profil/
│   ├───promo/
│   ├───transactions/
│   └───ui/
│
├───hooks/
├───lib/
│   api.js
│
├───pages/
│   Activities.jsx
│   ActivityDetail.jsx
│   Cart.jsx
│   Category.jsx
│   Checkout.jsx
│   EditProfile.jsx
│   Home.jsx
│   Login.jsx
│   NotFound.jsx
│   Profile.jsx
│   PromoDetail.jsx
│   Promos.jsx
│   Register.jsx
│   TransactionDetail.jsx
│   Transactions.jsx
│   └───admin/
│       ActivitiesCRUD.jsx
│       BannersCRUD.jsx
│       CategoriesCRUD.jsx
│       Dashboard.jsx
│       PromosCRUD.jsx
│       TransactionsCRUD.jsx
│       UserCRUD.jsx
│
└───store/
    index.js
    └───slices/
        activitySlice.js
        authSlice.js
        bannerSlice.js
        cartSlice.js
        categorySlice.js
        paymentMethodSlice.js
        promoSlice.js
        transactionSlice.js
        uploadImageSlice.js
        userSlice.js

## 🚀 Features

### 👤 User Side

- Login / Register dengan validasi form.
- Melihat daftar **activities, categories, promos**.
- Detail activity + tambah ke **cart**.
- Checkout dengan **payment method**.
- Riwayat transaksi (transactions).
- Update **profile**.

### 🛠️ Admin Side

- CRUD **Activities**.
- CRUD **Categories**.
- CRUD **Promos**.
- CRUD **Banners**.
- Kelola **Transactions**.
- Kelola **Users**.

---

## 🔗 API Endpoint Utama

- **Authentication**
- **User**
- **Category**
- **Activity**
- **Promo**
- **Banner**
- **Payment Method**
- **Cart**
- **Transaction**

---

## 🌐 Deployment

Project sudah di-deploy menggunakan **Vercel**:
👉 [Live Demo](https://your-vercel-link.vercel.app)

---

## 📝 How to Run Locally

```bash
# Clone repo
git clone https://github.com/nikkuananda/Final_Project.git

# Masuk folder
cd travel-lezia

# Install dependencies
npm install

# Jalankan project
npm run dev
````

# Deploy vercel :✅ https://final-project-qj6nh39lv-nikkus-projects-3bfc40ac.vercel.app

---

## 📊 Rubrik Penilaian

- **Code Structure**: 25%
- **Project Delivery**: 20%
- **Project Implementation**: 50%
- **Presentation**: 5%

---

## 👨‍💻 Author

**Nikku Ananda**  
Bootcamp Dibimbing - Front End Web Development
