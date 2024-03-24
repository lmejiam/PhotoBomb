import React from 'react'
import {Link, useNavigate} from "react-router-dom";
import { useState, useEffect } from 'react';

import axios from 'axios'


const Info = (props) =>{


    const {displayinfo, setDisplayinfo} = props
    const {photo, setPhoto} = props
    const {useralbums, setUserAlbums} = props

    const [user, setUser]  = useState({})
    const [photoalbums, setPhotoAlbums] = useState([])
    const [newphotoalbums, setNewPhotoAlbums] = useState({})

    const [errors, setErrors] = useState({})
    const [changedPhoto, setChangedPhoto] = useState({
        description: "",
        favorite: false

    })

    useEffect(()=>{
        setChangedPhoto({description: photo.description, favorite: photo.favorite})
        setNewPhotosValues()

        axios.get("http://localhost:8000/api/user", {withCredentials: true})
        .then((response)=>{
            setUser(response.data)
        }).catch((error)=>{
            console.log(error)
        })



    },[])

    useEffect(()=>{
        let tempalbum = []
        for(let i = 0; i < useralbums.length; i++){
            if(newphotoalbums[i]){
                tempalbum[i] = useralbums[i]
            }
        }
        setPhotoAlbums(tempalbum)
        //setChangedPhoto({...changedPhoto, albums: [tempalbum]})
    },[newphotoalbums])

    const handleChange=(e)=>{
        setChangedPhoto({...changedPhoto,[e.target.name]: e.target.value})
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
            axios.put(`http://localhost:8000/api/photos/${photo._id}`,{...changedPhoto, albums: photoalbums}, {withCredentials: true})
            .then((response)=>{
                console.log(response.data)
                setPhoto({...photo, description: changedPhoto.description, favorite: changedPhoto.favorite, albums: photoalbums})
                setDisplayinfo(false)
            })
            .catch((error)=>{
                console.log(error)
                setErrors(error.response.data.errors)
            })
        
    }

    function setNewPhotosValues(){
        
        let tempalbum = [true]

        for(let i = 1; i<useralbums.length; i++){
            for(let j = 0; j < photo.albums.length; j++){

                if(useralbums[i]._id === photo.albums[j]){

                    tempalbum[i] = true
                
                }else{
                    tempalbum[i] = false
                }
            }
        }
        setNewPhotoAlbums(tempalbum)
    }

    return(
    <div className='mt-3 ml-5 p-1 thickborder' style={{minHeight: "500px", minWidth: "300px"}}>
        <div className='d-flex justify-content-end mb-3'>
            <img width="35" height="35" src="https://img.icons8.com/ios/50/cancel.png" alt="cancel" onClick ={()=>{setDisplayinfo(false)}}/>
        </div>
        <div className="d-flex justify-content-center mt-5">
            <h2>Photo Info</h2>
        </div>
        
        
        <div className="d-flex justify-content-around">
            <div className="pl-3 text-left w-100 ">
                <div className="d-block m-3 text-left text-left">
                    <label className="d-block font-weight-bold" htmlFor="description">Description</label>
                    <input type="text"  name="description" value={changedPhoto.description} onChange= {handleChange} className="w-100"></input>
                    { errors.description? <p style={{color: "red"}}>{errors.description.message}</p> : null }
                    <div className="d-flex mt-3 align-items-center">
                        <label className="d-block font-weight-bold mr-3 mt-2" htmlFor="favorite">Favorite</label>
                        <input type="checkbox" name="favorite" checked={changedPhoto.favorite} onChange={(e)=> setChangedPhoto({...changedPhoto, [e.target.name]:e.target.checked})}></input>
                    </div>
                    
                </div>
                
            </div>
        </div>

        <div className='d-flex m-3 p-3'>
            
            
            <div>
                <h4>{user.first_name}'s Albums</h4>
            
                {  useralbums.map((album, index)=>(
                                <div key={album._id} className='d-flex justify-contents-between'>
                                {
                                    album._id == useralbums[0]._id?
                                    null : <span style={{width: "60%"}}>{album.name}  </span>   
                                }
                                {
                                    album._id == useralbums[0]._id?
                                        null:
                                        <input type="checkbox" name={index} checked = {newphotoalbums[index]== null?false:newphotoalbums[index]} 
                                            onChange={(e)=> setNewPhotoAlbums({...newphotoalbums, [e.target.name]:e.target.checked})}></input>
                                }
                                
                                    
                                </div>                                                                                                                                                             
                            ))

                }

            
            </div>
            
        </div>



        <div className="w-50 ml-3">
            <button onClick= {handleSubmit} className="mybtn btn btn-primary m-3">Update</button>
        </div>
    </div>
    
    )
}
export default Info;