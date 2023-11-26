import { useState } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import {RiAdminFill} from 'react-icons/ri'
import { useSelector, useDispatch } from 'react-redux'
import { login } from '../features/admin/adminSlice'
import Spinner from '../components/Spinner'
import Header from '../components/Header'

function AdminLogin() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    key: ''
  })
  const { email, password, key } = formData
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isLoading } = useSelector((state) => state.auth)
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }
  // NOTE: no need for useEffect here as we can catch the
  // AsyncThunkAction rejection in our onSubmit or redirect them on the
  // resolution
  // Side effects shoulld go in event handlers where possible
  // source: - https://beta.reactjs.org/learn/keeping-components-pure#where-you-can-cause-side-effects
  const onSubmit = (e) => {
    e.preventDefault()
    const adminData = {
      email,
      password,
      key
    }
    dispatch(login(adminData))
      .unwrap()
      .then((admin) => {
        // NOTE: by unwrapping the AsyncThunkAction we can navigate the user after
        // getting a good response from our API or catch the AsyncThunkAction
        // rejection to show an error message
        toast.success(`Logged in as Support agent ${admin.name}`)
        navigate('/admin-resolve')
      })
      .catch(toast.error)
  }
  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
    <Header/>
      <section className='heading'>
        <h1>
          <RiAdminFill /> Admin Login
        </h1>

        <p style={{ color: 'red', textDecoration: "underline" }} >
          Only admins can access this page!
        </p>

      </section>  
      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              value={email}
              onChange={onChange}
              placeholder='Enter your email'
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={password}
              onChange={onChange}
              placeholder='Enter password'
              required
            />
            </div>
            <div className='form-group'>
            <input
              type='String'
              className='form-control'
              id='key'
              name='key'
              value={key}
              onChange={onChange}
              placeholder='Enter secret key shared by company'
              required
            />
          </div>
          <div className='form-group'>
            <button className='btn btn-block'>Submit</button>
          </div>
        </form>
      </section>
    </>
  )
}
 
export default AdminLogin