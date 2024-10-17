import Vue from "vue"
import Vuex from "vuex"
import axios from "axios"
import { router } from "./router"
Vue.use(Vuex)
const store = new Vuex.Store({
    state : {
        token : "",
        fbAPIKey : "AIzaSyCZT_37WkjI0i13ySlUtRlYM41w3d1cLOQ"
    },
    mutations : {
        setToken(state,token){
            state.token = token
        },
        clearToken(state){
            state.token = ""
        }
    },
    actions : {
        initAuth({commit,dispatch}){
            let token = localStorage.getItem("token")
            if(token){
                let expirationDate = localStorage.getItem("expirationDate")
                let time = new Date().getTime()
                
                if(time >= Number(expirationDate)){
                    console.log("token süresi geçmiş")
                    dispatch("logout")
                }else{
                    commit("setToken",token)
                    let timerSecond = expirationDate -time
                    console.log(timerSecond)
                    dispatch("setTimeoutTimer",timerSecond)
                    router.push("/")
                }
            }else{
                if (router.currentRoute.path !== '/auth') {
                    router.replace("/auth");
                    return false
               }
            }
        },
        login({ commit,dispatch }, autData){
            let authLink = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="
            if (autData.isUser) {
                authLink = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="
            }
            //AuthGny.vue'a döndürdük
            return axios.post(authLink + this.state.fbAPIKey, {
                email: autData.email,
                password: autData.password,
                returnSecureToken: true
            })
            .then(response => {
                console.log(response);
                commit('setToken', response.data.idToken);  // Token'ı Vuex store'a kaydet
                localStorage.setItem("token",response.data.idToken )
                localStorage.setItem("expirationDate",new Date().getTime() + +response.data.expiresIn * 1000)
                //localStorage.setItem("expirationDate",new Date().getTime() + 10000)
                dispatch("setTimeoutTimer",+response.data.expiresIn * 1000)// saatlik olmak için  çarptık
                router.push("/");  // Başarılı giriş sonrası yönlendirme
            })
            .catch(error => {
                if (error.response) {
                    // Sunucudan gelen yanıt ve hata bilgilerini loglayın
                    console.error("Axios error:", error.response.data); // Hata mesajı
                    console.error("Status code:", error.response.status); // Hata kodu (400 vs)
                    console.error("Headers:", error.response.headers); // Yanıt başlıkları
                } else if (error.request) {
                    // İstek yapıldı ancak sunucudan yanıt alınamadı
                    console.error("No response received:", error.request);
                } else {
                    // İstek ayarlarında bir hata meydana geldi
                    console.error("Error setting up request:", error.message);
                }
            });
            
           
        },
        logout({commit}){
            commit("clearToken")
            localStorage.removeItem("token")
            localStorage.removeItem("expirationDate")
            // Eğer kullanıcı anasayfada değilse yönlendirme yap
            if (router.currentRoute.path !== '/auth') {
                 router.replace("/auth");
            }
        },
        setTimeoutTimer({dispatch}, expiresIn){
            setTimeout(() => {
                dispatch("logout")
            }, expiresIn)
        }
    },
    //token kontrolü
    getters: {
        isAuthenticated(state) {
          let token = state.token;
          let expirationDate = localStorage.getItem("expirationDate");
          let currentTime = new Date().getTime();
          if (!token || currentTime >= Number(expirationDate)) {
            return false;
          }
          return true;
        }
      }
      
})

export default store;
