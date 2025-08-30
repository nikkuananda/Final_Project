// src/store/index.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";

// Import semua slice
import authReducer from "./slices/authSlice";
import bannerReducer from "./slices/bannerSlice";
import categoryReducer from "./slices/categorySlice";
import activityReducer from "./slices/activitySlice";
import promoReducer from "./slices/promoSlice";
import cartReducer from "./slices/cartSlice";
import transactionReducer from "./slices/transactionSlice";
import paymentReducer from "./slices/paymentSlice";
import paymentTransactionReducer from "./slices/paymentTransactionSlice";
import checkoutReducer from "./slices/checkoutSlice"; // ✅ tambahin

// Gabungkan reducer biar lebih rapih
const rootReducer = combineReducers({
  auth: authReducer,
  banners: bannerReducer,
  categories: categoryReducer,
  activities: activityReducer,
  promos: promoReducer,
  cart: cartReducer,
  transactions: transactionReducer,
  payment: paymentReducer,
  paymentTransaction: paymentTransactionReducer,
  checkout: checkoutReducer, // ✅ daftarkan checkout
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // biar aman kalau ada FormData/Date
    }),
  devTools: import.meta.env.MODE !== "production",
});

export default store;
