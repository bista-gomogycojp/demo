<template>
  <a class="relative group">
    <avatar-button/>
    <!-- setting button -->
    <template v-for="(value,i) in list" :key="i">
      <component
          v-if="value.show"
          :is="value.link.startsWith('/admin/') ? 'a' : 'router-link'"
          :href="value.link"
          :to="value.link"
          :target="value.target ? value.target : '_self'"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="user-menu"
      >
        <div class="btn-setting" :class="value.ops">
          <IconButton :icon="value.icon"/>
          <span class="setting-btn-font setting-active">{{ value.name }}</span>
        </div>
      </component>
    </template>
  </a>
</template>

<script>
import AvatarButton from "./AvatarButton.vue";
import {computed} from "vue"
import {useStore} from "vuex";
import IconButton from "./IconButton";

export default {
  components: {IconButton, AvatarButton},
  name: "setting-button",
  setup() {
    const store = useStore();
    const isAdmin = computed(() => store.getters.isAdmin)

    const list = [
      {
        name: "設定画面",
        target: "",
        link: "/profile",
        icon:
            "M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4",
        ops: '',
        show: true
      },
      {
        name: "管理画面",
        target: "_blank",
        link: "/admin/",
        icon: "M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z",
        ops: 'top',
        show: isAdmin.value
      }

    ]


    return {isAdmin, list}
  }
};
</script>

<style>
.active .setting-active {
  --tw-text-opacity: 1;
  color: rgba(209, 213, 219, var(--tw-text-opacity));
}
.top {
  margin-top: 37px;
}
.setting-btn-font {
  @apply text-sm text-gray-600 px-1
}
</style>
