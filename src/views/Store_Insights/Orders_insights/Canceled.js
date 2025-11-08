import React, { useContext, useEffect, useState } from 'react'
import {
  CCard,
  CTable,
  CTableHead,
  CTableRow,
  CTableBody,
  CTableDataCell,
  CTableHeaderCell,
  CCardHeader,
  CCardBody,
  CFormInput,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import { cilPeople } from '@coreui/icons'
import { allorders } from '../../../APi/Routehandlers'
import { ToastContext } from '../../../App'
import { useNavigate } from 'react-router-dom'

const Canceled = () => {
  const [orders, setOrders] = useState([])
  const [searchOrder, setsearchOrder] = useState([])
  const settoast = useContext(ToastContext)
  const navigate = useNavigate()

  const getorders = async () => {
    try {
      const response = await allorders('/orders/getall')

      setOrders(response.data.orders)
      setsearchOrder(response.data.orders)
    } catch (err) {
      console.log(err)
    }
  }
  const handleSearch = (v) => {
    console.log(v)
    if (v.trim() === '') {
      setsearchOrder(orders)
      return
    } else {
      const searchedItme = orders.filter((item) => item.id.toString().includes(v.trim()))
      setsearchOrder(searchedItme)
    }
  }

  useEffect(() => {
    getorders()
  }, [])

  return (
    <CCardBody>
      <div className="d-flex justify-content-between align-items-center">
        <h1 className="mb-0">Cancel Orders</h1>
        <CFormInput
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search Id..."
          style={{ width: '250px' }}
        />
      </div>
      <CCard className="mb-4 shadow-sm">
        <CTable align="middle" className="mb-0 border" hover responsive>
          <CTableHead className="text-nowrap bg-body-tertiary">
            <CTableRow>
              <CTableHeaderCell className="text-center">
                <CIcon icon={cilPeople} />
              </CTableHeaderCell>
              <CTableHeaderCell className="text-center">Order ID</CTableHeaderCell>
              <CTableHeaderCell className="text-center">Amount</CTableHeaderCell>
              <CTableHeaderCell className="text-center">Payment</CTableHeaderCell>
              <CTableHeaderCell className="text-center">Delivery</CTableHeaderCell>
              <CTableHeaderCell className="text-center">Address</CTableHeaderCell>
              <CTableHeaderCell className="text-center">Location</CTableHeaderCell>
              <CTableHeaderCell className="text-center">Status</CTableHeaderCell>
            </CTableRow>
          </CTableHead>

          <CTableBody>
            {[...searchOrder]
              .filter((item) => item.status === 'canceled')
              .sort((a, b) => b.id - a.id)
              .map((item, index) => (
                <CTableRow key={index} style={{ cursor: 'pointer' }}>
                  <CTableDataCell className="text-center fw-semibold">
                    {item.user_id}
                  </CTableDataCell>

                  <CTableDataCell className="text-center">{item.id}</CTableDataCell>

                  <CTableDataCell className="text-center">
                    ${Number(item.total_amount)?.toFixed(2)}
                  </CTableDataCell>

                  <CTableDataCell className="text-center text-capitalize">
                    {item.payment_type}
                  </CTableDataCell>

                  <CTableDataCell className="text-center text-capitalize">
                    {item.delivery_type}
                  </CTableDataCell>

                  <CTableDataCell className="text-start" style={{ maxWidth: '250px' }}>
                    {item.location || 'N/A'}
                  </CTableDataCell>

                  <CTableDataCell className="text-center">
                    <a
                      href={`https://www.google.com/maps?q=${item.order_lats},${item.order_longs}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Map
                    </a>
                  </CTableDataCell>

                  <CTableDataCell className="text-center text-capitalize">
                    {item.status}
                  </CTableDataCell>
                </CTableRow>
              ))}

            {searchOrder.filter((item) => item.status === 'canceled').length === 0 && (
              <CTableRow>
                <CTableDataCell colSpan={8} className="text-center py-4 text-muted">
                  No Canceled Orders Found
                </CTableDataCell>
              </CTableRow>
            )}
          </CTableBody>
        </CTable>
      </CCard>
    </CCardBody>
  )
}

export default Canceled
