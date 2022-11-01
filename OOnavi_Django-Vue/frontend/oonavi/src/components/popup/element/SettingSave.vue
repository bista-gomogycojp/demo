<template>
  <div class="bg-gray-50 h-36">
    <setting-attention :type="getType"/>
    <div class="grid grid-cols-2 gap-4 my-4 mx-4" v-if="getType !== 'category'">
      <div>
        <label class="label-text" for="siteUrl">{{ textUrl }}</label>
        <input id="siteUrl" type="text" :placeholder="textPlace" @change="getUrl" v-model="url"
               class="setting-input focus:outline-none focus:shadow-outline lg:w-60 xl:w-60 2xl:w-80">
      </div>
      <div class="flex justify-center items-center">
        <label class="label-text" for="siteName">{{ textUrlName }}</label>
        <input id="siteName" type="text" :placeholder="textPlace" @focus="focusSiteName" v-on:keyup="getUrlName"
               v-model="urlName" class="setting-input focus:outline-none focus:shadow-outline">
        <button class="bg-blue-500 hover:bg-blue-700 setting-btn" type="button" @click="handleAdd">
          {{ textAdd }}
        </button>
      </div>
    </div>

  </div>
</template>

<script>

import SettingAttention from "./SettingAttention";
import {ref, toRef, computed} from "vue"
import {notification_error} from "../../../utilities/composition/useNotification";
import {notification} from "ant-design-vue";
import {useStore} from 'vuex'
import {getImageFromGG} from "../../../utilities/helps/getImageFromGG";

export default {
  name: "SettingSave",
  components: {SettingAttention},
  props: {
    list: Object,
    type: String
  },
  setup(props) {
    const url = ref('');
    const urlName = ref('');
    const store = useStore();
    const listLogo = toRef(props, "list");
    const textUrl = computed(() => 'サイトURL');
    const textUrlName = computed(() => 'サイト名');
    const textAdd = computed(() => '追加');
    const getType = toRef(props, 'type');
    const textPlace = computed(() => '入力してください。');
    const getUrl = (e) => {
      const name = e.target.value;
      const getUrl = (name.startsWith('https://') || name.startsWith('http://')) ? name : ''
      if (getUrl) {
        url.value = name
      } else {
        url.value = ''
        notification_error(
            notification,
            `正しい形式「https://」または「http://」を入力してください。`
        );
      }

    }

    const focusSiteName = () => {
      if (url.value) {
        let domain = (new URL(url.value));
        urlName.value = domain.hostname
      }
    }

    const getUrlName = (e) => {
      const name = e.target.value;
      if (url.value) {
        if (name) {
          urlName.value = name
        }
      } else {
        urlName.value = ''
        notification_error(
            notification,
            `サイトURLを入力してください。`
        );
      }
    }

    const handleAdd = async (e) => {
      e.preventDefault();
      if (!url.value || !urlName.value) {
        notification_error(
            notification,
            `データを入力してください。`
        );
      } else {
        const getUrl = (url.value.startsWith('https://') || url.value.startsWith('http://')) ? url.value : ''
        const obj_logo = await getImageFromGG(getUrl, urlName.value, store, listLogo.value, notification, 'addLogo')
        if (obj_logo) {
          store.commit("setSettingPicModal", obj_logo);
          store.commit("setSettingIconModal", false);
        }
      }
    }

    return {url, urlName, handleAdd, getUrlName, getUrl, focusSiteName, textAdd, textUrl, textUrlName, getType, textPlace}
  }
}
</script>

<style scoped>

</style>