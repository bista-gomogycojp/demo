<template>
  <form class="site-form">
    <input class="inp-search" type="search" autocomplete="off" v-model="search" :placeholder="getPlace"/>
    <search-button @click="searchItem"/>
  </form>
</template>

<script>
import {ref, computed} from "vue";
import {notification} from "ant-design-vue"
import {notification_error} from "../../utilities/composition/useNotification";
import SearchButton from "./SearchButton";

export default {
  name: "google-search-box",
  components: {SearchButton},
  setup() {
    const search = ref("");
    const getPlace = computed(() => 'ウェブ検索...')

    const searchItem = (e) => {
      e.preventDefault();
      if (search.value) {
        window.open("https://google.com/search?q=" + search.value.trim(), "_blank");
        search.value = "";
      } else {
        notification_error(notification, `検索テキストを入力してください。`)
      }

    };
    return {search, searchItem, getPlace};
  },
};
</script>

<style></style>

