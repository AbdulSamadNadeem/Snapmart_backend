import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  allProducts: [],
}
const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    fetchallproducts: (state, { payload }) => {
      console.log(payload)
      state.allProducts = payload
    },
  },
})
export const { fetchallproducts } = productSlice.actions
export default productSlice.reducer
