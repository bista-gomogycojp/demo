<template>
  <button
    type="button"
    class="hamburger-menu"
    aria-controls="mobile-menu"
    aria-expanded="false"
    @click="openMenu"
  >
    <IconButton icon="M4 6h16M4 12h16M4 18h16"/>
  </button>
</template>

<script>
import IconButton from "../header-menus/IconButton";
export default {
  name: "hamburger-menu",
  components: {IconButton},
  data() {
    return {
      checkEvent: false,
    };
  },
  methods: {
    openMenu() {
      this.$store.commit("setMobileModal", !this.$store.state.isMobOpen);
    },
  },
};
</script>

<style></style>
