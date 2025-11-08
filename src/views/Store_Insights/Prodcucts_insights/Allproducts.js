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
import { allorders, allproducts } from '../../../APi/Routehandlers'
import { ToastContext } from '../../../App'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Allproducts = () => {
  const products = useSelector((state) => state.product.allProducts)
  const [searchedProd, setsearchedProd] = useState([])
  

  const handleSearch = (v) => {
    if (v.trim() === '') {
      setsearchedProd(products)
      return
    } else {
      const searchedItme = searchedProd.filter((item) =>
        item.name.toLowerCase().includes(v.toLowerCase()),
      )
      setsearchedProd(searchedItme)
    }
  }
  useEffect(() => {
    setsearchedProd(products)
  }, [products])
  return (
    <CCardBody>
      <div className="d-flex justify-content-between align-items-center">
        <h1 className="mb-0">Products Inventory</h1>
        <CFormInput
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search Products..."
          style={{ width: '250px' }}
        />
      </div>
      <CCard className="mb-4 shadow-sm">
        <CTable align="middle" className="mb-0 border" hover responsive>
          <CTableHead className="text-nowrap bg-body-tertiary">
            <CTableRow>
              <CTableHeaderCell className="text-center">Product ID</CTableHeaderCell>
              <CTableHeaderCell className="text-center">Name</CTableHeaderCell>
              <CTableHeaderCell className="text-center">Image</CTableHeaderCell>
              <CTableHeaderCell className="text-center">Brand</CTableHeaderCell>
              <CTableHeaderCell className="text-center">Price</CTableHeaderCell>
              <CTableHeaderCell className="text-center">SubCategoryId</CTableHeaderCell>
              <CTableHeaderCell className="text-center">Rating</CTableHeaderCell>
              <CTableHeaderCell className="text-center">SKU</CTableHeaderCell>
              <CTableHeaderCell className="text-center">Stock</CTableHeaderCell>
            </CTableRow>
          </CTableHead>

          <CTableBody>
            {[...searchedProd]
              .sort((a, b) => a.id - b.id)
              .map((item, index) => (
                <CTableRow key={index} style={{ cursor: 'pointer' }}>
                  <CTableDataCell className="text-center">{item.id}</CTableDataCell>

                  <CTableDataCell className="text-left">{item.name}</CTableDataCell>
                  <CTableDataCell className="text-center">
                    <img
                      src={item.image_url}
                      alt={'img'}
                      style={{
                        width: '50px',
                        height: '50px',
                        objectFit: 'contain',
                        borderRadius: '8px',
                      }}
                    />
                  </CTableDataCell>

                  <CTableDataCell className="text-center text-capitalize">
                    {item.brand}
                  </CTableDataCell>

                  <CTableDataCell className="text-center text-capitalize">
                    {item.price}
                  </CTableDataCell>

                  <CTableDataCell className="text-center" style={{ maxWidth: '250px' }}>
                    {item.subcategory_id}
                  </CTableDataCell>

                  <CTableDataCell className="text-center text-capitalize">
                    {item.rating}
                  </CTableDataCell>
                  <CTableDataCell className="text-center text-capitalize">
                    {item.sku}
                  </CTableDataCell>
                  <CTableDataCell
                    className={`text-center ${item.stock > 0 ? 'text-success' : 'text-danger'}`}
                  >
                    {item.stock}
                  </CTableDataCell>
                </CTableRow>
              ))}
            {searchedProd.length === 0 && (
              <CTableRow>
                <CTableDataCell colSpan={8} className="text-center py-4 text-muted">
                  No Product Found
                </CTableDataCell>
              </CTableRow>
            )}
          </CTableBody>
        </CTable>
      </CCard>
    </CCardBody>
  )
}

export default Allproducts
