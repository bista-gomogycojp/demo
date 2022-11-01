<template>
  <div v-if="isPictureOpen">
    <ContentPop
        @closeFormPopUp="close"
        @handleGetImage="handleGetImage"
        :logo="getAllLogo"
        :title="getTitlePic"
        :curPage="currentPage"
        :total="totalPage"
        @onChange="onChange"
    />
  </div>
</template>

<script>
import {computed, ref} from "vue"
import {useStore} from "vuex"
import { useRouter, useRoute } from "vue-router";
import ContentPop from "../ContentPop";

export default {
  name: "SettingAddLogo",
  components: {ContentPop},
  emits: ["settingGetLogo", "editImage"],
  setup(_, {emit}) {
    const store = useStore()
    const sizePage = ref(3)
    const currentPage = ref(1)
    const isPictureOpen = computed(() => store.state.arrSettingPic.open)
    const startNumber = ref(0)
    const endNumber = ref(3)
    const getAllLogo = computed(() => store.state.arrSettingPic.image.slice(startNumber.value, endNumber.value))
    const getTitlePic = computed(() => store.state.arrSettingPic.title)
    const totalPage = computed(() => store.state.arrSettingPic.image.length)
    const router = useRouter();
    const route = useRoute();
    const close = () => {
      startNumber.value = 0;
      endNumber.value = 3;
      currentPage.value = 1;
      store.commit("setSettingPicModal", {open: false, data: []})
      store.commit("setSettingIconModal", false)
      router.push({
        name: route.name,
      });
    }

    function handleGetImage(image) {
      const arrPic = store.state.arrSettingPic
      if (arrPic.type === 'addLogo') {
        const obj = {
          id: arrPic.id,
          place: arrPic.place,
          title: arrPic.title,
          url: arrPic.url,
          category: 1,
          is_active: 1,
        }
        obj.image = image ? image : ''
        emit("settingGetLogo", arrPic.data, obj);
      }

      if (arrPic.type === 'editLogo') {
        emit("editImage", arrPic, image);
      }

      store.commit("setSettingPicModal", {open: false, data: []})
      store.commit("setSettingIconModal", true)

    }

    function onChange(current, pageSize) {
      currentPage.value = current;
      sizePage.value = pageSize;
      startNumber.value = parseInt((currentPage.value - 1)) * parseInt(sizePage.value);
      endNumber.value = (parseInt((currentPage.value - 1)) * parseInt(sizePage.value)) + parseInt(sizePage.value);
    }

    return {handleGetImage, isPictureOpen, close, getAllLogo, onChange, currentPage, totalPage, getTitlePic}
  },
}
</script>

<style scoped>

</style>