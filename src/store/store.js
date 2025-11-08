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
import orderReducer from './features/orders/orderSlice'
import productReducer from './features/products/productSlice'
import userReducer from './features/user/userSlice'
export const store = configureStore({
  reducer: {
    theme: themereducer,
    sidebar: sidebarReducer,
    order: orderReducer,
    product: productReducer,
    user: userReducer,
  },
})
