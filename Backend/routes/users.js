import express from "express";

import * as user from '../controllers/users.js'
const router = express.Router();

router.post('/register', user.register);
router.post('/signin', user.signIn);
router.get('/profile/:userID', user.getprofile);
export default router;