import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Spinner from '../components/Spinner'
import AdminHeader from '../components/AdminHeader'
import { getAll,openStatus } from '../features/data/dataSlice'

function AdminResolve() {
  const { tickets } = useSelector((state) => state.data)
  
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAll())
  }, [dispatch])

  const handleActionClick = (ticketId, status) => {
    if (status !== "closed") {
      dispatch(openStatus(ticketId))
    } else {
      console.log(`Ticket ${ticketId} is closed. Cannot perform action.`);
    }
    // Continue with navigation if needed
  };
   
  

  if (tickets === undefined) {
    return <Spinner />
  }
  if (!tickets) {
    return <Spinner />
  }
  

  return (
    <>
      <AdminHeader/>
      <h1>Tickets</h1>
      <table style={{ width:'100%', borderCollapse:'collapse' }}>
      <thead style={{ backgroundColor: "#f0f0f0", textAlign: "center", padding: "20px" }}>
        <tr>
          <th>User Name</th>
          <th>Ticket ID</th>
          <th>Product</th>
          <th>Status</th>
          <th>Description</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {tickets.map((ticket) => (
          <tr key={ticket._id}>
            <td>{ticket.user.name}</td> {/* Replace with the actual field name */}
            <td>{ticket._id}</td>
            <td>{ticket.product}</td>
            <td className={`satus satus-${ticket.status}`}>{ticket.status}</td>
            <td>{ticket.description}</td>
            <td>
            <Link
              to={`/admin-resolve/${ticket._id}/notes`}
              className="btn btn-block"
              style={{ margin: "20px" }}
              onClick={() => handleActionClick(ticket._id, ticket.status)}
            >Action</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
        
      
    </>
  )
}

export default AdminResolve