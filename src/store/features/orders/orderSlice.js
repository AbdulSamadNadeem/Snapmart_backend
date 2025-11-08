import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  allOrders: [],
}
const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    fetchallorders: (state, { payload }) => {
      console.log(payload)
      state.allOrders = payload
    },
  },
})
export const { fetchallorders } = orderSlice.actions
export default orderSlice.reducer
