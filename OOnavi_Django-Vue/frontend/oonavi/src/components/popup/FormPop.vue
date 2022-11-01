<template>
  <section @click="close" class="pop-search-header"></section>
  <div class="ab-pop">
    <div class="fx-h">
      <form-html @close="close" :title="getTitle" :button="getButton" :level="getLevel"/>
    </div>
  </div>
</template>

<script>
import FormHtml from "./FormHtml";
import {toRef} from 'vue';

export default {
  name: "FormPop",
  components: {FormHtml},
  emits: ["closeFormPopUp"],
  props: {
    title: String,
    button: String,
    level: Number,
  },
  setup(props, {emit}) {
    const getTitle = toRef(props, 'title')
    const getButton = toRef(props, 'button')
    const getLevel = toRef(props, 'level')

    function close() {
      emit("closeFormPopUp", false);
    }

    return {close, getTitle, getButton, getLevel}
  }
}
</script>

<style scoped>

</style>