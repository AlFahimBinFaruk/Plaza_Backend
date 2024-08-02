const express = require('express');
const router = express.Router();


const { Auth } = require('../middlewares/Auth');
const { AuthenticateAdmin } = require('../middlewares/AuthenticateAdmin');
const { GetAllUserListController } = require('../controllers/user/GetAllUserListController');
const { LoginUserController } = require('../controllers/user/LoginUserController');
const { RegisterUserController } = require('../controllers/user/RegisterUserController');
const { GetUserDetailsController } = require('../controllers/user/GetUserDetailsController');
const { UpdateUserProfileController } = require('../controllers/user/UpdateUserProfileController');
const { UpdateMyProfileController } = require('../controllers/user/UpdateMyProfileController');
const { DeleteUserController } = require('../controllers/user/DeleteUserController');



router.post("/api/user/login",LoginUserController);
router.post("/api/user/register",RegisterUserController);
router.get("/api/user/all",Auth,AuthenticateAdmin,GetAllUserListController);
router.get("/api/user/:user_id",Auth,GetUserDetailsController);
router.put("/api/user/update-user-profile",Auth,AuthenticateAdmin,UpdateUserProfileController);
router.put("/api/user/update-my-profile",Auth,UpdateMyProfileController);
router.delete("/api/user/delete/:user_id",Auth,AuthenticateAdmin,DeleteUserController);
router.put("/api/user/update-my-password",Auth,UpdateMyProfileController);

module.exports=router;