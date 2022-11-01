<template>
  <div class="setting-close">
    <a-popconfirm :title="titleConfirm" :cancelText="cancel" :okText="ok" @confirm="deleteIcon(getId)">
      <IconButton :icon="closeIcon"/>
    </a-popconfirm>
  </div>
</template>

<script>
import IconButton from "../../header-menus/IconButton";
import {computed, toRef} from "vue";

export default {
  name: "SettingClose",
  components: {IconButton},
  props: {
    id: Number,
    list: Object
  },
  emits: ["deleteIcon"],
  setup(props, {emit}) {
    const getId = toRef(props, 'id');
    const getList = toRef(props, 'list');
    const closeIcon = computed(() => 'M6 18L18 6M6 6l12 12');
    const titleConfirm = computed(() => '削除しますか？');
    const cancel = computed(() => 'いいえ');
    const ok = computed(() => 'はい');


    //削除を処理する
    const deleteIcon = (id) => {
      emit("deleteIcon", getList.value.filter(item => item.id !== id));
    }
    return {closeIcon, deleteIcon, getId, titleConfirm, cancel, ok}
  }
}
</script>

<style scoped>

</style>