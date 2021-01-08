import Vue from "vue";
import VueRouter from "vue-router";
import VueAnalytics from "vue-analytics";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/blogs",
    name: "blogs",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Blogs.vue")
  },
  {
    path: "*",
    name: "home",
    component: Home
  }
];

const router = new VueRouter({
  scrollBehavior: (to, from, savedPosition) => {
    if (savedPosition) {
      return savedPosition;
    } else if (to.hash) {
      return {
        selector: to.hash
      };
    } else {
      return { x: 0, y: 0 };
    }
  },
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

Vue.use(VueAnalytics, {
  id: "UA-166102479-1",
  router
});

export default router;
