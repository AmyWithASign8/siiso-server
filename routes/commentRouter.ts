const Express = require('express');
const routes = Express.Router()
const commentController = require('../controllers/commentController')

routes.post('/',commentController.create)
routes.get('/',commentController.getAll)
routes.delete('/:id',commentController.delete)

module.exports = routes
