<template>
  <button class="btn-in-out" @click="openReg">
    <IconButton :icon="getIcon"/>
    {{ getBtn }}
  </button>
</template>

<script>
import IconButton from "./IconButton";
import {useStore} from "vuex"
import {computed} from 'vue'

export default {
  name: "register-button",
  components: {IconButton},
  setup(){
    const store = useStore()
    const getIcon = computed(() => 'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z')
    const getBtn = computed(() => '登録')

    function openReg() {
      store.commit("setRegisterModal", true);
    }
    return { openReg, getIcon, getBtn  }
  }
};
</script>
