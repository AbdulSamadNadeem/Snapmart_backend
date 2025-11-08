import React, { useContext, useEffect, useState } from 'react'
import {
  CCard,
  CTable,
  CTableHead,
  CTableRow,
  CTableBody,
  CTableDataCell,
  CTableHeaderCell,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import { cilPeople } from '@coreui/icons'
import { allorders } from '../../../APi/Routehandlers'
import { ToastContext } from '../../../App'
import { useNavigate } from 'react-router-dom'
import { isNeworders } from '../../../store/features/theme/themeSlice'
import { useDispatch, useSelector } from 'react-redux'

const Colors = () => {
  const navigate = useNavigate()
  const orders = useSelector((state) => state.order.allOrders)
  console.log(orders)

  useEffect(() => {

  }, [])

  return (
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
          {[...orders]
            .filter((item) => item.status === 'placed')
            .sort((a, b) => b.id - a.id)
            .map((item, index) => (
              <CTableRow
                key={index}
                onClick={() =>
                  navigate('/management/orders_orderitems', { state: { id: item.id } })
                }
                style={{ cursor: 'pointer' }}
              >
                <CTableDataCell className="text-center fw-semibold">{item.user_id}</CTableDataCell>

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
        </CTableBody>
      </CTable>
    </CCard>
  )
}

export default Colors
