import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'landing-page',
    //   component: require('@/components/LandingPage').default
    // },
    // {
    //   path: '*',
    //   redirect: '/'
    // }
    // {
    //   path: '/',
    //   name: 'Index',
    //   component: require('@/components/Index').default
    // },
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/',
      name: 'Login',
      component: require('@/components/Login').default
    },
    {
      path: '/choice',
      name: 'choice',
      component: require('@/components/Choice').default
    },
    {
      path: '/test',
      name: 'test',
      component: require('@/components/Index').default
    },
  ]
})
