import express from "express";

import * as shopProfile from '../controllers/shopProfile.js'
const router = express.Router();

router.post('/register', shopProfile.register);
router.get('/profile/:userID', shopProfile.getprofile);
export default router;