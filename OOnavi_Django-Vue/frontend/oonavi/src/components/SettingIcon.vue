<template>
  <div class="setting-logo" title="開く" @click="openModal">
    <div><IconButton :icon="settingIcon"/></div>
    <div class="text-base font-sans">設定</div>
  </div>
  <teleport to="body">
    <setting-icon-pop-up @closeTableLogo="close" :logo="logo" @resetLogo="resetLogo"/>
    <setting-add-logo @settingGetLogo="settingGetLogo" @editImage="editImage"/>
  </teleport>
</template>
<script>
import { computed, ref, toRef } from "vue"
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex"
import IconButton from "./header-menus/IconButton";
import SettingIconPopUp from "./popup/SettingIconPopUp";
import SettingAddLogo from "./popup/element/SettingAddLogo";
import {notification} from "ant-design-vue";
import {checkExitLogo} from "../utilities/helps/checkExitLogo";

export default {
  name: "SettingIcon",
  components: {SettingAddLogo, SettingIconPopUp, IconButton},
  props: {
    iconCat: String,
    iconLogo: String,
    type: String,
  },
  emits: ["changeData", "changeCate"],
  setup(props,{emit}){
    const store = useStore()
    const router = useRouter();
    const route = useRoute();
    const name = route.name;
    const logo = ref([]);
    const iconCat = toRef(props, 'iconCat')
    const iconLogo = toRef(props, 'iconLogo')
    const getType = toRef(props, 'type')

    const settingIcon = computed(()=> {
      if(iconCat.value){
        return iconCat.value
      }
      if(iconLogo.value){
        return iconLogo.value
      }
    })


    const openModal = () => {
      store.commit("setIsLoading", true);
      setTimeout(()=>{
        store.commit("setIsLoading", false);
        router.push({
          name: name,
          query: {
            type: getType.value,
          },
        });
      },300)

      store.commit("setSettingIconModal", true)
    }

    const editImage = (objData, image) => {
      objData.data.forEach(item=>{
        if(item.id === objData.id){
          item.image = image
        }
      })
      logo.value.push(...objData.data)
    }


    const resetLogo = (data) => {
      logo.value = data
    }
    const close = (data)  => {
      if(data){
        if(data.type === 'logo') {
          emit("changeData");
        }
        if(data.type === 'category') {
          emit("changeCate");
        }
      }

      router.push({
        name: route.name,
      });
      store.commit("setSettingIconModal", false)
    }

    //追加を処理
    const settingGetLogo = async (objData,objImg, type) => {
      const data = await checkExitLogo (objData, store, objImg, notification, type, router, route);
      if (data){
        logo.value = data
      } else {
        store.commit("setSettingIconModal", false)
        router.push({
          name: route.name,
        });
      }
    }

    return { settingIcon, openModal, close, logo, settingGetLogo, resetLogo, editImage }
  }
}
</script>

<style scoped>

</style>