import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { dmsToDecimal, getCurrentLocation } from '../../../helper/app'
import { getOrderbyId } from '../../../APi/Routehandlers'
import axios from 'axios'
import {
  CButton,
  CFormInput,
  CInputGroup,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHeaderCell,
} from '@coreui/react'
const ConfirmOrder = () => {
  const [orderDetails, setOrderdetails] = useState({})
  const [UserDetails, setUserdetails] = useState({})
  const [distance, setDistance] = useState('')
  const [duration, setDuration] = useState('')
  const [orderTime, setOrdertime] = useState(0)
  const location = useLocation()
  const { id } = location.state || {}

  const getorders = async () => {
    try {
      const response = await getOrderbyId(`/orders/getbyid/${id}`)
      setOrderdetails(response.data.order[0])
      return response.data.order[0]
    } catch (err) {
      console.log(err)
      throw err
    }
  }
  const userDetails = async (uid) => {
    try {
      const response = await getOrderbyId(`/users/${Number(uid)}`)
      console.log(response.data.users[0])
      setUserdetails(response.data.users[0])
    } catch (err) {
      console.log(err)
      throw err
    }
  }
  const fetchDistance = async (storeLoc, destLat, destLong) => {
    try {
      if (!storeLoc || !storeLoc.lats || !storeLoc.longs) {
        console.log('Store location not available')
        return
      }
      if (!destLat || !destLong) {
        console.log('Destination coordinates not available')
        return
      }

      const url = `https://router.project-osrm.org/route/v1/driving/${storeLoc.longs},${storeLoc.lats};${destLong},${destLat}?overview=false`

      const response = await axios.get(url)

      if (response.data.code === 'Ok' && response.data.routes.length > 0) {
        const route = response.data.routes[0]
        const distanceInKm = (route.distance / 1000).toFixed(2)
        const durationInMinutes = (route.duration / 60).toFixed(2)

        setDistance(distanceInKm)
        setDuration(durationInMinutes)
      } else {
        console.log('No route found')
      }
    } catch (err) {
      console.log('Error fetching distance:', err)
    }
  }

  const fetchLocation = async () => {
    try {
      const position = await getCurrentLocation()
      const locationData = {
        lats: position.coords.latitude,
        longs: position.coords.longitude,
      }
      return locationData
    } catch (err) {
      console.log(err)
      throw err
    }
  }
  useEffect(() => {
    const init = async () => {
      try {
        const orderData = await getorders()
        console.log(orderData)
        await userDetails(orderData.user_id)
        const currentLocation = await fetchLocation()

        const dest_lats = Number(orderData.order_lats)
        const dest_longs = Number(orderData.order_longs)

        if (currentLocation && dest_lats && dest_longs) {
          await fetchDistance(currentLocation, dest_lats, dest_longs)
        }
      } catch (err) {
        console.log('Initialization error:', err)
      }
    }

    init()
  }, [id])
  useEffect(() => {
    console.log(orderTime)
  }, [orderTime])
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '50px' }}>
      <h1 className="text-center">Confirm Order </h1>
      <CTable align="middle" className="mb-0 border" hover responsive>
        <CTableHeaderCell className="bg-body-tertiary text-center">User ID</CTableHeaderCell>
        <CTableHeaderCell className="bg-body-tertiary text-center">Username</CTableHeaderCell>
        <CTableHeaderCell className="bg-body-tertiary text-center">Email</CTableHeaderCell>
        <CTableHeaderCell className="bg-body-tertiary text-center">Phone</CTableHeaderCell>
        <CTableHeaderCell className="bg-body-tertiary text-center">User Location</CTableHeaderCell>
        <CTableBody>
          <CTableDataCell className="text-center">{UserDetails.id}</CTableDataCell>
          <CTableDataCell className="text-center">{UserDetails.username}</CTableDataCell>
          <CTableDataCell className="text-center">{UserDetails.email}</CTableDataCell>
          <CTableDataCell className="text-center">{UserDetails.phone}</CTableDataCell>
          <CTableDataCell className="text-center">{UserDetails.location}</CTableDataCell>
        </CTableBody>
      </CTable>
      <CTable align="middle" className="mb-0 border" hover responsive>
        <CTableHeaderCell className="bg-body-tertiary text-center">Order ID</CTableHeaderCell>
        <CTableHeaderCell className="bg-body-tertiary text-center">Distance</CTableHeaderCell>
        <CTableHeaderCell className="bg-body-tertiary text-center">Duration</CTableHeaderCell>
        <CTableHeaderCell className="bg-body-tertiary text-center">Amount</CTableHeaderCell>
        <CTableHeaderCell className="bg-body-tertiary text-center">Created at</CTableHeaderCell>

        <CTableHeaderCell className="bg-body-tertiary text-center">Total Time</CTableHeaderCell>
        <CTableBody>
          <CTableDataCell className="text-center">{orderDetails.id}</CTableDataCell>
          <CTableDataCell className="text-center">{distance}km</CTableDataCell>
          <CTableDataCell className="text-center">{duration}Min</CTableDataCell>
          <CTableDataCell className="text-center">
            ${Number(orderDetails.total_amount)?.toFixed(2)}
          </CTableDataCell>
          <CTableDataCell className="text-center">
            {new Date(orderDetails?.created_at).toLocaleTimeString('en-US', { hour12: true })}
          </CTableDataCell>
          <CTableDataCell className="text-center">
            <CFormInput
              type="number"
              value={orderTime}
              placeholder="Time to deliver order in Minutes"
              onChange={(e) => setOrdertime(e.target.value)}
            />
          </CTableDataCell>
        </CTableBody>
      </CTable>
      <div className="d-flex justify-content-center gap-4">
        <CButton color="success" className="mt-3 px-4" active tabIndex={-1}>
          Approve Order
        </CButton>

        <CButton color="danger" className="mt-3 px-4" active tabIndex={-1}>
          Cancel Order
        </CButton>
      </div>
    </div>
  )
}

export default ConfirmOrder
