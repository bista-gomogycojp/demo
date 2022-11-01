<template>
  <div class="lg:hidden" v-if="isMobOpen">
    <div class="header-mobi-menu mobile-menu">
      <template v-for="(item,i) in listMenu" :key="i">
        <component
            :is="item.link.startsWith('https') ? 'a' : 'router-link'"
            :href="item.link"
            :to="item.link"
            :target="item.target ? item.target : '_self'"
            class="mobile-text"
        >
        <span class="span-btn hover:text-teal-600 px-4"
        >
          {{ item.title }}
        </span>
        </component>
      </template>
      <user-not-login/>
      <user-logged/>
    </div>
  </div>
</template>

<script>

import UserLogged from "./UserLogged.vue";
import UserNotLogin from './UserNotLogin.vue';

export default {
  name: "mobile-menu",
  components: {
    UserLogged,
    UserNotLogin,
  },
  data() {
    return {
      listMenu: [
        {title: "ホーム", link: "/"},
        {title: "カレンダー", link: "https://www.himekuricalendar.com/year2021", target: "_blank"},
        {title: "天気", link: "https://www.tenki-yoho.com/", target: "_blank"},
        {title: "運行情報", link: "https://www.navitime.co.jp/", target: "_blank"},
        {title: "辞書・翻訳", link: "https://dictionary.goo.ne.jp/", target: "_blank"},
      ],
    };
  },
  computed: {
    isMobOpen() {
      return this.$store.state.isMobOpen;
    },
    isLoggedIn (){
      return this.$store.getters.isLogin;
    }
  },
};
</script>

<style>
.mobile-menu a.active {
  --tw-bg-opacity: 1;
  background-color: rgba(75, 85, 99, var(--tw-bg-opacity));
  color: rgba(255, 255, 255, var(--tw-text-opacity));
}


</style>

