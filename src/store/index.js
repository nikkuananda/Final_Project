// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";

// ============================
// Import semua slice
// ============================
import authReducer from "./slices/authSlice";
import bannerReducer from "./slices/bannerSlice";
import categoryReducer from "./slices/categorySlice";
import activityReducer from "./slices/activitySlice";
import promoReducer from "./slices/promoSlice";
import cartReducer from "./slices/cartSlice";
import transactionReducer from "./slices/transactionSlice";
import paymentMethodReducer from "./slices/paymentMethodSlice";
import uploadImageReducer from "./slices/uploadImageSlice";
import userReducer from "./slices/userSlice";

// ============================
// Configure Store
// ============================
const store = configureStore({
  reducer: {
    auth: authReducer, // state.auth
    banners: bannerReducer, // state.banners
    categories: categoryReducer, // state.categories
    activities: activityReducer, // state.activities
    promos: promoReducer, // state.promos
    cart: cartReducer, // state.cart
    transactions: transactionReducer, // state.transactions
    paymentMethod: paymentMethodReducer, // state.paymentMethod
    uploadImage: uploadImageReducer, // state.uploadImage
    user: userReducer, // state.user
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // biar ga error saat pakai FormData / File
    }),
  devTools: process.env.NODE_ENV !== "production", // enable Redux DevTools hanya di dev
});

export default store;
