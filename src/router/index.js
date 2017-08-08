import Vue from 'vue'
import Router from 'vue-router'
import Content from '@/components/content/content.vue'
import Article from '@/components/article/article.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',redirect:'/shdjt'
    },
    {
      path:'*',redirect:'/shdjt'
    },
    {
    path:'/shdjt',component:Content
    },
    {
      path:'/gnyx',component:Content
    },
    {
      path:'/gjyx',component:Content
    },
    {
      path:'/kwqzy',component:Content
    },
    {
      path:'/bjdj',component:Content
    },
    {
      path:'/yxykt',component:Content
    },
    {
      path:'/shdjt',component:Content
    },
    {
      path:'/bjdy',component:Content
    },
    {
      path:'/typt',component:Content
    },
    {
      path:'/yxjd',component:Content
    },
    {
      path:'/zyzfw',component:Content
    },
    {
      path:'/zcfg',component:Content
    },
    {
      path:'/gywm',component:Content
    },
    {
      path:'/article/:id',component:Article
    }
  ],
  mode: 'history'
})
