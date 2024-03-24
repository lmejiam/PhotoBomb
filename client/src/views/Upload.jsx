import React from "react";
import {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import { useNavigate, useLocation} from "react-router-dom";


const Upload = (props)=>{
    const navigate = useNavigate()

    const [photo, setPhoto] = useState({
        url : "",
        description: "",
        favorite: false,
    })

    const [errors, setErrors] = useState({})
    const [load, setLoad] = useState(false)


    const handleChange=(e)=>{
        setPhoto({...photo,[e.target.name]: e.target.value})
    }

    const handleSubmit=(e)=>{
        e.preventDefault()

        if(load){
            axios.post('http://localhost:8000/api/user/photo', photo, {withCredentials: true})
            .then((response)=>{
                console.log(response.data)
                navigate("/dashboard")
            })
            .catch((error)=>{
                console.log(error)
                setErrors(error.response.data.errors)
            })

        }
        
    }

    const handleFile=(e)=>{
        let reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])
        reader.onload = () =>{
            setPhoto({
                takenon: getDate(),
                img: reader.result,
                description: "Test Photo"
            }) 

            console.log(photo)
        }
        reader.onerror = error => {
            console.log("error")
        }

        axios.post('http://localhost:8000/api/user/photo', photo, {withCredentials: true})
            .then((response)=>{
                console.log(response.data)
                navigate("/dashboard")
            })
            .catch((error)=>{
                console.log(error)
                setErrors(error.response.data.errors)
            })

    }

    const handleImage= (e)=>{

        if(e.type === 'load'){
            setLoad(true)
            setErrors({...errors, url: null})
        }else{
            setLoad(false)
            setErrors({...errors,url: "Invalid Picture URL"})
        }
    }


    const getDate= ()=> {
        const today = new Date();
        return today;
    }

    return(
        <>
        <div className="d-flex justify-content-center" >
            <div className= "p-3 thickborder" style={{width: "100%" , maxWidth: "400px"}}>
            <div className="d-flex m-3 justify-content-center" onClick={()=> navigate("/dashboard")}>
                <img className="m-2" src="../public/icon.svg" alt="photobombicon" style={{width: "40px", height: "40px"} } />
                <h1>PhotoBomb</h1>
            </div>
            <div className="d-flex m-3 justify-content-center">
            <h3 className="d-block">Upload your picture!</h3>
            </div>
            


            
            <div className="formComponent">
            <div className="d-flex justify-content-around">
                    <div className="pl-3 text-left w-100 ">
                        <div className="d-block m-3 text-left text-left">
                            <label className="d-block font-weight-bold" htmlFor="url">URL</label>
                            {errors.url? <p style={{color: "red"}}>{errors.url}</p> : null}
                            <input type="text"  name="url" value={photo.url} onChange= {handleChange} className="w-100"></input>
                            <label className="d-block font-weight-bold" htmlFor="description">Description</label>
                            <input type="text"  name="description" value={photo.description} onChange= {handleChange} className="w-100"></input>
                            {errors.description? <p style={{color: "red"}}>{errors.description.message}</p> : null}
                            <div className="d-flex mt-3 align-items-center">
                                <label className="d-block font-weight-bold mr-3 mt-2" htmlFor="favorite">Favorite</label>
                                <input type="checkbox" name="favorite" checked={photo.favorite} onChange={(e)=> setPhoto({...photo, [e.target.name]:e.target.checked})}></input>
                            </div>
                            
                        </div>
                        
                    </div>
                </div>
                <div className="w-50 ml-3">
                <button onClick= {handleSubmit} className="mybtn btn btn-primary m-3">Create</button>
                <label className = "labellink text-primary m-2" htmlFor="files">UPLOAD FROM FILE</label>
                    <input className = "link-opacity-100" id="files" style={{visibility:"hidden"}} type="file" onChange={handleFile} accept=".jpg, .png, .heif, .heic" ></input>
                </div>
            </div>

            <div className="text-justify-center m-3">

                <div className="d-flex justify-content-center m-3">
                <h3>Image Preview</h3>
                </div>
                
                <div className="d-flex justify-content-center m-3">
                    {
                        photo.url!==""?<img className="thickborder" src={photo.url} alt="imagepreview" style={{width: "200px", height: "200px"} } onLoad={handleImage} onError={handleImage}/>:<p>No image to preview</p>
                    }
                    
                </div>

            </div>
            </div>

        </div>
        </>

    )
}
export default Upload;