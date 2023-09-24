import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [], totalQuantity: 0 },
  reducers: {
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity
      state.items = action.payload.items
    },
    addItemsToCart(state, action) {
      const newItem = action.payload
      const existingItem = state.items.find(item => item.id === newItem.id)
      state.totalQuantity++
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        })
      } else {
        existingItem.quantity++
        existingItem.totalPrice += newItem.price
      }
    },
    removeItemFromCart(state, action) {
      const existingItem = state.items.find(item => item.id === action.payload)
      state.totalQuantity--
      if (existingItem.quantity === 1) {
        state.items = state.items.filter(item => item.id !== action.payload)
      } else {
        existingItem.quantity--
        existingItem.totalPrice -= existingItem.price
      }
    },
  },
})

export default cartSlice
export const cartActions = cartSlice.actions
