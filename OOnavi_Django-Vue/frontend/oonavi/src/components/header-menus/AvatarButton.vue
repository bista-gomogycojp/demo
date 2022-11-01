<template>
  <button
      @click="changeTheme"
      type="button"
      class="btn-avt"
      :class="isDark ? 'bg-gray-800' : 'bg-gray-50' "
      :id="isDark ? 'dark' : 'light' "
      aria-expanded="false"
      aria-haspopup="true"
  >
    <ImageUser :renderImage="renderImage" :user_name="user_name" :isDark="isDark"/>
  </button>
</template>

<script>
import {computed, onMounted} from "vue"
import {useStore} from "vuex";
import ImageUser from "./ImageUser";

export default {
  components: {ImageUser},
  setup() {
    const store = useStore();
    const currentUser = store.getters.getCurrentUser
    const user_name = computed(() => {
      if (currentUser) return currentUser.user_name
    })
    const isDark = computed(() => store.state.isDark)

    onMounted(async () => {
      if (currentUser) {
        const isStatus = (currentUser.dark === 'true');
        store.commit("setDarkModal", isStatus);
      }
    })
    const renderImage = computed(() => {
      if (currentUser && currentUser.image) {
        const myRegex = /<img.*?src='(.*?)'[^>]+>/g;
        const exec = myRegex.exec(currentUser.image)
        if (exec) {
          return exec[1]
        } else {
          return currentUser.image
        }
      }
      return "/images/avatar.png";
    })

    async function changeTheme() {
      if (isDark.value) {
        const response = await store.dispatch("actAddDarkForUser", {dark: "false"});
        if (response.status) {
          store.commit("setDarkModal", false);
        }
      } else {
        const response = await store.dispatch("actAddDarkForUser", {dark: "true"});
        if (response.status) {
          store.commit("setDarkModal", true);
        }
      }
    }

    return {user_name, isDark, renderImage, changeTheme}
  },


}
</script>

<style>
.btn-avt {
  @apply flex text-sm border p-1  rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white mt-1 transition duration-100
}
.active .setting-text {
  --tw-text-opacity: 1;
  color: rgba(209, 213, 219, var(--tw-text-opacity));
}
</style>