import express from "express";

import * as users from '../controllers/users.js'
const router = express.Router();

router.get('/:userID', users.profile);

export default router;