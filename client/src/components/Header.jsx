import React from 'react'
import {Link} from "react-router-dom";
import { useState, useEffect} from 'react';
import axios from 'axios';


const Header = (props) =>{

    const {search, setSearch} = props
    const {setSubmitSearch}   = props
    const {settings, setSettings} = props

    const [newsettings, setNewsettings] = useState(false)
    const {user, setUser} = props



    const handleClick=()=>{
        if(settings){

            setSettings(false)
        }else{
            {setSettings(true)}
        }
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        setSubmitSearch(true)
    }
    


    const handleChange=(e)=>{
        setSearch(e.target.value)
    }

    return(
        <>
        <div className='d-flex justify-content-between' >
            <div className="d-flex justify-content-between align-items-center thickborder p-3 mb-3" style={{width: "100%"}}>
                <img className="m-2" src="../public/icon.svg" alt="photobombicon" style={{width: "40px", height: "40px"} }/>
                <h2 className="d-inline m-2">PhotoBomb!</h2>
            <div className="d-flex justify-content-between align-items-center">
                <input className="d-inline m-2 w-100" type="text" placeholder='search' name='search' value={search} onChange={handleChange} style={{width: "100px"}}></input>
                <button onClick= {handleSubmit} className="mybtn btn btn-primary m-3 ml-4">Search</button>
            </div>
                
                    <Link className="labellink text-primary m-2" to={"/albums"}>CREATE</Link>
                    <Link className="labellink text-primary m-2" to={"/upload"}>UPLOAD</Link>

                    
                <img className="m-2"src={user.profilepic} alt="profilephoto" onClick={handleClick} />
            </div>
            
        </div>
        </>
        
    )


}
export default Header;