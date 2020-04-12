import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('@/views/login')
    },
    {
      path: '/home',
      name: 'index',
      component: () => import('@/views/home'),
      children: [
        {
          path: '/user',
          name: 'user',
          component: () => import('@/views/user')
        },
        {
          path: '/category',
          name: 'category',
          component: () => import('@/views/category')
        },
        {
          path: '/secondCategory',
          name: 'secondCategory',
          component: () => import('@/views/secondCategory')
        },
        {
          path: '/product',
          name: 'product',
          component: () => import('@/views/product')
        },
        {
          path: '/order',
          name: 'order',
          component: () => import('@/views/order')
        },
        {
          path: '/rule',
          name: 'rule',
          component: () => import('@/views/rule')
        },
        {
          path: '/swagger',
          component: () => import('@/views/swagger')
        }
      ]
    }
  ]
})
