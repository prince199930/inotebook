import React, {useState} from 'react'
import { useHistory } from 'react-router-dom'

function Login(props) {
    const [credentials, setCredentials] = useState({email: '', password: ''})
    let history = useHistory();
    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch(`http://localhost:8000/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'

            },
            body: JSON.stringify({email:credentials.email, password:credentials.password})
        });
        const json = await response.json();
        if(json.success){
            // save the auth token and redirect to
            localStorage.setItem('token', json.authtoken)
            history.push('/note')
            props.showAlert("Successfully Loged In", "success")
        }
        else{
            props.showAlert("Invalid Credentials", "danger")
        }

    }

    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    return (
        <div>
            <h1>STUDENT LOGIN</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" value={credentials.email} onChange={onChange}/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" value={credentials.password} className="form-control" id="password" name="password" onChange={onChange} />
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" className="btn btn-primary" >Submit</button>
            </form>
        </div>
    )
}

export default Login
