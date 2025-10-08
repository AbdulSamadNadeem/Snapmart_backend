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
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import { cilPeople } from '@coreui/icons'
import { allorders } from '../../../APi/Routehandlers'
import { ToastContext } from '../../../App'

const Colors = () => {
  const [error, setError] = useState('')
  const [orders, setOrders] = useState([])
  const settoast = useContext(ToastContext)

  const getorders = async () => {
    try {
      const response = await allorders('/orders/getall')
      console.log(response)
      setOrders(response.data.orders)
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
              <CTableHeaderCell className="bg-body-tertiary text-center">
                <CIcon icon={cilPeople} />
              </CTableHeaderCell>
              <CTableHeaderCell className="bg-body-tertiary">Order ID</CTableHeaderCell>
              <CTableHeaderCell className="bg-body-tertiary text-center">Amount</CTableHeaderCell>
              <CTableHeaderCell className="bg-body-tertiary">Items</CTableHeaderCell>
              <CTableHeaderCell className="bg-body-tertiary text-center">
                Payment Method
              </CTableHeaderCell>
              <CTableHeaderCell className="bg-body-tertiary">Delivery Type</CTableHeaderCell>
              <CTableHeaderCell className="bg-body-tertiary">Address</CTableHeaderCell>
              <CTableHeaderCell className="bg-body-tertiary">Location</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {orders.map((item, index) => (
              <CTableRow v-for="item in tableItems" key={index}>
                <CTableDataCell className="text-center">{item.user_id}</CTableDataCell>
                <CTableDataCell>
                  <div className="text-center">{item.id}</div>
                </CTableDataCell>
                <CTableDataCell>{item.total_amount}</CTableDataCell>
                <CTableDataCell className="text-center">{item.items}</CTableDataCell>
                <CTableDataCell>{item.payment_type}</CTableDataCell>
                <CTableDataCell>{item.delivery_type}</CTableDataCell>
                <CTableDataCell>{item.location}</CTableDataCell>
                <CTableDataCell>
                  {`https://www.google.com/maps?q=${item.order_lats},${item.order_longs}`}
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCard>
    </>
  )
}

export default Colors
