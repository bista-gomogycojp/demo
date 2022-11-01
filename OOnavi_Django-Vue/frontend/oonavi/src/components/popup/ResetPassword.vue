<template>
  <div v-if="isResetPasswordOpen">
    <FormPop @closeFormPopUp="close" :title="getTitle" :button="getButton" :level="parseInt(3)"/>
  </div>
</template>

<script>
import {　computed　} from "vue"
import {　useStore　} from "vuex"
import FormHtml from "./FormHtml";
import FormPop from "./FormPop";
export default {
  name: "ResetPassword",
  components: {FormPop, FormHtml},
  setup() {
    const store = useStore()
    const isResetPasswordOpen = computed(() => store.state.isResetPasswordOpen)
    const getTitle = computed(() => 'パスワードの再設定')
    const getButton = computed(() => '送信')
    close = () => {
      store.commit("setResetPasswordModal", false)
    }

    return {isResetPasswordOpen,　close, getTitle, getButton}
  },

};
</script>

<style></style>
