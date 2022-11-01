<template>
  <button class="btn-in-out" @click="openLogin" @keyup.enter="handleSubmit" tabindex="1">
    <IconButton :icon="getIcon"/>
    {{ getBtn }}
  </button>
</template>

<script>
import IconButton from './IconButton'
import {useStore} from "vuex"
import {useRouter} from 'vue-router'
import {computed, ref} from 'vue'
import {setHandleSubmit} from "../../utilities/helps/setHandleSubmit";
import {notification} from "ant-design-vue"

export default {
  name: "login-button",
  components: {IconButton},
  setup() {
    const store = useStore()
    const router = useRouter()
    const getIcon = computed(() => 'M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1')
    const getBtn = computed(() => 'ログイン')
    const isLoading = ref(false)
    const account = localStorage.getItem('saveAccount') ? JSON.parse(localStorage.getItem('saveAccount')) : [];
    const username = ref( account ? account.user_name : '')
    const password = ref( account ? account.password : '')
    const code = ref('')
    const confirm_password = ref('')
    const email = ref('')
    const message = ref('')
    const autoSave = ref(true)
    const times = ref(1)


    function openLogin() {
      store.commit("setLoginModal", true);
    }

    function handleSubmit(e) {
      e.preventDefault();
      setHandleSubmit(isLoading.value, autoSave, password, confirm_password, notification,
          username, email, '', '',
          store, message, 2, times, code, router
      )
    }

    return {openLogin, getIcon, getBtn, handleSubmit}
  }

};
</script>
