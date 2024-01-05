import express from "express";
import * as user from "../controllers/users.js";
const router = express.Router();

router.post("/register", user.register);
router.post("/signin", user.signIn);
router.post("/reset-password", user.resetPassword);
router.post("/reset-password/verify-token", user.verifyToken);
router.get("/profile/:userID", user.getprofile);
router.post("/profile/checkShopOwner", user.checkShopOwner);
router.put("/profile/update/:userID", user.updateprofile);
router.put("/profile/set-address/:userID", user.updateaddress);
router.post("/profile/update-password", user.updatePassword);
export default router;