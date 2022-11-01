<template>
  <div v-if="isCategoryOpen" class="md:-ml-28">
    <TablePopUp @closeTablePopUp="close" :title="'「'+getGroupName+ '」のカテゴリー'" />
  </div>
</template>

<script>
import {computed} from 'vue';
import {useRouter, useRoute} from 'vue-router'
import {useStore} from 'vuex'
import TablePopUp from "./TablePopUp";

export default {
  name: "category-group",
  emits: ["changeData"],
  components: {TablePopUp},
  setup(props,{emit}) {
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    const isCategoryOpen = computed(() => store.state.isCategoryOpen)
    const getGroupName = computed(() => store.state.getGroupName)

    function close(status) {
      store.commit("setIsLoading", status);
      store.commit("setCategoryModal", status);
      emit("changeData");
      router.push({
        name: route.name,
      });
    }


    return {close, getGroupName, isCategoryOpen}
  },

};
</script>

<style></style>

