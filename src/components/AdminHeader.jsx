import {  useNavigate,Link } from "react-router-dom"
import {FaSignOutAlt} from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { logout } from '../features/admin/adminSlice'


function AdminHeader() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const onLogout = () => {
        dispatch(logout())
        navigate('/')
    }
    return(
        <header className='header'>
        <div className='logo' style={{color: '#8800cc'}}>
            <Link to='/'>Support Desk</Link>
        </div>
        <ul>
            <li>
                <button className='btn btn-reverse' onClick={onLogout}>
                <FaSignOutAlt /> Logout
                </button>
            </li>
        </ul>
        </header> 
    )
}
export default AdminHeader