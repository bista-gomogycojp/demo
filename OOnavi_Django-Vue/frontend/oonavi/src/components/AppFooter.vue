<template>
  <!-- footer  -->
  <footer class="footer-head">
    <div class="footer-content">
      <footer-menu/>
      <copy-right />
    </div>
  </footer>
</template>

<script>
import CopyRight from "./CopyRight.vue";
import FooterMenu from './FooterMenu.vue';
export default {
  components: { CopyRight, FooterMenu },
};
</script>

<style></style>
