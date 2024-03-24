import React from "react";
import {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate, useParams, Link} from "react-router-dom";



const Register = ()=>{

    const {id} = useParams(); 

    const [user, setUser] = useState({
        first_name      : "",
        last_name       : "",
        email           : "",
        password        : ""
    })

    const [errors, setErrors] = useState({})

    const navigate = useNavigate()


    const handleChange=(e)=>{
        setUser({...user, [e.target.name]: e.target.value})
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        axios.post('http://localhost:8000/api/user', user, {withCredentials: true})
            .then((response)=>{
                console.log(response.data)
                navigate("/dashboard")
            })
            .catch((error)=>{
                console.log(error)
                setErrors(error.response.data.errors)
            })
    }


    return(
        <div className="d-flex justify-content-center">
        <div className="formComponent thickborder p-5" style={{width: "400px"}}>
        <div className="d-flex justify-content-center m-3">
        <img className="m-2" src="../public/icon.svg" alt="photobombicon" style={{width: "40px", height: "40px"} }/>
                <h2 className="d-inline m-2">PhotoBomb!</h2>
        </div>
        
        <div className="d-flex justify-content-around">
                <div className="pl-3 text-left w-100 ">

                    <div className="d-block m-3 text-left text-left">
                        <label className="d-block font-weight-bold" htmlFor="first_name">First Name</label>
                        <input type="text"  name="first_name" value={user.first_name} onChange= {handleChange} className="w-100"></input>
                        {errors.first_name? <p style={{color: "red"}}>{errors.first_name.message}</p> : null}
                    </div>

                    <div className="d-block m-3 text-left text-left">
                        <label className="d-block font-weight-bold" htmlFor="first_name">Last Name</label>
                        <input type="text"  name="last_name" value={user.last_name} onChange= {handleChange} className="w-100"></input>
                        {errors.last_name? <p style={{color: "red"}}>{errors.last_name.message}</p> : null}
                    </div>

                    <div className="d-block m-3 text-left text-left">
                        <label className="d-block font-weight-bold" htmlFor="email">email</label>
                        <input type="text"  name="email" value={user.email} onChange= {handleChange} className="w-100"></input>
                        {errors.email? <p style={{color: "red"}}>{errors.email.message}</p> : null}
                    </div>
                    
                    <div className="d-block m-3 text-left text-left">
                        <label className="d-block font-weight-bold" htmlFor="password">Password</label>
                        <input type="password"  name="password" value={user.password} onChange= {handleChange} className="w-100"></input>
                        {errors.password? <p style={{color: "red"}}>{errors.password.message}</p> : null}
                    </div>
                </div>

            </div>
            <div className="d-flex justify-content-end align-items-center">
            <Link to={'/signin'}>Sign In</Link>
            <button onClick= {handleSubmit} className="mybtn btn btn-primary m-3">Register</button>
            </div>
            
        </div>
        
                
            
        </div>

    )
}

export default Register;