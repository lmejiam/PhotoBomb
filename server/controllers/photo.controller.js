import Photo from "../models/photo.model.js"   
import jwt from 'jsonwebtoken'
import User from "../models/user.model.js"


async function createPhoto(req, res){
    try{

        const newPhoto = await Photo.create(req.body)
        res.json(newPhoto)

    } catch(error){
        console.log(error)
        res.status(400).json(error)
    }

}

async function getAllPhotos(req, res){
    try{

        const photos = await Photo.find()
        res.json(photos)

    } catch(error){
        console.log(error)
        res.status(400).json(error)
    }

}

async function getOnePhoto(req, res){
    try{
        const photo = await Photo.findById(req.params.id)
        res.json(photo)

    } catch(error){
        console.log(error)
        res.status(400).json(error)
    }

}


async function getAllPhotosByUserId(req, res){

    try{
        
        const userId = jwt.verify(req.cookies.usertoken, process.env.SECRET_KEY)
        
        const user = await User.findById(userId.id)
        const photos = await Photo.find({albums: user.albums[0]._id})
        res.json(photos)

    } catch(error){
        console.log(error)
        res.status(400).json(error)
    }

}


async function getAllPhotosByAlbum(req, res){

    try{
        
        const userId = jwt.verify(req.cookies.usertoken, process.env.SECRET_KEY)
        
        const user = await User.findById(userId.id)
        const photos = await Photo.find({albums: {_id: req.params.id}})
        res.json(photos)

    } catch(error){
        console.log(error)
        res.status(400).json(error)
    }


}



async function getAllByKeyword(req, res){

    try{

        const userId = jwt.verify(req.cookies.usertoken, process.env.SECRET_KEY)
        
        const user = await User.findById(userId.id)
        const user_photos = await Photo.find({albums: user.albums[0]._id})

        //const search = user_photos.find({description: req.params.keywords})

        console.log(user_photos)


        const photos = await Photo.find({description: req.params.keywords})
        res.json(photos)

    } catch(error){
        console.log(error)
        res.status(400).json(error)
    }

}


async function deleteOnePhoto(req, res){
    try{
        const userId = jwt.verify(req.cookies.usertoken, process.env.SECRET_KEY)

        if(userId.id !==null){
            
            const photo = await Photo.findByIdAndDelete(req.params.id)
            res.json(photo)
        }else{
            res.status(400).json({user: {message: "user not found"}})
        }
            

    } catch(error){
        console.log(error)
        res.status(400).json(error)
    }

}

async function UpdateOnePhoto(req, res){
    try{

        console.log(req.params)
        const photo = await Photo.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        res.json(photo)

    } catch(error){
        console.log(error)
        res.status(400).json(error)
    }

}


export {
    createPhoto,
    getAllPhotos,
    getAllPhotosByUserId,
    getAllByKeyword,
    getOnePhoto,
    deleteOnePhoto,
    UpdateOnePhoto,
    getAllPhotosByAlbum
}