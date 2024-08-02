const express = require('express');
const { Auth } = require('../middlewares/Auth');
const { PlaceOrderController } = require('../controllers/order/PlaceOrderController');
const { UpdateOrderController } = require('../controllers/order/UpdateOrderController');
const { DeleteOrderController } = require('../controllers/order/DeleteOrderController');
const { AuthenticateAdmin } = require('../middlewares/AuthenticateAdmin');
const { GetAllOrderListController } = require('../controllers/order/GetAllOrderListController');
const { GetOrderDetailsController } = require('../controllers/order/GetOrderDetailsController');
const { GetMyOrderListController } = require('../controllers/order/GetMyOrderListController');
const { GetMyOrderDetailsController } = require('../controllers/order/GetMyOrderDetailsController');
const router = express.Router();

router.get("/api/order/all",Auth,AuthenticateAdmin,GetAllOrderListController);
router.get("/api/order/details/:order_id",Auth,AuthenticateAdmin,GetOrderDetailsController);

router.get("/api/order/my-order-list/",Auth,GetMyOrderListController);
router.get("/api/order/my-order-details/:order_id",Auth,GetMyOrderDetailsController);


router.post("/api/order/place-order",Auth,PlaceOrderController);
router.put("/api/order/update/:order_id",Auth,UpdateOrderController);
router.delete("/api/order/delete/:order_id",Auth,DeleteOrderController)


module.exports=router;