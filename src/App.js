import React, { Suspense, useEffect, useState } from 'react'
import { HashRouter, Route, Routes, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { CSpinner, CToaster, useColorModes } from '@coreui/react'
import './scss/style.scss'

// We use those styles to show code examples, you should remove them in your application.
import './scss/examples.scss'
import { allorders, allusers } from './APi/Routehandlers'
import { fetchallorders } from './store/features/orders/orderSlice'
import { fetchallproducts } from './store/features/products/productSlice'
import { fetchallusers } from './store/features/user/userSlice'

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))
export const ToastContext = React.createContext()
const App = () => {
  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const storedTheme = useSelector((state) => state.theme)
  const dispatch = useDispatch()
  const [toast, settoast] = useState(0)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split('?')[1])
    const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0]
    if (theme) {
      setColorMode(theme)
    }

    if (isColorModeSet()) {
      return
    }

    setColorMode(storedTheme)
  }, [])

  const fetchOrders = async () => {
    try {
      const data = await allorders('/orders/getall')
      console.log(data)
      dispatch(fetchallorders(data.data.orders))
    } catch (err) {
      console.log(err)
    }
  }
  const fetchproducts = async () => {
    try {
      const data = await allorders('/products/getall')
      dispatch(fetchallproducts(data.data.products))
    } catch (err) {
      console.log(err)
    }
  }
  const fetchusers = async () => {
    try {
      const data = await allusers('/users/getallusers')
      dispatch(fetchallusers(data.data.users))
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    
    fetchOrders()
    fetchproducts()
    fetchusers()
  }, [])

  return (
    <HashRouter>
      <Suspense
        fallback={
          <div className="pt-3 text-center">
            <CSpinner color="primary" variant="grow" />
          </div>
        }
      >
        <ToastContext.Provider value={settoast}>
          <Routes>
            <Route exact path="/login" name="Login Page" element={<Login />} />
            <Route exact path="/register" name="Register Page" element={<Register />} />
            <Route exact path="/404" name="Page 404" element={<Page404 />} />
            <Route exact path="/500" name="Page 500" element={<Page500 />} />
            <Route path="*" name="Home" element={<DefaultLayout />} />
          </Routes>
          <CToaster push={toast} placement="top-end" />
        </ToastContext.Provider>
      </Suspense>
    </HashRouter>
  )
}

export default App
