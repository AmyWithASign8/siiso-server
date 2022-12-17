import * as express from 'express';
const router = express.Router();
const likeController = require('../controllers/likeController')

router.post('/', likeController.create)
router.get('/', likeController.getAll)
router.delete('/:id', likeController.delete)

module.exports = router

