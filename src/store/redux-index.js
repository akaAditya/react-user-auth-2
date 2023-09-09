import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import expenseSlice from "./expense-slice";
import themeSlice from "./theme-slice";
import emailSlice from './email-store'

const store = configureStore({
    reducer: {
        auth: authSlice,
        expense: expenseSlice,
        darkMode: themeSlice,
        email: emailSlice
    }
});

export default store;