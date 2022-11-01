<template>
  <div v-if="getImage">
    <a-popconfirm :title="titleConfirm" :cancelText="cancel" :okText="ok" @confirm="editImage(getId, getUrl, getTitle)">
      <img :src="getImage" :alt="getTitle" class="w-12 h-auto 2xl:w-28 2xl:h-auto"/>
    </a-popconfirm>
  </div>
  <div class="setting-letter text-center" v-else>
    <a-popconfirm :title="titleConfirm" :cancelText="cancel" :okText="ok" @confirm="editImage(getId, getUrl, getTitle)">
      <span :title="getTitle">{{ getTitle }}</span>
    </a-popconfirm>
  </div>
</template>

<script>
import {computed, toRef} from "vue";
import {getImageFromGG} from "../../../utilities/helps/getImageFromGG";
import {notification} from "ant-design-vue";
import {notification_error} from "../../../utilities/composition/useNotification";
import {useStore} from "vuex";

export default {
  name: "SettingContent",
  props: {
    id: Number,
    image: String,
    url: String,
    title: String,
    list: Object
  },
  setup(props) {
    const store = useStore()
    const getId = toRef(props, 'id');
    const getTitle = toRef(props, 'title');
    const getUrl = toRef(props, 'url');
    const getImage = toRef(props, 'image');
    const getList = toRef(props, 'list');
    const titleConfirm = computed(() => 'アイコンを変更しますか？');
    const cancel = computed(() => 'いいえ');
    const ok = computed(() => 'はい');

    //アイコンを変更
    const editImage = async (id, url, title) => {
      if (id && url) {
        const obj_logo = await getImageFromGG(url, title, store, getList, notification, 'editLogo', id)
        if (obj_logo) {
          store.commit("setSettingPicModal", obj_logo);
          store.commit("setSettingIconModal", false);
        }
      } else {
        notification_error(
            notification,
            `申し訳ございません。アイコンが変更できない。`
        );
      }
    }

    return {getTitle, getId, getUrl, getImage, editImage, titleConfirm, cancel, ok}
  }
}
</script>

<style scoped>

</style>