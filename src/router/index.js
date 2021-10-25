import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Panel from "../views/mainPanel.vue";
import Register from "../views/Register.vue";
import Support from "../views/Support.vue";
import Account from "../views/Account.vue";
import Success from "../views/Success.vue";
import Plans from "../views/Plans.vue";
import Billing from "../views/Billing.vue";
import store from "../store";

Vue.use(VueRouter);

const routes = [
  { path: "/", redirect: "/Home" },
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: { requiresUnauth: true },
  },
  {
    path: "/panel",
    name: "Panel",
    component: Panel,
    meta: { requiresAuth: true },
  },

  {
    path: "/panel/success",
    component: Success,
  },
  {
    path: "/billing",
    component: Billing,
    meta: { requiresAuth: true },
  },
  {
    path: "/support",
    name: "Support",
    component: Support,
    meta: { requiresAuth: true },

  },
  {
    path: "/account",
    name: "Account",
    component: Account,
    meta: { requiresAuth: true },

  },
  {
    path:"/plans",
    name:"Plans",
    meta: { requiresAuth: true },
    component:Plans
  },
  { path: "/:notFound(.*)", component: Home },
];



const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(function(to,_,next){
  if (to.meta.requiresAuth && !store.getters.logState){
    next('/register');
  } else if (to.meta.requiresUnauth && store.getters.logState){
    next('/panel')
  } else {
    next()
  }
})
export default router;
