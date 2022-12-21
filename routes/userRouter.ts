import * as express from 'express';
const router = express.Router()
const UserController = require('../controllers/userController')
const authModdleware = require('../middleware/authMiddleware')

router.post('/signup', UserController.registration)
router.post('/signin', UserController.login)
router.post('/updateinfo/:id', UserController.updateUser)
router.get('/auth', authModdleware, UserController.check)
router.get('/:id', UserController.getOne)
router.delete('/deleteuser/:id', UserController.deleteAccount)

module.exports = router

