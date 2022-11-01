<template>
  <div class="my-4 py-4">
    <ul class="flex justify-center">
      <li class="border-r-2 footer-menu-active" v-for="(item,i) in listMenu" :key="i">
        <component
            :is="item.link.startsWith('https') ? 'a' : 'router-link'"
            :href="item.link"
            :to="item.link"
            :target="item.target ? item.target : '_self'"
            class="footer-menu"
        >
          {{ item.title }}
        </component>
      </li>
    </ul>
  </div>
</template>

<script>
import {ref} from "vue"

export default {
  name: 'footer-menu',
  setup() {
    const listMenu = ref([
      {title: "マルマルナビについて", link: "/about"},
      {title: "会社概要", link: "https://gomoal.co.jp/", target: "_blank"},
      {title: "免責事項", link: "/copyright"},
      {title: "お問い合わせ", link: "/inquiry"},
    ])
    return {listMenu}
  }
}
</script>

<style>
.footer-menu-active a.active {
  --tw-bg-opacity: 1;
  background-color: rgba(219, 234, 254, var(--tw-bg-opacity));
}
</style>