<template>
  <table class="table-width">
    <tbody class="table-tbody" v-if="state.list.length">
    <draggable item-key="title" v-model="state.list" @end="handleEvtCategory">
      <template #item="{ element }">
        <tr class="table-tr" :title="element.title">
          <CatColumn :id="element.id" :title="element.title" @handlePropsGroup="handleGroup" v-if="element.data.length"/>
          <div @drop="drop($event)" @dragenter="dragenter($event)" @dragover="dragover($event)">
            <draggable
                v-model="element.data"
                item-key="title"
                class="table-content"
                group="drag"
                @change="log"
                @end="end"
                :clone="cloneItem"
                :id="`category-` + element.id"
            >
              <template #item="{ element }">
                <td class="table-content-td" :title="element.title">
                  <CatItemColumn :id="element.id" :title="element.title" :url="element.url"
                                 :category="element.category"/>
                </td>
              </template>
            </draggable>
          </div>
          <!-- open group -->
          <td class="open-grp" @click="handleGroup({id : element.id , title: element.title})" title="開く" v-if="element.data.length">
            <IconButton :icon="openIcon"/>
          </td>
        </tr>
      </template>
    </draggable>
    <!-- pagination -->
    <div class="pagination-head">
      <div class="float-left -mt-2">
        <SettingCategory v-if="state.categories.length" :iconCat="settingIcon" type="category" @changeCate="changeCate" />
      </div>
      <pagination-items :totalItem="state.totalItem" :category_item="state.items" :categories="state.categories" @getPagination="getPagination"/>
    </div>

    </tbody>
    <!-- no items -->
    <no-items-in-table v-else/>
  </table>
  <!--  drop data from google-->
  <item-pop-up @handleGetItem="handleGetLogo"/>
  <!--  event drag item pop up-->
  <category-group @changeData="changeData"/>

</template>

<script>
import {useRouter, useRoute} from "vue-router";
import {reactive, onMounted, ref, computed} from "vue";
import draggable from "vuedraggable";
import PaginationItems from "./PaginationItems";
import {useStore} from "vuex";
import NoItemsInTable from "./elements/NoItemsInTable.vue";
import {getUrlFromGG} from "../utilities/helps/getUrlFromGG";
import {handleEventEnd} from "../utilities/helps/handleEventEnd";
import {handleEndGroup} from "../utilities/helps/handleEndGroup";
import {getCloneItem} from "../utilities/helps/getCloneItem";
import {handleSaveItem} from "../utilities/helps/handleSaveItem";
import ItemPopUp from "./popup/ItemPopUp";
import {notification_error} from "../utilities/composition/useNotification";
import {notification} from "ant-design-vue";
import CatColumn from "./elements/CatColumn";
import CatItemColumn from "./elements/CatItemColumn";
import CategoryGroup from "./popup/CategoryGroup";
import IconButton from "./header-menus/IconButton";
import SettingCategory from "./SettingCategory";


export default {
  name: "items-in-table",
  components: {
    SettingCategory,
    IconButton,
    CategoryGroup,
    CatItemColumn, CatColumn, ItemPopUp, draggable, PaginationItems, NoItemsInTable
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const getToken = localStorage.getItem('access_token');
    const token = getToken ? JSON.parse(getToken) : null;
    const user = computed(() => store.getters.getCurrentUser);
    const openIcon = computed(() => 'M13 5l7 7-7 7M5 5l7 7-7 7')
    const settingIcon = computed(() => 'M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12')
    const name = route.name;
    const cloneData = ref([]);
    const state = reactive({
      totalItem: 10,
      totalLogo: 10,
      categories: [],
      place_item: [],
      items: [],
      list: [],
      listCatUser: [],
      id: "",
      currentPage: 0,
      sizePage: 10,
      selectedPage: 10,
      numberPage: 1,
    });

    const changeCate = () => {
      state.list = store.getters.getListItems;
      state.items = store.getters.getItems;
      state.categories = store.getters.getCategories;
    }

    function dragenter(evt) {
      evt.stopPropagation();
      evt.preventDefault();
    }

    function dragover(evt) {
      evt.stopPropagation();
      evt.preventDefault();
    }

    async function handleEvtCategory(e) {
      const result = handleEndGroup(
          e,
          state.categories,
          state.items,
          store,
          state.currentPage,
          state.sizePage
      );
      if (result.type === "category") {
        if (user.value && name === "user") {
          const response = await handleSaveItem(
              result.items,
              result.category,
              store
          );
          if (response.status) {
            state.categories = result.category;
            state.items = result.items;
            state.list = result.list;
          }
        }
        state.categories = result.category;
        state.items = result.items;
        state.list = result.list;
      }
    }

    function changeData() {
      state.list = store.getters.getListItems;
      state.items = store.getters.getItems;
      state.categories = store.getters.getCategories;
    }

    async function handleGetLogo(data) {
      const searchTitle = (element) => element.title === data.title;
      const setIndexItem = state.items.findIndex(searchTitle);
      const setIndexLogo = store.getters.getListLogo.findIndex(searchTitle);
      if (setIndexItem !== -1 || setIndexLogo !== -1) {
        notification_error(
            notification,
            `現在、「 ${data.title} 」が存在されています。`
        );
        return;
      }
      const ItemsFromGG = store.state.ItemsFromGG;
      const obj = {
        newData: data,
        newIndex: ItemsFromGG.newIndex,
        item: ItemsFromGG.item,
        category: ItemsFromGG.category,
        currentPage: state.currentPage,
        sizePage: state.sizePage,
      };
      const getAddedItem = await store.dispatch("getItemFromLogo", obj);
      if (getAddedItem.status) {
        if (user.value && name === "user") {
          const response = await handleSaveItem(
              store.getters.getItems,
              store.getters.getCategories,
              store
          );
          if (response.status) {
            state.list = response.list;
            state.items = response.items;
            state.categories = response.category;
          }
        }
        state.list = store.getters.getListItems;
        state.items = store.getters.getItems;
        state.categories = store.getters.getCategories;
      } else {
        notification_error(notification, `もう一度やり直してください。`);
      }
    }

    async function drop(evt) {
      const result = await getUrlFromGG(
          evt,
          state.items,
          state.categories,
          store,
          "ItemsInTable"
      );
      if (result) {
        if (
            result.newData.title &&
            result.newData.image &&
            result.data.newIndex !== 0
        ) {
          store.commit("setOpenItemPop", true);
          store.commit("setItemPopModal", result.newData);
          store.commit("setItemsFromGG", result.data);
        } else {
          notification_error(notification, `もう一度やり直してください。`);
        }
      }
    }

    async function end(e) {
      const result = await handleEventEnd(
          notification,
          e,
          cloneData,
          store,
          state.list,
          state.items,
          state.categories,
          state.id,
          state.currentPage,
          state.sizePage
      );
      if (result) {
        if (result.type === "movedRow") {
          handleEvtEnd(user.value, result);
        }
        if (result.type === "movedColumn") {
          handleEvtEnd(user.value, result);
        }
        if (result.type === "deleteItem") {
          handleEvtEnd(user.value, result);
        }
      }
    }

    async function handleEvtEnd(user, result) {
      if (user && name === 'user') {
        const response = await handleSaveItem(
            result.items,
            result.category,
            store
        );
        if (response.status) {
          state.list = result.list;
          state.items = result.items;
          state.categories = result.category;
        }
      }
      state.list = result.list;
      state.items = result.items;
      state.categories = result.category;
    }

    async function log(evt) {
      if (evt.removed && !evt.removed.newIndex) {
        state.id = evt.removed.element.id;
      }
      if (evt.added) {
        state.list = state.list.map((data) => {
          if (data.data.length >= 6) {
            const newData = data.data.slice(0, 5);
            return {...data, data: newData};
          }
          return {...data};
        });
      }
    }

    function cloneItem({id, title, url, image, is_active}) {
      state.items = store.getters.getItems.filter((item) => item.id !== id);
      const result = getCloneItem(
          state.totalLogo,
          title,
          url,
          image,
          cloneData,
          is_active
      );
      if (result) {
        return result;
      }
    }

    onMounted(async () => {
      if (token) {
        await store.dispatch("actFetchCurrentUser", token);
      }
      const currentUser = store.getters.getCurrentUser;
      if(currentUser){
        if (
            name === "user" &&
            currentUser.category &&
            currentUser.category_item
        ) {
          const category = JSON.parse(currentUser.category);
          const item = JSON.parse(currentUser.category_item);

          const pagination = currentUser.pagination
              ? JSON.parse(currentUser.pagination)
              : "";
          const data = {
            category,
            item,
            currentPage: pagination.current_page ? pagination.current_page : 0,
            sizePage:
                pagination.size_page && pagination.size_page !== 0
                    ? pagination.size_page
                    : 10,
            selectedPage:
                pagination.selected_page && pagination.selected_page !== 0
                    ? pagination.selected_page
                    : 10,
            numberPage:
                pagination.number_page && pagination.number_page !== 0
                    ? pagination.number_page
                    : 1,
          };
          store.commit("SET_LIST_ITEM", data);

          getState(
              store.getters.getListItems,
              store.getters.getTotalItems,
              store.getters.getCountLogo,
              store.getters.getCategories,
              store.getters.getItems,
              store.getters.getCurrentPage,
              store.getters.getSizePage,
              store.getters.getSelectedPage,
              store.getters.getNumberPage
          );
        } else if (name === "user" && !currentUser.category_item) {
          handleReturnData();
        } else if (name === "user" && !currentUser.category) {
          handleReturnData();
        }
      } else {
        if (name === "home"){
          const data = await store.dispatch("getListCategory");
          if (data.status) {
            getState(
                store.getters.getListItems,
                store.getters.getTotalItems,
                store.getters.getCountLogo,
                store.getters.getCategories,
                store.getters.getItems,
                store.getters.getCurrentPage,
                store.getters.getSizePage,
                store.getters.getSelectedPage,
                store.getters.getNumberPage
            );
          } else {
            notification_error(
                notification,
                `現在、プロジェクトが更新中でございます。`
            );
          }
        }
      }
    });

    async function handleReturnData() {
      const data = await store.dispatch("getListCategory");
      if (data.status) {
        handleSaveItem(
            store.getters.getItems,
            store.getters.getCategories,
            store
        );
        const obj_data = {
          selected_page: store.getters.getSelectedPage,
          size_page: store.getters.getSizePage,
          current_page: store.getters.getCurrentPage,
          number_page: store.getters.getNumberPage,
        };
        const jsonObject = JSON.stringify(obj_data);

        const data_pagination = {
          pagination: jsonObject,
        };
        await store.dispatch("actAddPageForUser", data_pagination);
        getState(
            store.getters.getListItems,
            store.getters.getTotalItems,
            store.getters.getCountLogo,
            store.getters.getCategories,
            store.getters.getItems,
            store.getters.getCurrentPage,
            store.getters.getSizePage,
            store.getters.getSelectedPage,
            store.getters.getNumberPage
        );
      } else {
        notification_error(
            notification,
            `現在、プロジェクトが更新中でございます。`
        );
      }
    }

    function getState(
        getListItems,
        getTotalItems,
        getCountLogo,
        getCategories,
        getItems,
        getCurrentPage,
        getSizePage,
        getSelectedPage
    ) {
      state.list = getListItems;
      state.totalItem = getTotalItems;
      state.totalLogo = getCountLogo;
      state.categories = getCategories;
      state.items = getItems;
      state.currentPage = getCurrentPage;
      state.sizePage = getSizePage;
      state.selectedPage = getSelectedPage;
    }

    async function getPagination({
                                   numberPage,
                                   selectedPage,
                                   currentPage,
                                   sizePage,
                                   category,
                                   category_item,
                                   list,
                                 }) {
      if (user.value && name === "user") {
        store.commit("setIsLoading", true);
        const obj_data = {
          selected_page: selectedPage,
          size_page: sizePage,
          current_page: currentPage,
          number_page: numberPage,
        };
        const jsonObject = JSON.stringify(obj_data);

        const data = {
          pagination: jsonObject,
        };
        const response = await store.dispatch("actAddPageForUser", data);
        if (response.status) {
          store.commit("setIsLoading", false);
          state.numberPage = numberPage;
          state.selectedPage = selectedPage;
          state.currentPage = currentPage;
          state.sizePage = sizePage;
          state.categories = category;
          state.items = category_item;
          state.list = list;
        } else {
          store.commit("setIsLoading", false);
        }
      }
      state.numberPage = numberPage;
      state.selectedPage = selectedPage;
      state.currentPage = currentPage;
      state.sizePage = sizePage;
      state.categories = category;
      state.items = category_item;
      state.list = list;
    }

    function handleGroup(data) {
      store.commit("setIsLoading", true);
      if (data.id) {
        router.push({
          name: name,
          query: {
            g: data.id,
          },
        });
        store.commit("setGroupName", data.title);
        store.commit("setCategoryModal", true);
      }
    }

    return {
      settingIcon,
      state,
      handleGetLogo,
      getPagination,
      end,
      log,
      cloneItem,
      handleGroup,
      dragenter,
      drop,
      dragover,
      handleEvtCategory,
      changeData,
      openIcon,
      changeCate
    };
  },
};
</script>
<style></style>
