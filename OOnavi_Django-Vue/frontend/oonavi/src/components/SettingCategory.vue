<template>
  <div class="setting-logo" title="開く" @click="openModal">
    <div><IconButton :icon="settingIcon"/></div>
    <div class="text-base font-sans">設定</div>
  </div>
  <teleport to="body">
    <setting-cat-pop-up @closeTableLogo="close"/>
  </teleport>
</template>

<script>
import { computed, toRef } from "vue"
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex"
import IconButton from "./header-menus/IconButton";
import SettingCatPopUp from "./popup/SettingCatPopUp";

export default {
  name: "SettingCategory",
  components: {SettingCatPopUp, IconButton},
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
      },500)
      store.commit("setSettingCatModal", true)
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
      store.commit("setSettingCatModal", false)
    }



    return { settingIcon, openModal, close }
  }
}
</script>

<style scoped>

</style>