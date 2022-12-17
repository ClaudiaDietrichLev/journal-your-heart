import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import SessionPrompts from "../views/SessionPrompts.vue";
import StartSession from "../views/StartSession.vue";
import Prompts from "../views/Prompts.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/prompts/",
    name: "sessionprompts",
    component: SessionPrompts,
  },
  {
    path: "/session/",
    name: "startsession",
    component: StartSession,
  },
  {
    path: "/session-prompt/",
    name: "prompts",
    component: Prompts,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
