import React, { useContext, useEffect, useState } from 'react'
import {
  CCard,
  CTable,
  CTableHead,
  CTableRow,
  CTableBody,
  CTableDataCell,
  CAvatar,
  CTableHeaderCell,
  CButton,
  CToast,
  CToastHeader,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import { cilPeople } from '@coreui/icons'
import { getOrderbyId, updateOrder } from '../../../APi/Routehandlers'
import { ToastContext } from '../../../App'
import { useLocation, useNavigate } from 'react-router-dom'

const Colors = () => {
  const [error, setError] = useState('')
  const [orders_items, setOrders_items] = useState([])
  const settoast = useContext(ToastContext)
  const location = useLocation()
  const { id } = location.state || {}
  const navigate = useNavigate()
  const getorders = async () => {
    try {
      const response = await getOrderbyId(`/orders/getorderbyid/${id}`)
      console.log(response.data.data)
      setOrders_items(response.data.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getorders()
  }, [])

  return (
    <>
      <CCard className="mb-4">
        <CTable align="middle" className="mb-0 border" hover responsive>
          <CTableHead className="text-nowrap">
            <CTableRow>
              <CTableHeaderCell className="bg-body-tertiary text-center">Order ID</CTableHeaderCell>
              <CTableHeaderCell className="bg-body-tertiary text-center">Product</CTableHeaderCell>
              <CTableHeaderCell className="bg-body-tertiary text-center">Image</CTableHeaderCell>
              <CTableHeaderCell className="bg-body-tertiary text-center">InStock</CTableHeaderCell>
              <CTableHeaderCell className="bg-body-tertiary text-center">Price</CTableHeaderCell>
              <CTableHeaderCell className="bg-body-tertiary text-center">Quantity</CTableHeaderCell>
              <CTableHeaderCell className="bg-body-tertiary text-center">Total</CTableHeaderCell>
            </CTableRow>
          </CTableHead>

          <CTableBody>
            {orders_items.map((item, index) => (
              <React.Fragment key={index}>
                <CTableRow>
                  <CTableDataCell className="text-center">{item.order_id}</CTableDataCell>

                  {item.product.map((prod, i) => (
                    <React.Fragment key={i}>
                      <CTableDataCell className="text-center">{prod.name}</CTableDataCell>
                      <CTableDataCell className="text-center">
                        <img
                          src={prod.image_url}
                          alt={prod.name}
                          style={{
                            width: '50px',
                            height: '50px',
                            objectFit: 'cover',
                            borderRadius: '8px',
                          }}
                        />
                      </CTableDataCell>
                      {Number(prod.stock) > 0 ? (
                        <CTableDataCell className="text-center text-success">Yes</CTableDataCell>
                      ) : (
                        <CTableDataCell className="text-center text-danger">No</CTableDataCell>
                      )}
                    </React.Fragment>
                  ))}

                  <CTableDataCell className="text-center">{item.price}</CTableDataCell>
                  <CTableDataCell className="text-center">{item.quantity}</CTableDataCell>
                  <CTableDataCell className="text-center">
                    {(Number(item.quantity) * Number(item.price)).toFixed(2)}
                  </CTableDataCell>
                </CTableRow>
              </React.Fragment>
            ))}
            <CTableRow>
              <CTableDataCell colSpan="100%">
                <div className="d-flex justify-content-center gap-4">
                  <CButton
                    onClick={() => navigate('/management/confirm_orders', { state: { id } })}
                    color="success"
                    className="mt-3 px-4"
                    active
                    tabIndex={-1}
                  >
                    Approve Order
                  </CButton>

                  <CButton
                    onClick={async () => {
                      const response = await updateOrder('/orders/updatestatus', {
                        status: 'canceled',
                        id: id,
                      })
                      if (response.status === 200) {
                        settoast(
                          <CToast autohide color="danger" className="text-white">
                            <CToastHeader closeButton>Order canceled</CToastHeader>
                          </CToast>,
                        )
                      }
                    }}
                    color="danger"
                    className="mt-3 px-4"
                    active
                    tabIndex={-1}
                  >
                    Cancel Order
                  </CButton>
                </div>
              </CTableDataCell>
            </CTableRow>
          </CTableBody>
        </CTable>
      </CCard>
    </>
  )
}

export default Colors
