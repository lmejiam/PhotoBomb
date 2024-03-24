import React from "react";
import {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import { useNavigate, Link } from "react-router-dom";


const Home = ()=>{
    const [photos, setPhotos] = useState([])
    const [fixed, setFixed]   = useState([])

    useEffect(()=>{
        let tempalbum = []
        for(let i = 0; i<=10; i++){
            tempalbum.push( {
                url: `https://picsum.photos/${randomNumberInRange(50,90)}/${randomNumberInRange(70,100)}`
            })

        }

        setPhotos(tempalbum)


        for(let i = 0; i<=20; i++){
            tempalbum.push( {
                url: `https://picsum.photos/${randomNumberInRange(120,150)}/${randomNumberInRange(180,200)}`
            })

        }

        setFixed(tempalbum)


    },[])


    const randomNumberInRange = (min, max) => {
        return Math.floor(Math.random()*(max - min + 1)) + min;
    };

    return(
        <div className="d-flex justify-content-center">

        <div>
        <div className="d-flex align-items-center pt-2">
        <img className="m-3" src="../public/icon.svg" alt="photobombicon" style={{width: "50px", height: "50px"} }/>
        <h1 className="m-3">PhotoBomb</h1>
        </div>
        <h3 className="ml-3">Free storage and organization for all your memories</h3>
        
        
        <Link className="mybtn btn btn-primary m-3" to = {'/signin'} >GO TO PHOTOBOMB!</Link>
        <div className="d-flex justify-content-center thickborder m-3 p-0" style={{ background: "black",
                overflow: "hidden", minHeight: "400px", width: "650px", maxHeight:"400px"}}>
                <div style={{
                        position: "relative",
                        zIndex: "20", 
                        width: "100%",
                }
                }>
                        
            {/* {
                fixed.map((photo,index)=>(

                    <img key={index} src = {photo.url} alt={"photo"} style={{margin: "0px", 
                    
                }}/>
                ))
            } */}
            {
                photos.map((photo,index)=>(

                    <img key={index} src = {photo.url} alt={"photo"} style={{margin: "0px", 
                    
                    position: "absolute",
                    zIndex: `${index}`, 
                    width: `${randomNumberInRange(10,30)}%`,
                    left: `${randomNumberInRange(0,500)}px`,
                    top: `${randomNumberInRange(0,30)}em`
                
                
                }}/>
                ))
            }
                <img src="https://picsum.photos/300/400" 
                    style={{margin: "0px", 
                            
                    position: "absolute",
                    zIndex: `1`, 
                    width: `200px`,
                    left: `450px`,
                    top: `0em`
            
            
                }}/>
                <img src="https://picsum.photos/250/400" 
                    style={{margin: "0px", 
                            
                    position: "absolute",
                    zIndex: `1`, 
                    width: `400px`,
                    left: `300px`,
                    top: `10em`
            
            
                }}/>
                <img src="https://picsum.photos/500" 
                    style={{margin: "0px", 
                    position: "absolute",
                    zIndex: `1`, 
                    width: `400px`,
                    left: `00px`,
                    top: `0em`
            
            
                }}/>
                

            </div>
        </div>
        </div>
    </div>

    )
}
export default Home;