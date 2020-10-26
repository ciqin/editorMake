import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  // mode: '',
  base:"/make/",
  routes: [
    {
      path: '/',
      name: 'MainPage',
      component: resolve => require(['@/components/MainPage'], resolve),
      children:[
        {
          path: '/self',
          name: 'self',
          component: resolve => require(['@/components/listModule/self'], resolve),
        },
        {
          path: '/add',
          name: 'add',
          component: resolve => require(['@/components/listModule/add'], resolve),
        },
        {
          path: '/compiled',
          name: 'compiled',
          component: resolve => require(['@/components/listModule/compiled'], resolve),
        },
        {
          path: '/manuscript',
          name: 'manuscript',
          component: resolve => require(['@/components/listModule/manuscript'], resolve),
        },
        {
          path: '/release',
          name: 'release',
          component: resolve => require(['@/components/listModule/release'], resolve),
        },
        {
          path: '/resources',
          name: 'resources',
          component: resolve => require(['@/components/listModule/resources'], resolve),
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['@/components/login'], resolve),
    },
    {
      path: '/compo',
      name: 'Compo',
      component: resolve => require(['@/components/manuscript/compo'], resolve),
    },
    {
      path: '/make',
      name: 'make',
      component: resolve => require(['@/components/manuscript/make'], resolve),
    },
    {
      path: '/video',
      name: 'video',
      component: resolve => require(['@/components/manuscript/video'], resolve),
    },
    {
      path: '/gallery',
      name: 'gallery',
      component: resolve => require(['@/components/manuscript/gallery'], resolve),
    },
    {
      path: '/wechat',
      name: 'wechat',
      component: resolve => require(['@/components/manuscript/wechat'], resolve),
    },
    {
      path: '/audio',
      name: 'audio',
      component: resolve => require(['@/components/manuscript/audio'], resolve),
    }
  ]
})
