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
import { add_category } from '../../../APi/Routehandlers'
import { ToastContext } from '../../../App'

const Category = () => {
  const [categoryName, setcategoryName] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [error, setError] = useState('')

  const settoast = useContext(ToastContext)

  const data = {
    name: categoryName,
    image_url: imageUrl,
  }

  const handle_submit = async (e) => {
    e.preventDefault()
    try {
      const response = await add_category('/categories/add', data)
      console.log(response)
      if (response.status === 201)
        settoast(
          <CToast autohide color="success" className="text-white">
            <CToastHeader closeButton>Category Added!</CToastHeader>
            <CToastBody>Check the Category Section to view the ID</CToastBody>
          </CToast>,
        )
      setcategoryName('')
      setImageUrl('')
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
                    <h1 className="text-center">Add Category</h1>
                    <p className="text-body-secondary text-center">
                      Enter all the details carefully
                    </p>
                    {error && <CAlert color="danger">{error}</CAlert>}
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilText} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Category name"
                        value={categoryName}
                        onChange={(e) => setcategoryName(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilText} />
                      </CInputGroupText>
                      <CFormInput
                        type="text"
                        placeholder="Enter the image url for category"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
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

export default Category
