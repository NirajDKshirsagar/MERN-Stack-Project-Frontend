

function NoteItem({ note }) {

  return (
    <div
      className='note'
      style={{
        backgroundColor: 'rgba(0,0,0,0.7)',
        color:'#fff',
      }}
    >
      <h4>
        Note from Staff
      </h4>
      <p>{note.text}</p>
      <div className='note-date'>
        {new Date(note.createdAt).toLocaleString('en-US')}
      </div>
    </div>
  )
}

export default NoteItem