import { FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import {GrUserAdmin} from 'react-icons/gr'
import {RiAdminFill} from 'react-icons/ri'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../features/auth/authSlice'
import BackButton from '../components/BackButton' //changed just now


function Header() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { admin } = useSelector((state) => state.admin)

  const onLogout = () => {
    dispatch(logout())
    navigate('/')
  }
 
  return (
    <header className='header' >
     <div className='logo' style={{ color: '#550073', fontWeight: 'bold' }}>
 
  <Link to='/'>Support Desk</Link>
 
</div>
      <ul>
    {user ? (
          <li>
            <button className='btn btn-reverse' onClick={onLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link to='/login'>
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link to='/register'>
                <FaUser /> Register
              </Link>
            </li>
            <li>
              <Link to='/admin-login'>
                <RiAdminFill /> Admin Login
              </Link>
            </li>
            <li>
              <Link to='/admin-register'>
                < GrUserAdmin/> Admin Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  )
}

export default Header