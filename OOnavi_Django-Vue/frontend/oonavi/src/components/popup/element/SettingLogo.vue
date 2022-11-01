<template>
  <setting-header @backData="backData" @saveData="saveData" :type="getType"/>
  <draggable class="setting-gird" item-key="title" v-model="state.list" @end="end" id="category-1"
             v-if="state.list.length">
    <template #item="{ element, index }" :key="index">
      <div class="relative inline animate-wiggle">
        <div class="setting-move text-center">
          <setting-content :image="element.image" :title="element.title" :id="element.id" :url="element.url"
                           :list="state.list" v-if="getType === 'logo' || getLogo"/>

          <span class="setting-letter " :title="getTitle" v-else>{{ element.title }}</span>
          <setting-close :id="element.id" @deleteIcon="deleteIcon" :list="state.list"/>
        </div>
        <div class="setting-edit cursor-pointer hover:bg-blue-100" >
          <div class="flex-and-center" @click="showEdit(element.id)">
            <input type="text" :id="element.id" :value="element.title"
                   @change="setTitle($event, element.title, element.id)" class="setting-input-edit"
                   style="display: none">
            <span class="setting-letter text-center" :id="'title-'+element.id" :title="element.title">{{
                element.title
              }}</span>
            <span :id="'icon-'+element.id"><IconButton :icon="editIcon"/></span>
          </div>
        </div>
      </div>
    </template>
  </draggable>
  <!-- no items -->
  <section class="cls-item-center" v-else>
    <no-logo-elm :type="getType"/>
  </section>
  <setting-save :list="state.list" :type="getType"/>


</template>

<script>
import {computed, reactive, watch, ref, toRef, onMounted} from "vue"
import {useRouter, useRoute} from 'vue-router'
import IconButton from "../../header-menus/IconButton";
import draggable from "vuedraggable";
import {useStore} from 'vuex'
import {notification} from "ant-design-vue"
import {notification_success} from "../../../utilities/composition/useNotification";
import SettingHeader from "./SettingHeader";
import NoLogoElm from "../../elements/NoLogoElm";
import SettingSave from "./SettingSave";
import SettingContent from "./SettingContent";
import SettingClose from "./SettingClose";
import {handleSaveItem} from "../../../utilities/helps/handleSaveItem";


export default {
  name: "SettingLogo",
  components: {SettingClose, SettingContent, SettingSave, NoLogoElm, SettingHeader, IconButton, draggable},
  props: {
    logo: Object,
  },
  emits: ["closeModalAndSave", "reset"],
  setup(props, {emit}) {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const getLogo = toRef(props, "logo")
    const show = ref(true);
    const getTitle = ref('');
    const getType = ref('');
    const name = route.name;
    const getId = ref(0);
    const user = computed(() => store.getters.getCurrentUser);
    const getToken = localStorage.getItem('access_token');
    const token = getToken ? JSON.parse(getToken) : null;
    const state = reactive({
      list: [],
    })

    onMounted(async () => {
        if (getLogo.value) {
          state.list = getLogo.value
          emit("reset", []);
        }
    })

    watch(
        () => route.query.type,
        async (type) => {
          getType.value = type
          if (token) {
            await store.dispatch("actFetchCurrentUser", token);
          }
          const currentUser = store.getters.getCurrentUser;
          if (type === 'logo') {
            if (currentUser) {
              if (name === "user" && currentUser.logo_box) {
                state.list = JSON.parse(currentUser.logo_box);
              }
            } else {
              if (name === "home") {
                state.list.push(...store.getters.getListLogo)
              }
            }
          } else if (type === 'category') {
            if (currentUser) {
              if (name === "user" && currentUser.category) {
                state.list = JSON.parse(currentUser.category);
              }
            } else {
              if (name === "home") {
                state.list.push(...store.getters.getCategories)
              }
            }
          } else {
            router.push({
              name: route.name,
            });
            store.commit("setSettingIconModal", false)
          }
        }
    )


    const editIcon = computed(() => 'M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z')

    //タイトルを編集する
    const showEdit = (id) => {
      if (id) {
        if (getId.value === 0 || id === getId.value) {
          getElm(id)
        } else {
          const titleOldId = "title-" + getId.value;
          const iconOldId = "icon-" + getId.value;
          document.getElementById(getId.value).style.display = 'none';
          document.getElementById(titleOldId).style.display = 'block';
          document.getElementById(iconOldId).style.display = 'block';
          getElm(id)
        }
      }

    }

    const getElm = (id) => {
      const titleId = "title-" + id;
      const iconId = "icon-" + id;
      document.getElementById(id).style.display = 'block';
      document.getElementById(titleId).style.display = 'none';
      document.getElementById(iconId).style.display = 'none';
      getId.value = id
    }

    const setTitle = (event, title, id) => {
      if (event.target.value) {
        getTitle.value = event.target.value
      } else {
        getTitle.value = title
      }
      if (getTitle.value) {
        state.list.forEach((val) => {
          if (val.id === id) {
            val.title = getTitle.value
          }
        })
      }

    }

    //削除を処理
    const deleteIcon = (data) => {
      state.list = data
      if (data.length < 1) {
        store.commit("setSettingIconModal", false);
      }
    }

    //保存を処理
    const saveData = async () => {
      if (user.value && name === "user") {
        if (getType.value === 'category') {
          const response = await handleSaveItem(
              store.getters.getItems,
              state.list,
              store
          );
          if (response.status) {
            notification_success(notification, '正常に保存しました。')
            emit("closeModalAndSave", {'type': 'category'});
          }

        } else {
          const jsonString = JSON.stringify(state.list);
          const data = {
            logo_box: jsonString,
          };
          const result = await store.dispatch("actAddLogoForUser", data);
          if (result[1].status) {
            notification_success(notification, '正常に保存しました。')
            emit("closeModalAndSave", {'type': 'logo'});
          }
        }

      } else {
        if (getType.value === 'category') {
          const data = {
            category : state.list,
            item: store.getters.getItems,
            currentPage: store.getters.getCurrentPage,
            sizePage: store.getters.getSizePage,
          }

          store.commit("SET_LIST_ITEM", data);
          emit("closeModalAndSave", {'type': 'category'});
        } else {
          store.commit("SET_LOGO_BOX", state.list);
          emit("closeModalAndSave", {'type': 'logo'});
        }

        notification_success(notification, '正常に保存しました。')
        state.list = [];
        emit("closeModalAndSave");
      }

    }
    //初期設定を処理＆並べ替える
    const backData = (data) => {
      state.list = data
    }


    //ドラッグを処理
    function end() {
      let flag = 1;
      state.list.forEach((val) => {
        val.place = flag;
        flag++;
      })
    }


    return {
      editIcon,
      state,
      end,
      showEdit,
      show,
      getTitle,
      setTitle,
      deleteIcon,
      backData,
      saveData,
      getType,
      getLogo
    }
  }
}
</script>

<style scoped>

</style>

