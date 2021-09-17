const router = require("express").Router();
const Controller = require("../controllers/controller");
const authentication = require("../middleware/authentication");
const onlyAdmin = require("../middleware/authorization");
const errorHandling = require("../middleware/errorHandling");
const adminRouter = require("./adminRoute");

router.post("/register", Controller.helloWorld);
router.post("/login", Controller.helloWorld);
router.post("/admin/login", Controller.helloWorld);

router.get("/perfumes", Controller.helloWorld);
router.get("/special-treatments", Controller.helloWorld);
router.get("/services", Controller.helloWorld);

router.use(authentication);

router.get("/orders", Controller.helloWorld);
router.get("/orders/:id", Controller.helloWorld);

router.post("/orders", Controller.helloWorld);

router.use(onlyAdmin);
router.use("/admin", adminRouter);

router.use(errorHandling);

module.exports = router;
