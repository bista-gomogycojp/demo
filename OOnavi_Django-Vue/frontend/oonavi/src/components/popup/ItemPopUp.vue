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
import ContentPop from "./ContentPop";

export default {
  name: "ItemPopUp",
  components: {ContentPop},
  emits: ["handleGetItem"],
  setup(_, {emit}) {
    const store = useStore()
    const sizePage = ref(3)
    const currentPage = ref(1)
    const isPictureOpen = computed(() => store.state.isOpenItemPop)

    const startNumber = ref(0)
    const endNumber = ref(3)
    const getAllLogo = computed(() => store.state.arrItemPop.image.slice(startNumber.value, endNumber.value))
    const getTitlePic = computed(() => store.state.arrItemPop.title)

    const totalPage = computed(() => store.state.arrItemPop.image.length)
    const close = () => {
      startNumber.value = 0;
      endNumber.value = 3;
      currentPage.value = 1;
      store.commit("setOpenItemPop", false)
    }

    function handleGetImage(image) {
      const arrPic = store.state.arrItemPop
      const obj = {
        id: arrPic.id,
        place: arrPic.place,
        title: arrPic.title,
        url: arrPic.url,
        category: arrPic.category,
      }
      obj.image = image ? image : ''
      emit("handleGetItem", obj);
      store.commit("setOpenItemPop", false)
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