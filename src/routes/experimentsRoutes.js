const Router = require("../../framework/Router");
const controller = require("../controllers/experimentsController");

const router = new Router();

router.get("/experiments", controller.getAll);
router.get("/experiments/:id", controller.getById);
router.post("/experiments", controller.create);
router.put("/experiments/:id", controller.update);
router.delete("/experiments/:id", controller.remove);

module.exports = router;
