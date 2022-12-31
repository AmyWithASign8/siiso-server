const Express = require("express");
const routes = Express.Router();
const commentController = require("../controllers/commentController");
const authMiddleware = require("../middleware/authMiddleware");

routes.post("/create/:newsId", commentController.create);
routes.get("/getallcomments/:id", commentController.getAll);
routes.get("/getonecomment/:id", commentController.getOne);
routes.delete("/:id", commentController.delete);

module.exports = routes;
