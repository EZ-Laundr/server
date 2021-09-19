const router = require("express").Router();
const Controller = require("../controllers/controller");

const AdminController = require("../controllers/adminController");

const authentication = require("../middleware/authentication");
const onlyAdmin = require("../middleware/authorization");
const errorHandling = require("../middleware/errorHandling");
const adminRouter = require("./adminRoute");

router.post("/register", Controller.register);
router.post("/login", Controller.login);
router.post("/admin/login", AdminController.adminLogin);
router.post("/admin/register", AdminController.adminRegister);

router.get("/perfumes", Controller.getPerfumes);
router.get("/special-treatments", Controller.getSpecialTreatments);
router.get("/services", Controller.getServices);

router.use(authentication);

router.get("/orders", Controller.getOrders);
router.get("/orders/:id", Controller.getOrdersById);

router.post("/orders", Controller.postOrders);

router.use(onlyAdmin);
router.use("/admin", adminRouter);

router.use(errorHandling);

module.exports = router;
