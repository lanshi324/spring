import Router from 'koa-router'
import contorller from './contorller'

const router = new Router({
  prefix: '/api/users'
})

router.post('/register', contorller.register)
router.post('/register/checkColumn', contorller.checkColumn)
router.post('/register/getCode', contorller.getCode)
router.post('/register/verifyCode', contorller.verifyCode)
router.post('/signin', contorller.signin)
router.post('/signin/getName', contorller.getName)
router.post('/exit', contorller.exit)
router.post('/getUser', contorller.getUser)
export default router
