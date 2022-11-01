<template>
  <div v-if="isSearchOpen || searchItem">
    <TablePopUp @closeTablePopUp="close" :title="'「'+searchItem+ '」の検索'"/>
  </div>
</template>

<script>
import {computed, ref, watch} from 'vue';
import {useRouter, useRoute} from 'vue-router'
import {useStore} from 'vuex'
import TablePopUp from "./TablePopUp";

export default {
  name: "search-form",
  components: {TablePopUp},
  setup() {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const searchItem = ref()
    const isSearchOpen = computed(() => store.state.isSearchOpen)

    watch(
        () => route.query.q,
        async (q) => {
          if (q) {
            searchItem.value = q
          } else {
            store.commit("setIsLoading", false);
            router.push({
              name: route.name,
            });
          }
        }
    )

    function close() {
      store.commit("setIsLoading", false);
      store.commit("setSearchModal", false);
      searchItem.value = "";
      router.push({
        name: route.name,
      });
    }


    return {close, isSearchOpen, searchItem}
  },

};
</script>

<style></style>
