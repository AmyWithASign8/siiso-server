const express = require('express');
const router = express.Router()
const commentRouter = require('./commentRouter')
const likeRouter = require('./likeRouter')
const newsRouter = require('./newsRouter')
const userRouter = require('./userRouter')

router.use('/user', userRouter)
router.use('/like', likeRouter)
router.use('/comment', commentRouter)
router.use('/news', newsRouter)

module.exports = router

