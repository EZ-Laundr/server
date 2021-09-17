const router = require("express").Router();
const AdminController = require("../controllers/adminController");

router.get("/orders", AdminController.getOrders);
router.get("/orders/:id", AdminController.getById);
router.get("/perfumes", AdminController.getPerfumes);
router.get("/services", AdminController.getServices);
// router.get("/special-treatments", AdminController.helloWorld);

// router.post("/perfumes", AdminController.helloWorld);
// router.post("/services", AdminController.helloWorld);
// router.post("/special-treatments", AdminController.helloWorld);

// router.put("/perfumes", AdminController.helloWorld);
// router.put("/services", AdminController.helloWorld);
// router.put("/special-treatments", AdminController.helloWorld);

// router.delete("/perfumes", AdminController.helloWorld);
// router.delete("/services", AdminController.helloWorld);
// router.delete("/special-treatments", AdminController.helloWorld);

module.exports = router;
