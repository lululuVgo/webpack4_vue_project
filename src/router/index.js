import Vue from 'vue'
import Router from 'vue-router'

// const page1  = ()=>{ import  (/* webpackChunkName: "group-basic" */ '../views/page1')};
// const page2  = ()=>{ import  (/* webpackChunkName: "group-basic" */ '../views/page2')};
// const page3  = ()=>{ import  (/* webpackChunkName: "group-basic" */   '../views/page3')};
// const HelloWorld  = ()=>{ import  (/* webpackChunkName: "group-basic" */  '../components/HelloWorld')};
// const mainPage  = ()=>{ import  (/* webpackChunkName: "group-basic" */ '../views/mainPage')};


const page1 = ()=>import(/* webpackChunkName: "group-basic" */ '../views/page1')
const page2 = ()=>import(/* webpackChunkName: "group-basic" */ "../views/page2")
const page3 = ()=>import(/* webpackChunkName: "group-basic" */ "../views/page3")
const HelloWorld = ()=>import(/* webpackChunkName: "group-basic" */ "../components/HelloWorld")
const mainPage = ()=>import(/* webpackChunkName: "group-basic" */ "../views/mainPage")

// import page1 from '../views/page1'
// import page2 from '../views/page2'
// import HelloWorld from '../components/HelloWorld'
// import mainPage from '../views/mainPage'


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
      children: [{
        path: '/mainPage',
        component: mainPage,
        children: [
          {
            path: 'page1',
            component: page1,
          },
          {
            path: 'page',
            component: {
              default: page2,
            },
          }
        ]
      }]
    },
  ]
})
