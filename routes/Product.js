const express = require('express');
const router = express.Router();



const { Auth } = require('../middlewares/Auth');
const { AuthenticateAdmin } = require('../middlewares/AuthenticateAdmin');
const { AddNewProductController } = require('../controllers/product/AddNewProductController');
const { UpdateProductController } = require('../controllers/product/UpdateProductController');
const { DeleteProductController } = require('../controllers/product/DeleteProductController');
const { GetAllProductListController } = require('../controllers/product/GetAllProductListController');
const { GetProductDetailsController } = require('../controllers/product/GetProductDetailsController');
const { HandleSearchQueryController } = require('../controllers/product/HandleSearchQueryController');


router.get("/api/product/search",HandleSearchQueryController);
router.get("/api/product/all",GetAllProductListController);
router.get("/api/product/details/:product_id",GetProductDetailsController);
router.post("/api/product/add-new",Auth,AuthenticateAdmin,AddNewProductController);
router.put("/api/product/update/:product_id",Auth,AuthenticateAdmin,UpdateProductController);
router.delete("/api/product/delete/:product_id",Auth,AuthenticateAdmin,DeleteProductController);

module.exports=router;