const Express = require("express");
const routes = Express.Router();
const commentController = require("../controllers/commentController");

routes.post("/createcomment/:id", commentController.create);
routes.get("/getallcomments/:id", commentController.getAll);
routes.delete("/:id", commentController.delete);

module.exports = routes;
