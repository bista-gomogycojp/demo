<template>
    <div class="footer-index">
      <menu-profile/>
    <div class="footer-index-head">
      <!-- General Report -->
      <div class="footer-index-content">
        <div class="profile-index mx-6 w-5/6  ">
          <form>
              <router-view></router-view>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MenuProfile from '../../components/profiles/MenuProfile.vue';

export default {
  components: { MenuProfile },
  };

</script>

<style></style>
