// src/store/index.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import bannerReducer from "./slices/bannerSlice";
import categoryReducer from "./slices/categorySlice";
import activityReducer from "./slices/activitySlice";
import promoReducer from "./slices/promoSlice";
import cartReducer from "./slices/cartSlice";
import transactionReducer from "./slices/transactionSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    banners: bannerReducer,
    categories: categoryReducer,
    activities: activityReducer,
    promos: promoReducer,
    cart: cartReducer,
    transactions: transactionReducer,
  },
});

export default store;
