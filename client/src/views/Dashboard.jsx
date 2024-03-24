import React from "react";
import {useState, useEffect, createContext} from 'react'
import axios from 'axios'
import { useNavigate, Link } from "react-router-dom";
import Header from "../components/Header";
import Settings from "../components/Settings";


const Dashboard = ()=>{
    const navigate = useNavigate()
    const [photos, setPhotos] = useState([])
    const [settings, setSettings]= useState(false)
    const [search, setSearch] = useState("")
    const [submitSearch, setSubmitSearch] = useState(false)
    const [user, setUser]     = useState({
        first_name: "",
        last_name: "",
        albums: [],
        
    })

    const [albums, setAlbums] = useState([])
    const [selected, setSelected] = useState({name: "My Photos"})
    

    useEffect(()=>{
        

        axios.get("http://localhost:8000/api/user", {withCredentials: true})
        .then((response)=>{
            setUser(response.data)
        }).catch((error)=>{
            console.log(error)
        })

        axios.get('http://localhost:8000/api/user/albums/', {withCredentials: true})
        .then((response)=>{
            //console.log(response.data)
            setAlbums(response.data)
            
        }).catch((error)=>{
            console.log(error)
        })
    },[])


    useEffect(()=>{
        
        console.log(search)
        if(selected._id !== undefined && selected.name !== search){
            axios.get(`http://localhost:8000/api/user/album/photos/${selected._id}`, {withCredentials: true})
            .then((response)=>{
                console.log(response.data)
                setPhotos(response.data)
                
            }).catch((error)=>{
                console.log(error)
            })
        }else if(selected.name === search || submitSearch){

            console.log(selected.name)
            setSearch("")
            setSubmitSearch(false)
        }else{
            axios.get('http://localhost:8000/api/user/photos/', {withCredentials: true})
        .then((response)=>{
            console.log(response.data)
            setPhotos(response.data)

        }).catch((error)=>{
            console.log(error)
        })
        }
        

    },[selected])


    function handleDate(photo){
        const dateWithoutTime = photo.split('T')[0]
        return dateWithoutTime
    }

    useEffect(()=>{
        
        if(search !== "" && submitSearch === true){
            console.log(submitSearch)
            axios.get(`http://localhost:8000/api/search/photos/${search}`, {withCredentials: true})
            .then((response)=>{
                console.log(response.data)
                setPhotos(response.data)

                if(response.data.length > 0){
                    setSelected({name: search})
                }else{
                    setSelected({name: `Search: ${search} not found`})
                }
                
                
            }).catch((error)=>{
                console.log(error)
            })
            
        }

    }, [submitSearch])

    return(
        <>
        <div style={{width: "1000px"}}>
            <div style={{width: "100%"}}>
            <Header search={search} setSearch={setSearch} user = {user} settings= {settings} setSettings={setSettings} setSubmitSearch={setSubmitSearch}></Header>
            </div>
            
        
        <div className = "d-flex justify-content-between" style={{minHeight: "500px"}}>
            
            <div className = "thickborder mr-2 p-2 pt-3"style={{width: "15%",minWidth: "100px", flexWrap: "wrap"}}>
                <h4 className="mb-5">My Albums</h4>

                {
                        albums.map((album)=>(
                            <div key={album._id} name={album.name} onClick={()=>{ setSelected(album)}}  >
                                <p>{album.name}  </p>
                            </div>                                                                                                                                                             
                        ))
                }


            </div>
            
            <div className="homeContent thickborder text-center pt-3" style={{width: "85%"}}>
                
                <h2>{selected.name}</h2>
                <div className="d-flex m-3 justify-content-center text-center" style={{flexWrap: "wrap"}}> 
                {
                    photos.toReversed().map((photo)=>(
                        <div key={photo._id}>
                            <p className="mt-3">{handleDate(photo.takenon)}</p>
                            <a  href= {`/photo/${photo._id}`} >
                            <img  src = {photo.url} alt={photo.keywords} className="d-inline ml-3 mr-3 mt-0 thickborder"style={{height: "150px"}}/>
                            </a>
                            
                        </div>
                    ))
                    }  
                </div>
            </div>

            {
                    settings == true? <Settings/>: null
            }
        </div>
        </div>
        </>

    )
}
export default Dashboard;