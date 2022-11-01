<template>
  <svg
      xmlns="http://www.w3.org/2000/svg"
      :class="showClassIcon ? showClassIcon : 'h-4 w-5 inline-block'"
      :fill="ops === 'show' ? 'currentColor' : 'none'"
      viewBox="0 0 24 24"
      :stroke="ops === 'show' ? 'none' : 'currentColor'"
  >
    <path
        v-if="iconEyes"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        :d="iconEyes"
    />

    <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        :d="icon"
    />
  </svg>
</template>

<script>
import {toRef, computed} from "vue";

export default {
  name: "IconButton",
  props: {
    icon: String,
    ops: String,
    showClass: Object,
    iconEyes: String,
  },
  setup(props) {
    const icon = toRef(props, 'icon')
    const ops = toRef(props, 'ops')
    const showClass = toRef(props, 'showClass')
    const iconEyes = toRef(props, 'iconEyes')
    const showClassIcon = computed(() => {
      if (showClass.value) {
        if (showClass.value.block) {
          return 'block h-4 w-4'
        }
        if (showClass.value.hidden) {
          return 'hidden h-4 w-4'
        }
        if (showClass.value.info){
          return `h-5 w-5 mx-4 ${showClass.value.info}`
        }
        if (showClass.value.logoBox){
          return showClass.value.logoBox
        }
        if (showClass.value.profileImg){
          return showClass.value.profileImg
        }
      }

    })

    return {icon, ops, showClass, iconEyes, showClassIcon}
  }
}
</script>

<style scoped>

</style>