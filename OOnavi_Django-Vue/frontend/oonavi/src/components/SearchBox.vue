<template>
  <div class="search-box-head">
    <!-- google search box -->
    <google-search-box/>
    <!-- site search box  -->
    <site-search-box/>
  </div>
</template>
<script>
import GoogleSearchBox from "./header-menus/GoogleSearchBox";
import SiteSearchBox from "./header-menus/SiteSearchBox";

export default {
  name: "search-box",
  components: {GoogleSearchBox, SiteSearchBox},
};
</script>

<style></style>
