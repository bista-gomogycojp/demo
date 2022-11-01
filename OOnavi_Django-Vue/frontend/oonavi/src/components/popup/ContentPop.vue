<template>
  <section @click="close" class="pop-search-header "></section>
  <div class="absolute inset-0">
    <div class="fx-h">
      <div class="form-head w-3/2">
        <div class="item-pop-head" v-if="showImg">
          <div class="form-content" @click="handlePropGetImage(showImg)">
            <div class="item">
              <img class="w-28 h-auto" :src="showImg" :alt="getTitlePic"/>
            </div>
          </div>
        </div>
        <div class="item-pop-head"
             v-for="(image,index) in getAllLogo" :key="index">
          <div class="form-content" @click="handlePropGetImage(image)">
            <div class="item transform motion-safe:hover:scale-110">
              <img class="w-28 h-auto" :src="image" :alt="getTitlePic"/>
            </div>
          </div>
        </div>
        <div class="item-pop-head">
          <div class="form-content" @click="handlePropGetImage('')">
            <div class="item">
              <h1>{{ getTitlePic }}</h1>
            </div>
          </div>
        </div>
        <div class="my-2">
          <div class="relative text-gray-700">
            <input class="content-pop-input focus:shadow-outline" type="text" :placeholder="textPlace" v-model="imgUrl"/>
            <button class="content-pop-btn" @click="addImage">{{ textAdd }}</button>
          </div>
        </div>
        <div v-if="getAllLogo.length" class="item-page">
          <a-pagination
              :current="currentPage"
              :total="totalPage"
              @change="handlePropChangePage"
              :defaultPageSize="3"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {computed, toRef, ref} from 'vue';
import {notification_error, notification_success} from "../../utilities/composition/useNotification";
import {notification} from "ant-design-vue";
import { checkImageFormat } from "../../utilities/composition/checkImgFormat";

export default {
  name: "ContentPop",
  emits: ["closeFormPopUp", "handleGetImage", "onChange"],
  props: {
    logo: Object,
    title: String,
    curPage: Number,
    total: Number,
  },
  setup(props, {emit}) {
    const getAllLogo = toRef(props, 'logo')
    const getTitlePic = toRef(props, 'title')
    const currentPage = toRef(props, 'curPage')
    const totalPage = toRef(props, 'total')
    const textAdd = computed(() => '追加');
    const imgUrl = ref('');
    const showImg = ref('');
    const textPlace = computed(() => '画像アドレス。。。');

    function close() {
      emit("closeFormPopUp", false);
    }

    function handlePropGetImage(image) {
      emit("handleGetImage", image);
    }

    function handlePropChangePage(current, pageSize) {
      emit("onChange", current, pageSize);
    }

    function addImage(e) {
      e.preventDefault();
      const checkImage = checkImageFormat(imgUrl.value);
      if (!imgUrl.value) {
        notification_error(
            notification,
            `画像アドレスを入力してください。`
        );
        return;
      }

      if (!checkImage)
       {
        notification_error(
            notification,
            `正しい形式を入力してください。`
        );
        imgUrl.value = ''
      } else {
        notification_success(
            notification,
            `画像が追加されました。`
        );
        showImg.value = imgUrl.value
        imgUrl.value = ''
      }


    }

    return {
      close,
      getAllLogo,
      getTitlePic,
      currentPage,
      totalPage,
      handlePropGetImage,
      handlePropChangePage,
      textAdd,
      textPlace,
      addImage,
      imgUrl,
      showImg
    }
  }


}
</script>

<style scoped>

</style>