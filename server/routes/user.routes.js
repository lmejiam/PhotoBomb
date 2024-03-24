import{
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
}from "../controllers/user.controller.js"



import {Router} from "express"

const router = Router()

router.route("/user/signin")
    .post(login)

    
router.route('/user/logout')
    .delete(logout)


router.route('/user/album/create')
    .post(createUserAlbum)

router.route('/user/photo')
    .post(createUserPhoto)


router.route("/user")
    .get(getOneUser)
    .put(UpdateOneUser)
    .delete(deleteOneUser)
    .post(createUser)

router.route("/user/:id")
    .delete(deleteOneUser)
    .put(UpdateOneUser)

router.route("/users")
    .get(getAllUsers)

export default router;