<template>
  <a class="open-modal-head" @click="OpenModal">{{ text }}</a>
</template>

<script>
import {toRef, computed} from "vue"

export default {
  name: "OpenModal",
  props: {
    level: Number,

  },
  setup(props, context) {
    const level = toRef(props, "level");
    const text = computed(() => {
      if (level.value === 1) {
        return '既にアカウントを持っていますか?'
      }
      if (level.value === 2) {
        return 'パスワードを忘れた方はこちら'
      }
    })

    function OpenModal() {
      context.emit("open", level.value);
    }

    return {OpenModal, text}
  }
}
</script>

<style scoped>

</style>