<template>
  <section @click="close" class="pop-search-header"></section>
  <div class="absolute inset-0">
    <div class="fx-h">
      <div class="pop-search-head-title">
        <a-row class="pop-search-title" type="flex" @click="close" title="閉じる">
          <a-col flex="auto">{{ getTitle }}</a-col>
          <a-col flex="50px">
            <IconButton :icon="closeIcon"/>
          </a-col>
        </a-row>
        <drag-search-pop-up/>
        <drag-item-pop-up/>
      </div>
    </div>
  </div>
</template>

<script>
import {toRef, computed} from 'vue';
import IconButton from "../header-menus/IconButton";
import DragItemPopUp from "./DragItemPopUp";
import DragSearchPopUp from "./DragSearchPopUp";

export default {
  name: "TablePopUp",
  components: {DragSearchPopUp, DragItemPopUp, IconButton},
  emits: ["closeTablePopUp"],
  props: {
    title: String,
  },
  setup(props, {emit}) {
    const getTitle = toRef(props, 'title')
    const closeIcon = computed(() => 'M6 18L18 6M6 6l12 12')

    function close() {
      emit("closeTablePopUp", false);
    }

    return {close, getTitle, closeIcon}
  }
}
</script>

<style scoped>

</style>