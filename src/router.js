import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      children: [
        {
          path: "/situation",
          name: "situation",
          //注意修改webpack的注释，不要和其他组件名称相同
          component: () =>
            import(/* webpackChunkName: "SituationView" */ "./views/situation/SituationView.vue")
        },
        {
          path: "/risk/view1",
          name: "riskView1",
          component: () =>
            import(/* webpackChunkName: "RiskView1" */ "./views/riskMonitoring/RiskView1.vue")
        },
        {
          path: "/risk/view2",
          name: "riskView2",
          component: () =>
            import(/* webpackChunkName: "RiskView2" */ "./views/riskMonitoring/RiskView2.vue")
        },
        {
          path: "/risk/view2-1",
          name: "riskView2-1",
          component: () =>
            import(/* webpackChunkName: "RiskView2Child1" */ "./views/riskMonitoring/RiskView2Child1.vue")
        },
        {
          path: "/risk/view2-2",
          name: "riskView2-2",
          component: () =>
            import(/* webpackChunkName: "RiskView2Child2" */ "./views/riskMonitoring/RiskView2Child2.vue")
        },
        {
          path: "/enterprise/view1",
          name: "enterpriseView1",
          component: () =>
            import(/* webpackChunkName: "EnterpriseView1" */ "./views/enterpriseImage/EnterpriseView1.vue")
        },
        {
          path: "/enterprise/view2",
          name: "enterpriseView2",
          component: () =>
            import(/* webpackChunkName: "EnterpriseView2" */ "./views/enterpriseImage/EnterpriseView2.vue")

        }
      ]
    },

    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    }
  ]
});
