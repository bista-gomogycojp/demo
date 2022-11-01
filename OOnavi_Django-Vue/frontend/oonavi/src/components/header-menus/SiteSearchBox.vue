<template>
  <form @submit.prevent="handleSearch" class="site-form">
    <input v-model="querySearch" class="inp-search" type="search" ref="searchRef" :placeholder="getPlace"/>
    <search-button/>
  </form>
</template>

<script>
import SearchButton from "./SearchButton.vue";
import {useRouter,useRoute} from "vue-router";
import {useStore} from "vuex";
import {ref, onMounted,　computed} from "vue";
import {notification_error} from "../../utilities/composition/useNotification";
import {notification} from "ant-design-vue"

export default {
  name: "site-search-box",
  components: {SearchButton},
  setup() {
    const searchRef = ref("");
    const route = useRoute()
    const router = useRouter();
    const store = useStore();
    const querySearch = ref("");
    const getPlace = computed(() => 'サイト内検索...')

    onMounted(() => {
      searchRef.value.focus();
    });

    function handleSearch() {
      store.commit("setIsLoading", true);
      if (querySearch.value) {
        router.push({
          name: route.name,
          query: {
            q: querySearch.value.replace(/\s/g, ''),
          },
        });
        store.commit("setSearchModal", true);
        querySearch.value = "";
      } else {
        store.commit("setIsLoading", false);
        notification_error(notification, `検索テキストを入力してください。`)
      }
    }

    return {querySearch, handleSearch, searchRef, getPlace};
  },
};
</script>

<style></style>

