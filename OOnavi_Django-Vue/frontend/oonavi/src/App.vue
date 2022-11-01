<template>
  <div :class="{ dark: isDark }">
    <div class="max-w-full  max-h-full dark:bg-black-alt transition">
      <router-view name="header" class="-mt-1"></router-view>
      <router-view/>
      <router-view name="footer"></router-view>
    </div>
  </div>
  <teleport to="body">
    <AppLoadingSvg/>
    <login-form/>
    <register-form/>
    <search-form/>
    <reset-password/>
    <set-new-password/>
  </teleport>
</template>
<script>

import LoginForm from "./components/popup/LoginForm.vue";
import RegisterForm from "./components/popup/RegisterForm.vue";
import SearchForm from "./components/popup/SearchForm.vue";
import ResetPassword from "./components/popup/ResetPassword";
import SetNewPassword from "./components/popup/SetNewPassword";
import AppLoadingSvg from "./components/AppLoadingSvg";
import {useStore} from "vuex";
import {computed, ref, onMounted} from "vue"
import {useRouter} from 'vue-router'
import {getTokenFromCookie} from "./utilities/helps/handleCookies";

export default {
  name: "App",
  components: {
    SetNewPassword,
    ResetPassword,
    LoginForm,
    RegisterForm,
    SearchForm,
    AppLoadingSvg,
  },
  setup() {
    const getToken = localStorage.getItem('access_token');
    const token = getToken ? JSON.parse(getToken) : null;
    const color = ref('red')
    const router = useRouter()
    const store = useStore()
    const isDark = computed(() => store.state.isDark)
    onMounted(() => {
      const clearTime = setInterval(() => {
        if (!token) {
          clearInterval(clearTime);
          router.push("/")
          return store.dispatch("actLogout")
        } else {
          clearInterval(clearTime);
          router.push("/user")
        }
      }, 1000)
    })

    return {color, isDark}

  },


};
</script>

<style>
</style>
