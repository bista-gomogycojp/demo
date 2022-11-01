<template>
  <div class="flex flex-col menu-profile">
    <router-link
        v-for="(val, i) in list"
        :key="i"
        :to="val.link"
        class="mobile-text"
        :class="{'lg:hidden':val.showMobil,'mt-20':val.ops }"
    >
        <IconButton :showClass="{'info':val.color}" :icon="val.icon"/>
        <!-- link -->
        <span class="span-btn hover:text-teal-600">{{ val.name }}</span>
    </router-link>
  </div>
</template>


<script>
import IconButton from "../header-menus/IconButton";
export default {
  name: "menu-icons",
  components: {IconButton},
  data() {
    return {
      list: [
        {
          name: "会員情報",
          link: "/profile",
          color: "text-blue-400",
          icon:
            "M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2",
          ops: true,
          showMobil:false
        },
        {
          name: "プロファイル画像",
          link: "/profile/img",
          color: "text-indigo-400",
          icon:
            "M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z",
          ops: false,
          showMobil:false
        },
        {
          name: " パスワード変更",
          link: "/profile/password",
          color: "text-green-400",
          icon:
            "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
          ops: false,
          showMobil:false
        },
        {
          name: "初期設定",
          link: "/profile/notification",
          color: "text-red-400",
          icon:
            "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9",
          ops: false,
          showMobil:false
        },
        {
          name: "ユーザー画面",
          link: "/user",
          color: "text-yellow-400",
          icon:
              "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
          ops: false,
          showMobil:true
        },
      ],
    };
  },
};
</script>

<style>
.menu-profile a.active {
  --tw-bg-opacity: 1;
  background-color: rgba(191, 219, 254, var(--tw-bg-opacity));
}
</style>>