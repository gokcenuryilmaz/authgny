import Vue from "vue";
import VueRouter from "vue-router";

// Sayfa bileşenlerinizi buraya import edin
import AboutGny from "./pages/AboutGny.vue";
import HomepageGny from "./pages/HomepageGny.vue";
import AuthGny from "./pages/auth/AuthGny.vue";
import store from "./store";
Vue.use(VueRouter);

export const router = new VueRouter({
  mode: "history",
  routes: [
    { 
      path: "/", 
      component: HomepageGny ,
      beforeEnter(to,from,next){
        if(store.getters.isAuthenticated){
          next()
        }else{
          next("/auth")
        }
      }
    },
    { 
      path: "/about", 
      component: AboutGny,
      beforeEnter(to,from,next){
        if(store.getters.isAuthenticated){
          next()
        }else{
          next("/auth")
        }
      }
    },
    { 
      path: "/auth", 
      component: AuthGny,
      beforeEnter(to, from, next) {
          if (store.getters.isAuthenticated) {
              next("/"); // Eğer kullanıcı zaten giriş yapmışsa, ana sayfaya yönlendir
          } else {
              next(); // Eğer kullanıcı giriş yapmamışsa, auth sayfasına devam et
          }
      }
    }
  
  ],
});
