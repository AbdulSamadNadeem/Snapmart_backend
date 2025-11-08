import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  allUsers: [],
}
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchallusers: (state, { payload }) => {
      state.allUsers = payload
    },
  },
})
export const { fetchallusers } = userSlice.actions
export default userSlice.reducer
