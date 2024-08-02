const express = require('express');
const router = express.Router();


const { Auth } = require('../middlewares/Auth');
const { AuthenticateAdmin } = require('../middlewares/AuthenticateAdmin');
const { AddNewCategoryController } = require('../controllers/category/AddNewCategoryController');
const { GetAllCategoryListController } = require('../controllers/category/GetAllCategoryListController');
const { UpdateCategoryController } = require('../controllers/category/UpdateCategoryController');
const { DeleteCategoryController } = require('../controllers/category/DeleteCategoryController');
const { GetCategoryDetailsController } = require('../controllers/category/GetCategoryDetailsController');


router.post("/api/category/add-new",Auth,AuthenticateAdmin,AddNewCategoryController);
router.get("/api/category/all",GetAllCategoryListController);
router.get("/api/category/details/:category_id",GetCategoryDetailsController);
router.put("/api/category/update/:category_id",Auth,AuthenticateAdmin,UpdateCategoryController);
router.delete("/api/category/delete/:category_id",Auth,AuthenticateAdmin,DeleteCategoryController);


module.exports=router;