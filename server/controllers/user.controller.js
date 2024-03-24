import User from "../models/user.model.js"   
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import Album from "../models/album.model.js";
import{
    createAlbum,
    getAllAlbumsByUserId
    
}from "../controllers/album.controller.js"

import Photo from "../models/photo.model.js";
import{
    createPhoto
}from"../controllers/photo.controller.js"

const SECRET_KEY = process.env.SECRET_KEY

async function createUser(req, res){
    try{

        const newUser = await User.create(req.body)

        
        const userToken = jwt.sign({
            id: newUser._id
        }, process.env.SECRET_KEY);
        
        res.cookie("usertoken", userToken, {
            httpOnly: true
        })
        res.json({msg: "User Created"})


    } catch(error){
        console.log(error)
        res.status(400).json(error)
    }


}


async function getAllUsers(req, res){
    try{

        const users = await User.find()
        res.json(users)

    } catch(error){
        console.log(error)
        res.status(400).json(error)
    }

}

async function getOneUser(req, res){
    try{

        const userId = jwt.verify(req.cookies.usertoken, process.env.SECRET_KEY)
        const user = await User.findById(userId.id)

        const u = {
            first_name: user.first_name,
            last_name: user.last_name,
            profilepic: user.profilepic,
            albums: user.albums
        }


        res.json(u)

    } catch(error){
        console.log(error)
        res.status(400).json(error)
    }

}

async function getUserByEmail(req, res){
    try{

        const user = await User.findOne(req.body)
        res.json(user)

    } catch(error){
        console.log(error)
        res.status(400).json(error)
    }

}


async function deleteOneUser(req, res){
    try{

        const user = await User.findById(req.body.id)

        for(let album in user.albums){
            await Album.deleteOne({name: album.name})
        }

        const u = await User.findByIdAndDelete(req.body.id)




        res.json(u)

    } catch(error){
        console.log(error)
        res.status(400).json(error)
    }

}

async function UpdateOneUser(req, res){
    try{

        const userId = jwt.verify(req.cookies.usertoken, process.env.SECRET_KEY)
        
        const user = await User.findByIdAndUpdate(userId.id, req.body, {new: true, runValidators: true})

        res.json(user)

    } catch(error){
        console.log(error)
        res.status(400).json(error)
    }

}


async function createUserAlbum(req, res){
        
        try{
        const userId = jwt.verify(req.cookies.usertoken, process.env.SECRET_KEY)
        const album  = await Album.create({name: req.body.name})

        const user = await User.findByIdAndUpdate(userId.id,{$push: {albums: album._id}},{update: false})

        res.json(user)
        } catch(error){console.log(error)
            res.status(400).json(error)
        }

}


async function createUserPhoto(req, res){
        
    try{
    const userId = jwt.verify(req.cookies.usertoken, process.env.SECRET_KEY)
    const user = await User.findById(userId.id)


    const photo  = await Photo.create({...req.body, albums: [user.albums[0]]})
    
    console.log(photo)

    res.json(photo)
    } catch(error){console.log(error)
        res.status(400).json(error)
    }

}

async function login(req, res){

    
    try{
        const user = await User.findOne({email: req.body.email});
        
        if(user===null){
            
                return res.status(400).json({email: {message: "Email not found"}})
            
        }else{
            const correctPassword = await bcrypt.compare(req.body.password, user.password);
            if(!correctPassword){
                return res.status(400).json({password: {message: "Password doesnt match"}})
            }else{
                const userToken = jwt.sign({
                    id: user._id
                }, process.env.SECRET_KEY);
                
                res.cookie('usertoken', userToken, {
                    httpOnly: true, path: '/', secure: false, expires: new Date(Date.now()+3600000)
                })
                res.json({msg: "success"})
            }
            

        }
        
        
    }catch(error){
        console.log(error)
        res.status(400).json(error)
    }

}

async function logout(req, res) {
    
    //cookie.set('usertoken',{expires: Date.now})
    //console.log(req.cookie.usertoken)
    res.clearCookie('usertoken', {
        httpOnly: true, path: '/', secure: false, expire: Date.now()}).send('cookie cleared')

    //clearCookie('usertoken')
    //res.status(202).clearCookie('usertoken').cookie('usertoken', '', {maxAge: 1})

    res.end()

}



export {
    createUser,
    getAllUsers,
    getOneUser,
    getUserByEmail,
    deleteOneUser,
    UpdateOneUser,
    login,
    logout,
    createUserAlbum,
    createUserPhoto
}