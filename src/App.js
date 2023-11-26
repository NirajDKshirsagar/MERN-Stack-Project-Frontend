import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import NewTicket from './pages/NewTicket';
import PrivateRoute from './components/PrivateRoute'
import Tickets from './pages/Tickets';
import AdminLogin from './pages/AdminLogin';
import AdminRegister from './pages/AdminRegister';
import AdminResolve from './pages/AdminResolve';
import Ticket from './pages/Ticket';
import EditTicket from './components/EditTicket';
import AdminAction from './pages/AdminAction';

function App() {
  return (
    <>
       <Router>
        <div className='container'>
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/register' element={<Register />}/>
            <Route path='/new-ticket' element={<PrivateRoute />}>
               <Route path='/new-ticket' element = {<NewTicket/>} /> 
            </Route>
            <Route path='/tickets' element={<PrivateRoute />}>
               <Route path='/tickets' element = {<Tickets/>} /> 
            </Route>
            <Route path='/admin-login' element={<AdminLogin />}/>
            <Route path='/admin-register' element={<AdminRegister />}/>
            <Route path='/admin-resolve' element={<AdminResolve />}/>
            <Route path='/ticket/:ticketId' element={<PrivateRoute />}>
               <Route path='/ticket/:ticketId' element = {<Ticket/>} /> 
            </Route>
            <Route path='/update-ticket/:ticketId' element={<PrivateRoute />}>
               <Route path='/update-ticket/:ticketId' element = {<EditTicket/>} /> 
            </Route>
            <Route path='/admin-resolve/:ticketId/notes' element={<AdminAction />}/>
          </Routes>
        </div>
       </Router>
       <ToastContainer/>
    </>
  );
}

export default App;
