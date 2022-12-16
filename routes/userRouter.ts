import * as express from 'express';
const router = express.Router()

router.post('/signUp',)
router.post('/signIn',)
router.get('/auth', (req: any, res: any) => {res.json({message: 'userRoute working'})})

module.exports = router

