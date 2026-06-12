import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
      const { name, image, cost } = action.payload; // Get plant details

      // Check if plant already exists in cart
      const existingItem = state.items.find(
        (item) => item.name === name
      );

      if (existingItem) {
        // Increase quantity if already in cart
        existingItem.quantity++;
      } else {
        // Add new plant with quantity 1
        state.items.push({
          name,
          image,
          cost,
          quantity: 1,
        });
      }
    },

    removeItem: (state, action) => {
      const { name } = action.payload;

      // Remove plant by name
      state.items = state.items.filter(
        (item) => item.name !== name
      );
    },

    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;

      // Find item to update
      const item = state.items.find(
        (item) => item.name === name
      );

      if (item) {
        item.quantity = quantity;
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;