import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  sidebarShow: true,
  theme: 'light',
  sidebarUnfoldable: false,
  newOrders: false,
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    changeState: (state, { type, ...rest }) => {
      switch (type) {
        case 'set':
          return { ...state, ...rest }
        default:
          return state
      }
    },
    isNeworders: (state, { payload }) => {
      console.log("payload",payload)
      if (payload) {
        state.newOrders = true
      } else {
        state.newOrders = false
      }
    },
  },
})

export const { changeState ,isNeworders} = themeSlice.actions

export default themeSlice.reducer
