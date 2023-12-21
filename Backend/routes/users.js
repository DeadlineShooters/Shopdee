import express from "express";
import {singleUpload} from "../middlewares/multer.js"
import * as user from '../controllers/users.js'
const router = express.Router();

router.post('/register', user.register);
router.post('/signin', user.signIn);
router.get('/profile/:userID', user.getprofile);
router.get('/profile/checkShopOwner', user.checkShopOwner);
router.put('/profile/update/:userID', singleUpload, user.updateprofile);
export default router;