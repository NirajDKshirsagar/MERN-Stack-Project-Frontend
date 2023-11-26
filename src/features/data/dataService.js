import axios from 'axios'

const API_URL = 'https://ticket-support-system-backend-6.onrender.com/api/data/admin-resolve/'

// Get all tickets
const getAll = async () => {
    const response = await axios.get(API_URL)

    return response.data
}


// Update status
const updateStatus = async (ticketId) => {
  
  const response = await axios.put(API_URL + ticketId)

  return response.data
}

// Open status
const openStatus = async (ticketId) => {
  
  const response = await axios.put(API_URL + 'open/'+ ticketId)

  return response.data
}

const dataService = {
  getAll,
  updateStatus,
  openStatus
}

export default dataService
