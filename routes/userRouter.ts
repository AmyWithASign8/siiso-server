import * as express from 'express';
const router = express.Router()
const UserController = require('../controllers/userController')

router.post('/signUp', UserController.registration)
router.post('/signIn', UserController.login)
router.get('/auth', UserController.check)

module.exports = router

