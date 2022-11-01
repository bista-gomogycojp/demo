<template>
  <td @click="handleGroup" class="table-td 2xl:w-2xl">
    <a class="table-font-a" :title="getTitle">
      <span>{{ getTitle }}</span>
    </a>
  </td>

</template>

<script>
import {toRef} from 'vue';
export default {
  name: "CatColumn",
  emits: ["handlePropsGroup"],
  props: {
    title: String,
    id:Number,
  },
  setup(props, {emit}){
    const getTitle = toRef(props, 'title')
    const getId = toRef(props, 'id')

    function handleGroup() {
      const data = {
        id : getId.value,
        title:getTitle.value
      }
      emit("handlePropsGroup", data );
    }
    return { close, getTitle , getId, handleGroup }
  }

}
</script>

<style scoped>

</style>