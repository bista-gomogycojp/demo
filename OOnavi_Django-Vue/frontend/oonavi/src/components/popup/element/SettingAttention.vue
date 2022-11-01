<template>
  <div class=" p-4 rounded bg-blue-200 my-4">
    <div class="lg:text-base font-sans text-gray-800">
      <div class="flex-and-center text-sm">
        <IconButton :icon="mouseIcon"/>
        {{ textOne }}
      </div>
      <div class="flex-and-center text-sm text-center">
        <IconButton :icon="attentionIcon"/>
        {{ textTwo }}
      </div>
    </div>
  </div>
</template>

<script>
import {computed, toRef} from "vue"
import IconButton from "../../header-menus/IconButton";

export default {
  name: "SettingAttention",
  components: {IconButton},
  props:{
    type: String,
  },
  setup(props) {
    const getType = toRef(props, 'type');
    const mouseIcon = computed(() => 'M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 ' +
        '4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122')

    const textOne = computed(() => {
      if(getType.value === 'category'){
        return 'ドラッグすると配置を変更できる。並べ替えるとカテゴリー位置を並べ替えることができる。'
      } else {
        return 'よく使うサイトを追加できる。ドラッグすると配置を変更できる。クッリクするとアイコンを変更できる。'

      }
    })
    const textTwo = computed(() => '無効にすると初期設定に戻りますのでご注意ください。')

    const attentionIcon = computed(() => 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z')


    return { mouseIcon, attentionIcon, textOne, textTwo }
  }
}
</script>

<style scoped>

</style>