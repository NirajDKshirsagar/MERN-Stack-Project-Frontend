import { getNotes, createNote } from '../features/notes/noteSlice';
import { useSelector, useDispatch } from 'react-redux';
import BackButton from '../components/BackButton';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { updateStatus } from '../features/data/dataSlice';

function AdminAction() {
  const { tickets } = useSelector((state) => state.data);
  const { notes, isLoading: notesIsLoading } = useSelector((state) => state.note);

  const [description, setDescription] = useState('');
  const { ticketId } = useParams();
  const selectedTicket = tickets.find((ticket) => ticket._id === ticketId);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getNotes(ticketId));
  }, [dispatch, ticketId]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createNote({ ticketId: ticketId, noteText: description }))
      .unwrap()
      .then(() => {
        // After adding a note, refresh the notes
        dispatch(getNotes(ticketId));
        setDescription('');
        navigate('/admin-resolve');
        toast.success('Note added');
      })
      .catch(toast.error);
  };

  // Close ticket
  const onTicketClose = () => {
    dispatch(updateStatus(ticketId))
      .unwrap()
      .then((response) => {
        console.log(response)
        toast.success('Ticket Closed')
        navigate('/admin-resolve')
      })
      .catch(toast.error)
  }

  return (
    <div className='ticket-page'>
      <header className='ticket-header'>
        <BackButton url='/admin-resolve' />
        {selectedTicket ? (
          <div key={selectedTicket._id}>
            <h2>Ticket ID: {selectedTicket._id}</h2>
            <h3>Date Submitted: {new Date(selectedTicket.createdAt).toLocaleString('en-US')}</h3>
            <hr />
            <div className='ticket-desc'>
              <h3>Description of Issue</h3>
              <p>{selectedTicket.description}</p>
            </div>
          </div>
        ) : (
          <p>Ticket not found</p>
        )}
        {selectedTicket.status !== 'closed' && (
        <div className='form-group' style={{ marginTop: '20px' }}>
          <label htmlFor='description'>Action to be taken</label>
          <textarea
            name='note'
            id='note'
            className='form-control'
            placeholder='Note'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>)}

        {/* Display Notes */}
        {notesIsLoading ? (
  <p>Loading notes...</p>
) : (
  <div className='notes-container'>
    <h3>Notes:</h3>
    {notes && Array.isArray(notes) ? (
      notes.map((note) => (
        note && note.text ? (
          <div key={note._id}>
            <p>{note.text}</p>
          </div>
        ) : null
      ))
    ) : (
      <p>No notes available</p>
    )}
  </div>
)}

      </header>
    {selectedTicket.status !== 'closed' && (
      <>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <button className='btn btn-block' style={{ backgroundColor: 'blue', color: 'white' }}>
            Save
          </button>
        </div>
      </form>

     
        <button onClick={onTicketClose} className='btn btn-block btn-danger'>
          Close Ticket
        </button>
        </>
      )}
    </div>
  );
}

export default AdminAction;
