# 🌍 Final Project Travel Website

**Bootcamp Dibimbing - Front End Web Development**

## 🎯 Objectives

- Membuat tampilan Front End menggunakan **HTML, CSS, JavaScript**.
- Mengimplementasikan framework CSS **Tailwind CSS**.
- Mengelola proyek menggunakan **Git & GitHub**.
- Menerapkan **React** dalam pengembangan website.
- Melakukan **integrasi API (CRUD)**.
- Menggunakan **Redux** dalam manajemen state.
- Mengimplementasikan **Next.js/React Router** untuk routing.
- Melakukan **deployment** project.

---

## 📌 Scenario

Project ini dikerjakan secara **individu** dengan tema yang sudah ditentukan. Saya memilih **Travel Website** dengan fitur utama:

- User dapat melakukan **registrasi & login**.
- Melihat dan mencari **activities, categories, banners, promos**.
- Menambahkan aktivitas ke **cart** dan melakukan **checkout**.
- Melihat riwayat **transactions**.
- Admin dapat mengelola **CRUD data** (Activities, Categories, Promos, Banners, Transactions, Users).

API yang digunakan:  
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

```
src/
│   App.jsx
│   main.jsx
│   routes.jsx
│   styles.css
│
├───components
│   ActivityCard.jsx
│   Footer.jsx
│   Navbar.jsx
│   ProtectedRoute.jsx
│   UI.jsx
│
├───lib
│   api.js
│
├───pages
│   Activities.jsx
│   ActivityDetail.jsx
│   Cart.jsx
│   Category.jsx
│   Checkout.jsx
│   editProfile.jsx
│   Home.jsx
│   Login.jsx
│   Notfound.jsx
│   Profile.jsx
│   PromoDetail.jsx
│   Promos.jsx
│   Register.jsx
│   TransactionDetail.jsx
│   Transactions.jsx
│
│   └───admin
│       ActivitiesCRUD.jsx
│       BannersCRUD.jsx
│       CategoriesCRUD.jsx
│       Dashboard.jsx
│       PromosCRUD.jsx
│       TransactionsCRUD.jsx
│       UserCRUD.jsx
│
└───store
    index.js
    └───slices
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
```

---

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
git clone https://github.com/your-username/final-project-travel.git

# Masuk folder
cd final-project-travel

# Install dependencies
npm install

# Jalankan project
npm run dev
```

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
