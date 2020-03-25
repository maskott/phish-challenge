import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/find",
    name: "find",
    component: () =>
      import(/* webpackChunkName: "find" */ "@/views/Find.vue")
  },
  {
    path: "/random",
    name: "random",
    // route level code-splitting
    // this generates a separate chunk (random.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "random" */ "@/views/Random.vue")
  },
  {
    path: "/show/:id",
    name: "show",
    component: () => import(/* webpackChunkName: "show" */ "@/views/Show.vue"),
    props: true
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
