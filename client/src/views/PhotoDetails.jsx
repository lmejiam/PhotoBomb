import React from "react";
import {useState, useEffect} from 'react'
import Header from "../components/Header";
import axios from 'axios'
import { useNavigate, useParams } from "react-router-dom";
import Info from "../components/Info";



const PhotoDetails = ()=>{

    const {id} = useParams(); 

    const [photo, setPhoto] =  useState({})
    const [albums, setAlbums] = useState([])

    const [displayinfo, setDisplayinfo] = useState(false)

    const navigate = useNavigate()

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/photos/${id}`)
        .then((response)=>{
            setPhoto(response.data)
        }).catch((error)=>{
            console.log(error)
        })
    },[])

    useEffect(()=>{

        axios.get('http://localhost:8000/api/user/albums/', {withCredentials: true})
        .then((response)=>{
            console.log(response.data)
            setAlbums(response.data)
            
        }).catch((error)=>{
            console.log(error)
        })

    },[])
        





    const handleClick=((e)=>{
        
        if(e.target.name === "delete"){
            axios.delete(`http://localhost:8000/api/photos/${id}`, {withCredentials: true})
            .then((response)=>{
                console.log(response.data)
                navigate("/dashboard")
            })
            .catch((error)=>{
                console.log(error)
            })
        
            
        }
        else if(e.target.name ==="info"){
            setDisplayinfo(true)
        }
        
    })

    return(
        
    <>
    <div style={{width: "80%"}}>
        <div className="d-flex justify-content-between align-items-center mt-1 mb-3 thickborder" style={{height: "80px"}}>
        
        <div className="" style={{width: "20%"}}>
            <a href= "/dashboard">
            <img width="50" height="50" src="https://img.icons8.com/glyph-neue/64/circled-chevron-left.png" alt="back icon"/>
            </a>
        </div>
        
        <div className="d-flex m-3" style={{width: "30%"}}>
                <img className="m-2" src="../public/icon.svg" alt="photobombicon" style={{width: "40px", height: "40px"} }/>
                <h2 className="d-inline m-2">PhotoBomb!</h2>
            </div>

        {/* <span  onClick={handleClick}>
            <img width="50" height="50" src="https://img.icons8.com/ios-filled/50/download-2--v1.png" alt="download-2--v1" name="download"/>
        </span> */}

        <span  onClick={handleClick}>
            <img width="50" height="50" src="https://img.icons8.com/color/48/info--v1.png" alt="info--v1" name="info"/>
        </span>

        <span  onClick={handleClick}>
            <img width="50" height="50" src=
            {photo.favorite? "https://img.icons8.com/color/48/filled-star--v1.png": "https://img.icons8.com/ios/50/star--v1.png"} 
            alt="favorite" name="favorite"/>
        </span>

        <span  onClick={handleClick}>
            <img width="50" height="50" src="https://img.icons8.com/pastel-glyph/64/trash.png" alt="trash" name="delete"/>
        </span>

    </div>

        <div className="d-flex thickborder" style={{ background: "rgb(220,220,220,0.3)"}}>

            <div className="d-flex align-items-center justify-content-center mt-3 p-5" style={{minHeight: "600px", width: "100%"}}>
                <img  className="thickborder" src = {photo.url} style={{maxWidth: "70%", opacity: "150%"}}/>
            </div>
            <div>
            {
                displayinfo?<Info photo={photo} setPhoto={setPhoto} useralbums = {albums} setuserAlbums = {setAlbums} setDisplayinfo={setDisplayinfo}/>: null
            }
            </div>
        </div>
        </div>
    </>


    )
}

export default PhotoDetails;