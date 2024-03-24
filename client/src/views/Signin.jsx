import React from "react";
import {useState, useEffect} from 'react'
import axios from 'axios'
import { useNavigate, useParams, Link} from "react-router-dom";



const Signin = ()=>{

    const {id} = useParams(); 

    const [user, setUser] = useState({
        email         : "",
        password      : ""
    })

    const [errors, setErrors] = useState({})

    const navigate = useNavigate()


    const handleChange=(e)=>{
        setUser({...user, [e.target.name]: e.target.value})
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        axios.post('http://localhost:8000/api/user/signin', user, {withCredentials: true})
            .then((response)=>{
                console.log(response.data)
                navigate("/dashboard")
            })
            .catch((error)=>{
                console.log(error)
                setErrors(error.response.data)
            })
    }


    return(
        <>
        <div className="d-flex justify-content-center" style={{maxHeigth: "400px"}}>
        <div className="formComponent thickborder" style={{width: "400px", maxHeigth: "400px"}}>
            <div className="d-flex justify-content-center m-3">
                <img className="m-2" src="../public/icon.svg" alt="photobombicon" style={{width: "40px", height: "40px"} }/>
                <h2 className="d-inline m-2">PhotoBomb!</h2>
            </div>
                
        <div className="d-flex justify-content-around">
                <div className="pl-3 text-left w-100 ">
                    <div className="d-block m-3 text-left text-left">
                        <label className="d-block font-weight-bold" htmlFor="email">email</label>
                        <input type="text"  name="email" value={user.email} onChange= {handleChange} className="w-100"></input>
                        {errors.email? <p style={{color: "red"}}>{errors.email.message}</p> : null }
                    </div>
                    
                    <div className="d-block m-3 text-left text-left">
                        <label className="d-block font-weight-bold" htmlFor="password">password</label>
                        <input type="password"  name="password" value={user.password} onChange= {handleChange} className="w-100"></input>
                        {errors.password? <p style={{color: "red"}}>{errors.password.message} </p> : null}
                        
                    </div>
                </div>

            </div>
            <div className="d-flex justify-content-end align-items-center">
            <Link to={'/register'}>Create Account</Link>
            <button onClick= {handleSubmit} className="mybtn btn btn-primary m-3 ml-4">Signin</button>
            </div>
            
        </div>
        
                
            
        </div>
        </>

    )
}

export default Signin;