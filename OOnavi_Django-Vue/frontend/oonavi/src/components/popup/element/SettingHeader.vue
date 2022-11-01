<template>
  <div class="divide-y">
    <div class="flex justify-center">
      <div class="setting-logo-head" :title="getTitle">
        <a-popconfirm :title="getTitle + '？'" :cancelText="cancel" :okText="ok" @confirm="refresh"
                      class="flex-and-center">
          <IconButton :icon="logoRefresh"/>
          <div class="text-base font-sans">{{ getTitle }}</div>
        </a-popconfirm>
      </div>
      <div class="setting-logo-head" :title="textSave" @click="save">
        <IconButton :icon="saveIcon"/>
        <div class="text-base font-sans">{{ textSave }}</div>
      </div>
    </div>
    <div class="clear"></div>
  </div>
</template>

<script>
import {computed, toRef, ref} from "vue"
import IconButton from "../../header-menus/IconButton";
import {useStore} from "vuex";

export default {
  name: "SettingHeader",
  components: {IconButton},
  props: {
    type: String
  },
  emits: ["backData", "saveData"],
  setup(props, {emit}) {
    const store = useStore();
    const sort = ref(false);
    const listCat = ref([]);
    const getType = toRef(props, 'type');
    const cancel = computed(() => 'いいえ');
    const ok = computed(() => 'はい');
    const textSave = computed(() => '保存')

    const getTitle = computed(() => {
      if (getType.value === 'category') {
        return '並べ替える'
      } else {
        return '初期設定に戻す'
      }
    });
    const logoRefresh = computed(() => 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 ' +
        '8.003 0 01-15.357-2m15.357 2H15')

    const saveIcon = computed(() => 'M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4')

    //初期設定を処理
    const refresh = async () => {
      if (getType.value === 'category') {
        //TODO category asc and desc
        sort.value = !sort.value;
        if (sort.value) {
          listCat.value = store.getters.getCategories.sort((a, b) => b.id - a.id)
        } else {
          listCat.value = store.getters.getCategories.sort((a, b) => a.id - b.id)
        }
        emit("backData", listCat.value);
      } else {
        const logoBox = await store.dispatch("getListLogoBox");
        if (logoBox.status) {
          emit("backData", logoBox.data);
        }
      }


    }

    //保存を処理
    const save = () => {
      emit("saveData");
    }

    return {logoRefresh, saveIcon, refresh, save, getTitle, cancel, ok, textSave}
  }

}
</script>

<style scoped>

</style>