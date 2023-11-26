import { Link } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {deleteTicket} from '../features/tickets/ticketSlice'
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom'

function TicketItem({ ticket }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleClick = () => {
    console.log(ticket._id)
    dispatch(deleteTicket(ticket._id))
      .then((response) => {
        console.log(response)
        toast.success('Ticket Deleted Successfully');
        window.location.reload()
        navigate('/tickets')
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }
  return (
    <div className='ticket'>
      <div>{new Date(ticket.createdAt).toLocaleString('en-US')}</div>
      <div>{ticket.product}</div>
      <div className={`status status-${ticket.status}`}>{ticket.status}</div>
      <div className='button-container'>
        <Link to={`/ticket/${ticket._id}`} className='btn btn-reverse btn-sm'>
          View
        </Link>
        {ticket.status !== 'closed' &&
          <Link to={`/update-ticket/${ticket._id}`} className='btn btn-reverse btn-sm' style={{backgroundColor:'green'}}>
            Edit
          </Link>
        }
        <button onClick={handleClick} className="btn btn-sm btn-danger mx-3">Delete</button>
      </div>
    </div>
  )
}

export default TicketItem

