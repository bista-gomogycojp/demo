import {notification_error} from "../composition/useNotification";
import useForEach from "../composition/useForEach";

async function handleEventEnd(
    notification,
    e,
    cloneData,
    store,
    state_list,
    state_items,
    state_categories,
    state_id,
    state_currentPage,
    state_sizePage
) {
    const items = (!state_items.length) ? store.getters.getItems : state_items;
    const screenX = e.originalEvent.screenX;
    const screenY = e.originalEvent.screenY;
    const eTo = e.to.id ? e.to.id : "";
    const valueNewIndex = parseInt(e.newIndex) + 1;

    const getIndex = (valueNewIndex === 5 ) ?  (valueNewIndex-2) : valueNewIndex
    const fromId = parseInt(e.from.id.split("-")[1]);
    const toId = parseInt(eTo.split("-")[1]);
    const elmChildren = e.to.children[getIndex];

    const deletedData = await deleteItem(
        toId,
        store,
        items,
        state_categories,
        fromId,
        eTo,
        state_id,
        state_currentPage,
        state_sizePage
    );
    if (deletedData) {
        return deletedData;
    }

    const removedRow = await removeRow(
        valueNewIndex,
        toId,
        fromId,
        elmChildren,
        screenX,
        screenY,
        cloneData,
        store,
        state_categories,
        e,
        state_currentPage,
        state_sizePage,
        state_items,
    );
    if (removedRow) {
        return removedRow;
    }
    const removedColumn = await removeColumn(
        e,
        notification,
        state_list,
        state_items,
        toId,
        fromId,
        elmChildren,
        store,
        cloneData,
        items,
        state_categories,
        state_currentPage,
        state_sizePage
    );
    if (removedColumn) {
        return removedColumn;
    }

}

async function removeColumn(
    e,
    notification,
    state_list,
    state_items,
    toId,
    fromId,
    elmChildren,
    store,
    cloneData,
    items,
    state_categories,
    state_currentPage,
    state_sizePage
) {
    if (toId !== fromId && !isNaN(toId)) {
        store.commit("setIsLoading", true);
        const getIndexTitle = searchNewIndexItem(
            elmChildren,
            store,
            cloneData,
            toId
        );

        if(getIndexTitle !== -1 && toId !== 1){
            const result = await getData(store, state_currentPage, state_sizePage, cloneData.value, getIndexTitle, items, toId, fromId, state_categories)
            if (result.status) {
                store.commit("setIsLoading", false);
                return returnData(result, store, "movedRow");
            }
        } else if( getIndexTitle === -1 && toId === 1 ) {
            const result = await getData(store, state_currentPage, state_sizePage, cloneData.value, getIndexTitle, items, toId, fromId, state_categories)
            if (result.status) {
                store.commit("setIsLoading", false);
                return returnData(result, store, "movedRow");
            }
        } else {
            store.commit("setIsLoading", false);
            notification_error(notification, `申し訳ございませんが、もう一度ドラッグしてください。`)
            cloneData.value.id = e.oldIndex+1;
            cloneData.value.place = e.oldIndex+1;
            cloneData.value.category = fromId;
            state_items.unshift(cloneData.value);
            const item =  useForEach(state_items, fromId);
            const data = {
                category: state_categories,
                item,
                currentPage: state_currentPage,
                sizePage: state_sizePage
            }
            store.commit("SET_LIST_ITEM", data);
            const result = { status : true }
            return returnData(result, store, "movedColumn");
        }

    }
}

async function removeRow(
    valueNewIndex,
    toId,
    fromId,
    elmChildren,
    screenX,
    screenY,
    cloneData,
    store,
    state_categories,
    e,
    state_currentPage,
    state_sizePage,

) {
    if (toId === fromId && elmChildren ) {
        store.commit("setIsLoading", true);
        const elmNewTitle = elmChildren.title;
        const searchNewTitle = (element) => element.title === elmNewTitle;
        const setNewIndexTitle = store.getters.getItems.findIndex(searchNewTitle);

        cloneData.value.category = parseInt(toId);

        const searchOddTitle = (element) => element.title === e.item.title;
        const getOddIndexTitle = store.getters.getItems.findIndex(searchOddTitle);
        const getNewIndexTitle = (valueNewIndex === 5) ? parseInt(setNewIndexTitle)+1 : parseInt(setNewIndexTitle)

        const data = {
            currentPage: state_currentPage,
            sizePage: state_sizePage,
            newData: cloneData.value,
            newIndex: getNewIndexTitle,
            category: state_categories,
            items: store.getters.getItems,
            oddIndex: parseInt(getOddIndexTitle),

        };

        const result = await store.dispatch("getAddedItem", data);
        if (result.status) {
            store.commit("setIsLoading", false);
            return returnData(result, store, "movedRow");
        }

    }
}

async function deleteItem(
    toId,
    store,
    items,
    state_categories,
    fromId,
    eTo,
    state_id,
    state_currentPage,
    state_sizePage
) {
    if (
        eTo === "trash-top" ||
        eTo === "trash-bottom" ||
        eTo === "trash-left" ||
        eTo === "trash-right"
    ) {
        store.commit("setIsLoading", true);

        const searchNewId = (element) => element.id === state_id;
        const setNewIndexId = store.getters.getItems.findIndex(searchNewId);

        const items = store.getters.getItems;
        if (setNewIndexId !== -1) {
            items.splice(setNewIndexId, 1);
            let flag = 1;
            items.forEach((val, index) => {
                if (val.category === fromId) {
                    val.place = flag;
                    val.category = fromId;
                    flag++;
                }
            });
            if (items) {
                const data = {
                    category: state_categories,
                    item: items,
                    currentPage: state_currentPage,
                    sizePage: state_sizePage
                };
                store.commit("SET_LIST_ITEM", data);
                store.commit("setIsLoading", false);
                return {
                    list: store.getters.getListItems,
                    items: items,
                    category: state_categories,
                    type: "deleteItem",
                };

            }
        }
    }
}

function returnData(result, store, type) {
    if (result.status) {
        return {
            list: store.getters.getListItems,
            items: store.getters.getItems,
            category: store.getters.getCategories,
            type: type,
        };
    } else {
        alert("Error");
        store.commit("setIsLoading", false);
    }
}

function searchNewIndexItem(elmChildren, store, cloneData, toId) {
    if (elmChildren) {
        const elmNewTitle = elmChildren.title;
        const searchNewTitle = (element) => element.title === elmNewTitle;
        cloneData.value.category = parseInt(toId);
        return store.getters.getItems.findIndex(searchNewTitle);
    } else {
        return -1
    }

}
async function getData(store, state_currentPage, state_sizePage, cloneData, getIndexTitle, items, toId, fromId, state_categories){
    const data = {
        currentPage: state_currentPage,
        sizePage: state_sizePage,
        newData: cloneData,
        newIndex: parseInt(getIndexTitle),
        item: items,
        toId: toId,
        fromId: fromId,
        category: state_categories,
    };
    return await store.dispatch("getItemFromLogo", data);

}
export {handleEventEnd};
