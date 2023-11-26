import axios from 'axios'

const API_URL = 'https://ticket-support-system-backend-6.onrender.com/api/admin/'

// Register admin
const register = async (adminData) => {
  const response = await axios.post(API_URL, adminData)

  if (response.data) {
    localStorage.setItem('admin', JSON.stringify(response.data))
  }
  return response.data
}


// Login admin
const login = async (adminData) => {
  const response = await axios.post(API_URL + 'admin-login', adminData)

  if (response.data) {
    localStorage.setItem('admin', JSON.stringify(response.data))
  }
  return response.data
}

// Logout user
const logout = () => localStorage.removeItem('admin')

const adminService = {
  register,
  logout,
  login,
}

export default adminService
