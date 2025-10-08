// import { legacy_createStore as createStore } from 'redux'

// const initialState = {
//   sidebarShow: true,
//   theme: 'light',
// }

// const changeState = (state = initialState, { type, ...rest }) => {
//   switch (type) {
//     case 'set':
//       return { ...state, ...rest }
//     default:
//       return state
//   }
// }

// const store = createStore(changeState)
// export default store

import { configureStore } from '@reduxjs/toolkit'
import themereducer from './features/theme/themeSlice'
import sidebarReducer from './features/sidebar/sidebarSlice'
export const store = configureStore({
  reducer: { theme: themereducer, sidebar: sidebarReducer },
})
