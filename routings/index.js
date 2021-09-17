const router = require("express").Router();
const adminRouter = require("./adminRoute");

router.get("/", function (req, res) {
  res.send("Home Page");
});
router.use("/admin", adminRouter);

module.exports = router;
