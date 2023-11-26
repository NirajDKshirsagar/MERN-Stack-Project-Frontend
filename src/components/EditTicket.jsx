import { updateTicket } from "../features/tickets/ticketSlice"
import { useSelector, useDispatch } from "react-redux"
import BackButton from "./BackButton"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { useNavigate } from "react-router-dom" 
import {toast} from 'react-toastify'


function EditTicket() {
  const { ticket } = useSelector((state) => state.tickets)
  const [description, setDescription] = useState(ticket.description);
  const { ticketId } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()



  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(updateTicket({ ticketId:ticketId, ticketData:{description:description} }))
      .unwrap()
      .then(() => {
        console.log(description)
        // We got a good response so navigate the user
        navigate('/tickets')
        toast.success('Ticket Updated')
      })
      .catch(toast.error)
  }

  
  

  return (
    <div className='ticket-page'>
    <header className='ticket-header'>
      <BackButton url='/tickets' />
      <h2>
        Ticket ID: {ticket._id}
      </h2>
      <h3>
        Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-US')}
      </h3>
      <h3>Product: {ticket.product}</h3>
      <hr />
      {ticket.status!=='closed' &&
        <div className='form-group'style={{marginTop:"20px"}}>
        <label htmlFor='description'>Description of the issue</label>
        <textarea
          name='description'
          id='description'
          className='form-control'
          placeholder='Description'
          value= {description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      }
      {ticket.status ==='closed' &&
        <div className='form-group'style={{marginTop:"20px"}}>
        <label htmlFor='description'>Description of the issue</label>
        <p>{ticket.description}</p>
      </div>
      }
      
      
    </header>
    {ticket.status!=='closed' &&
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <button className='btn btn-block' style={{ backgroundColor: 'blue', color: 'white' }}>Save</button>
          </div>
        </form>
     }
    </div>
   
  )
}

export default EditTicket
