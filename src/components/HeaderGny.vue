<template>
  <nav class="navbar navbar-expand-lg navbar-dark" style="background-color: #563F7A;"> <!-- Arka plan rengi #563F7A olarak ayarlandı -->
    <router-link to="/" tag="a" class="navbar-brand" style="color: azure;">
      Giriş
    </router-link>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <router-link
          active-class="active"
          to="/"
          tag="li"
          class="nav-item m-2"
          style="color: azure; cursor: pointer;">
          Anasayfa
        </router-link>
        <router-link
          active-class="active"
          to="/about"
          tag="li"
          class="nav-item m-2"
          style="color: azure; cursor: pointer;">
          Hakkımızda
        </router-link>
      </ul>
      <ul class="navbar-nav my-2 my-lg-0" :class="logoutClass">
        <li class="nav-item">
          <a @click.prevent="logout" class="nav-link" style="color: azure; cursor: pointer;">Çıkış Yap</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    logout() {
      // Sadece logout işlemini gerçekleştir
      this.$store.dispatch("logout");

      // Eğer kullanıcı anasayfada değilse yönlendirme yap
      if (this.$router.currentRoute.path !== '/auth') {
        this.$router.replace("/auth");
      }
    }
  },
  computed: {
    logoutClass() {
      return {
        'd-none': !this.$store.getters.isAuthenticated // Kullanıcı giriş yapmadıysa çıkış bağlantısını gizler
      };
    }
  }
}
</script>

<style>
/* Burada özel stiller ekleyebilirsiniz. */
</style>
