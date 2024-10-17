<template>
    <div class="container">
        <div class="row  mt-5">
            <div class="col-md-4 offset-4 card card-primary p-3 border"
                 :class="{'border-primary' : isUser, 'border-success' : !isUser }">
                <h3
                        :class="{'text-primary' : isUser, 'text-success' : !isUser }"
                        class="text-center mb-3 mt-3">Vue.js | Auth</h3>
                <hr>
                <form @submit.prevent="onSubmit">
                    <div class="form-group">
                        <label>E-posta Adresiniz</label>
                        <input v-model="user.email" type="email" class="form-control"
                               placeholder="E-posta adresinizi giriniz">
                    </div>
                    <div class="form-group">
                        <label>Şifre</label>
                        <input v-model="user.password" type="password" class="form-control" placeholder="Şifreniz...">
                    </div>
                    
                    <!-- Popup for error messages -->
                    <div v-if="errorMessage" class="alert alert-danger" role="alert">
                        {{ errorMessage }}
                    </div>
                    
                    <div class="button-container d-flex  flex-column align-items-center">
                        <button type="submit" :class="{'btn-primary' : isUser, 'btn-success' : !isUser }"
                                class="btn btn-block mb-2">
                            {{ isUser ? 'Giriş Yap' : 'Kayıt Ol' }}
                        </button>
                        <a href="#" @click.prevent="isUser=!isUser" class="text-secondary">
                            {{ isUser ? 'Üye değilim' : 'Üyeliğim var'}}
                        </a>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            user: {
                email: null,
                password: null
            },
            isUser: false,
            errorMessage: null // Error message state
        }
    },
    methods: {
        onSubmit() {
            this.errorMessage = null; // Reset error message before submission

            this.$store.dispatch("login", { ...this.user, isUser: this.isUser })
                .then(response => {
                    console.log("Login successful:", response);
                    if (this.$router.currentRoute.path !== '/') {
                        this.$router.push("/");
                    }
                })
                .catch(error => {
                    console.error("Login failed:", error);
                    
                    // Set the error message from Firebase's response
                    if (error.code === 'auth/wrong-password') {
                        this.errorMessage = "Şifre yanlış. Lütfen tekrar deneyiniz.";
                    } else if (error.code === 'auth/user-not-found') {
                        this.errorMessage = "Bu e-posta adresi ile kullanıcı bulunamadı.";
                    } else {
                        this.errorMessage = "Bir hata oluştu. Lütfen tekrar deneyiniz.";
                    }
                });
        }
    }
}
</script>