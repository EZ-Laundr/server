const router = require("express").Router();
const Controller = require("../controllers/controller");

router.get("/orders", Controller.helloWorld);
router.get("/orders/:id", Controller.helloWorld);
router.get("/perfumes", Controller.helloWorld);
router.get("/services", Controller.helloWorld);
router.get("/special-treatments", Controller.helloWorld);

router.post("/perfumes", Controller.helloWorld);
router.post("/services", Controller.helloWorld);
router.post("/special-treatments", Controller.helloWorld);

router.put("/perfumes", Controller.helloWorld);
router.put("/services", Controller.helloWorld);
router.put("/special-treatments", Controller.helloWorld);

router.delete("/perfumes", Controller.helloWorld);
router.delete("/services", Controller.helloWorld);
router.delete("/special-treatments", Controller.helloWorld);

module.exports = router;
