import React, { useContext, useState } from 'react'
import {
  CRow,
  CCol,
  CCard,
  CCardHeader,
  CCardBody,
  CInputGroup,
  CForm,
  CInputGroupText,
  CFormInput,
  CContainer,
  CCardGroup,
  CButton,
  CAlert,
  CToast,
  CToastHeader,
  CToastBody,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import { cilBarcode, cilLink, cilText } from '@coreui/icons'
import { add_products } from '../../../APi/Routehandlers'
import { ToastContext } from '../../../App'

const Colors = () => {
  const [productName, setProductName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [sku, setSku] = useState('')
  const [stock, setStock] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [subCategoryId, setSubCategoryId] = useState('')
  const [brand, setBrand] = useState('')
  const [rating, setRating] = useState('')
  const [error, setError] = useState('')

  const settoast = useContext(ToastContext)

  const data = {
    name: productName,
    description: description,
    price,
    stock,
    image_url: imageUrl,
    category_id: subCategoryId,
    sku,
    brand,
    rating,
  }

  const handle_submit = async (e) => {
    e.preventDefault()
    try {
      const response = await add_products('/products/add', data)
      console.log(response)
      if (response.status === 201)
        settoast(
          <CToast autohide color="success" className="text-white">
            <CToastHeader closeButton>Success</CToastHeader>
            <CToastBody>Product Added!</CToastBody>
          </CToast>,
        )
      setProductName('')
      setPrice('')
      setDescription('')
      setSku('')
      setStock('')
      setBrand('')
      setRating('')
      setImageUrl('')
      setSubCategoryId('')
      setError('')
    } catch (err) {
      console.log(err)
      setError(err.response.data.error || 'something went wrong')
    }
  }

  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>Manage Products Here</CCardHeader>
        <CContainer className="justify-content-center">
          <CRow className="justify-content-center">
            <CCol md={8}>
              <CCardGroup>
                <CCardBody>
                  <CForm onSubmit={handle_submit}>
                    <h1 className="text-center">Add Product</h1>
                    <p className="text-body-secondary text-center">
                      Enter all the details carefully
                    </p>
                    {error && <CAlert color="danger">{error}</CAlert>}
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilText} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Product name"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilText} />
                      </CInputGroupText>
                      <CFormInput
                        type="text"
                        placeholder="Enter product description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>Rs</CInputGroupText>
                      <CFormInput
                        type="text"
                        placeholder="Enter price  "
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilBarcode} />
                      </CInputGroupText>
                      <CFormInput
                        type="Text"
                        placeholder="Enter SKU"
                        value={sku}
                        onChange={(e) => setSku(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>Qty</CInputGroupText>
                      <CFormInput
                        type="text"
                        placeholder="Enter Stock"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLink} />
                      </CInputGroupText>
                      <CFormInput
                        type="text"
                        placeholder="Enter Image URl"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>ID</CInputGroupText>
                      <CFormInput
                        type="text"
                        placeholder="Enter sub_category id"
                        value={subCategoryId}
                        onChange={(e) => setSubCategoryId(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>BR</CInputGroupText>
                      <CFormInput
                        type="text"
                        placeholder="Enter Brand name"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>Rtg</CInputGroupText>
                      <CFormInput
                        type="text"
                        placeholder="Enter Ratings"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol className="text-center">
                        <CButton type="submit" color="primary" className="px-4 w-75">
                          Add
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
        <CCardBody></CCardBody>
      </CCard>
      <CCard className="mb-4">
        <CCardHeader>Add Products to Sale on Here</CCardHeader>
        <CContainer className="justify-content-center">
          <CRow className="justify-content-center">
            <CCol md={8}>
              <CCardGroup>
                <CCardBody>
                  <CForm onSubmit={handle_submit}>
                    <h1 className="text-center">Add Product To Sale</h1>
                    <p className="text-body-secondary text-center">
                      Enter all the details carefully
                    </p>
                    {error && <CAlert color="danger">{error}</CAlert>}
                    <CInputGroup className="mb-4">
                      <CInputGroupText>Id</CInputGroupText>
                      <CFormInput
                        type="text"
                        placeholder="Enter The Product Id"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol className="text-center">
                        <CButton type="submit" color="primary" className="px-4 w-75">
                          Add
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCardGroup>
            </CCol>
          </CRow>
        </CContainer>
        <CCardBody></CCardBody>
      </CCard>
    </>
  )
}

export default Colors
