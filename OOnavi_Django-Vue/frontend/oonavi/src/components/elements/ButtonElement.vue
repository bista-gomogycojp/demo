<template>
  <div class="form-btn-head">
    <button class="form-btn" type="submit" @click="submitForm">
            <span class="form-btn-animate" v-if="getLoading">
              <IconLoading :icon="iconElm[0].btn"/>
            </span>
      {{ getButton }}
    </button>
    <open-modal @open="openModal" :level="getLevel"/>
  </div>
</template>

<script>
import {toRef, ref} from 'vue';
import IconLoading from "../popup/IconLoading";
import OpenModal from "../popup/OpenModal";
import {useStore} from "vuex"

export default {
  name: "ButtonElement",
  components: {OpenModal, IconLoading},
  emits: ["handleSubmit"],
  props: {
    level: Number,
    loading: Boolean,
    button: String,

  },
  setup(props, {emit}) {
    const store = useStore()
    const getLevel = toRef(props, 'level')
    const getLoading = toRef(props, 'loading')
    const getButton = toRef(props, 'button')
    const iconElm = ref([
      {
        'btn': 'M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z',
      },
    ])

    function submitForm(e) {
      emit("handleSubmit", e);
    }

    async function openModal(data) {
      if (data === 1) {
        await store.commit("setRegisterModal", false)
        await store.commit("setLoginModal", true)
      }
      if (data === 2) {
        store.commit("setLoginModal", false)
        store.commit("setResetPasswordModal", true)
      }
    }

    return {getLevel, iconElm, getLoading, getButton, openModal, submitForm}
  }
}
</script>

<style scoped>

</style>