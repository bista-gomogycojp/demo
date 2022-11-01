<template>
  <template v-if="isLoggedIn">
    <div class="flex mt-4">
      <avatar-button/>
    </div>
    <menu-icons class="fix-mt"/>
    <div class="mobile-text">
      <logout-btn/>
    </div>
  </template>
</template>
<script>
import LogoutBtn from "../header-menus/LogoutBtn.vue";
import AvatarButton from "../header-menus/AvatarButton.vue";
import MenuIcons from "../profiles/MenuIcons.vue";

export default {
  name: "user-logged",
  components: {
    LogoutBtn,
    AvatarButton,
    MenuIcons,
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isLogin;
    },
  },
};
</script>

<style scoped>
.fix-mt{
  margin-top: -70px !important;
}
</style>
