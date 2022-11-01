<template>
  <template v-if="!isLoggedIn">
    <div class="mobile-text">
      <login-button/>
    </div>
    <div class="mobile-text">
      <register-button/>
    </div>
  </template>
</template>

<script>
import LoginButton from "../header-menus/LoginButton.vue";
import RegisterButton from "../header-menus/RegisterButton.vue";

export default {
  name: 'user-not-login',
  components: {
    RegisterButton,
    LoginButton,
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLogin;
    },
  },
};
</script>

<style></style>
