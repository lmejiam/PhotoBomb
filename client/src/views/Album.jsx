import React from "react";
import {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import { useNavigate, Link } from "react-router-dom";


const Album = ()=>{
    const navigate = useNavigate()
    const [photos, setPhotos] = useState([])
    const [newalbum, setNewAlbum]   = useState({name: ""}    )
    const [albums, setAlbums] = useState([])
    const [errors, setErrors] = useState({})



    useEffect(()=>{
        axios.get('http://localhost:8000/api/user/albums/', {withCredentials: true})
        .then((response)=>{
            console.log(response.data)
            setAlbums(response.data)
            
        }).catch((error)=>{
            console.log(error)
        })

    },[])


    const handleDelete=(id)=>{

        axios.delete(`http://localhost:8000/api/albums/${id}`, {withCredentials: true})
        .then((response)=>{
            console.log(response.data)
            navigate("/dashboard")
            
        }).catch((error)=>{
            console.log(error)
        })

    }
    const handleChange=(e)=>{
        setNewAlbum({...newalbum, [e.target.name]: e.target.value})
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        axios.post('http://localhost:8000/api/user/album/create', newalbum, {withCredentials: true})
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
        <>
        <div className="d-flex justify-content-center">

        <div className= "p-3 thickborder" style={{width: "100%", maxWidth: "400px"}}>
            <div className="d-flex m-3 justify-content-center" onClick={()=> navigate("/dashboard")}>
                <img className="m-2" src="../public/icon.svg" alt="photobombicon" style={{width: "40px", height: "40px"} } />
                <h1>PhotoBomb</h1>
            </div>
            <div className="d-flex m-3 justify-content-center">
            <h3 className="d-block">Create your Album!</h3>
            </div>

        
        <div className="formComponent">
        <div className="d-flex justify-content-around">
                <div className="pl-3 text-left w-100 ">
                    <div className="d-block m-3 text-left text-left">
                        <label className="d-block font-weight-bold" htmlFor="email">Name for New Album</label>
                        <input type="text"  name="name" value={newalbum.name} onChange= {handleChange} className="w-100"></input>
                        {errors.name? <p style={{color: "red"}}>{errors.name.message}</p> : null}
                    </div>
                    
                </div>
            </div>
            <div className="w-50 ml-3">
            <button onClick= {handleSubmit} className="mybtn btn btn-primary m-3">Create</button>
            </div>
            <div className="m-5">
            <h3>My Albums</h3>
        
            { 
                    albums.map((album)=>(
                        <div key={album._id} >
                            {
                                album._id != albums[0]._id ?
                                <li className="d-flex justify-content-around" style={{width: "200px"}}>
                                    <div>
                                        <p>
                                            {album.name}
                                        </p>
                                    </div>
                                    <div>
                                    <a onClick={()=>{handleDelete(album._id)}}>
                                        Delete
                                    </a>
                                    </div>
                                    
                                    
                                </li>:
                                null
                            
                            }
                            
                            
                        </div>
                    ))
                    }  

            </div>
            

        </div>
        </div>
        
        </div>
        </>

    )
}
export default Album;