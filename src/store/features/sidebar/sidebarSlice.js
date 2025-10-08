import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  sidebarShow: true,
  sidebarUnfoldable: false,
}

const sideBarSlice = createSlice({
  initialState,
  name: 'sidebar',
  reducers: {
    sideBarShow: (state, action) => {
      state.sidebarShow = action.payload
    },

    toggleSidebarUnfoldabl: (state, action) => {
      state.sidebarUnfoldable = !state.sidebarUnfoldable
    },
  },
})
export const { sideBarShow, toggleSidebarUnfoldabl } = sideBarSlice.actions
export default sideBarSlice.reducer
