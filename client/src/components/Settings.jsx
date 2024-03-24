import React from 'react'
import {Link, useNavigate} from "react-router-dom";
import { useState } from 'react';

import axios from 'axios'


const Settings = (props) =>{


    const [style, setStyle] = useState({color: "black"})
    
    const navigate = useNavigate()
    const handleClick=(e)=>{
        
        axios.delete('http://localhost:8000/api/user/logout', {withCredentials: true})
        .then((response)=>{
            console.log(response.data)
            sessionStorage.clear()
            navigate("/")
        }).catch((error)=>{
            console.log(error)
        })
    }

    return(
        
        <div className="thickborder p-3 ml-3 mt-0" style={{width: "20%", backgroundColor: "rgb(220,220,220,0.8)"}}>
            <div className="d-flex justify-content-between align-items-center " style={{height: "30%"}}>
            <a onClick={handleClick} className='h4' style={style} onMouseOver={()=>{ setStyle({color: "#7C0A02"})}} onMouseOut={()=>{setStyle({color: "black"})}} >
                Logout
            </a>
            </div>
            
            <div className="d-flex justify-content-between align-items-center" style={{height: "30%"}}>
                <Link to={"/"}>Update Profile</Link>
            </div>
            
                
        </div>
    )


}
export default Settings;