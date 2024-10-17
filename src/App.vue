<template>
  <div>
    <HeaderGny></HeaderGny>
    <router-view></router-view> <!-- Burada router-view bileşeninin kullanımı -->
    <FooterGny></FooterGny>
  </div>
</template>

<script>
import HeaderGny from "./components/HeaderGny.vue";
import FooterGny from "./components/FooterGny.vue"
export default {
  components: {
    HeaderGny,
    FooterGny
  },
  created(){
    this.$store.dispatch("initAuth")
  }
};
</script>
