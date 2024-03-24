import Album from "../models/album.model.js"
import jwt from 'jsonwebtoken'
import User from "../models/user.model.js"
import mongoose from "mongoose"

async function createAlbum(req, res){
    try{

        const newAlbum = await Album.create(req.body)
        res.json(newAlbum)

    } catch(error){
        console.log(error)
        res.status(400).json(error)
    }

}

async function getAllAlbums(req, res){
    try{

        const albums = await Album.find()
        res.json(albums)
        console.log(albums)

    } catch(error){
        console.log(error)
        res.status(400).json(error)
    }

}

async function getOneAlbum(req, res){
    try{
        const album = await Album.findById(req.params.id)
        res.json(album)

    } catch(error){
        console.log(error)
        res.status(400).json(error)
    }

}

async function getAllAlbumsByUserId(req,res){
    try{
        const albums = await Album.find({user: req.params.id})
        res.json(albums)

    }catch(error){
        console.log(error)
        res.status(400).json(error)
    }
    
}



async function getAllAlbumsByUser(req, res){

    try{
        
    
        const userId = jwt.verify(req.cookies.usertoken, process.env.SECRET_KEY)
        
        const find_albumsId = await User.findById(userId.id) 

        let albums = []

        for(let idx = 0; idx < find_albumsId.albums.length; idx++){
            let a = {
                id: find_albumsId.albums[idx]
            }
            let album = await Album.findById(a.id)
            albums.push(album)
        }
        res.json(albums)

    } catch(error){
        console.log(error)
        res.status(400).json(error)
    }

}

async function deleteUserAlbum(req, res){

    try{
        
    
        const userId = jwt.verify(req.cookies.usertoken, process.env.SECRET_KEY)
        const find_albumsId = await User.findById(userId.id) 

        let albums = find_albumsId.albums

        for(let idx = 0; idx < find_albumsId.albums.length; idx++){
            let a = {
                id: find_albumsId.albums[idx]
            }
            if(a.id==req.params.id){
                albums.splice(idx, 1)
            }
        
        }

        const user = await User.findByIdAndUpdate(find_albumsId._id, {albums: albums}, {update: false})
        res.json(user.albums)

    } catch(error){
        console.log(error)
        res.status(400).json(error)
    }

}




async function deleteOneAlbum(req, res){
    try{

        const album = await Album.findByIdAndDelete(req.params.id)
        res.json(album)

    } catch(error){
        console.log(error)
        res.status(400).json(error)
    }

}

async function UpdateOneAlbum(req, res){
    try{

        const album = await Album.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        res.json(album)

    } catch(error){
        console.log(error)
        res.status(400).json(error)
    }

}


export {
    createAlbum,
    getAllAlbums,
    getAllAlbumsByUserId,
    //getAllByKeyword,
    getOneAlbum,
    deleteOneAlbum,
    UpdateOneAlbum,
    getAllAlbumsByUser,
    deleteUserAlbum
}