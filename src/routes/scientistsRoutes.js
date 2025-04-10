const Router = require("../../framework/Router");
const controller = require("../controllers/scientistsController");

const router = new Router();

router.get("/scientists", controller.getAll);
router.get("/scientists/:id", controller.getById);
router.post("/scientists", controller.create);
router.put("/scientists/:id", controller.update);
router.delete("/scientists/:id", controller.remove);

module.exports = router;
