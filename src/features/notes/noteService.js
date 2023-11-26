import axios from 'axios'

const API_URL = 'https://ticket-support-system-backend-6.onrender.com/api/data/admin-resolve/'

// Get ticket notes
const getNotes = async (ticketId) => {
  
  const response = await axios.get(API_URL + ticketId +'/notes' )

  return response.data
}

// Create ticket note
const createNote = async (noteText, ticketId) => {
  const response = await axios.post(
    API_URL + ticketId + '/notes',
    {
      text: noteText,
    },
  )

  return response.data
}



const noteService = {
  getNotes,
  createNote,
}

export default noteService
