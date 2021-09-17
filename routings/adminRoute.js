const router = require("express").Router();
const AdminController = require("../controllers/adminController");

router.get("/orders", AdminController.getOrders);
router.get("/orders/:id", AdminController.getById);
router.get("/perfumes", AdminController.getPerfumes);
router.get("/services", AdminController.getServices);
router.get("/special-treatments", AdminController.getSpecialTreatments);

router.post("/perfumes", AdminController.addPerfume);
router.post("/services", AdminController.addService);
router.post("/special-treatments", AdminController.addSpecialTreatment);

router.put("/perfumes/:id", AdminController.editPerfume);
router.put("/services/:id", AdminController.editService);
router.put("/special-treatments/:id", AdminController.editSpecialTreatment);

router.delete("/perfumes/:id", AdminController.deletePerfume);
router.delete("/services/:id", AdminController.deleteService);
router.delete(
  "/special-treatments/:id",
  AdminController.deleteSpecialTreatment
);

module.exports = router;
