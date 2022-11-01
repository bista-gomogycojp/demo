<template>
  <button class="btn-search">
    <i class="material-icons">
      <IconButton ops="show" :icon="getIcon"/>
    </i>
  </button>
</template>

<script>
import IconButton from "./IconButton";
import {computed} from "vue";
export default {
  name: "search-button",
  components: {IconButton},
  setup(){
    const getIcon = computed(() => 'M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z')
    return { getIcon }
  }
}
</script>

<style>
.btn-search {
  @apply bg-white flex justify-end items-center text-blue-500 p-2 hover:text-blue-400 h-9
}
</style>