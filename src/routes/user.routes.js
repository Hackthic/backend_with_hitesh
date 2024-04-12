import {Router} from "express";
import{logoutUser, registerUser} from "../controllers/user.controller.js";
import {upload}  from "../middleware/multer.middleware.js"
const router = Router()
router.route("/register").post(
   
)
router.route("/login").post(loginUser)
router.route("/logout").post(verifyJWT, logoutUser)

export default router