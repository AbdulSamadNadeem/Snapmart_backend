import instance from './Instance'
export const signin = async (route, data) => {
  try {
    const response = await instance.post(route, data)

    return response
  } catch (err) {
    throw err
  }
}
export const signup = async (route, data) => {
  try {
    const response = await instance.post(route, data)

    return response
  } catch (err) {
    throw err
  }
}
export const allusers = async (route) => {
  try {
    const response = await instance.get(route)
    return response
  } catch (err) {
    throw err
  }
}
export const allorders = async (route) => {
  try {
    const response = await instance.get(route)
    return response
  } catch (err) {
    throw err
  }
}
export const allproducts = async (route) => {
  try {
    const response = await instance.get(route)
    return response
  } catch (err) {
    throw err
  }
}
export const add_products = async (route, data) => {
  try {
    const response = await instance.post(route, data)
    return response
  } catch (err) {
    throw err
  }
}
