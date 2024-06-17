import VueRouter from "vue-router";
import routes from "./routes";

//import { useUserStore } from "../stores/users"
//const userStore = useUserStore()

// configure router
const router = new VueRouter({
  routes, // short for routes: routes
  linkExactActiveClass: "active",
  scrollBehavior: (to) => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  },
});

// Nota: Variáveis temporárias
const logged = false
const admin = true
router.beforeEach((to, from, next) => {
  if (to.meta.alreadyAuth) {
    if (/* userStore.foundUser != {} */ !logged) {
      next()
    } else if (from.name == null){
      next('dashboard')
    }
  } else if (to.meta.adminRequired) {
    if (/* userStore.getUserType == 'admin' */ admin) {
      next()
    } else if (from.name == null){
      next('dashboard')
    }
  } else {
    next()
  }
})

export default router;
