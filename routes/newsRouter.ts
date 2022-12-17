import * as express from 'express';
const routes = express.Router()
const newsController = require('../controllers/newsController')

routes.post('/', newsController.create)
routes.get('/', newsController.getAll)
routes.get('/:id', newsController.getOne)
routes.delete('/:id', newsController.delete)

module.exports = routes

