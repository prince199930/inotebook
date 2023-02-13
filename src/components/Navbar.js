import { React } from 'react'
import { Link, useHistory } from 'react-router-dom'


function Navbar({member}) {
    let history = useHistory()
    const handleLogOut = () => {
        localStorage.removeItem('token')
        history.push('/')
        window.location.reload();
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">UNIVERSITY</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                    </ul>
                    {!localStorage.getItem('token') ? <form className="d-flex">
                        {member=="Staff"?
                        <><Link className="btn btn-primary mx-1" to="/loginstaff" href="#" role="button">LogIn</Link>
                        <Link className="btn btn-primary mx-1" to="/signupstaff" href="#" role="button">SignUp</Link></>: 
                        <><Link className="btn btn-primary mx-1" to="/loginstudent" href="#" role="button">LogIn</Link>
                        <Link className="btn btn-primary mx-1" to="/signupstudent" href="#" role="button">SignUp</Link></>}
                        
                    </form> : <button onClick={handleLogOut} className="btn btn-primary">LogOut</button>}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
