import { createSlice } from "@reduxjs/toolkit";

const initialExpenseState = {
  items: [],
  totalQuantity: 0,
  // changed: false
};

const expenseSlice = createSlice({
  name: "expense",
  initialState: initialExpenseState,
  reducers: {
    replaceExpenses(state, action) {
      state.items = action.payload.items;
    },
    addExpenses(state, action) {
      const newItems = action.payload;
      // state.changed = true;
      state.items.push({
        id: newItems.id,
        description: newItems.description,
        money: newItems.money,
        expenseOn: newItems.expenseOn,
      });
    },
    removeExpenses(state, action) {
      const id = action.payload;
      // state.changed = true;
      // console.log(id, 'id from reducer')
      // state.items = state.items.filter((item) => item.id !== id);
      const existingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
      }
    },
  },
});

export default expenseSlice.reducer;
export const expenseActions = expenseSlice.actions;
