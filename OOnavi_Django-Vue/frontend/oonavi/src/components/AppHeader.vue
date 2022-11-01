<template>
  <nav class="dark:bg-gray-800 top-0 w-full">
    <draggable group="drag" v-model="list" class="dropzone" item-key="id" id="trash-logo-box">
      <template #item="{element}">
        <span class="trash-zone">{{element.name}}</span>
      </template>
      <template #footer>
        <HeaderMain/>
      </template>
    </draggable>
  </nav>
</template>
<script>
import draggable from "vuedraggable";
import HeaderMain from "./header-menus/HeaderMain";
export default {
  name: "app-header",
  components: {
    HeaderMain,
    draggable,
  },
  data() {
    return {
      list: [{ name: "" }],
    };
  },
};
</script>

<style scoped>
.dropzone .trash-zone{
  display:none;
}
</style>
