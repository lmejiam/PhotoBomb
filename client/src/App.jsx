import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import Home from './views/Home'
import Signin from "./views/Signin";
import Dashboard from './views/Dashboard';
import PhotoDetails from './views/PhotoDetails';
import Register from './views/Register.jsx';
import Album from './views/Album.jsx';
import Upload from './views/Upload.jsx';
import React from 'react'


function App() {



  return (
    <>

      <BrowserRouter> 
          <Routes>
            <Route path="/" element= {<Home/>}/>
            <Route path="/signin" element = {<Signin/>}/>
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/photo/:id" element= {<PhotoDetails/>} />
            <Route path="/register" element = {<Register/>} />
      
            <Route path="/albums" element= {<Album/>} />

            <Route path="/upload" element = {<Upload/>} />
          
            

          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
