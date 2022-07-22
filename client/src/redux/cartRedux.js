import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload)
      state.quantity += 1
      state.total += action.payload.price
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter(
        (item) => item._id !== action.payload._id
      )
      state.quantity -= 1
      state.total -= action.payload.price
    },
  },
})

export const { addProduct, removeProduct } = cartSlice.actions
export default cartSlice.reducer
