<template>
  <div v-if="isRegOpen">
    <FormPop @closeFormPopUp="close" :title="getTitle" :button="getButton" :level="parseInt(1)"/>
  </div>
</template>

<script>
import {computed} from "vue"
import {useStore} from "vuex"
import FormHtml from "./FormHtml";
import FormPop from "./FormPop";

export default {
  name: "register-form",
  components: {FormPop, FormHtml},
  setup() {
    const store = useStore()
    const isRegOpen = computed(() => store.state.isRegOpen)
    const getTitle = computed(() => '登録')
    const getButton = computed(() => '登録')
    close = () => {
      store.commit("setRegisterModal", false)
    }
    return {isRegOpen, close, getTitle, getButton}
  },

};
</script>

<style></style>
