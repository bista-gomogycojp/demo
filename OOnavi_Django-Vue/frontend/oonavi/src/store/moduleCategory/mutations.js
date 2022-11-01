import useMapItems from "../../utilities/composition/useMapItems";
import useForEach from "../../utilities/composition/useForEach";
import moveArrayItemToNewIndex from "../../utilities/composition/useSplice";

export default {
    SET_LIST_ITEM(state, {
        category = [],
        item = [],
        currentPage = 0,
        sizePage = 10,
        selectedPage = 10,
        numberPage = 1
    }) {
        state.categories = category;
        state.category_items = item;
        state.current_page = currentPage;
        state.size_page = sizePage;
        state.selected_page = selectedPage;
        state.number_page = numberPage;
        state.total_category = category.length
        state.list_items = useMapItems(state.list_items, category.slice(currentPage, sizePage), item);
    },

    SET_LIST_ADDED_ITEM(
        state,
        {currentPage = 0, sizePage = 10, category = [], newData = [], newIndex = 0, oddIndex = 0, items = []}
    ) {

        const newArray = moveArrayItemToNewIndex(
            0,
            0,
            items,
            oddIndex,
            newIndex,
            "SET_LIST_ADDED_ITEM"
        );
        const getListItem = useForEach(newArray, newData.category);
        const getCategory = category ? category : state.categories;
        const data = [];
        state.list_items = useMapItems(data, getCategory.slice(currentPage, sizePage), getListItem);
        state.category_items = getListItem;
        state.categories = getCategory;
    },

    SET_ITEM_FROM_LOGO(
        state,
        {
            category = [],
            toId = 1,
            fromId = 0,
            item = [],
            newData = [],
            newIndex = 0,
            type = "ItemsInTable",
            currentPage,
            sizePage,
            items
        }
    ) {
        if (type === "ItemsInTable") {
            item.push(newData);
            set_list_items(item, newIndex, newData, category, toId, fromId, currentPage, sizePage);
        }
        if (type === "LogoBox") {
            items.push(newData);
            set_list_items(
                items,
                newIndex,
                newData,
                category,
                toId,
                fromId,
                currentPage,
                sizePage
            );
        }

        function set_list_items(
            list_data,
            new_index,
            new_data,
            category,
            toId,
            fromId,
            currentPage,
            sizePage
        ) {
            const newArray = moveArrayItemToNewIndex(
                toId,
                fromId,
                list_data,
                list_data.length - 1,
                new_index,
                "SET_ITEM_FROM_LOGO"
            );
            const getListItem = useForEach(newArray, new_data.category,fromId);
            const getCategory = category ? category : state.categories;
            const data = [];
            const list_items = useMapItems(data, getCategory.slice(currentPage, sizePage), getListItem);

            if (list_items) {
                state.list_items = list_items;
                state.category_items = getListItem;
                state.categories = getCategory;
            }
        }
    },
    SET_TOTAL_CATEGORY(state, data) {
        state.total_category = data.length;
    },
};
