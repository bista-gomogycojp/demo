<template>
  <div class="not">
    <div class="not-content ">{{getContent}}</div>
    <div class="my-4">
      <SaveButton :button="getButton" type="back-up"/>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import SaveButton from "../../components/SaveButton";

export default {
  components: {SaveButton},
  setup() {
    const isLoading = ref(false);
    const getContent = computed(() => '新規としてデータをセットアップしたい場合は「設定」ボタンを押してください。')
    const getButton = computed(() => '設定')

    return { isLoading, getContent, getButton }
  },

};
</script>

<style></style>
