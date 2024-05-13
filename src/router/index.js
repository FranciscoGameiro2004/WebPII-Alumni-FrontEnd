import VueRouter from "vue-router";
import routes from "./routes";

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

// Nota: Variável temporária
const logged = false
router.beforeEach((to, from, next) => {
  if (to.meta.alreadyAuth) {
    if (!logged) {
      next()
    } else if (from.name == null){
      next('dashboard')
    }
  } else {
    next()
  }
})

export default router;
