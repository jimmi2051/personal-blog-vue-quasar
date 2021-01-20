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
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/blogs",
    name: "blogs",
    component: () =>
      import(/* webpackChunkName: "blogs" */ "../views/Blogs.vue")
  },
  {
    path: "/blog/:id",
    name: "blog",
    component: () => import(/* webpackChunkName: "blog" */ "../views/Blog.vue")
  },
  {
    path: "/signin",
    name: "signin",
    component: () =>
      import(/* webpackChunkName: "signin" */ "../views/SignIn.vue")
  },
  {
    path: "/signup",
    name: "signup",
    component: () =>
      import(/* webpackChunkName: "signup" */ "../views/SignUp.vue")
  },
  {
    path: "/practices",
    name: "practices",
    component: () =>
      import(/* webpackChunkName: "signup" */ "../views/Practice.vue")
  },
  {
    path: "/practice/:id",
    name: "practice",
    component: () =>
      import(/* webpackChunkName: "blog" */ "../views/PracticeDetail.vue")
  },
  {
    path: "/module/:id",
    name: "module",
    component: () =>
      import(/* webpackChunkName: "blog" */ "../views/ModuleDetail.vue")
  },
  {
    path: "*",
    name: "homeRedirect",
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
