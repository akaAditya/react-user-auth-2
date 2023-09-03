import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import expenseSlice from "./expense-slice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        expense: expenseSlice
    }
});

export default store;