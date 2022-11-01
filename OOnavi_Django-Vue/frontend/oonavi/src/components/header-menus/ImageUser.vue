<template>
  <span v-if="user_name && !isDark" class="btn-font text-gray-900">{{ user_name }}</span>
  <img
      class="h-5 w-5 rounded-full hover-trigger group"
      :src="renderImage"
      :alt="user_name"
  />
  <span v-if="user_name && isDark" class="btn-font text-gray-200">{{ user_name }}</span>
</template>

<script>
import {toRef} from "vue";

export default {
  name: "ImageUser",
  props: {
    renderImage: String,
    user_name: String,
    isDark: Boolean
  },
  setup(props) {
    const renderImage = toRef(props, 'renderImage')
    const user_name = toRef(props, 'user_name')
    const isDark = toRef(props, 'isDark')

    return {renderImage, user_name, isDark}
  }

}
</script>

<style>
.btn-font {
  @apply px-2 font-thin
}
</style>