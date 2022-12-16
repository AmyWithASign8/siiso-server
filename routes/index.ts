const express = require('express');
const router = express.Router()
const commentRouter = require('./commentRouter')
const likeRouter = require('./likeRouter')
const newsRouter = require('./newsRouter')
const userRouter = require('./userRouter')
const newsImagesRouter = require('./newsImagesRouter')

router.use('/user', userRouter)
router.use('/like', likeRouter)
router.use('/comment', commentRouter)
router.use('/news', newsRouter)
router.use('/newsImages', newsImagesRouter)

module.exports = router

