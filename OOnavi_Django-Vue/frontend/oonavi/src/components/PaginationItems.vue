<template>
    <a-pagination
        :current="currentPage"
        show-size-changer
        :total="totalPage"
        :page-size.sync="sizePage"
        @change="onChange"
        :show-total="
        (total, range) => `${range[0]}-${range[1]} / ${total} 行`
      "
        @showSizeChange="onShowSizeChange"
    />
</template>

<script>
import {ref, toRef } from "vue";
import {useStore} from "vuex";

export default {
  name: "pagination-items",

  props: {
    totalItem: Number,
    category_item: Array,
    categories: Array
  },
  setup(props, context) {
    const store = useStore();
    const totalPage = toRef(props, 'totalItem')
    const getCategories = toRef(props, 'categories')
    const selectedPage = store.getters.getSelectedPage
    const numberPage = store.getters.getNumberPage
    const category_item = toRef(props, 'category_item')
    const sizePage = ref(selectedPage ? selectedPage : 10);
    const currentPage = ref(numberPage ? numberPage : 1);


    async function onShowSizeChange(current, pageSize) {
      currentPage.value = current;
      sizePage.value = pageSize;
      const data_page = {
        category: getCategories.value,
        category_item: category_item.value,
        currentPage: (current - 1) * pageSize,
        sizePage: current * pageSize,
      }
      const result = await store.dispatch("handleCountPage", data_page);
      if (result.status) {
        const data = {
          currentPage: (current - 1) * pageSize,
          sizePage: current * pageSize,
          category: getCategories.value,
          category_item: category_item.value,
          list: store.getters.getListItems,
          selectedPage: sizePage.value,
          numberPage: currentPage.value
        }
        context.emit("getPagination", data);
      }
    }

    async function onChange(current, pageSize) {
      currentPage.value = current;
      sizePage.value = pageSize;
      const data_page = {
        category: getCategories.value,
        category_item: category_item.value,
        currentPage: (current - 1) * pageSize,
        sizePage: current * pageSize,
      }
      const result = await store.dispatch("handleCountPage", data_page);
      if (result.status) {
        const data = {
          currentPage: (current - 1) * pageSize,
          sizePage: current * pageSize,
          category: getCategories.value,
          category_item: category_item.value,
          list: store.getters.getListItems,
          selectedPage: sizePage.value,
          numberPage: currentPage.value
        }
        context.emit("getPagination", data);
      }

    }

    return {currentPage, sizePage, onChange, totalPage, onShowSizeChange };
  },
};
</script>

<style>
@media (max-width: 640px) {
  .ant-pagination-jump-next {
    margin-right: 1px !important;
  }

  .ant-pagination {
    font-size: 10px !important;
  }

  .ant-pagination-item {
    min-width: 0px !important;
  }
}

@media screen and (device-aspect-ratio: 40/71) {
  .ant-pagination-jump-next {
    margin-right: 1px !important;
  }

  .ant-pagination-prev, .ant-pagination-next, .ant-pagination-jump-prev, .ant-pagination-jump-next {
    min-width: 0px !important;
  }

}

</style>
