import{
    createAlbum,
    getAllAlbums,
    getOneAlbum,
    deleteOneAlbum,
    UpdateOneAlbum,
    getAllAlbumsByUserId,
    getAllAlbumsByUser,
    deleteUserAlbum
    //getAllByKeyword
}from "../controllers/album.controller.js"

import {Router} from "express"

const router_album = Router()

router_album.route("/user/albums")
    .get(getAllAlbumsByUser)


router_album.route("/album/:id")
    .get(getOneAlbum)
    .put(UpdateOneAlbum)
    .delete(deleteOneAlbum)
    

router_album.route('/albums/:keywords')
    //.get(getAllByKeyword)

router_album.route("/albums")
    .post(createAlbum)
    .get(getAllAlbums)
    

router_album.route("/albums/:id")
    .get(getAllAlbumsByUserId)
    .delete(deleteUserAlbum)



export default router_album;