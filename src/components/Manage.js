import React from 'react'
import { Link} from 'react-router-dom'
import Image from '../university.webp';


function Manage(props) {
  const{ setMember} = props;
  return (
    <div>
         <img src={Image} style={{height:"100vh", width:"100vw", position:"absolute"}}/>
         <div style={{position:"relative", justifyContent:'space-around', display:'flex'}}>

         <Link className="btn btn-primary mx-1" to='/loginstaff' onClick={()=>setMember('Staff')}  role="button">Staff</Link>
         <Link className="btn btn-primary mx-1" to="/loginstudent" onClick={()=>setMember('Student')}   role="button">Student</Link>
         </div>
       
    </div>
  )
}

export default Manage