<template>
  <div v-if="isGetCodeOpen">
    <FormPop @closeFormPopUp="close" :title="getTitle" :button="getButton" :level="parseInt(4)"/>
  </div>
</template>

<script>
import {computed} from "vue"
import {useStore} from "vuex"
import FormHtml from "./FormHtml";
import FormPop from "./FormPop";

export default {
  name: "SetNewPassword",
  components: {FormPop, FormHtml},
  setup() {
    const store = useStore()
    const isGetCodeOpen = computed(() => store.state.isGetCodeOpen)
    const getTitle = computed(() => 'パスワードの再設定')
    const getButton = computed(() => '送信')
    close = () => {
      store.commit("setCodeModal", false)
    }

    return {isGetCodeOpen, close, getTitle, getButton}
  },
}
</script>

<style scoped>

</style>