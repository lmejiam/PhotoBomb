import{
    createPhoto,
    getAllPhotos,
    getOnePhoto,
    deleteOnePhoto,
    UpdateOnePhoto,
    getAllPhotosByUserId,
    getAllByKeyword,
    getAllPhotosByAlbum
}from "../controllers/photo.controller.js"

import {Router} from "express"

const router_photos = Router()

router_photos.route("/user/photos")
    .get(getAllPhotosByUserId)

router_photos.route("/user/album/photos/:id")
    .get(getAllPhotosByAlbum)

router_photos.route("/photos")
    .get(getAllPhotos)
    .post(createPhoto)

router_photos.route("/photos/:id")
    .get(getOnePhoto)
    .put(UpdateOnePhoto)
    .delete(deleteOnePhoto)

router_photos.route('/search/photos/:keywords')
    .get(getAllByKeyword)

export default router_photos;
