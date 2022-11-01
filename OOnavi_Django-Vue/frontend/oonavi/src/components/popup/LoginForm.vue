<template>
  <div v-if="isLoginOpen">
    <FormPop @closeFormPopUp="close" :title="getTitle" :button="getButton" :level="parseInt(2)"/>
  </div>
</template>

<script>
import {computed} from "vue"
import {useStore} from "vuex"
import FormHtml from "./FormHtml";
import FormPop from "./FormPop";

export default {
  name: "LoginForm",
  components: {FormPop, FormHtml},
  setup() {
    const store = useStore()
    const isLoginOpen = computed(() => store.state.isLoginOpen)
    const getTitle = computed(() => 'ログイン')
    const getButton = computed(() => 'ログイン')
    close = () => {
      store.commit("setLoginModal", false)
    }
    return {isLoginOpen, close, getTitle, getButton}
  },

};
</script>

<style></style>
