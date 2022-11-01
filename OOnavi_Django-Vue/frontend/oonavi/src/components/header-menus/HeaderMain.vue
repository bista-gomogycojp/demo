<template>
  <div class="header">
    <div class="header-mobi">
      <!-- Mobile hamburger menu button-->
      <hamburger-menu/>
    </div>
    <div class="cls-item-center">
      <div class="flex-shrink-0 cls-item-center">
        <!-- Logo OOnavi -->
        <logo-menu/>
      </div>
      <div class="hidden sm:block sm:ml-6 lg:ml-1 xl:ml-2">
        <!-- Main Menu -->
        <main-menu/>
      </div>
      <!-- Search Box -->
      <search-box/>
    </div>
  </div>
  <!-- Mobile menu, show/hide based on menu state. -->
  <mobile-menu/>
</template>

<script>
import HamburgerMenu from "../mobiles/HamburgerMenu";
import LogoMenu from "../LogoMenu";
import MainMenu from "./MainMenu";
import SearchBox from "../SearchBox";
import MobileMenu from "../mobiles/MobileMenu";

export default {
  name: "HeaderMain",
  components: {MobileMenu, SearchBox, MainMenu, LogoMenu, HamburgerMenu}
}
</script>

<style scoped>

</style>