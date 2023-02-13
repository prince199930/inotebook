import React, {useState} from 'react'
import { useHistory } from 'react-router-dom'

function Signup(props) {
    const [credentials, setCredentials] = useState({name:"",email: '', password: '', cpassword: ''})
    let history = useHistory()
    const handleSubmit = async (e) => {
        const {name, email, password} = credentials
        e.preventDefault()
        const response = await fetch(`http://localhost:8000/api/auth/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'

            },
            body: JSON.stringify({name, email, password})
        });
        const json = await response.json();
        if(json.success){
            // save the auth toke and redirect to
            localStorage.setItem('token', json.authtoken)
            props.showAlert("Successfully created your account", "success")
            history.push('/note')
           
        }
        else{
            props.showAlert("Invalid Credentials", "danger")
        }

    }

    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    return (
        <div className="container">
            <h1>STUDENT SIGNUP</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" aria-describedby="emailHelp" name="name" onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name="email" onChange={onChange} />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password"  name="password" className="form-control" id="password" onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password"  name="cpassword" className="form-control" id="cpassword" onChange={onChange} minLength={5} required />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Signup
