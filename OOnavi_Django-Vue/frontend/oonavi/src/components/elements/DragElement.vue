<template>
  <draggable group="drag" v-model="state.list" class="dropzone" :id="getType" item-key="id">
    <template #item="{ element }" >
      <span class="trash-zone" v-html="element.name"></span>
    </template>
  </draggable>
</template>

<script>
import draggable from "vuedraggable";
import { reactive, toRef } from "vue";
export default {
  name: "DragElement",
  props: {
    type: String,
  },
  components: {
    draggable,
  },
  setup(props) {
    const state = reactive({
      lists: [{ name: "" }],
    });
    const getType = toRef(props, "type");

    return { state, getType };
  },
}
</script>

<style scoped>
.dropzone .trash-zone {
  display: none;

}
</style>