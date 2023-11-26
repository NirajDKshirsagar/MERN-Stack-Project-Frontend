import {FaArrowAltCircleLeft} from 'react-icons/fa'
import {Link} from 'react-router-dom'
export const BackButton = ({url}) => {
    return (
        <Link to={url} style={{marginTop:40}}className='btn btn-reverse btn-back'>
            <FaArrowAltCircleLeft /> Back
        </Link>
    )   
  
}
export default BackButton;