import * as express from 'express';
const router = express.Router()
const UserController = require('../controllers/userController')
const authModdleware = require('../middleware/authMiddleware')

router.post('/signup', UserController.registration)
router.post('/signin', UserController.login)
router.get('/auth', authModdleware, UserController.check)

module.exports = router

