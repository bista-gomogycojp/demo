<template>
  <div class="float-right my-2" @click="close">
    <button class="bg-gray-400 hover:bg-gray-700 setting-btn " type="button">
      {{ text }}
    </button>
  </div>
</template>

<script>
import {computed} from "vue"
export default {
  name: "SettingFooter",
  emits: ["closeModal"],
  setup(props, {emit}) {
    const close = () => {
      emit("closeModal");
    }
    const text = computed(() => '閉じる')

    return { close, text }
  }
}
</script>

<style scoped>

</style>