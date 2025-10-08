import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  sidebarShow: true,
  theme: 'light',
  sidebarUnfoldable: false,
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
  },
})

export const { changeState } = themeSlice.actions

export default themeSlice.reducer
