<template>
  <div class="head-btn">
    <template v-if="isLoggedIn">
      <router-link to="/user" class="btn">{{ getTextBtn }}</router-link>
    </template>
    <template v-else>
      <router-link to="/" class="btn">{{ getTextBtn }}</router-link>
    </template>
    <template v-for="(item,i) in listMenu" :key="i">
      <component
          :is="item.link.startsWith('https') ? 'a' : 'router-link'"
          :href="item.link"
          :to="item.link"
          :target="item.target ? item.target : '_self'"
          class="btn"
      >
        {{ item.title }}
      </component>
    </template>

    <!-- Login -->
    <login-user :isLoggedIn="isLoggedIn"/>
    <!-- Logout-->
    <logout-user :isLoggedIn="isLoggedIn"/>
  </div>
</template>

<script>
import LoginUser from './LoginUser.vue';
import LogoutUser from "./LogoutUser.vue";
import {computed, ref, reactive} from "vue"
import {useStore} from "vuex";

export default {
  components: {LogoutUser, LoginUser},
  name: "main-menu",
  setup() {
    const store = useStore();
    const state = reactive({
      user: []
    })
    const isLoggedIn = computed(() => store.getters.isLogin)
    const getTextBtn = computed(() => 'ホーム')
    const listMenu = ref([
      {title: "カレンダー", link: "https://www.himekuricalendar.com/year2021", target: "_blank"},
      {title: "天気", link: "https://www.tenki-yoho.com/", target: "_blank"},
      {title: "運行情報", link: "https://www.navitime.co.jp/", target: "_blank"},
      {title: "辞書・翻訳", link: "https://dictionary.goo.ne.jp/", target: "_blank"},
    ])

    return {isLoggedIn, listMenu, state, getTextBtn}
  },
};
</script>

<style>
.btn {
  @apply text-gray-800  dark:text-gray-500 hover:bg-gray-700 dark:hover:text-white lg:px-1 xl:px-2 hover:text-white px-3 py-2 rounded-md  text-base font-medium transition;
}

.head-btn {
  @apply flex sm:hidden lg:flex space-x-2 lg:space-x-1 bg-blue-100 shadow-md p-2 rounded-sm main-menu items-center
}

.main-menu a.active {
  --tw-bg-opacity: 1;
  background-color: rgba(107, 114, 128, var(--tw-bg-opacity));
  color: rgba(255, 255, 255, var(--tw-text-opacity));
}
</style>
