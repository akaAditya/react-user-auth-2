import { createSlice } from "@reduxjs/toolkit";

const initialExpenseState = {
    description: '',
    money: '',
    expenseOn: ''
}

const expenseSlice = createSlice({
    name: 'expense',
    initialState: initialExpenseState,
    reducers: {
        expenses(state, action){
            state.description = action.description
            state.money = action.money
            state.expenseOn = action.expenseOn
        }
    }
})


export default expenseSlice.reducer;
export const expenseActions = expenseSlice.actions;