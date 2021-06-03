import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'

let hardware=()=>{return import ("@/components/Hardware")}
let detail=()=>{return import ("@/components/detail")}
let contrast=()=>{return import ("@/components/contrast")}
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/hardware',
      name: 'hardware',
      component: hardware
    },
    {
      path: '/detail',
      name: 'detail',
      component: detail
    },
    {
      path: '/contrast',
      name: 'contrast',
      component: contrast
    }
  ]
})
