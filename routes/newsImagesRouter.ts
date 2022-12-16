import * as express from 'express';
const routes = express.Router()
const NewsImagesController = require('../controllers/newsImagesController')

routes.delete('/', NewsImagesController.delete)

module.exports = routes

