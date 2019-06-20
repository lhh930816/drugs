import Vue from 'vue';
import Router from 'vue-router';
import axios from 'axios';
Vue.use(Router);

Vue.prototype.$axios = axios;
export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/YPZD'
    },
    {
      path: '/',
      component: resolve => require(['@/view/Home.vue'], resolve),
      meta: { title: '自述文件' },
        children:[
            {
              path: '/YPZD',
              component: resolve => require(['@/view/YPZD.vue'], resolve),
              meta: { title: '药品字典' }
            },
            // {
            //   path: '/BMYP',
            //   component: resolve => require(['@/view/BMYP.vue'], resolve),
            //   meta: { title: '部门药品' }
            // }
            {
              path: '/cfs',
              component: resolve => require(['@/view/cfs.vue'], resolve),
              meta: { title: '医生工作站' }
            },
        ],    
    },
    
  ]
});
