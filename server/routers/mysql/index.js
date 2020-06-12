import Router from 'koa-router'
import contorller from './contorller'

const router = new Router({
  prefix: '/api/mysql'
})

router.get('/sync', contorller.sync)

export default router
