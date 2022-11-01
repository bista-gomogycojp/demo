<template>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
    <path class="opacity-75" fill="currentColor" :d="icon"/>
  </svg>
</template>

<script>
import {toRef} from "vue";
export default {
  name: "IconLoading",
  props: {
    icon: String,
  },
  setup(props) {
    const icon = toRef(props, 'icon')
    return {icon}
  }
}
</script>

<style scoped>

</style>