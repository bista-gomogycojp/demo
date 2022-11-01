<template>
  <div class="m-auto">
    <div class="none-logo-head">
      <div class="cls-item-center justify-center">
        <IconButton @click="backData" :showClass="{'logoBox':'none-logo-content'}"
                    icon="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
        <span>{{getText}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import IconButton from "../header-menus/IconButton";
import { computed, toRef } from "vue";

export default {
  name: "NoLogoElm",
  emits: ["handleBackData"],
  props: {
    type : String
  },
  components: {IconButton},
  setup(props, {emit}) {
    const getType = toRef(props, 'type')

    const getText = computed(() => {
      if(getType.value === 'category') {
        return '🔙　現在、カテゴリーがございません。'
      }
      return '🔙　現在、ロゴがございません。'
    })
    const backData = () => {
      emit("handleBackData");
    }

    return {backData, getText}
  }
}
</script>

<style scoped>

</style>