<template>
  <SettingIcon v-if="state.listLogo.length" @changeData="changeData" :iconLogo="settingIcon" type="logo"/>
  <div class="logo-head" @drop="drop($event)" @dragenter="dragenter($event)" @dragover="dragover($event)">
    <ul v-if="state.listLogo.length">
      <draggable
          class="logo-content"
          item-key="title"
          id="category-1"
          group="drag"
          @change="log"
          v-model="state.listLogo"
          @end="end"
          :clone="cloneItemToCategory"
      >
        <template #item="{ element, index }" :key="index">
          <li class="logo-elm">
            <LogoElement :title="element.title" :image="element.image" :url="element.url"/>
          </li>
        </template>
      </draggable>
    </ul>
    <!-- no items -->
    <section class="cls-item-center" v-else>
      <NoLogoElm @handleBackData="backData"/>
    </section>
  </div>
  <picture-pop-up @handleGetLogo="handleGetLogo"/>
</template>

<script>
import {onMounted, ref, reactive, computed} from "vue";
import draggable from "vuedraggable";
import {useStore} from "vuex";
import {getUrlFromGG} from "../utilities/helps/getUrlFromGG";
import {getCloneItem} from "../utilities/helps/getCloneItem";
import {handleEvtEndLogo} from "../utilities/helps/handleEvtEndLogo";
import PicturePopUp from "./popup/PicturePopUp";
import {notification_error} from "../utilities/composition/useNotification";
import {notification} from "ant-design-vue";
import {useRoute} from "vue-router";
import {handleSaveItem} from "../utilities/helps/handleSaveItem";
import LogoElement from "./elements/LogoElement";
import NoLogoElm from "./elements/NoLogoElm";
import SettingIcon from "./SettingIcon";
import {settingInitial} from "../utilities/helps/settingInitial";
import {checkExitLogo} from "../utilities/helps/checkExitLogo";

export default {
  name: "logo-box",
  components: {
    SettingIcon,
    NoLogoElm,
    LogoElement,
    PicturePopUp,
    draggable,
  },
  setup() {
    const route = useRoute();
    const store = useStore();
    const cloneData = ref([]);
    const user = computed(() => store.getters.getCurrentUser);
    const getToken = localStorage.getItem('access_token');
    const token = getToken ? JSON.parse(getToken) : null;
    const name = route.name;
    const state = reactive({
      listLogo: [],
    });

    //setting logo
    const settingIcon = computed(() => 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 ' +
        '112.828 2.828L11.828 15H9v-2.828l8.586-8.586z')

    function dragenter(evt) {
      evt.stopPropagation();
      evt.preventDefault();
    }

    async function backData() {
      const result = await settingInitial(name, store, notification)
      if (result.status) {
        state.listLogo = store.getters.getListLogo;
      }
    }

    async function handleGetLogo(data) {
      const result = await checkExitLogo(state.listLogo, store, data, notification);
      if (result) {
        state.listLogo = result
      }
      if (token) {
        const jsonString = JSON.stringify(state.listLogo);
        const data = {
          logo_box: jsonString,
        };
        await store.dispatch("actAddLogoForUser", data);
      }
    }

    function dragover(evt) {
      evt.stopPropagation();
      evt.preventDefault();
    }

    async function drop(evt) {
      const result = await getUrlFromGG(
          evt,
          state.listLogo,
          [],
          store,
          "LogoBox",
          notification
      );
      if (result) {
        store.commit("setPictureModal", result);
      }
    }

    async function end(e) {
      const result = await handleEvtEndLogo(
          e,
          state.listLogo,
          store,
          cloneData.value,
          notification
      );

      if (result) {
        if (result.type === "movedRow") {
          handleEvtEnd(user, result.list);
        }
        if (result.type === "deleteItem") {
          handleEvtEnd(user, result.list);
        }
        if (result.type === "movedColumn") {
          if (result.isError) {
            handleEvtEnd(
                user,
                result.list,
                result.list_items,
                result.list_category
            );
          } else {
            handleEvtEnd(
                user,
                state.listLogo,
                result.list_items,
                result.list_category
            );
          }
        }
      }
    }

    async function handleEvtEnd(user, result, list_items, list_category = []) {
      if (user.value && name === "user") {
        const jsonString = JSON.stringify(result);
        const data = {
          logo_box: jsonString,
        };
        await store.dispatch("actAddLogoForUser", data);
        if (list_items && list_category) {
          handleSaveItem(list_items, list_category, store);
          state.listLogo = result;
        } else {
          state.listLogo = result;
        }
      }
      store.dispatch("changeIndexPlace", {list: result})
      state.listLogo = result;
    }

    function cloneItemToCategory({title, url, image, is_active}) {
      const id = store.getters.getItems.length + 1;
      const result = getCloneItem(id, title, url, image, cloneData, is_active);
      if (result) {
        return result;
      }
    }

    async function log(evt) {
      if (evt.added) {
        const result = await store.dispatch("changeIndexPlace", {list: state.listLogo})
        if (result.status) {
          state.listLogo = store.getters.getListLogo;
        }
        if (user.value && name === "user") {
          const jsonString = JSON.stringify(state.listLogo);
          const data = {
            logo_box: jsonString,
          };
          await store.dispatch("actAddLogoForUser", data);
        }
      }
    }

    const changeData = async () => {
      if (token) {
        await store.dispatch("actFetchCurrentUser", token);
      }
      const currentUser = store.getters.getCurrentUser;
      if (name === "user" && currentUser.logo_box) {
        state.listLogo = JSON.parse(currentUser.logo_box);
      }
      if (name === "home") {
        state.listLogo = store.getters.getListLogo;
      }
    }

    onMounted(() => {
      customInit(token);
    });

    const customInit = async (token) => {
      if (token) {
        await store.dispatch("actFetchCurrentUser", token);
      }
      const currentUser = store.getters.getCurrentUser;
      if (currentUser) {
        if (name === "user" && currentUser.logo_box) {
          state.listLogo = JSON.parse(currentUser.logo_box);
        } else if (name === "user" && !currentUser.logo_box) {
          const logoBox = await store.dispatch("getListLogoBox");
          if (logoBox.status) {
            const jsonString = JSON.stringify(store.getters.getListLogo);
            const data = {
              logo_box: jsonString,
            };
            await store.dispatch("actAddLogoForUser", data);
            state.listLogo = store.getters.getListLogo;
          }
        }
      } else {
        if (name === "home") {
          const logoBox = await store.dispatch("getListLogoBox");
          if (logoBox.status) {
            state.listLogo = store.getters.getListLogo;
          } else {
            notification_error(
                notification,
                `現在、プロジェクトが更新中でございます。`
            );
          }
        }
      }
    }

    return {
      backData,
      log,
      cloneItemToCategory,
      end,
      state,
      dragenter,
      drop,
      dragover,
      handleGetLogo,
      changeData,
      settingIcon
    };
  },
};
</script>

<style></style>
